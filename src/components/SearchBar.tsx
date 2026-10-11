import React from 'react';
import type { SortField, SortOrder, ViewMode, GridSize, Theme } from '../types/plant';
import { Search, X, LayoutGrid, LayoutList, ArrowUpDown } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortField: SortField;
  onSortFieldChange: (field: SortField) => void;
  sortOrder: SortOrder;
  onSortOrderToggle: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  gridSize: GridSize;
  onGridSizeChange: (size: GridSize) => void;
  theme: Theme;
  totalCount: number;
  filteredCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  sortField,
  onSortFieldChange,
  sortOrder,
  onSortOrderToggle,
  viewMode,
  onViewModeChange,
  gridSize,
  onGridSizeChange,
  theme,
  totalCount,
  filteredCount,
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-2.5 rounded-xl border transition-colors ${
        isDark
          ? 'bg-[#191a1e] border-[#26282f]'
          : 'bg-white border-stone-300 shadow-sm'
      }`}
    >
      {/* 検索入力欄 */}
      <div className="relative flex-1">
        <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-gray-500' : 'text-stone-400'}`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ID、品種名、血統などで検索..."
          className={`w-full pl-9 pr-8 py-1.5 text-xs rounded-lg border focus:outline-none transition-colors ${
            isDark
              ? 'bg-[#131417] border-[#272931] text-gray-100 placeholder-gray-500 focus:border-amber-400'
              : 'bg-[#f4f7f4] border-stone-300 text-stone-800 placeholder-stone-400 focus:border-emerald-700 focus:bg-white'
          }`}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-stone-400 hover:text-stone-600'}`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 並び替え & 大中小切替 & 表示切替 */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* ソート */}
        <div
          className={`flex items-center rounded-lg px-2 py-0.5 text-xs border ${
            isDark ? 'bg-[#131417] border-[#272931]' : 'bg-[#f4f7f4] border-stone-300'
          }`}
        >
          <ArrowUpDown className={`w-3 h-3 mr-1 ${isDark ? 'text-gray-500' : 'text-stone-500'}`} />
          <select
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value as SortField)}
            className={`bg-transparent focus:outline-none cursor-pointer py-1 text-xs ${
              isDark ? 'text-gray-300' : 'text-stone-700 font-medium'
            }`}
          >
            <option value="id" className={isDark ? 'bg-[#1c1d22]' : 'bg-white'}>管理ID順</option>
            <option value="acquisitionDate" className={isDark ? 'bg-[#1c1d22]' : 'bg-white'}>入手日順</option>
            <option value="watered" className={isDark ? 'bg-[#1c1d22]' : 'bg-white'}>水やり日順</option>
            <option value="name" className={isDark ? 'bg-[#1c1d22]' : 'bg-white'}>品種名順</option>
          </select>

          <button
            onClick={onSortOrderToggle}
            className={`ml-1 text-[11px] cursor-pointer ${
              isDark ? 'text-gray-400 hover:text-amber-400' : 'text-stone-600 hover:text-emerald-700 font-bold'
            }`}
            title="昇順 / 降順 切り替え"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>

        {/* カードサイズ切替（カード表示モード時のみ） */}
        {viewMode === 'card' && (
          <div
            className={`flex items-center rounded-lg p-0.5 border ${
              isDark ? 'bg-[#131417] border-[#272931]' : 'bg-[#f4f7f4] border-stone-300'
            }`}
          >
            {(['large', 'medium', 'small'] as GridSize[]).map((size) => {
              const labelMap = { large: '大', medium: '中', small: '小' };
              const isSelected = gridSize === size;
              return (
                <button
                  key={size}
                  onClick={() => onGridSizeChange(size)}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-[#fbbf24] text-black shadow-sm'
                        : 'bg-emerald-700 text-white shadow-sm'
                      : isDark
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-[#23242c]'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-[#e4ece4]'
                  }`}
                  title={`カードサイズ: ${labelMap[size]}`}
                >
                  {labelMap[size]}
                </button>
              );
            })}
          </div>
        )}

        {/* 表示モード切替（カード / テーブル） */}
        <div
          className={`flex items-center rounded-lg p-0.5 border ${
            isDark ? 'bg-[#131417] border-[#272931]' : 'bg-[#f4f7f4] border-stone-300'
          }`}
        >
          <button
            onClick={() => onViewModeChange('card')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === 'card'
                ? isDark
                  ? 'bg-[#2b2c34] text-[#fbbf24]'
                  : 'bg-emerald-700 text-white shadow-sm'
                : isDark
                ? 'text-gray-500 hover:text-gray-300'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            title="カードグリッド表示"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewModeChange('table')}
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === 'table'
                ? isDark
                  ? 'bg-[#2b2c34] text-[#fbbf24]'
                  : 'bg-emerald-700 text-white shadow-sm'
                : isDark
                ? 'text-gray-500 hover:text-gray-300'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            title="テーブル表示"
          >
            <LayoutList className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 件数バッジ */}
        <div
          className={`text-[11px] px-2.5 py-1 rounded-lg border ${
            isDark
              ? 'text-gray-400 bg-[#131417] border-[#272931]'
              : 'text-stone-700 bg-[#e8eee8] border-[#d2ddd2]'
          }`}
        >
          <span className={`font-semibold ${isDark ? 'text-amber-400' : 'text-emerald-800'}`}>
            {filteredCount}
          </span>
          <span className={isDark ? 'text-gray-500' : 'text-stone-500'}> / {totalCount} 株</span>
        </div>
      </div>
    </div>
  );
};
