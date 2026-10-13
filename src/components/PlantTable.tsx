import React from 'react';
import type { Plant, Theme } from '../types/plant';
import { formatYearMonth } from '../utils/storage';
import { Edit3, Trash2, Eye, Calendar } from 'lucide-react';

interface PlantTableProps {
  plants: Plant[];
  theme: Theme;
  onViewDetail: (plant: Plant) => void;
  onEdit: (plant: Plant) => void;
  onDelete: (plant: Plant) => void;
}

export const PlantTable: React.FC<PlantTableProps> = ({
  plants,
  theme,
  onViewDetail,
  onEdit,
  onDelete,
}) => {
  if (plants.length === 0) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <div
      className={`overflow-x-auto rounded-xl border transition-colors shadow-lg ${
        isDark
          ? 'border-gray-700/80 bg-[#1e1f24] shadow-black/30'
          : 'border-slate-200 bg-white shadow-slate-200/50'
      }`}
    >
      <table className={`w-full text-left text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
        <thead
          className={`text-xs uppercase tracking-wider border-b ${
            isDark
              ? 'bg-[#18191d] text-gray-400 border-gray-700'
              : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}
        >
          <tr>
            <th scope="col" className={`px-4 py-3.5 font-semibold ${isDark ? 'text-[#fbbf24]' : 'text-emerald-700'}`}>
              管理ID
            </th>
            <th scope="col" className="px-4 py-3.5 font-semibold">
              植物名・品種名
            </th>
            <th scope="col" className="px-4 py-3.5 font-semibold">
              血統 / 種子元
            </th>
            <th scope="col" className="px-4 py-3.5 font-semibold">
              入手 / 播種年月
            </th>
            <th scope="col" className="px-4 py-3.5 font-semibold">
              鉢 / トレイ
            </th>
            <th scope="col" className="px-4 py-3.5 font-semibold hidden lg:table-cell">
              用土配合
            </th>
            <th scope="col" className="px-4 py-3.5 font-semibold text-right">
              操作
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y ${isDark ? 'divide-gray-700/60 bg-[#212227]/50' : 'divide-slate-100 bg-white'}`}>
          {plants.map((plant) => (
            <tr
              key={plant.id}
              className={`transition-colors cursor-pointer group ${
                isDark ? 'hover:bg-gray-800/60' : 'hover:bg-slate-50'
              }`}
              onClick={() => onViewDetail(plant)}
            >
              {/* 管理ID */}
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-mono font-bold text-xs px-2.5 py-1 rounded border transition-colors ${
                      isDark
                        ? 'bg-amber-500/10 text-[#fbbf24] border-amber-500/20 group-hover:border-amber-400/40'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200 group-hover:border-emerald-300'
                    }`}
                  >
                    {plant.id}
                  </span>
                  {plant.managementType === 'seedling' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-[#153423] text-[#4ade80] border border-[#205137]">
                      実生
                    </span>
                  )}
                </div>
              </td>

              {/* 植物名 */}
              <td className="px-4 py-3">
                <div
                  className={`font-semibold transition-colors ${
                    isDark
                      ? 'text-gray-100 group-hover:text-[#fbbf24]'
                      : 'text-slate-900 group-hover:text-emerald-700'
                  }`}
                >
                  {plant.japaneseName || plant.name}
                </div>
                {plant.japaneseName && plant.japaneseName !== plant.name && (
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {plant.name}
                  </p>
                )}
                {plant.managementType === 'seedling' && (plant.seedCount !== undefined || plant.germinationCount !== undefined) && (
                  <p className="text-[11px] text-[#4ade80] mt-0.5 flex items-center gap-1.5">
                    <span>発芽: {plant.germinationCount ?? '-'}/{plant.seedCount ?? '-'}粒</span>
                    {plant.seedCount && plant.germinationCount !== undefined && plant.seedCount > 0 && (
                      <span className="font-mono font-bold text-[10px]">
                        ({Math.round((plant.germinationCount / plant.seedCount) * 100)}%)
                      </span>
                    )}
                  </p>
                )}
              </td>

              {/* 血統・ナーセリー名 */}
              <td className={`px-4 py-3 whitespace-nowrap text-xs ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                {plant.lineageOrNursery ? (
                  <span
                    className={`inline-block px-2 py-0.5 rounded border ${
                      isDark
                        ? 'bg-gray-700/60 border-gray-600/50'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {plant.lineageOrNursery}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>

              {/* 入手年月 */}
              <td className={`px-4 py-3 whitespace-nowrap text-xs font-mono ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                {plant.acquisitionDate ? (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {formatYearMonth(plant.acquisitionDate)}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>

              {/* 鉢サイズ */}
              <td className="px-4 py-3 whitespace-nowrap text-xs">
                {plant.potSize ? (
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md border ${
                      isDark
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {plant.potSize}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>

              {/* 用土配合 */}
              <td className={`px-4 py-3 text-xs max-w-xs truncate hidden lg:table-cell ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                {plant.soilMix || <span className="text-gray-400">—</span>}
              </td>

              {/* 操作ボタン */}
              <td
                className="px-4 py-3 whitespace-nowrap text-right"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onViewDetail(plant)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isDark
                        ? 'text-gray-400 hover:text-emerald-300 hover:bg-gray-700'
                        : 'text-slate-500 hover:text-emerald-700 hover:bg-slate-100'
                    }`}
                    title="詳細を表示"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(plant)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isDark
                        ? 'text-gray-400 hover:text-blue-300 hover:bg-gray-700'
                        : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'
                    }`}
                    title="編集"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(plant)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isDark
                        ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                        : 'text-slate-500 hover:text-red-600 hover:bg-slate-100'
                    }`}
                    title="削除"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
