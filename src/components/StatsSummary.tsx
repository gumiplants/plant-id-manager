import React from 'react';
import type { Plant } from '../types/plant';
import { Sprout, ShieldCheck, Database, Calendar } from 'lucide-react';

interface StatsSummaryProps {
  plants: Plant[];
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({ plants }) => {
  // 分類集計（IDプレフィックスや植物名から簡易推定）
  const agaveCount = plants.filter(
    (p) => p.id.startsWith('AGV') || p.name.includes('アガベ') || p.name.includes('チタノタ')
  ).length;

  const pachyCount = plants.filter(
    (p) => p.id.startsWith('PAC') || p.name.includes('パキポ') || p.name.includes('グラキリス')
  ).length;

  const cactusCount = plants.filter(
    (p) => p.id.startsWith('COP') || p.name.includes('サボテン') || p.name.includes('コピアポア')
  ).length;

  const othersCount = plants.length - (agaveCount + pachyCount + cactusCount);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {/* 総登録株数 */}
      <div className="bg-gray-800/80 border border-gray-700/80 rounded-xl p-4 flex items-center gap-3 shadow-md">
        <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sprout className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium">総管理株数</p>
          <p className="text-xl font-bold text-gray-100">
            {plants.length} <span className="text-xs font-normal text-gray-400">株</span>
          </p>
        </div>
      </div>

      {/* アガベ */}
      <div className="bg-gray-800/80 border border-gray-700/80 rounded-xl p-4 flex items-center gap-3 shadow-md">
        <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium">アガベ系</p>
          <p className="text-xl font-bold text-gray-100">
            {agaveCount} <span className="text-xs font-normal text-gray-400">株</span>
          </p>
        </div>
      </div>

      {/* パキポディウム / 塊根 */}
      <div className="bg-gray-800/80 border border-gray-700/80 rounded-xl p-4 flex items-center gap-3 shadow-md">
        <div className="p-2.5 rounded-lg bg-lime-500/10 text-lime-400 border border-lime-500/20">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium">パキポ・塊根</p>
          <p className="text-xl font-bold text-gray-100">
            {pachyCount} <span className="text-xs font-normal text-gray-400">株</span>
          </p>
        </div>
      </div>

      {/* サボテン / その他 */}
      <div className="bg-gray-800/80 border border-gray-700/80 rounded-xl p-4 flex items-center gap-3 shadow-md">
        <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium">サボテン・他</p>
          <p className="text-xl font-bold text-gray-100">
            {cactusCount + Math.max(0, othersCount)}{' '}
            <span className="text-xs font-normal text-gray-400">株</span>
          </p>
        </div>
      </div>
    </div>
  );
};
