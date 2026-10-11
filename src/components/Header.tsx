import React, { useRef, useState } from 'react';
import type { Plant } from '../types/plant';
import { Sprout, Plus, Download, Upload, RotateCcw, Save, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  plants: Plant[];
  onOpenCreateModal: () => void;
  onResetSamples: () => void;
  onImportPlants: (imported: Plant[]) => void;
  onManualSave: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  plants,
  onOpenCreateModal,
  onResetSamples,
  onImportPlants,
  onManualSave,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saveToast, setSaveToast] = useState(false);

  // 手動保存トリガー
  const handleSaveClick = () => {
    onManualSave();
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
    }, 2500);
  };

  // JSONエクスポート（バックアップ）
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(plants, null, 2));
    const downloadAnchor = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `plant-data-backup-${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // JSONインポート
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

  return (
    <header className="border-b border-gray-800 bg-gray-900/95 sticky top-0 z-30 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* タイトル & ロゴ */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-md shadow-emerald-950/30">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-gray-100 m-0">
                  株ID管理システム
                </h1>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  自動保存ON
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                アガベ・パキポディウム・塊根・サボテンの個別株ID記録・用土・鉢サイズ管理
              </p>
            </div>
          </div>

          {/* 右側アクションエリア */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* 全体保存ボタン */}
            <button
              onClick={handleSaveClick}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                saveToast
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
                  : 'bg-gray-800 text-emerald-400 border-emerald-700/60 hover:bg-emerald-950/40 hover:text-emerald-300'
              }`}
              title="ブラウザのLocalStorageに現在の全データを確実に手動保存します"
            >
              {saveToast ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>保存完了!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-emerald-400" />
                  <span>全データを保存</span>
                </>
              )}
            </button>

            {/* データ管理ツール */}
            <div className="flex items-center gap-1.5 bg-gray-800/80 border border-gray-700/70 rounded-lg p-1 text-xs">
              <button
                onClick={handleExportJson}
                className="px-2.5 py-1.5 rounded text-gray-300 hover:text-emerald-300 hover:bg-gray-700 flex items-center gap-1 transition-colors cursor-pointer"
                title="登録データをJSONファイルで保存"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">バックアップ</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 rounded text-gray-300 hover:text-emerald-300 hover:bg-gray-700 flex items-center gap-1 transition-colors cursor-pointer"
                title="バックアップJSONを読み込み"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">復元</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => {
                  if (confirm('初期サンプルデータ（3件）を復元しますか？現在の登録内容はリセットされます。')) {
                    onResetSamples();
                  }
                }}
                className="px-2.5 py-1.5 rounded text-gray-400 hover:text-amber-300 hover:bg-gray-700 flex items-center gap-1 transition-colors cursor-pointer"
                title="初期サンプルデータにリセット"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">サンプル初期化</span>
              </button>
            </div>

            {/* 新規登録ボタン */}
            <button
              onClick={onOpenCreateModal}
              className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg shadow-lg shadow-emerald-950/60 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>新しい株を登録</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
