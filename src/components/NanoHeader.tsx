import React, { useRef, useState } from 'react';
import type { Plant, PlantCategory, GridSize, Theme, ManagementType } from '../types/plant';
import { Plus, Download, Upload, Save, CheckCircle2, Sprout, Trees, Settings } from 'lucide-react';

interface NanoHeaderProps {
  plants: Plant[];
  managementType: ManagementType;
  onManagementTypeChange: (type: ManagementType) => void;
  activeCategory: PlantCategory;
  onSelectCategory: (cat: PlantCategory) => void;
  gridSize: GridSize;
  onGridSizeChange: (size: GridSize) => void;
  theme: Theme;
  onOpenSettings: () => void;
  onOpenCreateModal: () => void;
  onImportPlants: (imported: Plant[]) => void;
  onManualSave: () => void;
  brandName?: string;
  brandIcon?: string;
}

export const NanoHeader: React.FC<NanoHeaderProps> = ({
  plants,
  managementType,
  onManagementTypeChange,
  activeCategory,
  onSelectCategory,
  gridSize,
  onGridSizeChange,
  theme,
  onOpenSettings,
  onOpenCreateModal,
  onImportPlants,
  onManualSave,
  brandName = 'gumi_plants',
  brandIcon = '🌿',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saveToast, setSaveToast] = useState(false);

  const isDark = theme === 'dark';

  const normalCount = plants.filter((p) => p.managementType !== 'seedling').length;
  const seedlingCount = plants.filter((p) => p.managementType === 'seedling').length;

  const handleSaveClick = () => {
    onManualSave();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(plants, null, 2));
    const downloadAnchor = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    const safeName = (brandName || 'botanical-plants').toLowerCase().replace(/[^a-z0-9_-]/gi, '_');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${safeName}-backup-${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportPlants(parsed);
          alert(`バックアップから ${parsed.length} 件のデータを正常に復元しました。`);
        } else {
          alert('無効なデータ形式です。');
        }
      } catch (err) {
        alert('ファイルの読み込みに失敗しました。');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const categories: {
    id: PlantCategory;
    label: string;
    dotColor: string;
    activeClassDark: string;
    activeClassLight: string;
    inactiveClassDark: string;
    inactiveClassLight: string;
  }[] = [
    {
      id: 'all',
      label: 'すべて',
      dotColor: 'bg-slate-400',
      activeClassDark: 'bg-slate-200 text-slate-950 border-white font-bold shadow-md shadow-white/10',
      activeClassLight: 'bg-stone-800 text-white border-stone-800 font-bold shadow-sm',
      inactiveClassDark: 'bg-[#1b1c21] text-gray-300 border-[#2f313c] hover:bg-[#252731] hover:text-white',
      inactiveClassLight: 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100 hover:text-stone-900',
    },
    {
      id: 'agave',
      label: 'アガベ',
      dotColor: 'bg-cyan-400',
      activeClassDark: 'bg-cyan-400 text-slate-950 border-cyan-300 font-bold shadow-md shadow-cyan-950/50',
      activeClassLight: 'bg-cyan-600 text-white border-cyan-700 font-bold shadow-sm',
      inactiveClassDark: 'bg-[#122227] text-cyan-300 border-cyan-800/70 hover:bg-[#183138] hover:text-cyan-200',
      inactiveClassLight: 'bg-cyan-50/80 text-cyan-900 border-cyan-300 hover:bg-cyan-100',
    },
    {
      id: 'caudex',
      label: '塊根植物',
      dotColor: 'bg-orange-400',
      activeClassDark: 'bg-orange-400 text-slate-950 border-orange-300 font-bold shadow-md shadow-orange-950/50',
      activeClassLight: 'bg-orange-600 text-white border-orange-700 font-bold shadow-sm',
      inactiveClassDark: 'bg-[#291b12] text-orange-300 border-orange-800/70 hover:bg-[#382519] hover:text-orange-200',
      inactiveClassLight: 'bg-orange-50/80 text-orange-900 border-orange-300 hover:bg-orange-100',
    },
    {
      id: 'shrub',
      label: '灌木植物',
      dotColor: 'bg-lime-400',
      activeClassDark: 'bg-lime-400 text-slate-950 border-lime-300 font-bold shadow-md shadow-lime-950/50',
      activeClassLight: 'bg-lime-700 text-white border-lime-800 font-bold shadow-sm',
      inactiveClassDark: 'bg-[#1e2713] text-lime-300 border-lime-800/70 hover:bg-[#2a381b] hover:text-lime-200',
      inactiveClassLight: 'bg-lime-50/80 text-lime-900 border-lime-300 hover:bg-lime-100',
    },
    {
      id: 'cactus',
      label: 'サボテン',
      dotColor: 'bg-rose-400',
      activeClassDark: 'bg-rose-400 text-slate-950 border-rose-300 font-bold shadow-md shadow-rose-950/50',
      activeClassLight: 'bg-rose-600 text-white border-rose-700 font-bold shadow-sm',
      inactiveClassDark: 'bg-[#29131c] text-rose-300 border-rose-800/70 hover:bg-[#3a1b28] hover:text-rose-200',
      inactiveClassLight: 'bg-rose-50/80 text-rose-900 border-rose-300 hover:bg-rose-100',
    },
    {
      id: 'euphorbia',
      label: 'ユーフォルビア',
      dotColor: 'bg-teal-400',
      activeClassDark: 'bg-teal-400 text-slate-950 border-teal-300 font-bold shadow-md shadow-teal-950/50',
      activeClassLight: 'bg-teal-600 text-white border-teal-700 font-bold shadow-sm',
      inactiveClassDark: 'bg-[#122623] text-teal-300 border-teal-800/70 hover:bg-[#1a3834] hover:text-teal-200',
      inactiveClassLight: 'bg-teal-50/80 text-teal-900 border-teal-300 hover:bg-teal-100',
    },
    {
      id: 'other',
      label: 'その他',
      dotColor: 'bg-purple-400',
      activeClassDark: 'bg-purple-400 text-slate-950 border-purple-300 font-bold shadow-md shadow-purple-950/50',
      activeClassLight: 'bg-purple-600 text-white border-purple-700 font-bold shadow-sm',
      inactiveClassDark: 'bg-[#211429] text-purple-300 border-purple-800/70 hover:bg-[#311d3d] hover:text-purple-200',
      inactiveClassLight: 'bg-purple-50/80 text-purple-900 border-purple-300 hover:bg-purple-100',
    },
  ];

  const isImageIcon =
    brandIcon.startsWith('data:image') ||
    brandIcon.startsWith('http') ||
    brandIcon.startsWith('blob:');

  return (
    <header
      className={`border-b sticky top-0 z-40 transition-colors duration-200 ${
        isDark
          ? 'bg-[#141518]/95 backdrop-blur border-[#232429]'
          : 'bg-white/95 backdrop-blur border-stone-200/90 shadow-sm'
      }`}
    >
      {/* 1段目：ブランドロゴ & アクションボタン（iPhone・スマホ完全最適化） */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-2.5 sm:pb-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* 左側：ブランドロゴ & BOTANICAL LOG */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div
            className="flex items-center gap-2 sm:gap-3.5 cursor-pointer group min-w-0"
            onClick={() => onSelectCategory('all')}
            title="ホーム（全表示）"
          >
            {/* アイコン枠（iPhoneではコンパクト、PCでは大きく自動適応） */}
            <div
              className={`w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center border shadow-md transition-transform group-hover:scale-105 flex-shrink-0 ${
                isDark
                  ? 'bg-gradient-to-br from-[#252730] to-[#1c1d22] border-[#363844]'
                  : 'bg-gradient-to-br from-emerald-100 to-amber-50 border-emerald-300 shadow-sm'
              }`}
            >
              {isImageIcon ? (
                <img
                  src={brandIcon}
                  alt={brandName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl sm:text-4xl select-none leading-none">
                  {brandIcon}
                </span>
              )}
            </div>

            {/* ブランド名 & collection（長い名前でもiPhoneで崩れない） */}
            <div className="flex flex-col justify-center min-w-0">
              <span
                className={`text-lg sm:text-2xl md:text-3xl font-black tracking-tight leading-none transition-colors select-none truncate ${
                  isDark ? 'text-[#fbbf24]' : 'text-emerald-800'
                }`}
              >
                {brandName}
              </span>
              <span
                className={`text-[9px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase select-none mt-0.5 sm:mt-1 ${
                  isDark ? 'text-[#9ea0ad]' : 'text-stone-500'
                }`}
              >
                collection
              </span>
            </div>
          </div>

          {/* 縦区切り線 */}
          <div
            className={`h-8 sm:h-10 w-[2px] hidden md:block ${
              isDark ? 'bg-[#33353d]' : 'bg-stone-300'
            }`}
          />

          {/* 大きくなった BOTANICAL LOG タイトル */}
          <span
            className={`text-sm sm:text-base font-black tracking-[0.25em] uppercase select-none hidden lg:inline ${
              isDark ? 'text-[#8e909a]' : 'text-stone-600'
            }`}
          >
            BOTANICAL LOG
          </span>
        </div>

        {/* 右側：設定・保存・株登録ボタン（iPhoneでも絶対に途切れない最適化） */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* 設定ボタン（スマホではコンパクトな丸型、PCでは文字付き） */}
          <button
            type="button"
            onClick={onOpenSettings}
            className={`w-8 h-8 sm:w-auto p-0 sm:px-3.5 sm:py-2 rounded-full border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer flex-shrink-0 ${
              isDark
                ? 'bg-[#212227] text-gray-300 border-[#32343c] hover:bg-[#2b2c33] hover:text-[#fbbf24]'
                : 'bg-[#edf2ed] text-stone-700 border-stone-300 hover:bg-[#e0e8e0] hover:text-emerald-800 shadow-sm'
            }`}
            title="設定（アイコン・コレクション名・テーマ設定・CSV出力）"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">設定</span>
          </button>

          {/* 保存ボタン（スマホではコンパクトな丸型、PCでは文字付き） */}
          <button
            onClick={handleSaveClick}
            className={`w-8 h-8 sm:w-auto p-0 sm:px-3.5 sm:py-2 text-xs font-semibold rounded-full border transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-shrink-0 ${
              saveToast
                ? 'bg-emerald-600 text-white border-emerald-500'
                : isDark
                ? 'bg-[#212227] text-gray-300 border-[#32343c] hover:bg-[#2b2c33]'
                : 'bg-[#edf2ed] text-stone-700 border-stone-300 hover:bg-[#e0e8e0]'
            }`}
            title="現在の状態をLocalStorageに保存"
          >
            {saveToast ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span className="hidden sm:inline">保存完了</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">保存</span>
              </>
            )}
          </button>

          {/* 新しい株 / 実生苗を登録ボタン（iPhoneでも途切れないジャストフィット設計） */}
          <button
            onClick={onOpenCreateModal}
            className={`px-2.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold rounded-full shadow-md transition-all flex items-center gap-1 sm:gap-1.5 cursor-pointer flex-shrink-0 ${
              managementType === 'seedling'
                ? isDark
                  ? 'text-black bg-[#4ade80] hover:bg-[#22c55e] shadow-emerald-950/40'
                  : 'text-white bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20'
                : isDark
                ? 'text-black bg-[#fbbf24] hover:bg-[#f59e0b] shadow-amber-950/40'
                : 'text-white bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20'
            }`}
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">
              {managementType === 'seedling' ? '実生苗を登録' : '新しい株を登録'}
            </span>
            <span className="sm:hidden">
              {managementType === 'seedling' ? '実生登録' : '株を登録'}
            </span>
          </button>
        </div>
      </div>

      {/* 2段目：【通常株/実生】とその下に【ジャンル】を配置するコントロールエリア */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 pt-1 border-t border-dashed transition-colors flex flex-col md:flex-row md:items-end justify-between gap-3 overflow-x-auto">
        {/* 左側：上下2段構成（上: 通常株/実生、下: ジャンル一覧） - コンパクトサイズ */}
        <div className="space-y-1.5 flex-1">
          {/* 上段：通常株 vs 実生苗 1クリック切替タブ（小型化） */}
          <div className="flex items-center gap-1.5">
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider select-none border ${
                isDark
                  ? 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}
            >
              区分
            </span>
            <div
              className={`inline-flex items-center p-0.5 rounded-lg border text-[11px] font-medium gap-0.5 ${
                isDark
                  ? 'bg-[#15161b] border-[#292a32]'
                  : 'bg-stone-200/70 border-stone-300'
              }`}
            >
              <button
                onClick={() => onManagementTypeChange('normal')}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                  managementType === 'normal'
                    ? isDark
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold border border-amber-300 shadow-md shadow-amber-500/20'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold border border-amber-600 shadow-sm'
                    : isDark
                    ? 'text-stone-400 hover:text-amber-300 hover:bg-amber-500/10'
                    : 'text-stone-600 hover:text-amber-900 hover:bg-amber-100/50'
                }`}
                title="通常の育成株・コレクション株を表示"
              >
                <Trees className={`w-3.5 h-3.5 ${managementType === 'normal' ? (isDark ? 'text-slate-950' : 'text-white') : 'text-amber-500'}`} />
                <span>通常株</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${
                    managementType === 'normal'
                      ? isDark
                        ? 'bg-black/25 text-slate-950 font-bold'
                        : 'bg-black/20 text-white font-bold'
                      : isDark
                      ? 'bg-[#25262e] text-stone-400'
                      : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  {normalCount}
                </span>
              </button>

              <button
                onClick={() => onManagementTypeChange('seedling')}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all cursor-pointer ${
                  managementType === 'seedling'
                    ? isDark
                      ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-bold border border-emerald-300 shadow-md shadow-emerald-500/20'
                      : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold border border-emerald-700 shadow-sm'
                    : isDark
                    ? 'text-stone-400 hover:text-emerald-300 hover:bg-emerald-500/10'
                    : 'text-stone-600 hover:text-emerald-900 hover:bg-emerald-100/50'
                }`}
                title="播種・実生苗（種まき管理）を表示"
              >
                <Sprout className={`w-3.5 h-3.5 ${managementType === 'seedling' ? (isDark ? 'text-slate-950' : 'text-white') : 'text-emerald-500'}`} />
                <span>実生 (種まき)</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${
                    managementType === 'seedling'
                      ? isDark
                        ? 'bg-black/25 text-slate-950 font-bold'
                        : 'bg-black/20 text-white font-bold'
                      : isDark
                      ? 'bg-[#25262e] text-stone-400'
                      : 'bg-white text-stone-600 border border-stone-200'
                  }`}
                >
                  {seedlingCount}
                </span>
              </button>
            </div>
          </div>

          {/* 下段（通常株・実生のすぐ下）：ジャンル（カテゴリ）タブ一覧（小型化 & 明確な色分け） */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider select-none border ${
                isDark
                  ? 'bg-cyan-400/15 text-cyan-300 border-cyan-400/30'
                  : 'bg-cyan-100 text-cyan-900 border-cyan-300'
              }`}
            >
              ジャンル
            </span>
            <div className="flex items-center gap-1 flex-wrap">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const activeClass = isDark ? cat.activeClassDark : cat.activeClassLight;
                const inactiveClass = isDark ? cat.inactiveClassDark : cat.inactiveClassLight;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] transition-all cursor-pointer whitespace-nowrap border flex items-center gap-1.5 ${
                      isActive ? activeClass : inactiveClass
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-opacity ${
                        cat.dotColor
                      } ${isActive ? 'opacity-100 ring-1 ring-white/50' : 'opacity-70'}`}
                    />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右側：カードサイズ切替 [大] [中] [小] & バックアップ */}
        <div className="flex items-center gap-3 flex-shrink-0 pt-2 md:pt-0">
          {/* 大 中 小 切替ボタン */}
          <div
            className={`flex items-center rounded-full p-0.5 text-xs border ${
              isDark ? 'bg-[#1b1c21] border-[#27282f]' : 'bg-[#e8eee8] border-[#d2ddd2]'
            }`}
          >
            <span
              className={`text-[11px] pl-2.5 pr-1 select-none ${
                isDark ? 'text-[#71737e]' : 'text-stone-600'
              }`}
            >
              表示:
            </span>
            {(['large', 'medium', 'small'] as GridSize[]).map((size) => {
              const labelMap = { large: '大', medium: '中', small: '小' };
              const isSelected = gridSize === size;
              return (
                <button
                  key={size}
                  onClick={() => onGridSizeChange(size)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-[#fbbf24] text-black shadow-sm'
                        : 'bg-emerald-700 text-white shadow-sm'
                      : isDark
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-[#282931]'
                      : 'text-stone-700 hover:text-stone-950 hover:bg-[#dce5dc]'
                  }`}
                  title={`カードサイズ: ${labelMap[size]}`}
                >
                  {labelMap[size]}
                </button>
              );
            })}
          </div>

          {/* バックアップボタン */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExportJson}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                isDark
                  ? 'bg-[#212227] text-gray-300 hover:text-white hover:bg-[#2c2d34] border-[#30323a]'
                  : 'bg-[#e8eee8] text-stone-700 hover:bg-[#dce5dc] border-[#d2ddd2]'
              }`}
            >
              <Download className={`w-3 h-3 ${isDark ? 'text-gray-400' : 'text-stone-600'}`} />
              <span className="hidden md:inline">データをバックアップ</span>
              <span className="md:hidden">保存</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                isDark
                  ? 'bg-[#212227] text-gray-400 hover:text-gray-200 hover:bg-[#2c2d34] border-[#30323a]'
                  : 'bg-[#e8eee8] text-stone-600 hover:text-stone-900 hover:bg-[#dce5dc] border-[#d2ddd2]'
              }`}
              title="バックアップから復元"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
