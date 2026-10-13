import React from 'react';
import type { Plant } from '../types/plant';
import { getDaysSince, getMonthsSince, formatYearMonth } from '../utils/storage';
import { X, Calendar, Edit3, Trash2, Sprout, Clock, Droplet, Box, Copy, Scissors } from 'lucide-react';

interface PlantDetailModalProps {
  plant: Plant | null;
  allPlants?: Plant[];
  onClose: () => void;
  onEdit: (plant: Plant) => void;
  onDelete: (plant: Plant) => void;
  onWaterPlant: (plant: Plant) => void;
  onRepotPlant?: (plant: Plant) => void;
  onDuplicate?: (plant: Plant) => void;
  onAddPup?: (parentPlant: Plant) => void;
  onSelectPlant?: (plant: Plant) => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  allPlants = [],
  onClose,
  onEdit,
  onDelete,
  onWaterPlant,
  onRepotPlant,
  onDuplicate,
  onAddPup,
  onSelectPlant,
}) => {
  if (!plant) return null;

  const monthsSinceAcquired = plant.acquisitionDate ? getMonthsSince(plant.acquisitionDate) : null;
  const daysSinceWatered = getDaysSince(plant.lastWateredDate);
  const hasWateredToday = daysSinceWatered === 0 && !!plant.lastWateredDate;

  const monthsSinceRepotted = getMonthsSince(plant.lastRepottedDate);
  const thisMonth = new Date().toISOString().slice(0, 7);
  const hasRepottedThisMonth = !!plant.lastRepottedDate && plant.lastRepottedDate.slice(0, 7) === thisMonth;

  // 親株オブジェクト & この株から採取された子株一覧
  const parentPlant = plant.parentPlantId
    ? allPlants.find((p) => p.id === plant.parentPlantId)
    : null;
  const pups = allPlants.filter((p) => p.parentPlantId === plant.id);

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
            {plant.managementType === 'pup' && (
              <span className="px-2.5 py-1 rounded-full bg-[#2d2213]/90 text-[#fbbf24] text-xs font-bold border border-amber-600/50 backdrop-blur flex items-center gap-1">
                <Scissors className="w-3.5 h-3.5" />
                子株 (カキ仔)
              </span>
            )}
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
          {/* 子株の場合：親株リンクバナー */}
          {plant.parentPlantId && (
            <div className="p-3 bg-[#241c13] border border-[#4a3b22] rounded-xl text-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-lg bg-[#362716] text-amber-400 flex-shrink-0 border border-amber-700/50">
                  <Scissors className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-gray-400">採取元・親株:</span>
                    <span className="font-mono font-bold text-amber-400">{plant.parentPlantId}</span>
                    <span className="font-semibold text-gray-200 truncate">
                      {plant.parentPlantName || parentPlant?.name || '親株'}
                    </span>
                  </div>
                  {plant.harvestDate && (
                    <p className="text-[11px] text-amber-300/80 font-mono mt-0.5">
                      親離れ・採取年月: <strong>{formatYearMonth(plant.harvestDate)}</strong>
                    </p>
                  )}
                </div>
              </div>

              {parentPlant && onSelectPlant && (
                <button
                  type="button"
                  onClick={() => onSelectPlant(parentPlant)}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-300 hover:text-amber-100 bg-amber-950/70 hover:bg-amber-900/90 border border-amber-600/70 rounded-lg transition-colors cursor-pointer flex-shrink-0 shadow-sm"
                >
                  親株を見る →
                </button>
              )}
            </div>
          )}

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

          {/* 血統 & 水やり・植え替えアクション */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#17181c] border border-[#2c2d36] rounded-xl text-xs gap-3">
            <div>
              <span className="text-[#787a87] block mb-0.5">
                {plant.managementType === 'seedling' ? '種子元 / ナーセリー' : '血統 / ナーセリー'}
              </span>
              <span className="font-medium text-gray-200">
                {plant.lineageOrNursery || '—'}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* 水やりボタン */}
              <button
                type="button"
                onClick={() => onWaterPlant(plant)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  hasWateredToday
                    ? 'bg-[#153423] text-[#4ade80] border-[#205137]'
                    : 'bg-[#1a3828] hover:bg-[#234c36] text-[#4ade80] border-[#295b3f] shadow-md'
                }`}
              >
                <Droplet className="w-3.5 h-3.5 fill-current" />
                <span>{hasWateredToday ? '本日水やり済' : '水やり完了'}</span>
              </button>

              {/* 植え替えボタン */}
              {onRepotPlant && (
                <button
                  type="button"
                  onClick={() => onRepotPlant(plant)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    hasRepottedThisMonth
                      ? 'bg-amber-950/80 text-amber-300 border-amber-700/80'
                      : 'bg-[#291e14] hover:bg-[#382819] text-amber-300 border-amber-800/80 shadow-md'
                  }`}
                  title="植え替え年月を今月に更新して履歴に記録"
                >
                  <Sprout className="w-3.5 h-3.5" />
                  <span>{hasRepottedThisMonth ? '今月植え替え済' : '植え替え完了'}</span>
                </button>
              )}
            </div>
          </div>

          {/* グリッドステータス */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#17181c] border border-[#2c2d36] rounded-xl text-xs">
            <div>
              <span className="text-[#787a87] block mb-1">
                {plant.managementType === 'seedling' ? '播種年月 (種まき)' : '入手年月'}
              </span>
              <span className="font-mono text-gray-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {formatYearMonth(plant.acquisitionDate)}
              </span>
            </div>
            <div>
              <span className="text-[#787a87] block mb-1">
                {plant.managementType === 'seedling' ? '播種からの経過' : '育成経過'}
              </span>
              <span className="font-mono text-gray-200 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#fbbf24]" />
                {monthsSinceAcquired !== null
                  ? monthsSinceAcquired === 0
                    ? '今月 (1ヶ月目)'
                    : monthsSinceAcquired >= 12
                    ? `${Math.floor(monthsSinceAcquired / 12)}年${monthsSinceAcquired % 12 > 0 ? ` ${monthsSinceAcquired % 12}ヶ月` : ''} 経過`
                    : `${monthsSinceAcquired} ヶ月経過`
                  : '—'}
              </span>
            </div>
            <div>
              <span className="text-[#787a87] block mb-1">水やりサイクル</span>
              <span className="text-gray-200">
                {plant.lastWateredDate ? `前回から ${daysSinceWatered} 日経過` : '未記録'}
              </span>
            </div>
            <div>
              <span className="text-[#787a87] block mb-1">植え替えサイクル</span>
              <span className="text-gray-200 font-mono">
                {plant.lastRepottedDate
                  ? (monthsSinceRepotted === 0 ? '今月実施' : `前回から ${monthsSinceRepotted} ヶ月経過`)
                  : '未記録'}
              </span>
            </div>
            <div>
              <span className="text-[#787a87] block mb-1">
                {plant.managementType === 'seedling' ? '現在の鉢・サイズ (トレイ)' : '現在の鉢・サイズ'}
              </span>
              <span className="text-gray-200 flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-gray-400" />
                {plant.potSize || '未記録'}
              </span>
            </div>
            <div>
              <span className="text-[#787a87] block mb-1">最終植え替え日</span>
              <span className="font-mono text-gray-200">
                {formatYearMonth(plant.lastRepottedDate)}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-3 pt-1 border-t border-[#25262f]">
              <span className="text-[#787a87] block mb-1">用土配合</span>
              <span className="text-gray-200 break-words">
                {plant.soilMix || '未記録'}
              </span>
            </div>
          </div>

          {/* 植え替え履歴セクション */}
          <div className="p-3.5 bg-[#17181c] border border-[#2c2d36] rounded-xl text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-300 flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-amber-400" />
                <span>植え替え履歴</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono">
                {(plant.repottingHistory || (plant.lastRepottedDate ? [plant.lastRepottedDate] : [])).length} 回実施
              </span>
            </div>

            {((plant.repottingHistory && plant.repottingHistory.length > 0) || plant.lastRepottedDate) ? (
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {(plant.repottingHistory && plant.repottingHistory.length > 0
                  ? plant.repottingHistory
                  : [plant.lastRepottedDate!]
                ).map((dStr, idx) => (
                  <span
                    key={`${dStr}-${idx}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono bg-[#202127] border border-[#32333d] text-gray-200"
                  >
                    <span>{formatYearMonth(dStr)}</span>
                    {idx === 0 && (
                      <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-sans font-bold">
                        最新
                      </span>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-gray-500 italic">植え替え履歴の記録はありません</p>
            )}
          </div>

          {/* この株から採取した子株（カキ仔）一覧 */}
          {pups.length > 0 && (
            <div className="p-3.5 bg-[#17181c] border border-[#2c2d36] rounded-xl text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>採取した子株 (カキ仔)</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono font-bold">
                  {pups.length} 株採取
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {pups.map((pup) => (
                  <div
                    key={pup.id}
                    onClick={() => onSelectPlant && onSelectPlant(pup)}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-[#212227] hover:bg-[#2b2d35] border border-[#32333d] hover:border-amber-500/50 cursor-pointer transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#16171a] overflow-hidden flex-shrink-0 border border-[#373842]">
                      {pup.imageUrl ? (
                        <img src={pup.imageUrl} alt={pup.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <Sprout className="w-4 h-4 text-amber-400/60" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-amber-400">{pup.id}</span>
                        {pup.harvestDate && (
                          <span className="text-[9px] text-gray-400 font-mono">
                            ({formatYearMonth(pup.harvestDate)} 親離れ)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-100 font-bold truncate group-hover:text-amber-300 transition-colors">
                        {pup.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#17181c] border-t border-[#2a2b33] flex-wrap gap-2">
          <button
            onClick={() => {
              onDelete(plant);
              onClose();
            }}
            className="px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/50 border border-red-800/60 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>削除</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {onAddPup && (
              <button
                onClick={() => {
                  onClose();
                  onAddPup(plant);
                }}
                className="px-3.5 py-1.5 text-xs font-bold text-amber-300 hover:text-amber-100 bg-[#2b2114] hover:bg-[#3d2f1c] border border-amber-600/70 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="この株から子株（カキ仔）を採取して登録"
              >
                <Scissors className="w-3.5 h-3.5 text-amber-400" />
                <span>子株を登録</span>
              </button>
            )}

            {onDuplicate && (
              <button
                onClick={() => {
                  onClose();
                  onDuplicate(plant);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-gray-300 hover:text-gray-100 bg-[#282931] hover:bg-[#343540] border border-[#3b3c48] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="この株の情報を丸ごとコピーして新しい株を登録"
              >
                <Copy className="w-3.5 h-3.5 text-gray-400" />
                <span>株を複製 (コピー)</span>
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onEdit(plant);
              }}
              className="px-3.5 py-1.5 text-xs font-medium text-gray-200 bg-[#282931] hover:bg-[#343540] border border-[#3b3c48] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>編集</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold text-black bg-[#fbbf24] hover:bg-[#f59e0b] rounded-full transition-colors cursor-pointer"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
