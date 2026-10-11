import React from 'react';
import type { Plant, GridSize, Theme } from '../types/plant';
import { getDaysSince } from '../utils/storage';
import { Droplet, Edit3, Trash2, Sprout, Box } from 'lucide-react';

interface NanoPlantGridProps {
  plants: Plant[];
  gridSize: GridSize;
  theme: Theme;
  onViewDetail: (plant: Plant) => void;
  onEdit: (plant: Plant) => void;
  onDelete: (plant: Plant) => void;
  onWaterPlant: (plant: Plant) => void;
}

export const NanoPlantGrid: React.FC<NanoPlantGridProps> = ({
  plants,
  gridSize,
  theme,
  onViewDetail,
  onEdit,
  onDelete,
  onWaterPlant,
}) => {
  if (plants.length === 0) {
    return null;
  }

  const isDark = theme === 'dark';

  // グリッドカラムクラス
  const gridClass =
    gridSize === 'large'
      ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
      : gridSize === 'small'
      ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5';

  return (
    <div className={gridClass}>
      {plants.map((plant) => {
        const daysSinceWatered = getDaysSince(plant.lastWateredDate);
        const hasWateredToday = daysSinceWatered === 0 && !!plant.lastWateredDate;

        // 大サイズの場合
        if (gridSize === 'large') {
          return (
            <div
              key={plant.id}
              onClick={() => onViewDetail(plant)}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                isDark
                  ? 'bg-[#212226] border-[#2e3037] hover:border-[#4b4e5b] shadow-2xl shadow-black/40'
                  : 'bg-white border-stone-300 hover:border-emerald-600 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)]'
              }`}
            >
              {/* 大：迫力のある写真エリア */}
              <div className={`relative w-full aspect-[16/10] overflow-hidden ${isDark ? 'bg-[#141518]' : 'bg-[#eef3ee]'}`}>
                {plant.imageUrl ? (
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className={`w-full h-full flex flex-col items-center justify-center ${isDark ? 'bg-[#17181c] text-[#4b4c56]' : 'bg-[#eef3ee] text-emerald-700/60'}`}>
                    <Sprout className="w-14 h-14 mb-1" />
                    <span className="text-xs font-medium">No Photo</span>
                  </div>
                )}

                <div
                  className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90 ${
                    isDark ? 'from-[#212226]' : 'from-white via-white/30 to-transparent'
                  }`}
                />

                {/* ホバー時ボタン */}
                <div
                  className="absolute top-3.5 right-3.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onEdit(plant)}
                    className="p-2 rounded-lg bg-black/60 hover:bg-black/80 text-gray-200 hover:text-white border border-white/10 backdrop-blur transition-colors"
                    title="編集"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(plant)}
                    className="p-2 rounded-lg bg-black/60 hover:bg-red-950/80 text-gray-200 hover:text-red-300 border border-white/10 backdrop-blur transition-colors"
                    title="削除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* 管理IDバッジ & 実生バッジ */}
                <div className="absolute bottom-3 left-4 z-10 flex items-center gap-1.5">
                  <span
                    className={`inline-block px-3 py-1 rounded-md text-xs font-mono font-bold border backdrop-blur shadow-sm ${
                      isDark
                        ? 'bg-[#2b2c34]/95 text-[#fbbf24] border-[#3c3e49]/90'
                        : 'bg-[#f4f7f4]/95 text-emerald-900 border-emerald-300/80'
                    }`}
                  >
                    管理ID {plant.id}
                  </span>
                  {plant.managementType === 'seedling' && (
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs font-bold border backdrop-blur flex items-center gap-1 shadow-sm ${
                        isDark
                          ? 'bg-[#153423]/95 text-[#4ade80] border-[#205137]'
                          : 'bg-emerald-100/95 text-emerald-800 border-emerald-300'
                      }`}
                    >
                      <Sprout className="w-3 h-3" />
                      実生
                    </span>
                  )}
                </div>
              </div>

              {/* 大：詳細情報エリア */}
              <div className="p-5 pt-2 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${isDark ? 'text-[#787a87]' : 'text-stone-500'}`}>
                      {plant.managementType === 'seedling' ? '実生品種名' : '品種名'}
                    </span>
                    {plant.potSize && (
                      <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-stone-600'}`}>
                        <Box className="w-3.5 h-3.5 opacity-60" /> {plant.potSize}
                      </span>
                    )}
                  </div>
                  <h3
                    className={`text-lg font-black leading-snug transition-colors mt-0.5 ${
                      isDark
                        ? 'text-gray-100 group-hover:text-[#fbbf24]'
                        : 'text-stone-900 group-hover:text-emerald-700'
                    }`}
                  >
                    {plant.name}
                  </h3>
                  {plant.japaneseName && plant.japaneseName !== plant.name && (
                    <p className={`text-xs mt-0.5 ${isDark ? 'text-[#9a9ba6]' : 'text-stone-600'}`}>
                      {plant.japaneseName}
                    </p>
                  )}
                  {plant.managementType === 'seedling' && (plant.seedCount !== undefined || plant.germinationCount !== undefined) && (
                    <div className="mt-1.5 flex items-center gap-2 text-xs">
                      <span
                        className={`px-2 py-0.5 rounded border font-medium flex items-center gap-1 ${
                          isDark
                            ? 'bg-[#172e21] text-[#4ade80] border-[#234c36]'
                            : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        <Sprout className="w-3 h-3" />
                        発芽: {plant.germinationCount ?? '-'}/{plant.seedCount ?? '-'}粒
                        {plant.seedCount && plant.germinationCount && plant.seedCount > 0 && (
                          <span className="font-mono font-bold ml-1">
                            ({Math.round((plant.germinationCount / plant.seedCount) * 100)}%)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                  {plant.lineageOrNursery && (
                    <p className={`text-xs mt-1 ${isDark ? 'text-emerald-400/90' : 'text-emerald-800 font-medium'}`}>
                      {plant.managementType === 'seedling' ? '種子元: ' : '出自: '}
                      {plant.lineageOrNursery}
                    </p>
                  )}
                  {plant.notes && (
                    <div
                      className={`mt-2.5 p-2.5 rounded-xl border text-xs leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap break-words ${
                        isDark
                          ? 'text-gray-300 bg-[#17181c] border-[#292a33]'
                          : 'text-stone-800 bg-[#f7faf7] border-[#dbe3db]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            isDark ? 'text-[#fbbf24]' : 'text-emerald-800'
                          }`}
                        >
                          {plant.managementType === 'seedling' ? '実生育成メモ' : '育成メモ・管理履歴'}
                        </span>
                      </div>
                      <p className="font-normal">{plant.notes}</p>
                    </div>
                  )}
                </div>

                <div className={`mt-4 pt-3 border-t flex items-end justify-between gap-2 ${isDark ? 'border-[#2d2e36]' : 'border-stone-200'}`}>
                  <div className={`space-y-0.5 text-xs ${isDark ? 'text-[#8e909d]' : 'text-stone-500'}`}>
                    <p className="flex items-center gap-1">
                      <span>{plant.managementType === 'seedling' ? '播種日' : '入手日'}</span>
                      <span className={`font-mono ${isDark ? 'text-gray-200' : 'text-stone-800 font-medium'}`}>
                        {plant.acquisitionDate ? plant.acquisitionDate.replace(/-/g, '/') : '未記録'}
                      </span>
                    </p>
                    <p>
                      {plant.lastWateredDate ? (
                        hasWateredToday ? (
                          <span className="text-emerald-600 font-semibold">本日水やり済み</span>
                        ) : (
                          <span>
                            水やりから{' '}
                            <strong className={`font-mono text-sm ${isDark ? 'text-gray-100' : 'text-stone-900 font-bold'}`}>
                              {daysSinceWatered}日
                            </strong>{' '}
                            経過
                          </span>
                        )
                      ) : (
                        <span>水やり未記録</span>
                      )}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onWaterPlant(plant);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                      hasWateredToday
                        ? isDark
                          ? 'bg-[#153423] text-[#4ade80] border-[#205137]'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : isDark
                        ? 'bg-[#1a3828] hover:bg-[#234c36] text-[#4ade80] border-[#295b3f] hover:scale-105 active:scale-95'
                        : 'bg-[#ebf5ed] hover:bg-[#ddf0e0] text-emerald-800 border-emerald-300 hover:scale-105 active:scale-95'
                    }`}
                  >
                    <Droplet className="w-3.5 h-3.5 fill-current" />
                    <span>{hasWateredToday ? '水やり済' : '水やり完了'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        }

        // 小サイズの場合（コンパクトグリッド）
        if (gridSize === 'small') {
          return (
            <div
              key={plant.id}
              onClick={() => onViewDetail(plant)}
              className={`group relative rounded-xl overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                isDark
                  ? 'bg-[#212226] border-[#2e3037] hover:border-[#43454f] shadow-lg shadow-black/30'
                  : 'bg-white border-stone-300 hover:border-emerald-600 shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(16,185,129,0.12)]'
              }`}
            >
              {/* 小：正方形写真 */}
              <div className={`relative w-full aspect-square overflow-hidden ${isDark ? 'bg-[#141518]' : 'bg-[#eef3ee]'}`}>
                {plant.imageUrl ? (
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className={`w-full h-full flex flex-col items-center justify-center ${isDark ? 'bg-[#17181c] text-[#4b4c56]' : 'bg-[#eef3ee] text-emerald-700/60'}`}>
                    <Sprout className="w-8 h-8" />
                  </div>
                )}

                <div
                  className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80 ${
                    isDark ? 'from-[#212226]' : 'from-white via-white/30 to-transparent'
                  }`}
                />

                {/* 管理IDバッジ & 実生バッジ */}
                <div className="absolute bottom-1.5 left-2 z-10 flex items-center gap-1">
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border backdrop-blur ${
                      isDark
                        ? 'bg-[#2b2c34]/95 text-[#b6b8c2] border-[#3c3e49]/80'
                        : 'bg-[#f4f7f4]/95 text-emerald-900 border-emerald-300/80 shadow-sm'
                    }`}
                  >
                    {plant.id}
                  </span>
                  {plant.managementType === 'seedling' && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold border backdrop-blur flex items-center gap-0.5 ${
                        isDark
                          ? 'bg-[#153423]/95 text-[#4ade80] border-[#205137]'
                          : 'bg-emerald-100/95 text-emerald-800 border-emerald-300 shadow-sm'
                      }`}
                    >
                      <Sprout className="w-2.5 h-2.5" />
                      実生
                    </span>
                  )}
                </div>
              </div>

              {/* 小：タイトル＆詳細情報＆水やりボタン */}
              <div className="p-2.5 pt-1.5 flex flex-col justify-between flex-1 gap-1.5">
                <div>
                  <h3
                    className={`text-xs font-bold truncate transition-colors ${
                      isDark
                        ? 'text-gray-100 group-hover:text-[#fbbf24]'
                        : 'text-stone-900 group-hover:text-emerald-700'
                    }`}
                    title={plant.name}
                  >
                    {plant.name}
                  </h3>

                  {/* 入手日/播種日 & 水やり経過 */}
                  <div className="mt-1 space-y-0.5 text-[10px]">
                    <p className={`flex items-center gap-1 ${isDark ? 'text-[#8e909d]' : 'text-stone-500'}`}>
                      <span>{plant.managementType === 'seedling' ? '播種日' : '入手日'}</span>
                      <span className={`font-mono ${isDark ? 'text-gray-300' : 'text-stone-800 font-medium'}`}>
                        {plant.acquisitionDate ? plant.acquisitionDate.replace(/-/g, '/') : '未記録'}
                      </span>
                    </p>

                    {plant.managementType === 'seedling' && (plant.seedCount !== undefined || plant.germinationCount !== undefined) && (
                      <p className={`text-[10px] font-medium truncate flex items-center gap-1 ${isDark ? 'text-[#4ade80]' : 'text-emerald-800'}`}>
                        <Sprout className="w-2.5 h-2.5 flex-shrink-0" />
                        <span>発芽: {plant.germinationCount ?? '-'}/{plant.seedCount ?? '-'}粒</span>
                        {plant.seedCount && plant.germinationCount !== undefined && plant.seedCount > 0 && (
                          <span className={`font-mono font-bold px-1 py-0.2 rounded text-[9px] ${
                            isDark ? 'bg-[#1b432e] text-[#4ade80] border border-[#28593d]' : 'bg-emerald-100 text-emerald-850 border border-emerald-300'
                          }`}>
                            {Math.round((plant.germinationCount / plant.seedCount) * 100)}%
                          </span>
                        )}
                      </p>
                    )}

                    <p className="truncate">
                      {plant.lastWateredDate ? (
                        hasWateredToday ? (
                          <span className="text-emerald-600 font-semibold">本日水やり済</span>
                        ) : (
                          <span className={isDark ? 'text-[#9ea0ad]' : 'text-stone-600'}>
                            水やりから{' '}
                            <strong className={`font-mono font-bold ${isDark ? 'text-gray-100' : 'text-stone-900'}`}>
                              {daysSinceWatered}日
                            </strong>{' '}
                            経過
                          </span>
                        )
                      ) : (
                        <span className={isDark ? 'text-[#6c6e7a]' : 'text-stone-400'}>水やり未記録</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className={`pt-1.5 border-t flex items-center justify-end ${isDark ? 'border-[#2c2d34]' : 'border-stone-200'}`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onWaterPlant(plant);
                    }}
                    className={`w-full py-1 rounded-md text-[10px] font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                      hasWateredToday
                        ? isDark
                          ? 'bg-[#153423] text-[#4ade80] border-[#205137]'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : isDark
                        ? 'bg-[#1a3828] hover:bg-[#234c36] text-[#4ade80] border-[#295b3f] active:scale-95'
                        : 'bg-[#ebf5ed] hover:bg-[#ddf0e0] text-emerald-800 border-emerald-300 active:scale-95'
                    }`}
                    title="水やり日を今日に更新"
                  >
                    <Droplet className="w-2.5 h-2.5 fill-current" />
                    <span>{hasWateredToday ? '本日水やり済' : '水やり完了'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        }

        // 中サイズ（標準：デフォルト）
        return (
          <div
            key={plant.id}
            onClick={() => onViewDetail(plant)}
            className={`group relative rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
              isDark
                ? 'bg-[#212226] border-[#2e3037] hover:border-[#43454f] shadow-xl shadow-black/30'
                : 'bg-white border-stone-300 hover:border-emerald-600 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.12)]'
            }`}
          >
            {/* 中：写真エリア */}
            <div className={`relative w-full aspect-[4/3] overflow-hidden ${isDark ? 'bg-[#141518]' : 'bg-[#eef3ee]'}`}>
              {plant.imageUrl ? (
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className={`w-full h-full flex flex-col items-center justify-center ${isDark ? 'bg-[#17181c] text-[#4b4c56]' : 'bg-[#eef3ee] text-emerald-700/60'}`}>
                  <Sprout className="w-12 h-12 mb-1" />
                  <span className="text-xs font-medium">No Photo</span>
                </div>
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90 ${
                  isDark ? 'from-[#212226]' : 'from-white via-white/30 to-transparent'
                }`}
              />

              <div
                className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => onEdit(plant)}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-gray-200 hover:text-white border border-white/10 backdrop-blur transition-colors"
                  title="編集"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(plant)}
                  className="p-1.5 rounded-lg bg-black/60 hover:bg-red-950/80 text-gray-200 hover:text-red-300 border border-white/10 backdrop-blur transition-colors"
                  title="削除"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 管理IDバッジ & 実生バッジ */}
              <div className="absolute bottom-2.5 left-4 z-10 flex items-center gap-1.5">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border backdrop-blur shadow-sm ${
                    isDark
                      ? 'bg-[#2b2c34]/90 text-[#b6b8c2] border-[#3c3e49]/80'
                      : 'bg-[#f4f7f4]/95 text-emerald-900 border-emerald-300/80'
                  }`}
                >
                  管理ID {plant.id}
                </span>
                {plant.managementType === 'seedling' && (
                  <span
                    className={`px-2 py-0.5 rounded-md text-[11px] font-bold border backdrop-blur flex items-center gap-1 shadow-sm ${
                      isDark
                        ? 'bg-[#153423]/95 text-[#4ade80] border-[#205137]'
                        : 'bg-emerald-100/95 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    <Sprout className="w-3 h-3" />
                    実生
                  </span>
                )}
              </div>
            </div>

            {/* 中：詳細情報エリア */}
            <div className="p-4 pt-1 flex flex-col justify-between flex-1">
              <div>
                <span className={`text-[11px] block mb-0.5 font-medium ${isDark ? 'text-[#787a87]' : 'text-stone-500'}`}>
                  {plant.managementType === 'seedling' ? '実生品種名' : '品種名'}
                </span>
                <h3
                  className={`text-[15px] font-bold leading-snug transition-colors truncate ${
                    isDark
                      ? 'text-gray-100 group-hover:text-[#fbbf24]'
                      : 'text-stone-900 group-hover:text-emerald-700'
                  }`}
                >
                  {plant.name}
                </h3>
                {plant.japaneseName && plant.japaneseName !== plant.name && (
                  <p className={`text-[11px] truncate mb-1.5 ${isDark ? 'text-[#9395a1]' : 'text-stone-600'}`}>
                    {plant.japaneseName}
                  </p>
                )}
                {plant.managementType === 'seedling' && (plant.seedCount !== undefined || plant.germinationCount !== undefined) && (
                  <div className="mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] border font-medium inline-flex items-center gap-1 ${
                        isDark
                          ? 'bg-[#172e21] text-[#4ade80] border-[#234c36]'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}
                    >
                      <Sprout className="w-3 h-3" />
                      発芽: {plant.germinationCount ?? '-'}/{plant.seedCount ?? '-'}粒
                      {plant.seedCount && plant.germinationCount && plant.seedCount > 0 && (
                        <span className="font-mono font-bold ml-0.5">
                          ({Math.round((plant.germinationCount / plant.seedCount) * 100)}%)
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div className={`mt-3 pt-2.5 border-t flex items-end justify-between gap-2 ${isDark ? 'border-[#2d2e36]' : 'border-stone-200'}`}>
                <div className={`space-y-0.5 text-xs ${isDark ? 'text-[#8e909d]' : 'text-stone-500'}`}>
                  <p className="flex items-center gap-1 text-[11px]">
                    <span>{plant.managementType === 'seedling' ? '播種日' : '入手日'}</span>
                    <span className={`font-mono ${isDark ? 'text-gray-300' : 'text-stone-800 font-medium'}`}>
                      {plant.acquisitionDate ? plant.acquisitionDate.replace(/-/g, '/') : '未記録'}
                    </span>
                  </p>
                  <p className="text-[11px]">
                    {plant.lastWateredDate ? (
                      hasWateredToday ? (
                        <span className="text-emerald-600 font-medium">本日水やり済み</span>
                      ) : (
                        <span>
                          水やりから{' '}
                          <strong className={`font-mono ${isDark ? 'text-gray-200' : 'text-stone-800 font-semibold'}`}>
                            {daysSinceWatered}日
                          </strong>{' '}
                          経過
                        </span>
                      )
                    ) : (
                      <span>水やり未記録</span>
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onWaterPlant(plant);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
                    hasWateredToday
                      ? isDark
                        ? 'bg-[#153423] text-[#4ade80] border-[#205137]'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : isDark
                      ? 'bg-[#1a3828] hover:bg-[#234c36] text-[#4ade80] border-[#295b3f] shadow-sm hover:scale-105 active:scale-95'
                      : 'bg-[#ebf5ed] hover:bg-[#ddf0e0] text-emerald-800 border-emerald-300 shadow-sm hover:scale-105 active:scale-95'
                  }`}
                  title="水やり日を今日に更新します"
                >
                  <Droplet className="w-3 h-3 fill-current" />
                  <span>{hasWateredToday ? '水やり済' : '水やり完了'}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
