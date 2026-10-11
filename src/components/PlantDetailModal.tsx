import React from 'react';
import type { Plant } from '../types/plant';
import { getDaysSince } from '../utils/storage';
import { X, Calendar, Edit3, Trash2, Sprout, Clock, Droplet, Box } from 'lucide-react';

interface PlantDetailModalProps {
  plant: Plant | null;
  onClose: () => void;
  onEdit: (plant: Plant) => void;
  onDelete: (plant: Plant) => void;
  onWaterPlant: (plant: Plant) => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  onClose,
  onEdit,
  onDelete,
  onWaterPlant,
}) => {
  if (!plant) return null;

  const getDaysElapsed = (dateStr: string) => {
    if (!dateStr) return null;
    const diffTime = Math.abs(new Date().getTime() - new Date(dateStr).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysElapsed = getDaysElapsed(plant.acquisitionDate);
  const daysSinceWatered = getDaysSince(plant.lastWateredDate);
  const hasWateredToday = daysSinceWatered === 0 && !!plant.lastWateredDate;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#1d1e22] border border-[#2e3038] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* ヘッダー写真エリア */}
        <div className="relative w-full h-64 bg-[#141518] overflow-hidden">
          {plant.imageUrl ? (
            <img
              src={plant.imageUrl}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
              <Sprout className="w-16 h-16 mb-2" />
              <span className="text-xs">写真なし</span>
            </div>
          )}

          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1e22] via-transparent to-black/40" />

          {/* 右上の閉じるボタン */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-gray-300 hover:text-white backdrop-blur transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 左上の管理ID & 管理区分 */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/70 text-[#fbbf24] text-xs font-mono font-bold tracking-wider border border-[#fbbf24]/30 backdrop-blur">
              管理ID {plant.id}
            </span>
            {plant.managementType === 'seedling' && (
              <span className="px-2.5 py-1 rounded-full bg-[#153423]/90 text-[#4ade80] text-xs font-bold border border-[#205137] backdrop-blur flex items-center gap-1">
                <Sprout className="w-3.5 h-3.5" />
                実生苗
              </span>
            )}
          </div>

          {/* 写真下部の植物名 */}
          <div className="absolute bottom-3 left-6 right-6 z-20">
            <h2 className="text-xl font-black text-white leading-tight drop-shadow-md">
              {plant.name}
            </h2>
            {plant.japaneseName && (
              <p className="text-xs text-gray-300 drop-shadow mt-0.5">
                {plant.japaneseName}
              </p>
            )}
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-6 space-y-4">
          {/* 実生苗の場合：播種・発芽ステータスバナー */}
          {plant.managementType === 'seedling' && (plant.seedCount !== undefined || plant.germinationCount !== undefined) && (
            <div className="p-3 bg-[#14231b] border border-[#234c36] rounded-xl text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-[#4ade80]" />
                <span className="text-gray-200">
                  播種: <strong className="font-mono text-white">{plant.seedCount ?? '-'}</strong> 粒 / 
                  発芽: <strong className="font-mono text-[#4ade80]">{plant.germinationCount ?? '-'}</strong> 株
                </span>
              </div>
              {plant.seedCount && plant.germinationCount && plant.seedCount > 0 && (
                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-[#1b432e] text-[#4ade80] border border-[#28593d]">
                  発芽率 {Math.round((plant.germinationCount / plant.seedCount) * 100)}%
                </span>
              )}
            </div>
          )}

          {/* 血統 & 水やりアクション */}
          <div className="flex items-center justify-between p-3.5 bg-[#17181c] border border-[#2c2d36] rounded-xl text-xs">
            <div>
              <span className="text-[#787a87] block mb-0.5">
                {plant.managementType === 'seedling' ? '種子元 / ナーセリー' : '血統 / ナーセリー'}
              </span>
              <span className="font-medium text-gray-200">
                {plant.lineageOrNursery || '—'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onWaterPlant(plant)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                hasWateredToday
                  ? 'bg-[#153423] text-[#4ade80] border-[#205137]'
                  : 'bg-[#1a3828] hover:bg-[#234c36] text-[#4ade80] border-[#295b3f] shadow-md'
              }`}
            >
              <Droplet className="w-3.5 h-3.5 fill-current" />
              <span>{hasWateredToday ? '本日水やり済' : '水やり完了にする'}</span>
            </button>
          </div>

          {/* グリッドステータス */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-[#17181c] border border-[#2c2d36] rounded-xl text-xs">
            <div>
              <span className="text-[#787a87] block mb-1">
                {plant.managementType === 'seedling' ? '播種日 (種まき)' : '入手日'}
              </span>
              <span className="font-mono text-gray-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {plant.acquisitionDate || '未記録'}
              </span>
            </div>
            <div>
              <span className="text-[#787a87] block mb-1">
                {plant.managementType === 'seedling' ? '播種からの経過' : '育成経過'}
              </span>
              <span className="font-mono text-gray-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#fbbf24]" />
                {daysElapsed !== null ? `${daysElapsed} 日目` : '—'}
              </span>
            </div>
            <div>
              <span className="text-[#787a87] block mb-1">水やりサイクル</span>
              <span className="text-gray-200">
                {plant.lastWateredDate ? `前回から ${daysSinceWatered} 日経過` : '未記録'}
              </span>
            </div>
            <div>
              <span className="text-[#787a87] block mb-1">
                {plant.managementType === 'seedling' ? '現在の鉢 / トレイ' : '現在の鉢サイズ'}
              </span>
              <span className="text-gray-200 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-gray-400" />
                {plant.potSize || '未記録'}
              </span>
            </div>
            <div className="col-span-2 pt-1 border-t border-[#25262f]">
              <span className="text-[#787a87] block mb-1">用土配合</span>
              <span className="text-gray-200 break-words">
                {plant.soilMix || '未記録'}
              </span>
            </div>
          </div>

          {/* メモ */}
          <div>
            <span className="text-[11px] font-semibold text-[#787a87] uppercase tracking-wider block mb-1.5">
              育成メモ・管理履歴
            </span>
            <div className="p-3.5 bg-[#17181c] border border-[#2c2d36] rounded-xl text-xs text-gray-300 leading-relaxed whitespace-pre-wrap min-h-[60px]">
              {plant.notes || <span className="text-gray-500 italic">メモはありません</span>}
            </div>
          </div>
        </div>

        {/* フッター操作 */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#17181c] border-t border-[#2a2b33]">
          <button
            onClick={() => {
              onDelete(plant);
              onClose();
            }}
            className="px-3.5 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/50 border border-red-800/60 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            削除する
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onEdit(plant);
              }}
              className="px-4 py-1.5 text-xs font-medium text-gray-200 bg-[#282931] hover:bg-[#343540] border border-[#3b3c48] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              編集する
            </button>
            <button
              onClick={onClose}
              className="px-5 py-1.5 text-xs font-bold text-black bg-[#fbbf24] hover:bg-[#f59e0b] rounded-full transition-colors cursor-pointer"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
