// 植物の和名・通称 ↔ 学名・英名 変換マスター辞書

export interface PlantNameMaster {
  keywords: string[];
  scientificName: string;
  category: 'agave' | 'caudex' | 'shrub' | 'cactus' | 'euphorbia' | 'other';
  prefix: string;
}

// 主要なアガベ、塊根植物（パキポディウム等）、サボテン、ユーフォルビア、灌木の辞書マスター
export const PLANT_DICTIONARY: PlantNameMaster[] = [
  // --- パキポディウム (Pachypodium) ---
  {
    keywords: ['パキポディウムホロンベンセ', 'パキポディウム・ホロンベンセ', 'ホロンベンセ'],
    scientificName: 'Pachypodium "horombense"',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムグラキリス', 'パキポディウム・グラキリス', 'グラキリス', '象牙宮'],
    scientificName: 'Pachypodium gracilius',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムブレビカウレ', 'パキポディウム・ブレビカウレ', 'ブレビカウレ', '恵比寿笑い', 'エビスワライ'],
    scientificName: 'Pachypodium brevicaule',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムマカイエンセ', 'パキポディウム・マカイエンセ', 'マカイエンセ', '魔界玉'],
    scientificName: 'Pachypodium makayense',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムバロニー', 'パキポディウム・バロニー', 'バロニー'],
    scientificName: 'Pachypodium baronii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムウィンゾリー', 'パキポディウム・ウィンゾリー', 'ウィンゾリー'],
    scientificName: 'Pachypodium baronii var. windsorii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムデンシフローラム', 'パキポディウム・デンシフローラム', 'デンシフローラム', 'シバの女王の玉座'],
    scientificName: 'Pachypodium densiflorum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムイノピナツム', 'パキポディウム・イノピナツム', 'イノピナツム'],
    scientificName: 'Pachypodium inopinatum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムエブレネウム', 'パキポディウム・エブレネウム', 'エブレネウム'],
    scientificName: 'Pachypodium eburneum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムビスピノーサム', 'パキポディウム・ビスピノーサム', 'ビスピノーサム'],
    scientificName: 'Pachypodium bispinosum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムサキュレンタム', 'パキポディウム・サキュレンタム', 'サキュレンタム', '天馬空'],
    scientificName: 'Pachypodium succulentum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムラメリー', 'パキポディウム・ラメリー', 'ラメリー'],
    scientificName: 'Pachypodium lamerei',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムゲアイー', 'パキポディウム・ゲアイー', 'ゲアイー', '亜阿相界'],
    scientificName: 'Pachypodium geayi',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムナマクアナム', 'パキポディウム・ナマクアナム', 'ナマクアナム', '光堂'],
    scientificName: 'Pachypodium namaquanum',
    category: 'caudex',
    prefix: 'CDX',
  },

  // --- アガベ (Agave) ---
  {
    keywords: ['シーザー', 'チタノタシーザー', 'チタノタ・シーザー', '凱撒'],
    scientificName: "Agave titanota 'Caesar'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['白火焔', 'ホワイトファイヤー', 'チタノタ白火焔', 'チタノタ・白火焔'],
    scientificName: "Agave titanota 'White Fire'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['黒火焔', 'ブラックファイヤー', 'チタノタ黒火焔'],
    scientificName: "Agave titanota 'Black Fire'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['赤猫', 'レッドキャットウィーズル', 'レッドキャット'],
    scientificName: "Agave titanota 'Red Catweezle'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['ハデス', '恐竜牙歯', 'チタノタハデス'],
    scientificName: "Agave titanota 'Hades'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['悪魔くん', 'スーパーチタノタ', 'バケモノ'],
    scientificName: "Agave titanota 'Bakemono'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['白鯨', 'チタノタ白鯨', 'チタノタ・白鯨'],
    scientificName: "Agave titanota 'Hakugei'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['黒鯨', 'チタノタ黒鯨', 'チタノタ・黒鯨'],
    scientificName: "Agave titanota 'Kokugei'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['姫厳竜', '姫厳龍', 'チタノタ姫厳竜'],
    scientificName: "Agave titanota 'Hime Genryu'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['南アフリカダイヤモンド', 'SAD', 'チタノタSAD'],
    scientificName: "Agave titanota 'South Africa Diamond'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['シチリア', 'チタノタシチリア'],
    scientificName: "Agave titanota 'Sicilia'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['追星', 'コック', 'チタノタ追星'],
    scientificName: "Agave titanota 'Oisoboshi'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['皇冠', 'クラウン', 'チタノタ皇冠'],
    scientificName: "Agave titanota 'Crown'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['海王', 'チタノタ海王'],
    scientificName: "Agave titanota 'Kaioh'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['スナグルトゥース', 'チタノタスナグルトゥース'],
    scientificName: "Agave titanota 'Snaggle Tooth'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['アガベチタノタ', 'チタノタ', 'アガベ・チタノタ'],
    scientificName: 'Agave titanota',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['アガベオテロイ', 'オテロイ', 'アガベ・オテロイ'],
    scientificName: 'Agave oteroi',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['エボリスピナ', 'ユタエンシスエボリスピナ', 'ユタエンシス・エボリスピナ'],
    scientificName: 'Agave utahensis var. eborispina',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['ネバデンシス', 'ユタエンシスネバデンシス'],
    scientificName: 'Agave utahensis var. nevadensis',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['ユタエンシス', 'アガベユタエンシス'],
    scientificName: 'Agave utahensis',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['アガベホリダ', 'ホリダ(アガベ)'],
    scientificName: 'Agave horrida',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['パリー', 'トランカータ', '吉祥天'],
    scientificName: 'Agave parryi var. truncata',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['オバティフォリア', 'オバティフォーリア'],
    scientificName: 'Agave ovatifolia',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['モンタナ', 'アガベモンタナ'],
    scientificName: 'Agave montana',
    category: 'agave',
    prefix: 'AGV',
  },

  // --- ユーフォルビア (Euphorbia) ---
  {
    keywords: ['ユーフォルビアオベサ', 'ユーフォルビア・オベサ', 'オベサ'],
    scientificName: 'Euphorbia obesa',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ユーフォルビアホリダ', 'ユーフォルビア・ホリダ', 'ホリダ'],
    scientificName: 'Euphorbia horrida',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ユーフォルビアギラウミニアナ', 'ユーフォルビア・ギラウミニアナ', 'ギラウミニアナ'],
    scientificName: 'Euphorbia guillauminiana',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ユーフォルビアバリダ', 'ユーフォルビア・バリダ', 'バリダ'],
    scientificName: 'Euphorbia valida',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ユーフォルビアクラビゲラ', 'ユーフォルビア・クラビゲラ', 'クラビゲラ'],
    scientificName: 'Euphorbia clavigera',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['プセウドグロボーサ', '稚児キリン'],
    scientificName: 'Euphorbia pseudoglobosa',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['シンメトリカ', 'ユーフォルビアシンメトリカ'],
    scientificName: 'Euphorbia obesa ssp. symmetrica',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['トゥレアレンシス', 'ユーフォルビアトゥレアレンシス'],
    scientificName: 'Euphorbia tulearensis',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['フランコイシー', 'ユーフォルビアフランコイシー'],
    scientificName: 'Euphorbia francoisii',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ポイソニー', 'ユーフォルビアポイソニー'],
    scientificName: 'Euphorbia poissonii',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['鉄甲丸', 'ブプレウリフォリア'],
    scientificName: 'Euphorbia bupleurifolia',
    category: 'euphorbia',
    prefix: 'EUP',
  },

  // --- サボテン (Cactus) ---
  {
    keywords: ['黒王丸', 'コピアポア黒王丸', 'コピアポアシネレア', 'コピアポア・シネレア'],
    scientificName: "Copiapoa cinerea '黒王丸'",
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['孤竜丸', 'コルムナアルバ', 'コピアポアコルムナアルバ'],
    scientificName: 'Copiapoa cinerea var. columna-alba',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['逆鱗丸', 'コピアポアハセルトニアナ'],
    scientificName: 'Copiapoa haseltoniana',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['金鯱', 'エキノカクタス金鯱', 'ゴールデンバレル'],
    scientificName: 'Echinocactus grusonii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['太平丸', 'エキノカクタス太平丸'],
    scientificName: 'Echinocactus horizonthalonius',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['兜丸', 'アストロフィツム兜丸'],
    scientificName: 'Astrophytum asterias',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['瑠璃兜', 'ルリカブト'],
    scientificName: 'Astrophytum asterias f. nudum',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['鸞鳳玉', 'ランポー玉', 'アストロフィツム鸞鳳玉'],
    scientificName: 'Astrophytum myriostigma',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['亀甲牡丹', 'アリオカルプス亀甲牡丹'],
    scientificName: 'Ariocarpus fissuratus',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['玉牡丹', 'アリオカルプス玉牡丹'],
    scientificName: 'Ariocarpus retusus',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['帝冠', 'オブレゴニア帝冠'],
    scientificName: 'Obregonia denegrii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['鳥羽玉', 'ロフォフォラ鳥羽玉'],
    scientificName: 'Lophophora williamsii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['翠冠玉', 'ロフォフォラ翠冠玉'],
    scientificName: 'Lophophora diffusa',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['銀冠玉', 'ロフォフォラ銀冠玉'],
    scientificName: 'Lophophora fricii',
    category: 'cactus',
    prefix: 'COP',
  },

  // --- 塊根植物・灌木 (Caudex & Shrub) ---
  {
    keywords: ['オペルクリカリアパキプス', 'オペルクリカリア・パキプス', 'パキプス'],
    scientificName: 'Operculicarya pachypus',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['オペルクリカリアデカリー', 'オペルクリカリア・デカリー', 'デカリー'],
    scientificName: 'Operculicarya decaryi',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラモンストローサ', 'コミフォラ・モンストローサ', 'モンストローサ'],
    scientificName: 'Commiphora monstrosa',
    category: 'shrub',
    prefix: 'SHR',
  },
  {
    keywords: ['コミフォラカタフ', 'コミフォラ・カタフ', 'カタフ'],
    scientificName: 'Commiphora kataf',
    category: 'shrub',
    prefix: 'SHR',
  },
  {
    keywords: ['ボスウェリアネグレクタ', 'ボスウェリア・ネグレクタ', 'ネグレクタ'],
    scientificName: 'Boswellia neglecta',
    category: 'shrub',
    prefix: 'SHR',
  },
  {
    keywords: ['ボスウェリアサクラ', 'ボスウェリア・サクラ'],
    scientificName: 'Boswellia sacra',
    category: 'shrub',
    prefix: 'SHR',
  },
  {
    keywords: ['ブルセラファガロイデス', 'ブルセラ・ファガロイデス', 'ファガロイデス'],
    scientificName: 'Bursera fagaroides',
    category: 'shrub',
    prefix: 'SHR',
  },
  {
    keywords: ['センナメリディオナリス', 'センナ・メリディオナリス', 'センナ'],
    scientificName: 'Senna meridionalis',
    category: 'shrub',
    prefix: 'SHR',
  },
  {
    keywords: ['アデニアグロボーサ', 'アデニア・グロボーサ', 'グロボーサ'],
    scientificName: 'Adenia globosa',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['アデニアスピノーサ', 'アデニア・スピノーサ', 'スピノーサ'],
    scientificName: 'Adenia spinosa',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['亀甲竜', 'アフリカ亀甲竜', 'エレファンティペス'],
    scientificName: 'Dioscorea elephantipes',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['フォッケアエデュリス', '火星人'],
    scientificName: 'Fockea edulis',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['チレコドンレティキュラーツス', '万物想'],
    scientificName: 'Tylecodon reticulatus',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['チレコドンペアルソニー', '白象'],
    scientificName: 'Tylecodon pearsonii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['オトンナクラビフォリア', 'クラビフォリア'],
    scientificName: 'Othonna clavifolia',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ペラルゴニウムミラビレ', 'ミラビレ'],
    scientificName: 'Pelargonium mirabile',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['アデニウムオベスム', '砂漠の薔薇', 'オベスム'],
    scientificName: 'Adenium obesum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['アデニウムアラビカム', 'アラビカム'],
    scientificName: 'Adenium arabicum',
    category: 'caudex',
    prefix: 'CDX',
  },
];

// 文字列を正規化（ひらがな→カタカナ、空白・中黒・記号を除去）
export function normalizePlantQuery(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    // 全角ひらがなをカタカナに変換
    .replace(/[\u3041-\u3096]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60))
    // 記号や空白を除去（・、スペース、ハイフン、スラッシュ、引用符等）
    .replace(/[\s・\-_/／'"「」『』()（）]/g, '');
}

/**
 * 学名・品種名の表記整形（ユーザー指定ルール: horombense には必ず "" を付与する）
 */
export function formatScientificName(name: string): string {
  if (!name) return '';
  // horombense の前後にクォートがあってもなくても、必ず "horombense" に統一
  return name.replace(/["'“]?\bhorombense\b["'”]?/gi, '"horombense"');
}

/**
 * 入力された和名・通称から最もマッチする学名・英名情報を検索する
 * @param japaneseInput 和名・通称の入力文字列
 * @param existingPlants 過去に登録済みの株リスト（ユーザー学習履歴）
 */
export function lookupScientificName(
  japaneseInput: string,
  existingPlants: Array<{ japaneseName?: string; name: string; category?: any }> = []
): PlantNameMaster | null {
  const normInput = normalizePlantQuery(japaneseInput);
  if (!normInput || normInput.length < 2) return null;

  // 1. ユーザーの過去登録履歴を最優先で照合（学習機能）
  for (const plant of existingPlants) {
    if (plant.japaneseName && plant.name) {
      const normHist = normalizePlantQuery(plant.japaneseName);
      if (normHist && (normHist === normInput || normInput.includes(normHist) || normHist.includes(normInput))) {
        return {
          keywords: [plant.japaneseName],
          scientificName: formatScientificName(plant.name),
          category: plant.category || 'other',
          prefix: plant.name.includes('Agave') ? 'AGV' : 'CDX',
        };
      }
    }
  }

  // 2. 内蔵辞書との完全一致（正規化後）
  for (const entry of PLANT_DICTIONARY) {
    for (const kw of entry.keywords) {
      const normKw = normalizePlantQuery(kw);
      if (normKw === normInput) {
        return {
          ...entry,
          scientificName: formatScientificName(entry.scientificName),
        };
      }
    }
  }

  // 3. 内蔵辞書との部分一致（入力がキーワードを含むか、キーワードが入力を含む）
  // 例: 「パキポディウム・ホロンベンセ実生」→「パキポディウム・ホロンベンセ」が部分一致
  let bestMatch: PlantNameMaster | null = null;
  let maxMatchedLength = 0;

  for (const entry of PLANT_DICTIONARY) {
    for (const kw of entry.keywords) {
      const normKw = normalizePlantQuery(kw);
      if (normKw.length >= 2) {
        if (normInput.includes(normKw) || normKw.includes(normInput)) {
          // より長く一致した方を優先
          const matchedLen = Math.min(normInput.length, normKw.length);
          if (matchedLen > maxMatchedLength) {
            maxMatchedLength = matchedLen;
            bestMatch = {
              ...entry,
              scientificName: formatScientificName(entry.scientificName),
            };
          }
        }
      }
    }
  }

  return bestMatch;
}
