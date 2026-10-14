import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { Plant, ManagementType } from '../types/plant';
import {
  generateNextId,
  saveFormDraft,
  loadFormDraft,
  clearFormDraft,
  getStoredPotSizes,
  saveStoredPotSize,
  getStoredSoilMixes,
  saveStoredSoilMix,
  getStoredLineages,
  saveStoredLineage,
} from '../utils/storage';
import {
  X,
  Layers,
  ShieldAlert,
  Save,
  CheckCircle2,
  RotateCcw,
  Clock,
  Camera,
  Upload,
  Sprout,
  Trees,
  Copy,
} from 'lucide-react';

interface PlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plantData: Omit<Plant, 'createdAt' | 'updatedAt'>) => void;
  editingPlant: Plant | null;
  allPlants: Plant[];
  defaultManagementType?: ManagementType;
  isDuplicate?: boolean;
}

const COMMON_POT_SIZES = [
  'プレステラ90',
  'プレステラ105',
  'プレステラ120',
  '2.5号スリット鉢',
  '3号陶器鉢',
  '3.5号陶器鉢',
  '4号浅鉢',
  '実生連結トレイ 24穴',
  '実生トレイ (腰水用)',
];

const COMMON_SOIL_PRESETS = [
  '赤玉土4 : 鹿沼土3 : 軽石3',
  '軽石5 : 赤玉土3 : 鹿沼土2 (排水重視)',
  '硬質赤玉5 : 日向土3 : ゼオライト2',
  '種まき専用微粒子土 : バーミキュライト',
  '赤玉土微粒8 : 鹿沼土微粒2 (熱湯消毒)',
  '市販 多肉・サボテン専用土',
];

const COMMON_LINEAGE_PRESETS = [
  '台湾株選抜',
  '台湾 Lize Gardner産',
  'マダガスカル現地球・発根済',
  '国内実生選抜株',
  '山城愛仙園',
  'ドイツ Koehres種子',
  '自家採取種子',
  '現地球カキ仔',
];

export const PlantModal: React.FC<PlantModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingPlant,
  allPlants,
  defaultManagementType = 'normal',
  isDuplicate = false,
}) => {
  const [managementType, setManagementType] = useState<ManagementType>(defaultManagementType);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [japaneseName, setJapaneseName] = useState('');
  const [category, setCategory] = useState<Plant['category']>('agave');
  const [lineageOrNursery, setLineageOrNursery] = useState('');
  const [acquisitionDate, setAcquisitionDate] = useState('');
  const [lastWateredDate, setLastWateredDate] = useState('');
  const [lastRepottedDate, setLastRepottedDate] = useState('');
  const [repottingHistory, setRepottingHistory] = useState<string[]>([]);
  const [newRepotDate, setNewRepotDate] = useState('');
  const [soilMix, setSoilMix] = useState('');
  const [potSize, setPotSize] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [notes, setNotes] = useState('');
  // 実生苗専用項目
  const [seedCount, setSeedCount] = useState<string>('');
  const [germinationCount, setGerminationCount] = useState<string>('');
  // 通常株専用項目
  const [pupCount, setPupCount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // 一時保存・下書きステータス
  const [autoSavedAt, setAutoSavedAt] = useState<string | null>(null);
  const [manualSavedNotice, setManualSavedNotice] = useState<string | null>(null);
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const draftKey = editingPlant ? `edit_${editingPlant.id}` : 'new';
  const autoSaveTimerRef = useRef<number | null>(null);
  const manualNoticeTimerRef = useRef<number | null>(null);

  // 鉢・サイズの候補一覧（ユーザー入力履歴 + 登録済み全株データ + デフォルト）
  const availablePotSizes = useMemo(() => {
    const custom = getStoredPotSizes();
    const fromPlants = allPlants
      .map((p) => p.potSize?.trim())
      .filter((s): s is string => !!s);
    const combined = Array.from(new Set([...custom, ...fromPlants, ...COMMON_POT_SIZES]));
    return combined.filter(Boolean);
  }, [allPlants, isOpen]);

  // 用土配合の候補一覧（ユーザー入力履歴 + 登録済み全株データ + デフォルト）
  const availableSoilMixes = useMemo(() => {
    const custom = getStoredSoilMixes();
    const fromPlants = allPlants
      .map((p) => p.soilMix?.trim())
      .filter((s): s is string => !!s);
    const combined = Array.from(new Set([...custom, ...fromPlants, ...COMMON_SOIL_PRESETS]));
    return combined.filter(Boolean);
  }, [allPlants, isOpen]);

  // 血統・ナーセリー名の候補一覧（ユーザー入力履歴 + 登録済み全株データ + デフォルト）
  const availableLineages = useMemo(() => {
    const custom = getStoredLineages();
    const fromPlants = allPlants
      .map((p) => p.lineageOrNursery?.trim())
      .filter((s): s is string => !!s);
    const combined = Array.from(new Set([...custom, ...fromPlants, ...COMMON_LINEAGE_PRESETS]));
    return combined.filter(Boolean);
  }, [allPlants, isOpen]);

  // 初期化 & 下書き復元処理
  useEffect(() => {
    if (!isOpen) {
      setManualSavedNotice(null);
      setAutoSavedAt(null);
      setHasRestoredDraft(false);
      return;
    }

    const existingDraft = loadFormDraft(draftKey);

    if (existingDraft) {
      setManagementType(existingDraft.managementType || defaultManagementType);
      setId(existingDraft.id || '');
      setName(existingDraft.name || '');
      setJapaneseName(existingDraft.japaneseName || '');
      setCategory(existingDraft.category || 'agave');
      setLineageOrNursery(existingDraft.lineageOrNursery || '');
      setAcquisitionDate(existingDraft.acquisitionDate ? existingDraft.acquisitionDate.slice(0, 7) : '');
      setLastWateredDate(existingDraft.lastWateredDate || '');
      setLastRepottedDate(existingDraft.lastRepottedDate ? existingDraft.lastRepottedDate.slice(0, 7) : '');
      setRepottingHistory(
        (existingDraft.repottingHistory || (existingDraft.lastRepottedDate ? [existingDraft.lastRepottedDate] : []))
          .map((d) => d.slice(0, 7))
      );
      setSoilMix(existingDraft.soilMix || '');
      setPotSize(existingDraft.potSize || '');
      setImageUrl(existingDraft.imageUrl || '');
      setNotes(existingDraft.notes || '');
      setSeedCount(existingDraft.seedCount !== undefined ? String(existingDraft.seedCount) : '');
      setGerminationCount(existingDraft.germinationCount !== undefined ? String(existingDraft.germinationCount) : '');
      setPupCount(existingDraft.pupCount !== undefined ? String(existingDraft.pupCount) : '');
      setHasRestoredDraft(true);
      setDraftSavedAt(existingDraft.savedAt);
      setError(null);
    } else if (editingPlant) {
      setManagementType(editingPlant.managementType || 'normal');
      setId(editingPlant.id);
      setName(editingPlant.name);
      setJapaneseName(editingPlant.japaneseName || '');
      setCategory(editingPlant.category || 'agave');
      setLineageOrNursery(editingPlant.lineageOrNursery || '');
      setAcquisitionDate(editingPlant.acquisitionDate ? editingPlant.acquisitionDate.slice(0, 7) : '');
      setLastWateredDate(editingPlant.lastWateredDate || '');
      setLastRepottedDate(editingPlant.lastRepottedDate ? editingPlant.lastRepottedDate.slice(0, 7) : '');
      setRepottingHistory(
        (editingPlant.repottingHistory || (editingPlant.lastRepottedDate ? [editingPlant.lastRepottedDate] : []))
          .map((d) => d.slice(0, 7))
      );
      setSoilMix(editingPlant.soilMix || '');
      setPotSize(editingPlant.potSize || '');
      setImageUrl(editingPlant.imageUrl || '');
      setNotes(editingPlant.notes || '');
      setSeedCount(editingPlant.seedCount !== undefined ? String(editingPlant.seedCount) : '');
      setGerminationCount(editingPlant.germinationCount !== undefined ? String(editingPlant.germinationCount) : '');
      setPupCount(editingPlant.pupCount !== undefined ? String(editingPlant.pupCount) : '');
      setHasRestoredDraft(false);
      setDraftSavedAt(null);
      setAutoSavedAt(null);
      setManualSavedNotice(null);
      setError(null);
    } else {
      const today = new Date().toISOString().split('T')[0];
      const thisMonth = today.slice(0, 7);
      const isSeedlingMode = defaultManagementType === 'seedling';
      const autoId = generateNextId(isSeedlingMode ? 'SDL' : 'AGV', allPlants);
      setManagementType(defaultManagementType);
      setId(autoId);
      setName('');
      setJapaneseName('');
      setCategory(isSeedlingMode ? 'caudex' : 'agave');
      setLineageOrNursery(isSeedlingMode ? 'Koehres種子' : '');
      setAcquisitionDate(thisMonth);
      setLastWateredDate(today);
      setLastRepottedDate(thisMonth);
      setRepottingHistory([thisMonth]);
      setSoilMix(isSeedlingMode ? '種まき専用微粒子土 : バーミキュライト' : '赤玉土4 : 鹿沼土3 : 軽石3');
      setPotSize(isSeedlingMode ? '実生連結トレイ 24穴' : 'プレステラ90');
      setImageUrl('');
      setNotes('');
      setSeedCount('');
      setGerminationCount('');
      setPupCount('');
      setHasRestoredDraft(false);
      setDraftSavedAt(null);
      setAutoSavedAt(null);
      setManualSavedNotice(null);
      setError(null);
    }
  }, [editingPlant, isOpen, allPlants, draftKey, defaultManagementType]);

  // 手動「保存」・下書き保存ハンドラー
  const handleSaveDraft = useCallback(
    (isManual = true) => {
      saveFormDraft(draftKey, {
        id,
        name,
        japaneseName,
        category,
        managementType,
        lineageOrNursery,
        acquisitionDate,
        lastWateredDate,
        lastRepottedDate,
        repottingHistory,
        soilMix,
        potSize,
        imageUrl,
        notes,
        sowingDate: acquisitionDate,
        seedCount: seedCount ? parseInt(seedCount, 10) : undefined,
        germinationCount: germinationCount ? parseInt(germinationCount, 10) : undefined,
        pupCount: pupCount ? parseInt(pupCount, 10) : undefined,
      });

      const now = new Date();
      const timeStr = now.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      if (isManual) {
        if (manualNoticeTimerRef.current) {
          window.clearTimeout(manualNoticeTimerRef.current);
        }
        setManualSavedNotice(`下書きを保存しました (${timeStr})`);
        manualNoticeTimerRef.current = window.setTimeout(() => {
          setManualSavedNotice(null);
        }, 2500);
      } else {
        setAutoSavedAt(timeStr);
      }
    },
    [draftKey, id, name, japaneseName, category, managementType, lineageOrNursery, acquisitionDate, lastWateredDate, lastRepottedDate, repottingHistory, soilMix, potSize, imageUrl, notes, seedCount, germinationCount, pupCount]
  );

  // 植え替え履歴への追加ハンドラー
  const handleAddRepotDate = (dateToAdd: string) => {
    if (!dateToAdd) return;
    const formattedMonth = dateToAdd.slice(0, 7);
    const historySet = new Set(repottingHistory);
    historySet.add(formattedMonth);
    const sorted = Array.from(historySet).sort().reverse();
    setRepottingHistory(sorted);
    // 最新の日付なら最終植え替え日も更新
    if (!lastRepottedDate || formattedMonth >= lastRepottedDate) {
      setLastRepottedDate(formattedMonth);
    }
  };

  // 植え替え履歴からの削除ハンドラー
  const handleRemoveRepotDate = (dateToRemove: string) => {
    const updated = repottingHistory.filter((d) => d !== dateToRemove);
    setRepottingHistory(updated);
    if (lastRepottedDate === dateToRemove) {
      setLastRepottedDate(updated.length > 0 ? updated[0] : '');
    }
  };

  // 自動保存
  useEffect(() => {
    if (!isOpen) return;

    if (autoSaveTimerRef.current) {
      window.clearTimeout(autoSaveTimerRef.current);
    }

    if (name || id || notes || lineageOrNursery) {
      autoSaveTimerRef.current = window.setTimeout(() => {
        handleSaveDraft(false);
      }, 1200);
    }

    return () => {
      if (autoSaveTimerRef.current) {
        window.clearTimeout(autoSaveTimerRef.current);
      }
      if (manualNoticeTimerRef.current) {
        window.clearTimeout(manualNoticeTimerRef.current);
      }
    };
  }, [id, name, japaneseName, category, lineageOrNursery, acquisitionDate, lastWateredDate, soilMix, potSize, imageUrl, notes, isOpen, handleSaveDraft]);

  // 写真ファイル選択ハンドラー (Base64)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルサイズチェック (2MB程度に抑制)
    if (file.size > 2 * 1024 * 1024) {
      alert('画像ファイルサイズは2MB以下を推奨します。');
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImageUrl(result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // 下書き破棄ボタン
  const handleDiscardDraft = () => {
    clearFormDraft(draftKey);
    setHasRestoredDraft(false);
    setDraftSavedAt(null);
    setAutoSavedAt(null);
    if (manualNoticeTimerRef.current) {
      window.clearTimeout(manualNoticeTimerRef.current);
    }
    setManualSavedNotice('下書きを破棄し初期化しました');
    manualNoticeTimerRef.current = window.setTimeout(() => {
      setManualSavedNotice(null);
    }, 2500);

    if (editingPlant) {
      setId(editingPlant.id);
      setName(editingPlant.name);
      setJapaneseName(editingPlant.japaneseName || '');
      setCategory(editingPlant.category || 'agave');
      setLineageOrNursery(editingPlant.lineageOrNursery || '');
      setAcquisitionDate(editingPlant.acquisitionDate ? editingPlant.acquisitionDate.slice(0, 7) : '');
      setLastWateredDate(editingPlant.lastWateredDate || '');
      setLastRepottedDate(editingPlant.lastRepottedDate ? editingPlant.lastRepottedDate.slice(0, 7) : '');
      setRepottingHistory(
        (editingPlant.repottingHistory || (editingPlant.lastRepottedDate ? [editingPlant.lastRepottedDate] : []))
          .map((d) => d.slice(0, 7))
      );
      setSoilMix(editingPlant.soilMix || '');
      setPotSize(editingPlant.potSize || '');
      setImageUrl(editingPlant.imageUrl || '');
      setNotes(editingPlant.notes || '');
    } else {
      const today = new Date().toISOString().split('T')[0];
      const thisMonth = today.slice(0, 7);
      const autoId = generateNextId('AGV', allPlants);
      setId(autoId);
      setName('');
      setJapaneseName('');
      setCategory('agave');
      setLineageOrNursery('');
      setAcquisitionDate(thisMonth);
      setLastWateredDate(today);
      setLastRepottedDate(thisMonth);
      setRepottingHistory([thisMonth]);
      setSoilMix('赤玉土4 : 鹿沼土3 : 軽石3');
      setPotSize('プレステラ90');
      setImageUrl('');
      setNotes('');
    }
    setError(null);
  };

  if (!isOpen) return null;

  const handleAutoId = (prefix: string, cat: Plant['category']) => {
    const next = generateNextId(prefix, allPlants);
    setId(next);
    setCategory(cat);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = id.trim();
    const trimmedName = name.trim();
    const trimmedJapaneseName = japaneseName.trim();

    if (!trimmedId) {
      setError('管理IDを入力してください。');
      return;
    }
    if (!trimmedName && !trimmedJapaneseName) {
      setError('和名・通称または品種名を入力してください。');
      return;
    }

    const isDuplicate = allPlants.some(
      (p) => p.id.toUpperCase() === trimmedId.toUpperCase() && (!editingPlant || editingPlant.id !== p.id)
    );
    if (isDuplicate) {
      setError(`管理ID「${trimmedId}」は既に使用されています。別のIDを指定してください。`);
      return;
    }

    clearFormDraft(draftKey);

    const parsedSeedCount = seedCount ? parseInt(seedCount, 10) : undefined;
    const parsedGerminationCount = germinationCount ? parseInt(germinationCount, 10) : undefined;

    // 植え替え履歴の整理
    const finalRepotHistory = Array.from(
      new Set(
        [
          lastRepottedDate ? lastRepottedDate : null,
          ...repottingHistory,
        ].filter(Boolean) as string[]
      )
    ).sort().reverse();

    // ユーザー独自の鉢・サイズ、用土配合、血統・ナーセリー名を次回候補として記録
    if (potSize.trim()) {
      saveStoredPotSize(potSize.trim());
    }
    if (soilMix.trim()) {
      saveStoredSoilMix(soilMix.trim());
    }
    if (lineageOrNursery.trim()) {
      saveStoredLineage(lineageOrNursery.trim());
    }

    onSave({
      id: trimmedId,
      name: trimmedName || trimmedJapaneseName,
      japaneseName: trimmedJapaneseName,
      category,
      managementType,
      lineageOrNursery: lineageOrNursery.trim(),
      acquisitionDate,
      lastWateredDate,
      lastRepottedDate: lastRepottedDate || undefined,
      repottingHistory: finalRepotHistory,
      soilMix: soilMix.trim(),
      potSize: potSize.trim(),
      imageUrl: imageUrl.trim(),
      notes: notes.trim(),
      sowingDate: acquisitionDate,
      seedCount: !isNaN(Number(parsedSeedCount)) ? parsedSeedCount : undefined,
      germinationCount: !isNaN(Number(parsedGerminationCount)) ? parsedGerminationCount : undefined,
      pupCount: managementType !== 'seedling' && pupCount ? parseInt(pupCount, 10) : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#1d1e22] border border-[#2e3038] rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[96vh]">
        {/* モーダルヘッダー */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-[#2d2e36] bg-[#17181c] flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="p-1.5 sm:p-2 rounded-xl bg-[#2a2b33] text-[#fbbf24] border border-[#373842] flex-shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <h2 className="text-base font-bold text-gray-100">
                  {isDuplicate
                    ? `${editingPlant?.japaneseName || editingPlant?.name} をコピーして新規登録`
                    : editingPlant
                    ? `${editingPlant.japaneseName || editingPlant.name} の編集`
                    : managementType === 'seedling'
                    ? '新しい実生苗（種まき）を登録'
                    : '新しい株を登録'}
                </h2>
                {isDuplicate ? (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/60 font-medium flex items-center gap-1">
                    <Copy className="w-3 h-3" />
                    複製モード
                  </span>
                ) : (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-medium flex items-center gap-1.5 transition-all">
                    <Save className="w-3 h-3 flex-shrink-0" />
                    <span>{autoSavedAt ? `自動保存済 (${autoSavedAt})` : '自動保存ON'}</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">
                {isDuplicate
                  ? `新しい管理ID: ${id} として複製登録します`
                  : editingPlant
                  ? `管理ID: ${editingPlant.id} の情報を更新します`
                  : managementType === 'seedling'
                  ? '播種日や種子元、発芽数を記録して実生育成を管理します'
                  : 'gumi_plants BOTANICAL LOG に新しい株を追加します'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSaveDraft(true)}
              className="px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
              title="現在の入力内容を下書き保存"
            >
              {manualSavedNotice ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>保存完了</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-emerald-400" />
                  <span>下書き保存</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#2c2d36] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 下書き復元バナー */}
        {hasRestoredDraft && (
          <div className="bg-amber-950/60 border-b border-amber-800/60 px-6 py-2.5 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>
                入力途中の下書きを復元しました
                {draftSavedAt && (
                  <span className="text-amber-300/80 ml-1">
                    ({new Date(draftSavedAt).toLocaleTimeString('ja-JP')} 保存)
                  </span>
                )}
              </span>
            </div>
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="flex items-center gap-1 text-amber-300 hover:text-amber-100 hover:underline px-2 py-0.5 rounded cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              下書きを破棄
            </button>
          </div>
        )}

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-300 bg-red-950/60 border border-red-800 rounded-lg">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* 管理区分トグル（通常株 vs 実生苗） */}
          <div className="bg-[#17181c] border border-[#2b2c34] rounded-xl p-2">
            <label className="block text-[11px] font-semibold text-gray-400 mb-1.5 px-1">
              管理区分
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setManagementType('normal');
                  if (!editingPlant && id.startsWith('SDL')) {
                    handleAutoId('AGV', 'agave');
                  }
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                  managementType === 'normal'
                    ? 'bg-[#292b34] text-[#fbbf24] border-[#fbbf24]/50 shadow-md'
                    : 'bg-[#1b1c21] text-gray-400 border-[#282931] hover:text-gray-200 hover:bg-[#22232a]'
                }`}
              >
                <Trees className="w-4 h-4" />
                <span>通常株 (コレクション)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setManagementType('seedling');
                  if (!editingPlant && !id.startsWith('SDL')) {
                    handleAutoId('SDL', category);
                  }
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                  managementType === 'seedling'
                    ? 'bg-[#1a3828] text-[#4ade80] border-[#295b3f] shadow-md'
                    : 'bg-[#1b1c21] text-gray-400 border-[#282931] hover:text-[#4ade80] hover:bg-[#22232a]'
                }`}
              >
                <Sprout className="w-4 h-4 text-[#4ade80]" />
                <span>実生苗 (種まき管理)</span>
              </button>
            </div>
          </div>

          {/* 実生苗専用：播種情報バナー */}
          {managementType === 'seedling' && (
            <div className="bg-[#14231b] border border-[#234c36] rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#4ade80] flex items-center gap-1.5">
                  <Sprout className="w-4 h-4" />
                  実生データ (播種・発芽ステータス)
                </span>
                {seedCount && germinationCount && Number(seedCount) > 0 && (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#1b432e] text-[#4ade80] border border-[#28593d]">
                    発芽率: {Math.round((Number(germinationCount) / Number(seedCount)) * 100)}%
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">
                    播種粒数 (種まき数)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      value={seedCount}
                      onChange={(e) => setSeedCount(e.target.value)}
                      placeholder="例: 20"
                      className="w-full px-3 py-1.5 text-xs bg-[#192c22] border border-[#2b543d] rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#4ade80]"
                    />
                    <span className="text-xs text-gray-400">粒</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">
                    発芽確認数
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      value={germinationCount}
                      onChange={(e) => setGerminationCount(e.target.value)}
                      placeholder="例: 16"
                      className="w-full px-3 py-1.5 text-xs bg-[#192c22] border border-[#2b543d] rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#4ade80]"
                    />
                    <span className="text-xs text-gray-400">株</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 写真アップロード / プレビュー */}
          <div className="bg-[#17181c] border border-[#2b2c34] rounded-xl p-4">
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              植物写真
            </label>
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-lg bg-[#212227] border border-[#33353e] overflow-hidden flex-shrink-0 relative group">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="プレビュー"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                    <Camera className="w-6 h-6 mb-1 text-gray-400" />
                    <span className="text-[10px]">写真なし</span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 text-xs font-medium bg-[#2b2c33] hover:bg-[#34363f] text-gray-200 border border-[#3e404b] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>PC/スマホから写真を選択</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="text-xs text-red-400 hover:text-red-300 underline cursor-pointer"
                    >
                      削除
                    </button>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="または画像URLを直接入力 (https://...)"
                    className="w-full px-3 py-1.5 text-xs bg-[#212226] border border-[#30323a] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 管理ID & 自動採番 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-300">
                管理ID <span className="text-amber-400">*</span>
              </label>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <span className="text-[11px]">自動採番:</span>
                {managementType === 'seedling' && (
                  <button
                    type="button"
                    onClick={() => handleAutoId('SDL', category)}
                    className="px-2 py-0.5 rounded bg-[#1a3828] hover:bg-[#234c36] text-[#4ade80] border border-[#295b3f] text-[11px] font-semibold transition-colors cursor-pointer"
                  >
                    SDL (実生)
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleAutoId('AGV', 'agave')}
                  className="px-2 py-0.5 rounded bg-[#2b2c33] hover:bg-[#353740] hover:text-amber-400 border border-[#3b3d47] text-[11px] transition-colors cursor-pointer"
                >
                  AGV (アガベ)
                </button>
                <button
                  type="button"
                  onClick={() => handleAutoId('CDX', 'caudex')}
                  className="px-2 py-0.5 rounded bg-[#2b2c33] hover:bg-[#353740] hover:text-amber-400 border border-[#3b3d47] text-[11px] transition-colors cursor-pointer"
                >
                  CDX (塊根)
                </button>
                <button
                  type="button"
                  onClick={() => handleAutoId('COP', 'cactus')}
                  className="px-2 py-0.5 rounded bg-[#2b2c33] hover:bg-[#353740] hover:text-amber-400 border border-[#3b3d47] text-[11px] transition-colors cursor-pointer"
                >
                  COP (サボテン)
                </button>
                <button
                  type="button"
                  onClick={() => handleAutoId('EUP', 'euphorbia')}
                  className="px-2 py-0.5 rounded bg-[#2b2c33] hover:bg-[#353740] hover:text-amber-400 border border-[#3b3d47] text-[11px] transition-colors cursor-pointer"
                >
                  EUP (ユーフォ)
                </button>
              </div>
            </div>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={managementType === 'seedling' ? '例: SDL-001, CDX-SD-001, EUP-SD-001' : '例: AGV-001, CDX-002, EUP-001'}
              className="w-full px-3.5 py-2 text-sm bg-[#17181c] border border-[#30323a] rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-400 font-mono"
              required
            />
          </div>

          {/* カテゴリ選択 */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              カテゴリ
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'agave', label: 'アガベ' },
                { id: 'caudex', label: '塊根植物' },
                { id: 'shrub', label: '灌木植物' },
                { id: 'cactus', label: 'サボテン' },
                { id: 'euphorbia', label: 'ユーフォルビア' },
                { id: 'other', label: 'その他' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                    category === c.id
                      ? 'bg-[#2b2c34] text-[#fbbf24] border-[#fbbf24]/60'
                      : 'bg-[#17181c] text-gray-400 border-[#2f3038] hover:text-gray-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* 和名・通称 ＆ 品種名 (学名/英名) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                和名・通称 <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={japaneseName}
                onChange={(e) => setJapaneseName(e.target.value)}
                placeholder="例: チタノタ シーザー、グラキリス実生"
                className="w-full px-3.5 py-2 text-sm bg-[#17181c] border border-[#30323a] rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                {managementType === 'seedling' ? '実生品種名 (学名/英名)' : '品種名 (学名/英名)'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={managementType === 'seedling' ? "例: Pachypodium gracilius (実生)" : "例: Agave titanota 'Caesar'"}
                className="w-full px-3.5 py-2 text-sm bg-[#17181c] border border-[#30323a] rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* 入手日/播種日 ＆ 最終水やり日 ＆ 最終植え替え日 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-300">
                  {managementType === 'seedling' ? '播種年月 (種まき)' : '入手年月'}
                </label>
                <button
                  type="button"
                  onClick={() => setAcquisitionDate(new Date().toISOString().slice(0, 7))}
                  className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                >
                  今月にする
                </button>
              </div>
              <input
                type="month"
                value={acquisitionDate ? acquisitionDate.slice(0, 7) : ''}
                onChange={(e) => setAcquisitionDate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#17181c] border border-[#30323a] rounded-xl text-gray-100 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-300">
                  最終水やり / 霧吹き日
                </label>
                <button
                  type="button"
                  onClick={() => setLastWateredDate(new Date().toISOString().split('T')[0])}
                  className="text-[10px] text-emerald-400 hover:underline cursor-pointer"
                >
                  今日にする
                </button>
              </div>
              <input
                type="date"
                value={lastWateredDate}
                onChange={(e) => setLastWateredDate(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#17181c] border border-[#30323a] rounded-xl text-gray-100 focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-gray-300">
                  最終植え替え日
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const thisMonth = new Date().toISOString().slice(0, 7);
                    setLastRepottedDate(thisMonth);
                    handleAddRepotDate(thisMonth);
                  }}
                  className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                >
                  今月にする
                </button>
              </div>
              <input
                type="month"
                value={lastRepottedDate ? lastRepottedDate.slice(0, 7) : ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setLastRepottedDate(val);
                  if (val) handleAddRepotDate(val);
                }}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#17181c] border border-[#30323a] rounded-xl text-gray-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* 植え替え履歴管理セクション */}
          <div className="bg-[#17181c] border border-[#2d2e36] rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <span>🌱 植え替え履歴</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                  {repottingHistory.length} 件
                </span>
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="month"
                  value={newRepotDate}
                  onChange={(e) => setNewRepotDate(e.target.value)}
                  className="px-2 py-1 text-xs bg-[#202126] border border-[#353640] rounded-lg text-gray-200 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleAddRepotDate(newRepotDate);
                    setNewRepotDate('');
                  }}
                  disabled={!newRepotDate}
                  className="px-2.5 py-1 text-xs font-medium bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
                >
                  ＋ 履歴に追加
                </button>
              </div>
            </div>

            {repottingHistory.length > 0 ? (
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {repottingHistory.map((dateStr) => {
                  const ym = dateStr.slice(0, 7);
                  return (
                    <span
                      key={dateStr}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-[#212228] text-gray-200 border border-[#32343e]"
                    >
                      <span>{ym.replace(/-/g, '/')}</span>
                      {ym === (lastRepottedDate ? lastRepottedDate.slice(0, 7) : '') && (
                        <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-sans font-bold">
                          最新
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveRepotDate(dateStr)}
                        className="text-gray-400 hover:text-red-400 ml-0.5 cursor-pointer leading-none text-sm"
                        title="この履歴を削除"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-[11px] text-gray-500 italic">植え替え履歴はまだ記録されていません</p>
            )}
          </div>

          {/* 血統/種子元 ＆ 鉢/トレイサイズ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                {managementType === 'seedling' ? '種子元・採取先 / ナーセリー' : '血統・ナーセリー名'}
              </label>
              <input
                type="text"
                list="lineage-suggestions"
                value={lineageOrNursery}
                onChange={(e) => setLineageOrNursery(e.target.value)}
                placeholder={managementType === 'seedling' ? '例: ドイツ Koehres種子、自家採取' : '例: 台湾株、現地球発根済、山城愛仙園'}
                className="w-full px-3.5 py-2 text-sm bg-[#17181c] border border-[#30323a] rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
              <datalist id="lineage-suggestions">
                {availableLineages.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
              {availableLineages.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5 max-h-20 overflow-y-auto">
                  {availableLineages.slice(0, 8).map((item) => {
                    const isSelected = lineageOrNursery === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setLineageOrNursery(item)}
                        className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-950/70 text-amber-300 border-amber-600/80 font-medium'
                            : 'bg-[#27282f] hover:bg-[#32343d] text-gray-300 border-[#373944]'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                {managementType === 'seedling' ? '現在の鉢・サイズ (トレイ)' : '現在の鉢・サイズ'}
              </label>
              <input
                type="text"
                list="pot-size-suggestions"
                value={potSize}
                onChange={(e) => setPotSize(e.target.value)}
                placeholder={managementType === 'seedling' ? '例: 実生連結トレイ 24穴、プレステラ90' : '例: プレステラ90、3号陶器鉢'}
                className="w-full px-3.5 py-2 text-sm bg-[#17181c] border border-[#30323a] rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
              <datalist id="pot-size-suggestions">
                {availablePotSizes.map((size) => (
                  <option key={size} value={size} />
                ))}
              </datalist>
              {availablePotSizes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5 max-h-20 overflow-y-auto">
                  {availablePotSizes.slice(0, 8).map((size) => {
                    const isSelected = potSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setPotSize(size)}
                        className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-950/70 text-amber-300 border-amber-600/80 font-medium'
                            : 'bg-[#27282f] hover:bg-[#32343d] text-gray-300 border-[#373944]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* 用土配合 */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              用土配合
            </label>
            <input
              type="text"
              list="soil-mix-suggestions"
              value={soilMix}
              onChange={(e) => setSoilMix(e.target.value)}
              placeholder="例: 赤玉土4 : 鹿沼土3 : 軽石3"
              className="w-full px-3.5 py-2 text-sm bg-[#17181c] border border-[#30323a] rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-400"
            />
            <datalist id="soil-mix-suggestions">
              {availableSoilMixes.map((preset) => (
                <option key={preset} value={preset} />
              ))}
            </datalist>
            {availableSoilMixes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5 max-h-24 overflow-y-auto">
                {availableSoilMixes.slice(0, 8).map((preset) => {
                  const isSelected = soilMix === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSoilMix(preset)}
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-amber-950/70 text-amber-300 border-amber-600/80 font-medium'
                          : 'bg-[#27282f] hover:bg-[#32343d] text-gray-300 border-[#373944]'
                      }`}
                    >
                      {preset}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 子株数（通常株のみ） */}
          {managementType !== 'seedling' && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                子株の数
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0"
                  value={pupCount}
                  onChange={(e) => setPupCount(e.target.value)}
                  placeholder="例: 3"
                  className="w-32 px-3.5 py-2 text-sm bg-[#17181c] border border-[#30323a] rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
                <span className="text-xs text-gray-400">株</span>
              </div>
            </div>
          )}

          {/* メモ */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              {managementType === 'seedling' ? '実生メモ・管理ログ' : '育成メモ・管理履歴'}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                managementType === 'seedling'
                  ? '腰水管理、パネルヒーター温度、ラップ密閉、ベンレート殺菌、LED照射など自由に記録'
                  : 'LED照射時間、サーキュレーター風量、肥料、特徴など自由に記録'
              }
              className="w-full px-3.5 py-2 text-sm bg-[#17181c] border border-[#30323a] rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:border-amber-400 resize-y"
            />
          </div>

          {/* フッターアクションエリア */}
          <div className="flex items-center justify-between pt-4 border-t border-[#2e3038] flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleSaveDraft(true)}
              className="px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/60 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              <span>入力内容を一時保存する</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-gray-300 bg-[#282930] hover:bg-[#32333c] rounded-full transition-colors cursor-pointer"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className={`px-5 py-2 text-xs font-bold rounded-full shadow-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                  managementType === 'seedling'
                    ? 'text-black bg-[#4ade80] hover:bg-[#22c55e] active:bg-[#16a34a] shadow-emerald-950'
                    : 'text-black bg-[#fbbf24] hover:bg-[#f59e0b] active:bg-[#d97706] shadow-amber-950'
                }`}
              >
                {isDuplicate
                  ? '複製して新規登録する'
                  : editingPlant
                  ? '変更を確定・保存する'
                  : managementType === 'seedling'
                  ? 'この実生苗を登録する'
                  : 'この株を登録する'}
              </button>
            </div>
          </div>
        </form>

        {/* 手動下書き保存トースト（レイアウト・画面高さを1ピクセルも動かさないフローティング表示） */}
        {manualSavedNotice && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-emerald-900/95 text-emerald-100 border border-emerald-500/50 shadow-2xl px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>{manualSavedNotice}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
