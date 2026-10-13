import React from 'react';
import type { Plant } from '../types/plant';
import { formatYearMonth } from '../utils/storage';
import { Edit3, Trash2, Calendar, Tag, Box, Info } from 'lucide-react';

interface PlantCardListProps {
  plants: Plant[];
  onViewDetail: (plant: Plant) => void;
  onEdit: (plant: Plant) => void;
  onDelete: (plant: Plant) => void;
}

export const PlantCardList: React.FC<PlantCardListProps> = ({
  plants,
  onViewDetail,
  onEdit,
  onDelete,
}) => {
  if (plants.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plants.map((plant) => (
        <div
          key={plant.id}
          onClick={() => onViewDetail(plant)}
          className="group relative bg-gray-800/80 border border-gray-700 hover:border-emerald-500/50 rounded-xl p-5 shadow-lg shadow-black/20 hover:shadow-emerald-950/20 transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
          {/* 上部: ID & 操作ボタン */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                {plant.id}
              </span>

              <div
                className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => onEdit(plant)}
                  className="p-1.5 text-gray-400 hover:text-blue-300 hover:bg-gray-700 rounded-lg transition-colors"
                  title="編集"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(plant)}
                  className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                  title="削除"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 植物名 */}
            <h3 className="text-base font-bold text-gray-100 group-hover:text-emerald-300 transition-colors line-clamp-1">
              {plant.japaneseName || plant.name}
            </h3>
            {plant.japaneseName && plant.japaneseName !== plant.name ? (
              <p className="text-xs text-gray-400 line-clamp-1 mb-1 font-mono">
                {plant.name}
              </p>
            ) : (
              <div className="mb-1" />
            )}

            {/* 血統・ナーセリー名 */}
            {plant.lineageOrNursery ? (
              <p className="text-xs text-emerald-400/90 font-medium mb-3 flex items-center gap-1">
                <Tag className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{plant.lineageOrNursery}</span>
              </p>
            ) : (
              <div className="h-4 mb-3" />
            )}

            {/* 基本ステータス（入手年月・鉢・サイズ） */}
            <div className="space-y-1.5 py-2.5 border-t border-b border-gray-700/60 text-xs">
              <div className="flex items-center justify-between text-gray-300">
                <span className="text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" /> 入手年月:
                </span>
                <span className="font-mono">{formatYearMonth(plant.acquisitionDate)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span className="text-gray-400 flex items-center gap-1">
                  <Box className="w-3.5 h-3.5 text-gray-500" /> 鉢・サイズ:
                </span>
                <span className="font-medium text-emerald-300/90">{plant.potSize || '未記録'}</span>
              </div>
              {plant.soilMix && (
                <div className="flex items-center justify-between text-gray-300">
                  <span className="text-gray-400">用土:</span>
                  <span className="truncate max-w-[170px] text-right text-gray-300">{plant.soilMix}</span>
                </div>
              )}
            </div>

            {/* メモ抜粋 */}
            {plant.notes && (
              <p className="mt-3 text-xs text-gray-400 line-clamp-2 italic bg-gray-900/40 p-2 rounded border border-gray-800">
                "{plant.notes}"
              </p>
            )}
          </div>

          {/* 下部 */}
          <div className="mt-3 pt-2 text-[11px] text-gray-500 text-right flex items-center justify-end gap-1">
            <Info className="w-3 h-3" />
            <span>クリックで詳細表示</span>
          </div>
        </div>
      ))}
    </div>
  );
};
