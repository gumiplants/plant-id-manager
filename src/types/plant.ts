export type PlantCategory = 'all' | 'agave' | 'caudex' | 'shrub' | 'cactus' | 'other';

export type ManagementType = 'normal' | 'seedling' | 'pup'; // normal: 通常株(コレクション), seedling: 実生苗(種まき管理), pup: 子株(カキ仔・増殖)

export type GridSize = 'large' | 'medium' | 'small';

export type Theme = 'dark' | 'light';

export interface Plant {
  id: string;                 // 管理ID (例: AGV-001, SDL-001)
  name: string;               // 植物名・品種名 (例: Agave titanota 'Caesar')
  japaneseName?: string;      // 日本語別名 (例: シーザー)
  category: 'agave' | 'caudex' | 'shrub' | 'cactus' | 'other'; // カテゴリ (アガベ / 塊根植物 / 灌木植物 / サボテン / その他)
  managementType?: ManagementType; // 管理区分 ('normal' | 'seedling' | 'pup')
  lineageOrNursery: string;   // 血統・ナーセリー名 / 種子元 (例: Koehres種子, 自家採取)
  acquisitionDate: string;    // 入手年月 / 播種年月 / 収穫年月 (YYYY-MM)
  lastWateredDate?: string;   // 最終水やり日 (YYYY-MM-DD)
  wateringHistory?: string[]; // 水やり履歴 (YYYY-MM-DD[])
  lastRepottedDate?: string;  // 最終植え替え日 (YYYY-MM)
  repottingHistory?: string[]; // 植え替え履歴 (YYYY-MM[])
  soilMix: string;            // 用土配合 (例: プレステラ専用配合, 種まき用土)
  potSize: string;            // 現在の鉢・サイズ / トレイ
  imageUrl?: string;          // 植物写真 (URLまたはBase64)
  notes: string;              // メモ (発芽状況、腰水管理など)
  createdAt: string;          // 登録日時 (ISO string)
  updatedAt: string;          // 更新日時 (ISO string)
  // 実生苗専用項目
  sowingDate?: string;        // 播種年月 (YYYY-MM)
  seedCount?: number;         // 播種粒数
  germinationCount?: number;  // 発芽数
  // 子株(カキ仔)専用項目
  parentPlantId?: string;     // 親株の管理ID (例: AGV-001)
  parentPlantName?: string;   // 親株の名称 (例: Agave titanota 'Caesar')
  harvestDate?: string;       // 親離れ・収穫年月 (YYYY-MM)
}

export type SortField = 'id' | 'name' | 'acquisitionDate' | 'createdAt' | 'watered' | 'repotted';
export type SortOrder = 'asc' | 'desc';
export type ViewMode = 'card' | 'table';
