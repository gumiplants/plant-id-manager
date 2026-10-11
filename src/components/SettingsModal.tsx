import React, { useState, useEffect, useRef } from 'react';
import type { Theme, Plant } from '../types/plant';
import {
  DEFAULT_BRAND_NAME,
  DEFAULT_BRAND_ICON,
  DEFAULT_FOOTER_TEXT,
  PRESET_ICONS,
  processIconImage,
} from '../utils/storage';
import {
  X,
  Settings,
  Sun,
  Moon,
  RotateCcw,
  Check,
  Sparkles,
  FileText,
  Smile,
  Camera,
  Trash2,
  FileSpreadsheet,
  Download,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plants: Plant[];
  brandName: string;
  onUpdateBrandName: (name: string) => void;
  brandIcon: string;
  onUpdateBrandIcon: (icon: string) => void;
  footerText: string;
  onUpdateFooterText: (text: string) => void;
  theme: Theme;
  onSetTheme: (theme: Theme) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  plants,
  brandName,
  onUpdateBrandName,
  brandIcon,
  onUpdateBrandIcon,
  footerText,
  onUpdateFooterText,
  theme,
  onSetTheme,
}) => {
  const [nameInput, setNameInput] = useState(brandName);
  const [iconInput, setIconInput] = useState(brandIcon);
  const [footerInput, setFooterInput] = useState(footerText);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setNameInput(brandName);
      setIconInput(brandIcon);
      setFooterInput(footerText);
      setSaveNotice(null);
    }
  }, [isOpen, brandName, brandIcon, footerText]);

  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const isCustomImage =
    iconInput.startsWith('data:image') ||
    iconInput.startsWith('http') ||
    iconInput.startsWith('blob:');

  const showSaveSuccess = (message: string) => {
    setSaveNotice(message);
    setTimeout(() => setSaveNotice(null), 2500);
  };

  // 写真アップロード処理（自動正方形トリミング＆リサイズ）
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingImage(true);
      const dataUrl = await processIconImage(file);
      setIconInput(dataUrl);
      showSaveSuccess('写真を正方形アイコンに最適化しました');
    } catch (err) {
      console.error(err);
      alert('写真の処理に失敗しました。別の画像をお試しください。');
    } finally {
      setIsProcessingImage(false);
      e.target.value = '';
    }
  };

  // ブランド（アイコン・名称）保存
  const handleSaveBrand = () => {
    const cleanName = nameInput.trim() || DEFAULT_BRAND_NAME;
    const cleanIcon = iconInput.trim() || DEFAULT_BRAND_ICON;
    onUpdateBrandName(cleanName);
    onUpdateBrandIcon(cleanIcon);
    setNameInput(cleanName);
    setIconInput(cleanIcon);
    showSaveSuccess('ロゴ・名称を保存しました');
  };

  // フッター文言保存
  const handleSaveFooter = () => {
    const cleanFooter = footerInput.trim() || DEFAULT_FOOTER_TEXT;
    onUpdateFooterText(cleanFooter);
    setFooterInput(cleanFooter);
    showSaveSuccess('フッター文言を保存しました');
  };

  // 全て一括保存
  const handleSaveAll = () => {
    handleSaveBrand();
    handleSaveFooter();
    onClose();
  };

  // 初期値にリセット
  const handleResetBrand = () => {
    setIconInput(DEFAULT_BRAND_ICON);
    setNameInput(DEFAULT_BRAND_NAME);
    onUpdateBrandIcon(DEFAULT_BRAND_ICON);
    onUpdateBrandName(DEFAULT_BRAND_NAME);
    showSaveSuccess('初期の名称とアイコンに戻しました');
  };

  // CSVファイル出力処理（日本語Excel対応 UTF-8 BOM付き）
  const handleExportCsv = () => {
    if (!plants || plants.length === 0) {
      alert('エクスポート対象の植物データが登録されていません。');
      return;
    }

    const headers = [
      '管理ID',
      '管理区分',
      '品種名・学名',
      '日本語名・別名',
      'カテゴリ',
      '出自・種子元',
      '入手日/播種日',
      '最終水やり日',
      '播種数(粒)',
      '発芽数(株)',
      '発芽率(%)',
      '鉢サイズ',
      '用土配合',
      '育成メモ・管理履歴',
      '写真URL',
      '登録日時',
      '最終更新日時',
    ];

    const categoryLabels: Record<string, string> = {
      agave: 'アガベ',
      caudex: '塊根植物',
      shrub: '灌木植物',
      cactus: 'サボテン',
      other: 'その他',
    };

    const rows = plants.map((plant) => {
      const typeLabel = plant.managementType === 'seedling' ? '実生苗' : '通常株';
      const catLabel = categoryLabels[plant.category] || plant.category || '';
      const germRate =
        plant.seedCount && plant.germinationCount !== undefined && plant.seedCount > 0
          ? `${Math.round((plant.germinationCount / plant.seedCount) * 100)}%`
          : '';

      const escape = (val: any) => {
        if (val === undefined || val === null) return '""';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      };

      return [
        escape(plant.id),
        escape(typeLabel),
        escape(plant.name),
        escape(plant.japaneseName || ''),
        escape(catLabel),
        escape(plant.lineageOrNursery || ''),
        escape(plant.acquisitionDate || ''),
        escape(plant.lastWateredDate || ''),
        escape(plant.seedCount !== undefined ? plant.seedCount : ''),
        escape(plant.germinationCount !== undefined ? plant.germinationCount : ''),
        escape(germRate),
        escape(plant.potSize || ''),
        escape(plant.soilMix || ''),
        escape(plant.notes || ''),
        escape(plant.imageUrl || ''),
        escape(plant.createdAt || ''),
        escape(plant.updatedAt || ''),
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    const safeBrand = (brandName || 'plants').replace(/[^a-zA-Z0-9_\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF-]/g, '_');
    downloadAnchor.setAttribute('href', url);
    downloadAnchor.setAttribute('download', `${safeBrand}_plants_${dateStr}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
    showSaveSuccess('CSVファイルを出力しました');
  };

  const handleResetFooter = () => {
    setFooterInput(DEFAULT_FOOTER_TEXT);
    onUpdateFooterText(DEFAULT_FOOTER_TEXT);
    showSaveSuccess('初期のフッター文言に戻しました');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div
        className={`relative w-full max-w-xl my-6 rounded-2xl shadow-2xl border overflow-hidden transition-all duration-200 flex flex-col max-h-[90vh] ${
          isDark
            ? 'bg-[#1b1c20] border-[#2c2d36] text-gray-100'
            : 'bg-white border-stone-200 text-stone-900 shadow-[0_16px_40px_rgba(0,0,0,0.12)]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between flex-shrink-0 ${
            isDark ? 'border-[#282933] bg-[#16171b]' : 'border-stone-200 bg-[#f7faf7]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-xl border ${
                isDark
                  ? 'bg-[#25262e] border-[#343642] text-[#fbbf24]'
                  : 'bg-emerald-100 border-emerald-300 text-emerald-800'
              }`}
            >
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">アプリ設定</h2>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-stone-500'}`}>
                テーマ、ヘッダーアイコン（写真・絵文字）、名称、フッター文言のカスタマイズ
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark
                ? 'hover:bg-[#282933] text-gray-400 hover:text-white'
                : 'hover:bg-stone-100 text-stone-500 hover:text-stone-900'
            }`}
            title="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* トースト通知 */}
        {saveNotice && (
          <div className="bg-emerald-600 text-white text-xs py-2 px-4 flex items-center justify-center gap-1.5 font-medium animate-in slide-in-from-top-2">
            <Check className="w-4 h-4" />
            <span>{saveNotice}</span>
          </div>
        )}

        {/* 設定ボディ（スクロール可能） */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* 設定項目1：テーマ切り替え */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>テーマ・カラー設定</span>
              <span className={`text-[10px] font-normal ${isDark ? 'text-gray-400' : 'text-stone-500'}`}>
                (ライト / ダーク)
              </span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* ダークモード選択ボタン */}
              <button
                type="button"
                onClick={() => onSetTheme('dark')}
                className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  isDark
                    ? 'bg-[#252731] border-[#fbbf24] ring-2 ring-[#fbbf24]/30 shadow-lg text-white font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-[#fbbf24] text-black shadow-md' : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <span className="text-sm block">ダーク</span>
                  <span className="text-[10px] opacity-75">シックな黒基調</span>
                </div>
              </button>

              {/* ライトモード選択ボタン */}
              <button
                type="button"
                onClick={() => onSetTheme('light')}
                className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  !isDark
                    ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-lg text-emerald-950 font-bold'
                    : 'bg-[#1f2026] border-[#2f313c] text-gray-400 hover:bg-[#252730]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !isDark ? 'bg-emerald-600 text-white shadow-md' : 'bg-[#292a34] text-gray-300'
                  }`}
                >
                  <Sun className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <span className="text-sm block">ライト</span>
                  <span className="text-[10px] opacity-75">優しい白・セージ調</span>
                </div>
              </button>
            </div>
          </div>

          {/* 設定項目2：ロゴアイコン（写真アップロード & 絵文字） & コレクション名 */}
          <div className={`pt-5 border-t ${isDark ? 'border-[#262832]' : 'border-stone-200'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-emerald-500" />
                <span>ヘッダーアイコン & コレクション名</span>
              </label>
              {(brandName !== DEFAULT_BRAND_NAME || brandIcon !== DEFAULT_BRAND_ICON) && (
                <button
                  type="button"
                  onClick={handleResetBrand}
                  className={`flex items-center gap-1 text-[11px] underline hover:no-underline transition-colors cursor-pointer ${
                    isDark ? 'text-gray-400 hover:text-amber-300' : 'text-stone-500 hover:text-emerald-700'
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  初期（🌿 gumi_plants）に戻す
                </button>
              )}
            </div>

            <p className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-stone-500'}`}>
              ヘッダー左上のアイコンはお好きな<strong>写真のアップロード</strong>または<strong>絵文字</strong>から自由に設定できます。
            </p>

            {/* アイコン選択・写真アップロードエリア */}
            <div className={`p-4 rounded-xl border mb-3 space-y-3.5 ${isDark ? 'bg-[#151619] border-[#282a34]' : 'bg-[#f7faf7] border-stone-200'}`}>
              {/* 写真アップロードブロック */}
              <div>
                <span className={`text-[11px] font-semibold block mb-2 ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
                  📷 自分で撮った写真を設定（自動正方形トリミング）:
                </span>
                
                <div className="flex items-center gap-3">
                  {/* 現在のアイコンプレビュー */}
                  <div
                    className={`w-14 h-14 rounded-xl overflow-hidden border flex items-center justify-center flex-shrink-0 shadow-inner ${
                      isDark
                        ? 'bg-[#202127] border-[#363844]'
                        : 'bg-white border-stone-300'
                    }`}
                  >
                    {isCustomImage ? (
                      <img
                        src={iconInput}
                        alt="Custom Icon"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl select-none leading-none">{iconInput || DEFAULT_BRAND_ICON}</span>
                    )}
                  </div>

                  {/* アップロードボタン群 */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isProcessingImage}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                          isDark
                            ? 'bg-[#292b34] hover:bg-[#343742] text-white border-[#3d404e]'
                            : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
                        }`}
                      >
                        <Camera className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{isProcessingImage ? '処理中...' : '写真をアップロード'}</span>
                      </button>

                      {isCustomImage && (
                        <button
                          type="button"
                          onClick={() => setIconInput(DEFAULT_BRAND_ICON)}
                          className="px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors flex items-center gap-1 cursor-pointer"
                          title="写真を解除して絵文字に戻す"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>解除</span>
                        </button>
                      )}
                    </div>

                    <span className={`text-[10px] leading-tight ${isDark ? 'text-gray-400' : 'text-stone-500'}`}>
                      ※ どんな大きさ・縦横比の写真でも中央で自動的に綺麗な正方形にリサイズ調整されます。
                    </span>
                  </div>
                </div>
              </div>

              {/* 絵文字プリセットリスト */}
              <div className={`pt-3 border-t ${isDark ? 'border-[#23242c]' : 'border-stone-200'}`}>
                <span className={`text-[11px] font-semibold block mb-2 ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
                  🌿 ワンタップで選べる絵文字プリセット:
                </span>

                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {PRESET_ICONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setIconInput(emoji)}
                      className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all cursor-pointer ${
                        iconInput === emoji && !isCustomImage
                          ? isDark
                            ? 'bg-[#fbbf24] text-black ring-2 ring-[#fbbf24]/50 scale-110 shadow-sm'
                            : 'bg-emerald-600 text-white ring-2 ring-emerald-500/50 scale-110 shadow-sm'
                          : isDark
                          ? 'bg-[#21232b] hover:bg-[#2b2d37] text-gray-200'
                          : 'bg-white hover:bg-stone-100 text-stone-800 border border-stone-200'
                      }`}
                      title={emoji}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {/* 絵文字手動入力欄 */}
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-stone-500'}`}>
                    絵文字・文字を直接入力:
                  </span>
                  <input
                    type="text"
                    value={isCustomImage ? '' : iconInput}
                    onChange={(e) => setIconInput(e.target.value)}
                    maxLength={4}
                    className={`w-16 text-center text-lg py-1 px-2 rounded-lg border outline-none font-bold ${
                      isDark
                        ? 'bg-[#1e1f26] border-[#363846] text-white focus:border-[#fbbf24]'
                        : 'bg-white border-stone-300 text-stone-900 focus:border-emerald-600'
                    }`}
                    placeholder="🌿"
                  />
                </div>
              </div>
            </div>

            {/* 名称入力エリア */}
            <div className="space-y-3">
              <div>
                <span className={`text-[11px] font-semibold block mb-1.5 ${isDark ? 'text-gray-300' : 'text-stone-700'}`}>
                  コレクション名・屋号:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveBrand();
                    }}
                    maxLength={30}
                    placeholder="例: gumi_plants, botanical_room"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-sm font-mono tracking-wide transition-all outline-none ${
                      isDark
                        ? 'bg-[#151619] border-[#2f313d] text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]'
                        : 'bg-[#f7faf7] border-stone-300 text-stone-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleSaveBrand}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" />
                    保存
                  </button>
                </div>
              </div>

              {/* プレビュー表示 */}
              <div
                className={`p-3 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-[#121316] border-[#262732]' : 'bg-[#edf3ed] border-[#cfe0cf]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl overflow-hidden border flex items-center justify-center flex-shrink-0 ${
                      isDark
                        ? 'bg-gradient-to-br from-[#23242a] to-[#1c1d22] border-[#2d2e35]'
                        : 'bg-white border-emerald-300 shadow-sm'
                    }`}
                  >
                    {isCustomImage ? (
                      <img
                        src={iconInput}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl">{iconInput || DEFAULT_BRAND_ICON}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-lg font-black tracking-wide leading-tight ${
                        isDark ? 'text-[#fbbf24]' : 'text-emerald-800'
                      }`}
                    >
                      {nameInput || DEFAULT_BRAND_NAME}
                    </span>
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase ${
                        isDark ? 'text-[#8e909a]' : 'text-stone-500'
                      }`}
                    >
                      collection
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${isDark ? 'bg-[#21232b] text-gray-400' : 'bg-white text-stone-500'}`}>
                  ヘッダー表示プレビュー
                </span>
              </div>
            </div>
          </div>

          {/* 設定項目3：右下フッター文言の変更 */}
          <div className={`pt-5 border-t ${isDark ? 'border-[#262832]' : 'border-stone-200'}`}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-500" />
                <span>フッター説明文の変更</span>
              </label>
              {footerText !== DEFAULT_FOOTER_TEXT && (
                <button
                  type="button"
                  onClick={handleResetFooter}
                  className={`flex items-center gap-1 text-[11px] underline hover:no-underline transition-colors cursor-pointer ${
                    isDark ? 'text-gray-400 hover:text-amber-300' : 'text-stone-500 hover:text-emerald-700'
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  初期文言に戻す
                </button>
              )}
            </div>

            <p className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-stone-500'}`}>
              画面最下部（フッター）の右側に表示される文言（キャッチフレーズ・管理説明など）を自由に変更できます。
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={footerInput}
                  onChange={(e) => setFooterInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveFooter();
                  }}
                  maxLength={60}
                  placeholder="例: アガベ / 塊根植物 / サボテン 個別写真・水やり履歴管理"
                  className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs tracking-wide transition-all outline-none ${
                    isDark
                      ? 'bg-[#151619] border-[#2f313d] text-white focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24]'
                      : 'bg-[#f7faf7] border-stone-300 text-stone-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={handleSaveFooter}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                >
                  <Check className="w-3.5 h-3.5" />
                  保存
                </button>
              </div>

              {/* フッタープレビュー */}
              <div
                className={`p-2.5 rounded-xl border text-[11px] flex items-center justify-between ${
                  isDark ? 'bg-[#121316] border-[#262732] text-gray-400' : 'bg-[#edf3ed] border-[#cfe0cf] text-stone-600'
                }`}
              >
                <span className="truncate pr-2">
                  プレビュー: <strong>{footerInput || DEFAULT_FOOTER_TEXT}</strong>
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded flex-shrink-0 ${isDark ? 'bg-[#21232b]' : 'bg-white'}`}>
                  右下フッター表示
                </span>
              </div>
            </div>
          </div>

          {/* 設定項目4：植物データのCSV出力（Excel対応） */}
          <div className={`pt-5 border-t ${isDark ? 'border-[#262832]' : 'border-stone-200'}`}>
            <label className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
              <span>植物データのCSV出力</span>
            </label>

            <p className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-stone-500'}`}>
              登録済みのすべての植物（通常株・実生苗・水やり履歴・メモなど）をCSV形式でダウンロードできます。Excelやスプレッドシートで直接開いて管理・集計・印刷する際に便利です。
            </p>

            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isDark ? 'bg-[#151619] border-[#282a34]' : 'bg-[#f7faf7] border-stone-200'
              }`}
            >
              <div className="space-y-0.5">
                <span className={`text-xs font-bold block ${isDark ? 'text-gray-200' : 'text-stone-800'}`}>
                  全データ一括エクスポート ({plants.length} 株登録済み)
                </span>
                <span className={`text-[10px] block ${isDark ? 'text-gray-400' : 'text-stone-500'}`}>
                  ※ 日本語Excelでも文字化けしないBOM付きUTF-8形式で出力されます。
                </span>
              </div>

              <button
                type="button"
                onClick={handleExportCsv}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>CSVを出力する</span>
              </button>
            </div>
          </div>
        </div>

        {/* モーダルフッター */}
        <div
          className={`px-6 py-3.5 border-t flex items-center justify-between flex-shrink-0 ${
            isDark ? 'border-[#282933] bg-[#16171b]' : 'border-stone-200 bg-[#f7faf7]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs opacity-75">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className={isDark ? 'text-gray-400' : 'text-stone-500'}>設定内容は端末に自動保存されます</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveAll}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm cursor-pointer"
            >
              完了して閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
