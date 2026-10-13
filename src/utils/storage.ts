import type { Plant, ManagementType } from '../types/plant';

const STORAGE_KEY = 'plant_id_manager_plants_v2';
const DRAFT_PREFIX = 'plant_form_draft_';

// 日付差分の計算ヘルパー（例: 水やりから何日経過したか）
export const getDaysSince = (dateString?: string): number => {
  if (!dateString) return 0;
  const target = new Date(dateString);
  if (isNaN(target.getTime())) return 0;
  const now = new Date();
  const diffTime = now.getTime() - target.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// 植え替え年月からの経過月数計算ヘルパー
export const getMonthsSince = (ymString?: string): number => {
  if (!ymString) return 0;
  const parts = ymString.split('-');
  if (parts.length < 2) return 0;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  if (isNaN(year) || isNaN(month)) return 0;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const diffMonths = (currentYear - year) * 12 + (currentMonth - month);
  return Math.max(0, diffMonths);
};

// 年月表示フォーマッター (例: 2026/05)
export const formatYearMonth = (dateOrYm?: string): string => {
  if (!dateOrYm) return '未記録';
  const ym = dateOrYm.slice(0, 7).replace(/-/g, '/');
  return ym || '未記録';
};

// 写真イメージ付きの初期サンプルデータ（画像UIを忠実に再現）
export const INITIAL_PLANTS: Plant[] = [
  {
    id: 'AGV-001',
    name: "Agave titanota 'Caesar'",
    japaneseName: 'アガベ・チタノタ シーザー',
    category: 'agave',
    lineageOrNursery: '台湾 Lize Gardner産',
    acquisitionDate: '2026-05',
    lastWateredDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3日前
    lastRepottedDate: '2026-05',
    repottingHistory: ['2026-05'],
    soilMix: '赤玉土4 : 鹿沼土3 : 軽石2 : くん炭1',
    potSize: 'プレステラ105 (深鉢)',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    notes: '鋸歯の厚み・うねり良好。育成LED照射12時間。トップスパインの発達が顕著。',
    createdAt: '2026-05-10T10:00:00.000Z',
    updatedAt: '2026-05-10T10:00:00.000Z',
  },
  {
    id: 'PAC-001',
    name: 'Pachypodium gracilius',
    japaneseName: 'パキポディウム・グラキリス (象牙宮)',
    category: 'caudex',
    lineageOrNursery: 'マダガスカル現地球・発根済',
    acquisitionDate: '2026-05',
    lastWateredDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5日前
    soilMix: '軽石5 : 赤玉土3 : 鹿沼土2 (排水重視)',
    potSize: '中川智治 作陶鉢 3.5号',
    imageUrl: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800&q=80',
    notes: '扁平良型。塊根部カチカチで健全。春〜秋は屋外直射日光、雨ざらし管理。',
    createdAt: '2026-05-10T14:30:00.000Z',
    updatedAt: '2026-05-10T14:30:00.000Z',
  },
  {
    id: 'EPI-001',
    name: 'Echinocactus grusonii',
    japaneseName: "金鯱 (ゴールデンバレル)",
    category: 'cactus',
    lineageOrNursery: '国内実生選抜株',
    acquisitionDate: '2026-05',
    lastWateredDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3日前
    soilMix: '硬質赤玉5 : 日向土3 : ゼオライト2',
    potSize: 'プレステラ105',
    imageUrl: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80',
    notes: '金色の鋭い刺が密生した美しい球体。通風最優先。日照要求度高。',
    createdAt: '2026-05-10T16:00:00.000Z',
    updatedAt: '2026-05-10T16:00:00.000Z',
  },
  {
    id: 'AGV-002',
    name: "Agave titanota 'White Fire'",
    japaneseName: 'アガベ・チタノタ 白火焔',
    category: 'agave',
    lineageOrNursery: '台湾株選抜',
    acquisitionDate: '2026-06',
    lastWateredDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    soilMix: '赤玉土4 : 鹿沼土3 : 軽石3',
    potSize: 'プレステラ90',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80',
    notes: '真っ白な鋸歯が美しく展開中。締めて育てるため水やり間隔を長めに設定。',
    createdAt: '2026-06-01T11:00:00.000Z',
    updatedAt: '2026-06-01T11:00:00.000Z',
  },
  {
    id: 'COP-001',
    name: "Copiapoa cinerea '黒王丸'",
    japaneseName: 'コピアポア・シネレア 黒王丸',
    category: 'cactus',
    lineageOrNursery: '山城愛仙園 実生株',
    acquisitionDate: '2026-06',
    lastWateredDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    soilMix: '硬質赤玉5 : 日向土3 : ゼオライト2',
    potSize: 'プレステラ90 (黒)',
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80',
    notes: '成長点付近から漆黒の強い棘が展開中。白粉の乗り良好。',
    createdAt: '2026-06-15T09:00:00.000Z',
    updatedAt: '2026-06-15T09:00:00.000Z',
  },
  {
    id: 'PAC-002',
    name: 'Pachypodium brevicaule',
    japaneseName: '恵比寿笑い (ブレビカウレ)',
    category: 'caudex',
    lineageOrNursery: '実生5年目株',
    acquisitionDate: '2026-07',
    lastWateredDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    soilMix: '赤玉土3 : 軽石5 : 鹿沼土2',
    potSize: '2.5号浅型信楽焼鉢',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    notes: '生姜のような扁平塊根。生長点多数。開花歴あり。',
    managementType: 'normal',
    createdAt: '2026-07-20T13:00:00.000Z',
    updatedAt: '2026-07-20T13:00:00.000Z',
  },
  // --- 実生苗 (種まき管理) サンプル ---
  {
    id: 'SDL-001',
    name: 'Pachypodium gracilius (実生)',
    japaneseName: 'パキポディウム・グラキリス 実生',
    category: 'caudex',
    managementType: 'seedling',
    lineageOrNursery: 'ドイツ Koehres (ケーレス) 種子',
    acquisitionDate: '2026-03',
    sowingDate: '2026-03',
    seedCount: 20,
    germinationCount: 16,
    lastWateredDate: new Date().toISOString().split('T')[0], // 今日水やり
    soilMix: '種まき専用微粒子土 : バーミキュライト (殺菌処理済)',
    potSize: '実生連結トレイ 24穴',
    imageUrl: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800&q=80',
    notes: '20粒播種し16粒発芽（発芽率80%）。腰水管理・パネルヒーター28℃・植物育成LED14時間照射。',
    createdAt: '2026-03-20T10:00:00.000Z',
    updatedAt: '2026-03-20T10:00:00.000Z',
  },
  {
    id: 'SDL-002',
    name: "Agave titanota 'Blue' (実生)",
    japaneseName: 'アガベ・チタノタ ブルー 実生',
    category: 'agave',
    managementType: 'seedling',
    lineageOrNursery: '国内ナーセリー 自家採取種子',
    acquisitionDate: '2026-04',
    sowingDate: '2026-04',
    seedCount: 10,
    germinationCount: 8,
    lastWateredDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    soilMix: '赤玉土微粒8 : 鹿沼土微粒2 (熱湯消毒)',
    potSize: 'プレステラ90',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    notes: '10粒播種。本葉1枚目が展開開始。微細な鋸歯が見え始める。腰水卒業・表土乾いたら霧吹き。',
    createdAt: '2026-04-01T09:00:00.000Z',
    updatedAt: '2026-04-01T09:00:00.000Z',
  },
];

export const loadPlantsFromStorage = (): Plant[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // 古いキー（v1）があれば移行を試みる
      const oldRaw = localStorage.getItem('plant_id_manager_plants_v1');
      if (oldRaw) {
        try {
          const oldParsed = JSON.parse(oldRaw);
          if (Array.isArray(oldParsed) && oldParsed.length > 0) {
            // カテゴリ・管理区分の自動補完
            const migrated = oldParsed.map((p: any) => ({
              ...p,
              managementType: p.managementType || (p.id.startsWith('SDL') || p.name.includes('実生') ? 'seedling' : 'normal'),
              category: p.category || (p.name.includes('アガベ') || p.id.startsWith('AGV') ? 'agave' : p.name.includes('パキポ') || p.id.startsWith('PAC') ? 'caudex' : 'cactus'),
              lastWateredDate: p.lastWateredDate || new Date().toISOString().split('T')[0],
              imageUrl: p.imageUrl || INITIAL_PLANTS[0].imageUrl,
            }));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
            return migrated;
          }
        } catch (_) {}
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PLANTS));
      return INITIAL_PLANTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // 既存データの managementType が未指定なら normal に補完、もし実生が0件なら INITIAL_PLANTS の実生データをマージ
      let hasSeedlings = false;
      const normalized = parsed.map((p: any) => {
        const type = p.managementType || (p.id.startsWith('SDL') || p.name.includes('実生') ? 'seedling' : 'normal');
        if (type === 'seedling') hasSeedlings = true;
        return {
          ...p,
          managementType: type,
        };
      });

      // 実生株がまだ1件もない場合はユーザーがすぐに試せるように初期実生サンプルを付加
      if (!hasSeedlings) {
        const seedlingSamples = INITIAL_PLANTS.filter((p) => p.managementType === 'seedling');
        const merged = [...normalized, ...seedlingSamples];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }

      return normalized;
    }
    return INITIAL_PLANTS;
  } catch (e) {
    console.error('LocalStorage読み込みエラー:', e);
    return INITIAL_PLANTS;
  }
};

export const savePlantsToStorage = (plants: Plant[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
  } catch (e) {
    console.error('LocalStorage保存エラー:', e);
  }
};

export const generateNextId = (prefix: string, plants: Plant[]): string => {
  const cleanPrefix = prefix.trim().toUpperCase();
  const pattern = new RegExp(`^${cleanPrefix}-(\\d+)$`, 'i');
  let maxNum = 0;

  for (const plant of plants) {
    const match = plant.id.match(pattern);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  }

  const nextNum = maxNum + 1;
  const padded = String(nextNum).padStart(3, '0');
  return `${cleanPrefix}-${padded}`;
};

// 子株(カキ仔)用の管理ID自動採番ヘルパー (例: AGV-001-P1, AGV-001-P2)
export const generatePupId = (parentId: string, plants: Plant[]): string => {
  const cleanParentId = parentId.trim().toUpperCase();
  const pattern = new RegExp(`^${cleanParentId}-P(\\d+)$`, 'i');
  let maxNum = 0;

  for (const plant of plants) {
    const match = plant.id.match(pattern);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  }

  return `${cleanParentId}-P${maxNum + 1}`;
};

export interface PlantDraft {
  id: string;
  name: string;
  japaneseName?: string;
  category: 'agave' | 'caudex' | 'shrub' | 'cactus' | 'other';
  managementType?: ManagementType;
  lineageOrNursery: string;
  acquisitionDate: string;
  lastWateredDate?: string;
  wateringHistory?: string[];
  lastRepottedDate?: string;
  repottingHistory?: string[];
  soilMix: string;
  potSize: string;
  imageUrl?: string;
  notes: string;
  sowingDate?: string;
  seedCount?: number;
  germinationCount?: number;
  parentPlantId?: string;
  parentPlantName?: string;
  harvestDate?: string;
  savedAt: string;
}

export const saveFormDraft = (draftKey: string, draft: Omit<PlantDraft, 'savedAt'>): void => {
  try {
    const fullDraft: PlantDraft = {
      ...draft,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(`${DRAFT_PREFIX}${draftKey}`, JSON.stringify(fullDraft));
  } catch (e) {
    console.error('下書き保存エラー:', e);
  }
};

export const loadFormDraft = (draftKey: string): PlantDraft | null => {
  try {
    const raw = localStorage.getItem(`${DRAFT_PREFIX}${draftKey}`);
    if (!raw) return null;
    return JSON.parse(raw) as PlantDraft;
  } catch (e) {
    console.error('下書き読み込みエラー:', e);
    return null;
  }
};

export const clearFormDraft = (draftKey: string): void => {
  try {
    localStorage.removeItem(`${DRAFT_PREFIX}${draftKey}`);
  } catch (e) {
    console.error('下書きクリアエラー:', e);
  }
};

// アプリ・ブランド名設定
const BRAND_NAME_KEY = 'gumi_plants_custom_brand_name';
export const DEFAULT_BRAND_NAME = 'gumi_plants';

export const loadBrandName = (): string => {
  try {
    const saved = localStorage.getItem(BRAND_NAME_KEY);
    if (saved && saved.trim()) {
      return saved.trim();
    }
  } catch (e) {
    console.error('ブランド名読み込みエラー:', e);
  }
  return DEFAULT_BRAND_NAME;
};

export const saveBrandName = (name: string): void => {
  try {
    const clean = name.trim() || DEFAULT_BRAND_NAME;
    localStorage.setItem(BRAND_NAME_KEY, clean);
  } catch (e) {
    console.error('ブランド名保存エラー:', e);
  }
};

// ヘッダーアイコン設定
const BRAND_ICON_KEY = 'gumi_plants_custom_brand_icon';
export const DEFAULT_BRAND_ICON = '🌿';
export const PRESET_ICONS = ['🌿', '🌱', '🌵', '🪴', '🌴', '🌲', '🍀', '🌸', '✨', '👑', '⚡', '☕'];

export const loadBrandIcon = (): string => {
  try {
    const saved = localStorage.getItem(BRAND_ICON_KEY);
    if (saved && saved.trim()) {
      return saved.trim();
    }
  } catch (e) {
    console.error('アイコン読み込みエラー:', e);
  }
  return DEFAULT_BRAND_ICON;
};

export const saveBrandIcon = (icon: string): void => {
  try {
    const clean = icon.trim() || DEFAULT_BRAND_ICON;
    localStorage.setItem(BRAND_ICON_KEY, clean);
  } catch (e) {
    console.error('アイコン保存エラー:', e);
  }
};

// フッター文言設定
const FOOTER_TEXT_KEY = 'gumi_plants_custom_footer_text';
export const DEFAULT_FOOTER_TEXT = 'アガベ / 塊根植物 / サボテン 個別写真・水やり履歴管理';

export const loadFooterText = (): string => {
  try {
    const saved = localStorage.getItem(FOOTER_TEXT_KEY);
    if (saved && saved.trim()) {
      return saved.trim();
    }
  } catch (e) {
    console.error('フッター文言読み込みエラー:', e);
  }
  return DEFAULT_FOOTER_TEXT;
};

export const saveFooterText = (text: string): void => {
  try {
    const clean = text.trim() || DEFAULT_FOOTER_TEXT;
    localStorage.setItem(FOOTER_TEXT_KEY, clean);
  } catch (e) {
    console.error('フッター文言保存エラー:', e);
  }
};

/**
 * どんな大きさの写真でも自動的に正方形(1:1)・256x256pxに中央クロップ＆リサイズする関数
 */
export const processIconImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const targetSize = 256;
          canvas.width = targetSize;
          canvas.height = targetSize;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          // 短い方の辺に合わせて中央から正方形に切り抜き
          const minSide = Math.min(img.width, img.height);
          const startX = (img.width - minSide) / 2;
          const startY = (img.height - minSide) / 2;

          ctx.drawImage(
            img,
            startX,
            startY,
            minSide,
            minSide,
            0,
            0,
            targetSize,
            targetSize
          );

          // 軽量なJPEG Data URL形式で出力 (容量節約)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        } catch (err) {
          console.error('画像処理エラー:', err);
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
    reader.readAsDataURL(file);
  });
};

const POT_SIZE_STORAGE_KEY = 'plant_id_manager_custom_pot_sizes';
const SOIL_MIX_STORAGE_KEY = 'plant_id_manager_custom_soil_mixes';

// ユーザーが入力したカスタム鉢・サイズ履歴を取得
export const getStoredPotSizes = (): string[] => {
  try {
    const raw = localStorage.getItem(POT_SIZE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// 新しい鉢・サイズを履歴に保存
export const saveStoredPotSize = (potSize: string): void => {
  const trimmed = potSize.trim();
  if (!trimmed) return;
  try {
    const existing = getStoredPotSizes();
    const updated = Array.from(new Set([trimmed, ...existing])).slice(0, 30);
    localStorage.setItem(POT_SIZE_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('鉢サイズの保存失敗:', e);
  }
};

// ユーザーが入力したカスタム用土配合履歴を取得
export const getStoredSoilMixes = (): string[] => {
  try {
    const raw = localStorage.getItem(SOIL_MIX_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// 新しい用土配合を履歴に保存
export const saveStoredSoilMix = (soilMix: string): void => {
  const trimmed = soilMix.trim();
  if (!trimmed) return;
  try {
    const existing = getStoredSoilMixes();
    const updated = Array.from(new Set([trimmed, ...existing])).slice(0, 30);
    localStorage.setItem(SOIL_MIX_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('用土配合の保存失敗:', e);
  }
};

const LINEAGE_STORAGE_KEY = 'plant_id_manager_custom_lineages';

// ユーザーが入力した血統・ナーセリー名履歴を取得
export const getStoredLineages = (): string[] => {
  try {
    const raw = localStorage.getItem(LINEAGE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// 新しい血統・ナーセリー名を履歴に保存
export const saveStoredLineage = (lineage: string): void => {
  const trimmed = lineage.trim();
  if (!trimmed) return;
  try {
    const existing = getStoredLineages();
    const updated = Array.from(new Set([trimmed, ...existing])).slice(0, 30);
    localStorage.setItem(LINEAGE_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('血統・ナーセリー名の保存失敗:', e);
  }
};
