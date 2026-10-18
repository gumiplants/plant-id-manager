import React, { useState, useEffect, useMemo } from 'react';
import type { Plant, PlantCategory, SortField, SortOrder, ViewMode, GridSize, Theme, ManagementType } from './types/plant';
import {
  loadPlantsFromStorage,
  savePlantsToStorage,
  loadBrandName,
  saveBrandName,
  loadBrandIcon,
  saveBrandIcon,
  loadFooterText,
  saveFooterText,
  generateNextId,
} from './utils/storage';
import { NanoHeader } from './components/NanoHeader';
import { SearchBar } from './components/SearchBar';
import { NanoPlantGrid } from './components/NanoPlantGrid';
import { PlantTable } from './components/PlantTable';
import { PlantModal } from './components/PlantModal';
import { PlantDetailModal } from './components/PlantDetailModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { SettingsModal } from './components/SettingsModal';
import { Sprout, SearchX, Plus, CheckCircle2, Droplets, Calendar, X } from 'lucide-react';
import { checkAndRunStartupBackup, checkAndRunNightlyBackup } from './utils/autoBackup';

export const App: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 管理区分（通常株: normal / 実生苗: seedling）- 1クリック切替
  const [managementType, setManagementType] = useState<ManagementType>(() => {
    try {
      const saved = localStorage.getItem('gumi_plants_management_type');
      if (saved === 'normal' || saved === 'seedling') {
        return saved;
      }
    } catch (_) {}
    return 'normal';
  });

  // ブランド・コレクション名（自由に変更可能・LocalStorage保存）
  const [brandName, setBrandName] = useState<string>(() => loadBrandName());

  // ヘッダーアイコン（自由に変更可能・LocalStorage保存）
  const [brandIcon, setBrandIcon] = useState<string>(() => loadBrandIcon());

  // フッター右下説明文言（自由に変更可能・LocalStorage保存）
  const [footerText, setFooterText] = useState<string>(() => loadFooterText());

  // テーマ設定（ライト / ダーク）- 初期値はダーク
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('gumi_plants_theme');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (_) {}
    return 'dark';
  });

  // カテゴリ、検索、ソート、表示モード
  const [activeCategory, setActiveCategory] = useState<PlantCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('card');

  // グリッドサイズ（大、中、小）
  const [gridSize, setGridSize] = useState<GridSize>(() => {
    try {
      const saved = localStorage.getItem('gumi_plants_grid_size');
      if (saved === 'large' || saved === 'medium' || saved === 'small') {
        return saved;
      }
    } catch (_) {}
    return 'medium';
  });

  // モーダル管理
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [detailPlant, setDetailPlant] = useState<Plant | null>(null);
  const [deletingPlant, setDeletingPlant] = useState<Plant | null>(null);

  // 一括水やりモード管理
  const [isBulkWaterMode, setIsBulkWaterMode] = useState(false);
  const [selectedPlantIds, setSelectedPlantIds] = useState<string[]>([]);
  const [bulkWaterDate, setBulkWaterDate] = useState<string>(() => new Date().toISOString().split('T')[0]);

  // 自動バックアップ・操作通知ステート
  const [autoBackupNotice, setAutoBackupNotice] = useState<string | null>(null);

  // 初回読み込み
  useEffect(() => {
    const loaded = loadPlantsFromStorage();
    setPlants(loaded);
    setIsLoaded(true);
  }, []);

  // データ永続化
  useEffect(() => {
    if (isLoaded) {
      savePlantsToStorage(plants);
    }
  }, [plants, isLoaded]);

  // 1. 起動時自動バックアップ（ダウンロードフォルダへ保存）
  useEffect(() => {
    if (isLoaded && plants.length > 0) {
      const timer = setTimeout(() => {
        const executed = checkAndRunStartupBackup(plants, brandName);
        if (executed) {
          setAutoBackupNotice('起動時自動バックアップを実行しました（ダウンロードフォルダに保存）');
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, brandName]);

  // 2. 深夜1時自動バックアップ（開いたままにしている場合、01:00にダウンロードフォルダへ保存）
  useEffect(() => {
    if (!isLoaded || plants.length === 0) return;

    // 1分ごとに現在時刻をチェック
    const interval = setInterval(() => {
      const executed = checkAndRunNightlyBackup(plants, brandName);
      if (executed) {
        setAutoBackupNotice('深夜1時自動バックアップを実行しました（ダウンロードフォルダに保存）');
      }
    }, 60 * 1000);

    // 初回マウント時にも念のため判定（01:00台に開いた場合）
    const executedNow = checkAndRunNightlyBackup(plants, brandName);
    if (executedNow) {
      setAutoBackupNotice('深夜1時自動バックアップを実行しました（ダウンロードフォルダに保存）');
    }

    return () => clearInterval(interval);
  }, [isLoaded, plants, brandName]);

  // 通知トースト自動消去（4秒）
  useEffect(() => {
    if (autoBackupNotice) {
      const timer = setTimeout(() => {
        setAutoBackupNotice(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [autoBackupNotice]);

  // テーマのDOM反映 ＆ LocalStorage永続化
  useEffect(() => {
    document.documentElement.className = theme;
    try {
      localStorage.setItem('gumi_plants_theme', theme);
    } catch (_) {}
  }, [theme]);

  // ページタイトルの動的更新
  useEffect(() => {
    document.title = `${brandName} - BOTANICAL LOG`;
  }, [brandName]);

  const handleUpdateBrandName = (newName: string) => {
    const clean = newName.trim() || 'gumi_plants';
    setBrandName(clean);
    saveBrandName(clean);
  };

  const handleUpdateBrandIcon = (newIcon: string) => {
    const clean = newIcon.trim() || '🌿';
    setBrandIcon(clean);
    saveBrandIcon(clean);
  };

  const handleUpdateFooterText = (newText: string) => {
    const clean = newText.trim() || 'アガベ / 塊根植物 / サボテン 個別写真・水やり履歴管理';
    setFooterText(clean);
    saveFooterText(clean);
  };

  // 管理区分（通常株 vs 実生苗）切替
  const handleManagementTypeChange = (newType: ManagementType) => {
    setManagementType(newType);
    try {
      localStorage.setItem('gumi_plants_management_type', newType);
    } catch (_) {}
  };

  // グリッドサイズ変更時のLocalStorage保存
  const handleGridSizeChange = (newSize: GridSize) => {
    setGridSize(newSize);
    try {
      localStorage.setItem('gumi_plants_grid_size', newSize);
    } catch (_) {}
  };

  // 新規登録 / 編集保存（複製時も新規として安全に保存）
  const handleSavePlant = (plantData: Omit<Plant, 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();

    if (editingPlant && !isDuplicate) {
      setPlants((prev) =>
        prev.map((item) =>
          item.id === editingPlant.id
            ? {
                ...item,
                ...plantData,
                updatedAt: now,
              }
            : item
        )
      );
    } else {
      const newPlant: Plant = {
        ...plantData,
        createdAt: now,
        updatedAt: now,
      };
      setPlants((prev) => [newPlant, ...prev]);
    }
    setIsDuplicate(false);
  };

  // 既存株をまるまるコピーして新規登録する機能
  const handleDuplicatePlant = (sourcePlant: Plant) => {
    let prefix = 'PLT';
    if (sourcePlant.managementType === 'seedling') {
      prefix = 'SDL';
    } else {
      switch (sourcePlant.category) {
        case 'agave':
          prefix = 'AGV';
          break;
        case 'caudex':
          prefix = 'CDX';
          break;
        case 'shrub':
          prefix = 'SHR';
          break;
        case 'cactus':
          prefix = 'COP';
          break;
        case 'euphorbia':
          prefix = 'EUP';
          break;
        default:
          prefix = 'PLT';
          break;
      }
    }

    const nextId = generateNextId(prefix, plants);
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    const duplicatedPlant: Plant = {
      ...sourcePlant,
      id: nextId,
      name: sourcePlant.name ? `${sourcePlant.name} (複製)` : '',
      japaneseName: sourcePlant.japaneseName ? `${sourcePlant.japaneseName} (複製)` : undefined,
      acquisitionDate: sourcePlant.acquisitionDate ? sourcePlant.acquisitionDate.slice(0, 7) : today.slice(0, 7),
      lastWateredDate: today,
      createdAt: now,
      updatedAt: now,
    };

    setIsDuplicate(true);
    setEditingPlant(duplicatedPlant);
    setIsFormModalOpen(true);
  };

  // 「水やり完了」ボタンのアクション
  const handleWaterPlant = (targetPlant: Plant) => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    setPlants((prev) =>
      prev.map((item) =>
        item.id === targetPlant.id
          ? {
              ...item,
              lastWateredDate: today,
              updatedAt: now,
            }
          : item
      )
    );

    if (detailPlant?.id === targetPlant.id) {
      setDetailPlant((prev) => (prev ? { ...prev, lastWateredDate: today } : null));
    }
  };

  // 「植え替え完了」ボタンのアクション
  const handleRepotPlant = (targetPlant: Plant) => {
    const thisMonth = new Date().toISOString().slice(0, 7);
    const now = new Date().toISOString();

    const existingHistory = (
      targetPlant.repottingHistory || (targetPlant.lastRepottedDate ? [targetPlant.lastRepottedDate] : [])
    ).map((d) => d.slice(0, 7));
    const updatedHistory = Array.from(new Set([thisMonth, ...existingHistory])).sort().reverse();

    setPlants((prev) =>
      prev.map((item) =>
        item.id === targetPlant.id
          ? {
              ...item,
              lastRepottedDate: thisMonth,
              repottingHistory: updatedHistory,
              updatedAt: now,
            }
          : item
      )
    );

    if (detailPlant?.id === targetPlant.id) {
      setDetailPlant((prev) =>
        prev
          ? {
              ...prev,
              lastRepottedDate: thisMonth,
              repottingHistory: updatedHistory,
            }
          : null
      );
    }
  };

  // 削除の実行
  const handleConfirmDelete = () => {
    if (!deletingPlant) return;
    setPlants((prev) => prev.filter((p) => p.id !== deletingPlant.id));
    if (detailPlant?.id === deletingPlant.id) {
      setDetailPlant(null);
    }
    setDeletingPlant(null);
  };

  // バックアップ復元
  const handleImportPlants = (imported: Plant[]) => {
    setPlants(imported);
    savePlantsToStorage(imported);
  };

  // フィルタリング ＆ ソート
  const filteredAndSortedPlants = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = plants.filter((plant) => {
      // 1. 管理区分（通常株 vs 実生苗）で分ける
      const plantType = plant.managementType === 'seedling' ? 'seedling' : 'normal';
      if (plantType !== managementType) {
        return false;
      }

      // 2. カテゴリフィルタ
      if (activeCategory !== 'all') {
        if (plant.category !== activeCategory) {
          if (activeCategory === 'agave' && !(plant.id.startsWith('AGV') || plant.name.toLowerCase().includes('agave') || plant.name.includes('アガベ'))) {
            return false;
          }
          if (activeCategory === 'caudex' && !(plant.id.startsWith('CDX') || plant.id.startsWith('PAC') || plant.name.toLowerCase().includes('pachy') || plant.name.includes('パキポ') || plant.name.includes('グラキリス'))) {
            return false;
          }
          if (activeCategory === 'shrub' && !(plant.id.startsWith('SHR') || plant.id.startsWith('COM') || plant.id.startsWith('BOS') || plant.name.toLowerCase().includes('commiphora') || plant.name.toLowerCase().includes('boswellia') || plant.name.includes('灌木') || plant.name.includes('コミフォラ') || plant.name.includes('ボスウェリア') || plant.name.includes('ブルセラ'))) {
            return false;
          }
          if (activeCategory === 'cactus' && !(plant.id.startsWith('COP') || plant.id.startsWith('EPI') || plant.name.includes('サボテン') || plant.name.includes('黒王丸') || plant.name.includes('金鯱'))) {
            return false;
          }
          if (activeCategory === 'euphorbia' && !(plant.id.startsWith('EUP') || plant.name.toLowerCase().includes('euphorbia') || plant.name.includes('ユーフォルビア') || plant.name.includes('オベサ') || plant.name.includes('ホリダ') || plant.name.includes('ギラウミニアナ') || plant.name.includes('バリダ') || plant.name.includes('クラビゲラ'))) {
            return false;
          }
          if (activeCategory === 'other' && plant.category !== 'other') {
            return false;
          }
        }
      }

      // 3. 検索クエリ
      if (!q) return true;
      return (
        plant.id.toLowerCase().includes(q) ||
        plant.name.toLowerCase().includes(q) ||
        (plant.japaneseName && plant.japaneseName.toLowerCase().includes(q)) ||
        (plant.lineageOrNursery && plant.lineageOrNursery.toLowerCase().includes(q)) ||
        (plant.potSize && plant.potSize.toLowerCase().includes(q)) ||
        (plant.soilMix && plant.soilMix.toLowerCase().includes(q)) ||
        (plant.notes && plant.notes.toLowerCase().includes(q))
      );
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'id') {
        comparison = a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' });
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name, 'ja');
      } else if (sortField === 'acquisitionDate') {
        const dateA = a.acquisitionDate || '';
        const dateB = b.acquisitionDate || '';
        comparison = dateA.localeCompare(dateB);
      } else if (sortField === 'watered') {
        const dateA = a.lastWateredDate || '';
        const dateB = b.lastWateredDate || '';
        comparison = dateB.localeCompare(dateA);
      } else if (sortField === 'createdAt') {
        comparison = a.createdAt.localeCompare(b.createdAt);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [plants, managementType, activeCategory, searchQuery, sortField, sortOrder]);

  // 一括水やりモードの切替（ONにした時は現在表示中の全株を初期選択状態にする）
  const handleToggleBulkWaterMode = () => {
    setIsBulkWaterMode((prev) => {
      const next = !prev;
      if (next) {
        setSelectedPlantIds(filteredAndSortedPlants.map((p) => p.id));
        setBulkWaterDate(new Date().toISOString().split('T')[0]);
      } else {
        setSelectedPlantIds([]);
      }
      return next;
    });
  };

  // 個別株の選択・解除トグル
  const handleToggleSelectPlant = (plantId: string) => {
    setSelectedPlantIds((prev) =>
      prev.includes(plantId) ? prev.filter((id) => id !== plantId) : [...prev, plantId]
    );
  };

  // 表示中の全株を選択
  const handleSelectAllDisplayed = () => {
    setSelectedPlantIds(filteredAndSortedPlants.map((p) => p.id));
  };

  // 選択をすべて解除
  const handleClearSelection = () => {
    setSelectedPlantIds([]);
  };

  // 一括水やりの実行（今日 または 指定日）
  const handleExecuteBulkWater = (targetDate: string) => {
    if (!targetDate || selectedPlantIds.length === 0) return;

    const now = new Date().toISOString();
    const selectedSet = new Set(selectedPlantIds);
    const updatedCount = selectedPlantIds.length;

    setPlants((prev) =>
      prev.map((item) =>
        selectedSet.has(item.id)
          ? {
              ...item,
              lastWateredDate: targetDate,
              updatedAt: now,
            }
          : item
      )
    );

    if (detailPlant && selectedSet.has(detailPlant.id)) {
      setDetailPlant((prev) => (prev ? { ...prev, lastWateredDate: targetDate } : null));
    }

    const formattedDate = targetDate.replace(/-/g, '/');
    setAutoBackupNotice(`${updatedCount}株の水やり日を ${formattedDate} に一括更新しました`);
    setIsBulkWaterMode(false);
    setSelectedPlantIds([]);
  };

  const isDark = theme === 'dark';

  const currentTypeTotalCount = plants.filter(
    (p) => (p.managementType === 'seedling' ? 'seedling' : 'normal') === managementType
  ).length;

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark
          ? 'bg-[#141518] text-gray-100 selection:bg-amber-400 selection:text-black'
          : 'bg-[#eef2ee] text-stone-900 selection:bg-emerald-600 selection:text-white'
      }`}
    >
      {/* ヘッダー */}
      <NanoHeader
        plants={plants}
        brandName={brandName}
        brandIcon={brandIcon}
        managementType={managementType}
        onManagementTypeChange={handleManagementTypeChange}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        gridSize={gridSize}
        onGridSizeChange={handleGridSizeChange}
        theme={theme}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenCreateModal={() => {
          setIsDuplicate(false);
          setEditingPlant(null);
          setIsFormModalOpen(true);
        }}
        onImportPlants={handleImportPlants}
        onManualSave={() => savePlantsToStorage(plants)}
      />

      {/* メインコンテンツ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        {/* 検索・ソートバー */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortField={sortField}
          onSortFieldChange={setSortField}
          sortOrder={sortOrder}
          onSortOrderToggle={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          gridSize={gridSize}
          onGridSizeChange={handleGridSizeChange}
          theme={theme}
          totalCount={currentTypeTotalCount}
          filteredCount={filteredAndSortedPlants.length}
          isBulkWaterMode={isBulkWaterMode}
          onToggleBulkWaterMode={handleToggleBulkWaterMode}
        />

        {/* 一括水やり操作パネル */}
        {isBulkWaterMode && (
          <div
            className={`rounded-2xl border p-3.5 sm:p-4 shadow-xl transition-all animate-in fade-in slide-in-from-top-2 duration-150 ${
              isDark
                ? 'bg-[#15261d] border-[#26583c] text-gray-100'
                : 'bg-emerald-50/90 border-emerald-300 text-stone-900'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
              {/* 左側：選択状態＆全選択・解除 */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4ade80]">
                    <Droplets className="w-4 h-4" />
                    <span className={isDark ? 'text-emerald-300' : 'text-emerald-900'}>
                      一括水やりモード
                    </span>
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                      isDark
                        ? 'bg-[#1b432e] text-[#4ade80] border-[#2d6a49]'
                        : 'bg-emerald-600 text-white border-emerald-700'
                    }`}
                  >
                    選択中: {selectedPlantIds.length} 株
                  </span>
                  <button
                    type="button"
                    onClick={handleSelectAllDisplayed}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-[#1d392b] hover:bg-[#264c39] text-emerald-200 border-[#316149]'
                        : 'bg-white hover:bg-emerald-100 text-emerald-900 border-emerald-300'
                    }`}
                  >
                    表示中の全{filteredAndSortedPlants.length}株を選択
                  </button>
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-[#1b1d22] hover:bg-[#262930] text-gray-300 border-[#32353e]'
                        : 'bg-white hover:bg-stone-100 text-stone-600 border-stone-300'
                    }`}
                  >
                    すべて解除
                  </button>
                </div>
                <p className={`text-[11px] ${isDark ? 'text-emerald-200/70' : 'text-emerald-800/80'}`}>
                  ※下のカード（または一覧の行）をクリックすると、水やり対象の株を個別にON / OFFできます。
                </p>
              </div>

              {/* 右側：①今日で一括水やり完了 ＆ ②日付を指定して一括水やり */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {/* ① 今日で一括水やり完了ボタン */}
                <button
                  type="button"
                  disabled={selectedPlantIds.length === 0}
                  onClick={() => handleExecuteBulkWater(new Date().toISOString().split('T')[0])}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#4ade80] hover:bg-[#22c55e] text-black shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Droplets className="w-4 h-4 fill-current" />
                  <span>今日で一括水やり完了 ({selectedPlantIds.length}株)</span>
                </button>

                {/* ② 水やりした日を指定して一括入力 */}
                <div
                  className={`flex items-center gap-1.5 p-1 pl-2.5 rounded-xl border ${
                    isDark
                      ? 'bg-[#121f18] border-[#2b5b40]'
                      : 'bg-white border-emerald-300'
                  }`}
                >
                  <Calendar className={`w-3.5 h-3.5 flex-shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
                  <input
                    type="date"
                    value={bulkWaterDate}
                    onChange={(e) => setBulkWaterDate(e.target.value)}
                    className={`text-xs font-mono focus:outline-none bg-transparent py-1 ${
                      isDark ? 'text-gray-100' : 'text-stone-800'
                    }`}
                  />
                  <button
                    type="button"
                    disabled={selectedPlantIds.length === 0 || !bulkWaterDate}
                    onClick={() => handleExecuteBulkWater(bulkWaterDate)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                      isDark
                        ? 'bg-amber-400 hover:bg-amber-300 text-black'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    この日付で一括記録
                  </button>
                </div>

                {/* 閉じるボタン */}
                <button
                  type="button"
                  onClick={() => {
                    setIsBulkWaterMode(false);
                    setSelectedPlantIds([]);
                  }}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-[#1b1d22] hover:bg-[#262930] text-gray-400 hover:text-gray-200 border-[#32353e]'
                      : 'bg-white hover:bg-stone-100 text-stone-500 hover:text-stone-800 border-stone-300'
                  }`}
                  title="一括水やりモードを閉じる"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 一覧表示部 */}
        {currentTypeTotalCount === 0 ? (
          <div
            className={`border rounded-2xl p-12 text-center space-y-4 shadow-xl ${
              isDark ? 'bg-[#1b1c21] border-[#2b2c34]' : 'bg-white border-stone-300 shadow-md shadow-stone-200/60'
            }`}
          >
            <div
              className={`inline-flex p-4 rounded-full ${
                isDark ? 'bg-[#272830] text-[#fbbf24]' : 'bg-emerald-100/80 text-emerald-700'
              }`}
            >
              <Sprout className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold">
              {managementType === 'seedling'
                ? '登録されている実生苗（種まき）がありません'
                : '登録されている株がありません'}
            </h2>
            <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
              {managementType === 'seedling'
                ? 'パキポディウムやアガベなどの種まき記録を登録して、播種日や発芽数、腰水管理をログに残しましょう。'
                : 'アガベやパキポディウム、サボテンなどの株を登録して、写真や水やりサイクルを一元管理しましょう。'}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setEditingPlant(null);
                  setIsFormModalOpen(true);
                }}
                className={`px-5 py-2.5 text-xs font-bold rounded-full shadow-lg cursor-pointer transition-colors ${
                  managementType === 'seedling'
                    ? isDark
                      ? 'text-black bg-[#4ade80] hover:bg-[#22c55e]'
                      : 'text-white bg-emerald-600 hover:bg-emerald-700'
                    : isDark
                    ? 'text-black bg-[#fbbf24] hover:bg-[#f59e0b]'
                    : 'text-white bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {managementType === 'seedling' ? '最初の実生苗を登録する' : '最初の株を登録する'}
              </button>
            </div>
          </div>
        ) : filteredAndSortedPlants.length === 0 ? (
          <div
            className={`border rounded-2xl p-10 text-center space-y-3 ${
              isDark ? 'bg-[#1b1c21] border-[#2b2c34]' : 'bg-white border-stone-300 shadow-sm'
            }`}
          >
            <SearchX className={`w-8 h-8 mx-auto ${isDark ? 'text-gray-500' : 'text-stone-400'}`} />
            <h3 className="text-sm font-semibold">一致する株が見つかりませんでした</h3>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-stone-500'}`}>
              検索条件またはカテゴリタブを変更してください。
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className={`text-xs hover:underline pt-1 cursor-pointer ${
                isDark ? 'text-[#fbbf24]' : 'text-emerald-700 font-semibold'
              }`}
            >
              条件をリセット
            </button>
          </div>
        ) : viewMode === 'card' ? (
          /* 写真カードグリッド（大・中・小 ＆ ライト・ダーク対応） */
          <NanoPlantGrid
            plants={filteredAndSortedPlants}
            gridSize={gridSize}
            theme={theme}
            onViewDetail={(plant) => setDetailPlant(plant)}
            onEdit={(plant) => {
              setIsDuplicate(false);
              setEditingPlant(plant);
              setIsFormModalOpen(true);
            }}
            onDelete={(plant) => setDeletingPlant(plant)}
            onWaterPlant={handleWaterPlant}
            onDuplicate={handleDuplicatePlant}
            isBulkWaterMode={isBulkWaterMode}
            selectedPlantIds={selectedPlantIds}
            onToggleSelectPlant={handleToggleSelectPlant}
          />
        ) : (
          /* テーブル表示（ライト・ダーク対応） */
          <PlantTable
            plants={filteredAndSortedPlants}
            theme={theme}
            onViewDetail={(plant) => setDetailPlant(plant)}
            onEdit={(plant) => {
              setIsDuplicate(false);
              setEditingPlant(plant);
              setIsFormModalOpen(true);
            }}
            onDelete={(plant) => setDeletingPlant(plant)}
            onWaterPlant={handleWaterPlant}
            isBulkWaterMode={isBulkWaterMode}
            selectedPlantIds={selectedPlantIds}
            onToggleSelectPlant={handleToggleSelectPlant}
          />
        )}
      </main>

      {/* フッター */}
      <footer
        className={`border-t py-6 text-center text-xs transition-colors ${
          isDark
            ? 'border-[#212228] bg-[#121316] text-[#70727f]'
            : 'border-stone-300/80 bg-[#e2e7e2] text-stone-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`font-bold ${isDark ? 'text-[#fbbf24]' : 'text-emerald-700'}`}>
              {brandName}
            </span>
            <span>BOTANICAL LOG | 植物管理システム</span>
          </div>
          <span className="text-right">{footerText}</span>
        </div>
      </footer>

      {/* スマホ専用：画面右下に浮く「＋」株登録ボタン（片手・親指でいつでも即座に登録可能） */}
      <button
        type="button"
        onClick={() => {
          setIsDuplicate(false);
          setEditingPlant(null);
          setIsFormModalOpen(true);
        }}
        className={`fixed bottom-6 right-5 z-30 sm:hidden w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all active:scale-90 cursor-pointer border-2 ${
          managementType === 'seedling'
            ? isDark
              ? 'bg-gradient-to-tr from-emerald-500 to-green-400 text-slate-950 border-emerald-300 shadow-emerald-950/60'
              : 'bg-gradient-to-tr from-emerald-600 to-green-500 text-white border-emerald-300 shadow-emerald-800/40'
            : isDark
            ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 border-amber-300 shadow-amber-950/60'
            : 'bg-gradient-to-tr from-emerald-700 to-green-600 text-white border-emerald-400 shadow-emerald-950/40'
        }`}
        aria-label={managementType === 'seedling' ? '実生苗を登録' : '新しい株を登録'}
        title={managementType === 'seedling' ? '実生苗を登録' : '新しい株を登録'}
      >
        <Plus className="w-7 h-7 stroke-[2.5]" />
      </button>

      {/* 新規登録 / 編集モーダル */}
      <PlantModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingPlant(null);
          setIsDuplicate(false);
        }}
        onSave={handleSavePlant}
        editingPlant={editingPlant}
        allPlants={plants}
        defaultManagementType={managementType}
        isDuplicate={isDuplicate}
      />

      {/* 詳細モーダル */}
      <PlantDetailModal
        plant={detailPlant}
        onClose={() => setDetailPlant(null)}
        onEdit={(plant) => {
          setIsDuplicate(false);
          setEditingPlant(plant);
          setIsFormModalOpen(true);
        }}
        onDelete={(plant) => setDeletingPlant(plant)}
        onWaterPlant={handleWaterPlant}
        onRepotPlant={handleRepotPlant}
        onDuplicate={handleDuplicatePlant}
      />

      {/* 削除確認モーダル */}
      <DeleteConfirmModal
        plant={deletingPlant}
        isOpen={deletingPlant !== null}
        onClose={() => setDeletingPlant(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* 設定モーダル（名称編集・アイコン・フッター文言・テーマ切替・CSV出力） */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        plants={plants}
        brandName={brandName}
        onUpdateBrandName={handleUpdateBrandName}
        brandIcon={brandIcon}
        onUpdateBrandIcon={handleUpdateBrandIcon}
        footerText={footerText}
        onUpdateFooterText={handleUpdateFooterText}
        theme={theme}
        onSetTheme={(newTheme) => setTheme(newTheme)}
      />

      {/* 自動バックアップ通知トースト（ダウンロードフォルダに保存されたことを静かに案内） */}
      {autoBackupNotice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-emerald-950/95 text-emerald-200 border border-emerald-600/70 shadow-2xl px-4 py-2.5 rounded-full text-xs font-medium flex items-center gap-2.5 backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{autoBackupNotice}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
