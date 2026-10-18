// 植物の和名・通称 ↔ 学名・英名 変換マスター辞書＆自動変換エンジン（完全オフライン対応）

export interface PlantNameMaster {
  keywords: string[];
  scientificName: string;
  category: 'agave' | 'caudex' | 'shrub' | 'cactus' | 'euphorbia' | 'other';
  prefix: string;
}

// ============================================================================
// 1. 代表的な植物の固定マスター辞書 (PLANT_DICTIONARY)
// ============================================================================
export const PLANT_DICTIONARY: PlantNameMaster[] = [
  // --- パキポディウム (Pachypodium) ---
  {
    keywords: ['パキポディウムホロンベンセ', 'パキポディウム・ホロンベンセ', 'ホロンベンセ'],
    scientificName: 'Pachypodium "horombense"',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムグラキリス', 'パキポディウム・グラキリス', 'グラキリス', '象牙宮', 'パキポディウム象牙宮'],
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
    keywords: ['レウコキサンツム', '白花恵比寿笑い', 'パキポディウムレウコキサンツム', 'ブレビカウレレウコキサンツム'],
    scientificName: 'Pachypodium brevicaule var. leucoxanthum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['恵比寿大黒', 'エビスダイコク', 'パキポディウム恵比寿大黒'],
    scientificName: "Pachypodium × 'Ebisu Daikoku'",
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
    keywords: ['パキポディウムウィンゾリー', 'パキポディウム・ウィンゾリー', 'ウィンゾリー', 'ウインゾリー'],
    scientificName: 'Pachypodium baronii var. windsorii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムアンボンゲンセ', 'パキポディウム・アンボンゲンセ', 'アンボンゲンセ'],
    scientificName: 'Pachypodium ambongense',
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
    keywords: ['パキポディウムタッキー', 'パキポディウム・タッキー', 'タッキー'],
    scientificName: 'Pachypodium densiflorum var. takyi',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムイノピナツム', 'パキポディウム・イノピナツム', 'イノピナツム', 'イノピナーツム'],
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
    keywords: ['パキポディウムロスラツム', 'パキポディウム・ロスラツム', 'ロスラツム', 'ロスラーツム'],
    scientificName: 'Pachypodium rosulatum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムカクチペス', 'パキポディウム・カクチペス', 'カクチペス'],
    scientificName: 'Pachypodium cactipes',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムドラケイ', 'パキポディウム・ドラケイ', 'ドラケイ'],
    scientificName: 'Pachypodium drakei',
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
    keywords: ['パキポディウムラモスム', 'パキポディウム・ラモスム', 'ラモスム'],
    scientificName: 'Pachypodium ramosum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムゲアイー', 'パキポディウム・ゲアイー', 'ゲアイー', 'ゲアイ', '亜阿相界'],
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
  {
    keywords: ['パキポディウムサンデルシー', 'パキポディウム・サンデルシー', 'サンデルシー', '白馬城'],
    scientificName: 'Pachypodium saundersii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムレアリー', 'パキポディウム・レアリー', 'レアリー'],
    scientificName: 'Pachypodium lealii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムルテンベルギアヌム', 'ルテンベルギアヌム', 'ルテンベルギアナム'],
    scientificName: 'Pachypodium rutenbergianum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムソフィエンセ', 'ソフィエンセ'],
    scientificName: 'Pachypodium sofiense',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムメナベウム', 'メナベウム'],
    scientificName: 'Pachypodium menabeum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムデカリー', 'パキポディウム・デカリー'],
    scientificName: 'Pachypodium decaryi',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムブレビカリックス', 'ブレビカリックス'],
    scientificName: 'Pachypodium brevicalyx',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['パキポディウムマイクア', 'マイクア'],
    scientificName: 'Pachypodium mikea',
    category: 'caudex',
    prefix: 'CDX',
  },

  // --- アガベ (Agave) ---
  {
    keywords: ['シーザー', 'チタノタシーザー', 'チタノタ・シーザー', 'アガベチタノタシーザー', '凱撒'],
    scientificName: "Agave titanota 'Caesar'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['白火焔', 'ホワイトファイヤー', 'チタノタ白火焔', 'アガベチタノタ白火焔', 'ホワイトファイアー'],
    scientificName: "Agave titanota 'White Fire'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['黒火焔', 'ブラックファイヤー', 'チタノタ黒火焔', 'アガベチタノタ黒火焔', 'ブラックファイアー'],
    scientificName: "Agave titanota 'Black Fire'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['赤猫', 'レッドキャットウィーズル', 'レッドキャット', 'ゴリ猫', 'チタノタ赤猫', 'アガベチタノタ赤猫'],
    scientificName: "Agave titanota 'Red Catweezle'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['ハデス', '恐竜牙歯', '黒帝斯', 'チタノタハデス', 'アガベチタノタハデス'],
    scientificName: "Agave titanota 'Hades'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['悪魔くん', '悪魔', 'スーパーチタノタ', 'バケモノ', 'チタノタ悪魔くん', 'アガベチタノタ悪魔くん'],
    scientificName: "Agave titanota 'Bakemono'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['白鯨', 'チタノタ白鯨', 'アガベチタノタ白鯨', 'アガベ白鯨'],
    scientificName: "Agave titanota 'Hakugei'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['黒鯨', 'チタノタ黒鯨', 'アガベチタノタ黒鯨', 'アガベ黒鯨'],
    scientificName: "Agave titanota 'Kokugei'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['姫厳竜', '姫厳龍', 'チタノタ姫厳竜', 'チタノタ姫厳龍', 'アガベチタノタ姫厳竜'],
    scientificName: "Agave titanota 'Hime Genryu'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['厳竜', '厳龍', 'チタノタ厳竜', 'チタノタ厳龍', 'アガベチタノタ厳竜'],
    scientificName: "Agave titanota 'Genryu'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['夕映厳竜', 'ソーラーエクリプス', 'チタノタ夕映', '狂刺夕映'],
    scientificName: "Agave titanota 'Solar Eclipse'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['南アフリカダイヤモンド', 'SAD', 'チタノタSAD', 'アガベチタノタSAD', 'チタノタ南アフリカダイヤモンド'],
    scientificName: "Agave titanota 'South Africa Diamond'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['シチリア', 'チタノタシチリア', 'アガベチタノタシチリア'],
    scientificName: "Agave titanota 'Sicilia'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['追星', 'コック', 'チタノタ追星', 'チタノタコック', 'CG01', 'COK'],
    scientificName: "Agave titanota 'Cock'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['皇冠', 'クラウン', 'チタノタ皇冠', 'チタノタクラウン', 'アガベチタノタ皇冠'],
    scientificName: "Agave titanota 'Crown'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['海王', 'チタノタ海王', 'アガベチタノタ海王'],
    scientificName: "Agave titanota 'Kaioh'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['スナグルトゥース', 'チタノタスナグルトゥース', 'アガベチタノタスナグルトゥース'],
    scientificName: "Agave titanota 'Snaggle Tooth'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['ブラックアンドブルー', 'BB', 'チタノタBB', 'チタノタブラックアンドブルー', 'アガベBB'],
    scientificName: "Agave titanota 'Black and Blue'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['フィリグリー', '圓葉拇指', 'チタノタフィリグリー', 'アガベチタノタフィリグリー'],
    scientificName: "Agave titanota 'Filigree'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['白犀牛', 'ホワイトライノ', 'チタノタ白犀牛'],
    scientificName: "Agave titanota 'White Rhino'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['黒犀牛', 'ブラックライノ', 'チタノタ黒犀牛'],
    scientificName: "Agave titanota 'Black Rhino'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['緑犀牛', 'グリーンライノ', 'チタノタ緑犀牛'],
    scientificName: "Agave titanota 'Green Rhino'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['清櫻', '清桜', 'セオ', 'チタノタ清櫻', 'チタノタ清桜'],
    scientificName: "Agave titanota 'Seo'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['大白鯊', 'ホオジロザメ', 'チタノタ大白鯊'],
    scientificName: "Agave titanota 'Great White Shark'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['魔丸', 'チタノタ魔丸', 'アガベチタノタ魔丸'],
    scientificName: "Agave titanota 'Mamaru'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['阿修羅', 'チタノタ阿修羅', 'アガベチタノタ阿修羅'],
    scientificName: "Agave titanota 'Ashura'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['覇王竜', 'チタノタ覇王竜', 'アガベチタノタ覇王竜'],
    scientificName: "Agave titanota 'Tyrannosaurus'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['蟹', '螃蟹', 'チタノタ蟹', 'アガベチタノタ蟹'],
    scientificName: "Agave titanota 'Crab'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['狼人', 'チタノタ狼人', 'ウェアウルフ'],
    scientificName: "Agave titanota 'Werewolf'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['白幽霊', 'ホワイトゴースト(アガベ)', 'チタノタ白幽霊'],
    scientificName: "Agave titanota 'White Ghost'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['流星', 'チタノタ流星', 'アガベチタノタ流星'],
    scientificName: "Agave titanota 'Meteor'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['金剛', 'キングコング', 'チタノタ金剛', 'チタノタキングコング'],
    scientificName: "Agave titanota 'King Kong'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['烈焔', 'ブレイズ', 'チタノタ烈焔'],
    scientificName: "Agave titanota 'Blaze'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['白豪刺', 'チタノタ白豪刺'],
    scientificName: "Agave titanota 'Byakugoushi'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['ナンバーワン', '農大', '農大ナンバーワン', 'チタノタNo1'],
    scientificName: "Agave titanota 'No.1'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['FO076', 'チタノタFO076', 'アガベFO076'],
    scientificName: "Agave titanota 'FO-076'",
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
    keywords: ['エボリスピナ', 'ユタエンシスエボリスピナ', 'アガベエボリスピナ', 'アガベユタエンシスエボリスピナ'],
    scientificName: 'Agave utahensis var. eborispina',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['ネバデンシス', 'ユタエンシスネバデンシス', 'アガベネバデンシス'],
    scientificName: 'Agave utahensis var. nevadensis',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['カイバベンシス', 'ユタエンシスカイバベンシス'],
    scientificName: 'Agave utahensis var. kaibabensis',
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
    keywords: ['ペロテンシス', 'アガベペロテンシス', 'ホリダペロテンシス'],
    scientificName: 'Agave horrida ssp. perotensis',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['パリー', 'トランカータ', '吉祥天', 'パリートランカータ', 'アガベパリー', 'アガベトランカータ'],
    scientificName: 'Agave parryi var. truncata',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['ホーチエンシス', 'パリーホーチエンシス', '吉祥天ホーチエンシス'],
    scientificName: 'Agave parryi var. huachucensis',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['吉祥天錦', 'パリー錦', 'トランカータ錦'],
    scientificName: 'Agave parryi var. truncata f. variegata',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['オバティフォリア', 'オバティフォーリア', 'アガベオバティフォリア'],
    scientificName: 'Agave ovatifolia',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['オバティフォリアオルカ', 'オルカ', 'アガベオルカ'],
    scientificName: "Agave ovatifolia 'Orca'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['フロスティブルー', 'オバティフォリアフロスティブルー'],
    scientificName: "Agave ovatifolia 'Frosty Blue'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['モンタナ', 'アガベモンタナ'],
    scientificName: 'Agave montana',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['笹の雪', 'ササノユキ', 'アガベ笹の雪', 'ビクトリアレジーナ'],
    scientificName: 'Agave victoriae-reginae',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['氷山', 'アガベ氷山', '笹の雪氷山'],
    scientificName: "Agave victoriae-reginae 'Hyouzan'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['輝山', 'アガベ輝山', '笹の雪輝山'],
    scientificName: "Agave victoriae-reginae 'Kizan'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['雷神', 'アガベ雷神', 'ポタトラム'],
    scientificName: 'Agave potatorum',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['吉祥冠', 'アガベ吉祥冠'],
    scientificName: "Agave potatorum 'Kisshoukan'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['王妃雷神', 'アガベ王妃雷神'],
    scientificName: 'Agave potatorum var. verschaffeltii',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['ドラゴントゥース', 'ピグマエア', 'アガベドラゴントゥース'],
    scientificName: "Agave pygmaea 'Dragon Toes'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['ジェントリージョーズ', 'ジョーズ', 'アガベジョーズ', 'ジェントリー'],
    scientificName: "Agave gentryi 'Jaws'",
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['アテナータ', 'アガベアテナータ'],
    scientificName: 'Agave attenuata',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['マクロアカンサ', 'アガベマクロアカンサ'],
    scientificName: 'Agave macroacantha',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['コロラータ', 'アガベコロラータ'],
    scientificName: 'Agave colorata',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['アルボピロサ', 'アガベアルボピロサ'],
    scientificName: 'Agave albopilosa',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['ストリクタ', '吹上', 'アガベストリクタ', 'アガベ吹上'],
    scientificName: 'Agave stricta',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['シジゲラ', '滝の白糸', 'アガベシジゲラ'],
    scientificName: 'Agave schidigera',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['フィリフェラ', '乱れ雪', 'アガベフィリフェラ'],
    scientificName: 'Agave filifera',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['アメリカーナ', '竜舌蘭', 'アオノリュウゼツラン', 'アガベアメリカーナ'],
    scientificName: 'Agave americana',
    category: 'agave',
    prefix: 'AGV',
  },
  {
    keywords: ['華厳', 'アガベ華厳', 'アメリカーナ華厳'],
    scientificName: "Agave americana var. mediopicta 'Alba'",
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
    keywords: ['シンメトリカ', 'ユーフォルビアシンメトリカ', 'オベサシンメトリカ'],
    scientificName: 'Euphorbia obesa ssp. symmetrica',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ユーフォルビアホリダ', 'ユーフォルビア・ホリダ', 'ホリダ', '白衣ホリダ', 'ゲンコツホリダ'],
    scientificName: 'Euphorbia horrida',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ユーフォルビアポリゴナ', 'ポリゴナ'],
    scientificName: 'Euphorbia polygona',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['スノーフレーク', 'ポリゴナスノーフレーク', 'ユーフォルビアスノーフレーク'],
    scientificName: "Euphorbia polygona 'Snowflake'",
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
    keywords: ['ユーフォルビアバリダ', 'ユーフォルビア・バリダ', 'バリダ', 'スーパーバリダ'],
    scientificName: 'Euphorbia valida',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['メロフォルミス', '貴青玉', 'ユーフォルビアメロフォルミス'],
    scientificName: 'Euphorbia meloformis',
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
    keywords: ['プセウドグロボーサ', '稚児キリン', 'ユーフォルビアプセウドグロボーサ'],
    scientificName: 'Euphorbia pseudoglobosa',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['玉鱗宝', 'ユーフォルビアグロボーサ'],
    scientificName: 'Euphorbia globosa',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['トゥレアレンシス', 'ユーフォルビアトゥレアレンシス', 'チュレアレンシス'],
    scientificName: 'Euphorbia tulearensis',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['フランコイシー', 'ユーフォルビアフランコイシー', 'フランソワジー'],
    scientificName: 'Euphorbia francoisii',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['アンボボンベンシス', 'ユーフォルビアアンボボンベンシス'],
    scientificName: 'Euphorbia ambovombensis',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['カプサインテマリエンシス', 'ユーフォルビアカプサインテマリエンシス'],
    scientificName: 'Euphorbia capsaintemariensis',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['シリンドリフォリア', 'キリンドリフォリア', 'ユーフォルビアシリンドリフォリア'],
    scientificName: 'Euphorbia cylindrifolia',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ユーフォルビアデカリー', 'スピロスティグマ'],
    scientificName: 'Euphorbia decaryi',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ポイソニー', 'ユーフォルビアポイソニー', 'ポイゾニー'],
    scientificName: 'Euphorbia poissonii',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ベネニフィカ', 'ユーフォルビアベネニフィカ'],
    scientificName: 'Euphorbia venenifica',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ユニスピナ', 'ユーフォルビアユニスピナ'],
    scientificName: 'Euphorbia unispina',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['パキポディオイデス', 'ユーフォルビアパキポディオイデス'],
    scientificName: 'Euphorbia pachypodioides',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['鉄甲丸', 'ブプレウリフォリア', 'ユーフォルビア鉄甲丸', 'ユーフォルビアブプレウリフォリア'],
    scientificName: 'Euphorbia bupleurifolia',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['蘇鉄キリン', 'ソテツキリン', 'パイナップルコーン'],
    scientificName: 'Euphorbia × japonica',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['峨眉山', 'ガビザン', 'ユーフォルビア峨眉山'],
    scientificName: "Euphorbia 'Gabizan'",
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['怪魔玉', 'カイマギョク', 'ユーフォルビア怪魔玉'],
    scientificName: "Euphorbia 'Kaimagyoku'",
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['九頭竜', 'イネルミス', 'ユーフォルビアイネルミス', 'ユーフォルビア九頭竜'],
    scientificName: 'Euphorbia inermis',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['孔雀丸', 'フラナガニー', 'ユーフォルビアフラナガニー'],
    scientificName: 'Euphorbia flanaganii',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['金輪際', 'ゴルゴニス', 'ユーフォルビアゴルゴニス'],
    scientificName: 'Euphorbia gorgonis',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['飛竜', 'ステラータ', 'ユーフォルビアステラータ', 'ユーフォルビア飛竜'],
    scientificName: 'Euphorbia stellata',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['奇怪ヶ島', 'スクアローサ', 'ユーフォルビアスクアローサ'],
    scientificName: 'Euphorbia squarrosa',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ホワイトゴースト', 'ユーフォルビアホワイトゴースト', 'ラクテアホワイトゴースト'],
    scientificName: "Euphorbia lactea 'White Ghost'",
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['マハラジャ', 'ユーフォルビアマハラジャ', 'ラクテア綴化'],
    scientificName: 'Euphorbia lactea f. cristata',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['アブデルクリ', 'ユーフォルビアアブデルクリ'],
    scientificName: 'Euphorbia abdelkuri',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['デセプタ', 'ユーフォルビアデセプタ'],
    scientificName: 'Euphorbia decepta',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['ピスカデルマ', 'ピスキデルミス', 'ユーフォルビアピスカデルマ'],
    scientificName: 'Euphorbia piscidermis',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['瑠璃晃', 'スザンナエ', 'ユーフォルビアスザンナエ'],
    scientificName: 'Euphorbia susannae',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['紅彩閣', 'エノプラ', 'ユーフォルビア紅彩閣'],
    scientificName: 'Euphorbia enopla',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['群星冠', 'ステリスピナ', 'ユーフォルビア群星冠'],
    scientificName: 'Euphorbia stellispina',
    category: 'euphorbia',
    prefix: 'EUP',
  },
  {
    keywords: ['プラティクラダ', 'ゾンビプランツ', 'ユーフォルビアプラティクラダ'],
    scientificName: 'Euphorbia platyclada',
    category: 'euphorbia',
    prefix: 'EUP',
  },

  // --- サボテン (Cactus) ---
  {
    keywords: ['黒王丸', 'コピアポア黒王丸', 'コピアポアシネレア', 'コピアポア・シネレア', 'シネレア'],
    scientificName: "Copiapoa cinerea '黒王丸'",
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['孤竜丸', 'コルムナアルバ', 'コピアポアコルムナアルバ', 'コピアポア孤竜丸'],
    scientificName: 'Copiapoa cinerea var. columna-alba',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['逆鱗丸', 'ハセルトニアナ', 'コピアポアハセルトニアナ', 'コピアポア逆鱗丸'],
    scientificName: 'Copiapoa haseltoniana',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['黒士冠', 'デアルバータ', 'コピアポアデアルバータ', 'コピアポア黒士冠'],
    scientificName: 'Copiapoa dealbata',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['栗星玉', 'グリセオビオラセア', 'コピアポアグリセオビオラセア'],
    scientificName: 'Copiapoa griseoviolacea',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['ヒポガエア', 'コピアポアヒポガエア'],
    scientificName: 'Copiapoa hypogaea',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['テヌイシマ', 'コピアポアテヌイシマ'],
    scientificName: 'Copiapoa tenuissima',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['クラインジア', 'クラインジアナ', 'コピアポアクラインジア'],
    scientificName: 'Copiapoa krainziana',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['金鯱', 'エキノカクタス金鯱', 'ゴールデンバレル', 'グルソニー'],
    scientificName: 'Echinocactus grusonii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['太平丸', 'エキノカクタス太平丸', 'ホリゾンタロニウス', '雷帝', '翠平丸', 'ニコリー'],
    scientificName: 'Echinocactus horizonthalonius',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['兜丸', '兜', 'アストロフィツム兜丸', 'アストロフィツム兜', 'アステリアス'],
    scientificName: 'Astrophytum asterias',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['スーパー兜', 'アストロフィツムスーパー兜'],
    scientificName: "Astrophytum asterias 'Super Kabuto'",
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['ミラクル兜', 'アストロフィツムミラクル兜'],
    scientificName: "Astrophytum asterias 'Miracle Kabuto'",
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['瑠璃兜', 'ルリカブト', 'アストロフィツム瑠璃兜'],
    scientificName: 'Astrophytum asterias f. nudum',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['鸞鳳玉', 'ランポー玉', 'ランポー', 'アストロフィツム鸞鳳玉', 'ミリオスティグマ'],
    scientificName: 'Astrophytum myriostigma',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['恩塚鸞鳳玉', '恩塚ランポー', 'オンヅカランポー'],
    scientificName: "Astrophytum myriostigma 'Onzuka'",
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['碧瑠璃鸞鳳玉', 'ヘキラン', '碧鸞'],
    scientificName: 'Astrophytum myriostigma var. nudum',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['般若', 'アストロフィツム般若', 'オルナツム'],
    scientificName: 'Astrophytum ornatum',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['瑞鳳玉', 'カプリコルネ', 'アストロフィツム瑞鳳玉'],
    scientificName: 'Astrophytum capricorne',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['亀甲牡丹', 'アリオカルプス亀甲牡丹', 'フィスラツス'],
    scientificName: 'Ariocarpus fissuratus',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['ゴジラ', '亀甲牡丹ゴジラ', 'アリオカルプスゴジラ'],
    scientificName: "Ariocarpus fissuratus 'Godzilla'",
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['玉牡丹', '岩牡丹', 'アリオカルプス玉牡丹', 'レツーサス'],
    scientificName: 'Ariocarpus retusus',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['三角牡丹', 'トリゴヌス', 'アリオカルプス三角牡丹'],
    scientificName: 'Ariocarpus trigonus',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['花牡丹', 'フルフラセウス', 'アリオカルプス花牡丹'],
    scientificName: 'Ariocarpus retusus var. furfuraceus',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['黒牡丹', 'アリオカルプス黒牡丹', 'コッツチョウベヤヌス'],
    scientificName: 'Ariocarpus kotschoubeyanus',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['姫牡丹', 'アガボイデス', 'アリオカルプス姫牡丹'],
    scientificName: 'Ariocarpus agavoides',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['帝冠', 'オブレゴニア帝冠', 'デネグリー'],
    scientificName: 'Obregonia denegrii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['晃山', 'レウクテンベルギア晃山', 'プリンキピス'],
    scientificName: 'Leuchtenbergia principis',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['鳥羽玉', '烏羽玉', 'ロフォフォラ鳥羽玉', 'ロフォフォラ烏羽玉', 'ウィリアムシー'],
    scientificName: 'Lophophora williamsii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['翠冠玉', 'ロフォフォラ翠冠玉', 'ディフーサ'],
    scientificName: 'Lophophora diffusa',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['銀冠玉', 'ロフォフォラ銀冠玉', 'フリッチー'],
    scientificName: 'Lophophora fricii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['緋牡丹', '緋牡丹錦', 'ミハノビッチ', 'ギムノカリキウム緋牡丹', 'ギムノカリキウム緋牡丹錦'],
    scientificName: 'Gymnocalycium mihanovichii f. variegata',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['LB2178', 'ギムノカリキウムLB2178', '牡丹玉LB2178'],
    scientificName: "Gymnocalycium friedrichii 'LB2178'",
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['牡丹玉', 'フリードリッヒ', 'ギムノカリキウム牡丹玉'],
    scientificName: 'Gymnocalycium friedrichii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['天平丸', 'スペガッツィーニ', 'ギムノカリキウム天平丸'],
    scientificName: 'Gymnocalycium spegazzinii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['光琳玉', 'カルデナシアナム', 'ギムノカリキウム光琳玉'],
    scientificName: 'Gymnocalycium cardenasianum',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['海王丸', 'デヌダツム', 'ギムノカリキウム海王丸'],
    scientificName: 'Gymnocalycium denudatum',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['バッテリー', 'ギムノカリキウムバッテリー'],
    scientificName: 'Gymnocalycium vatteri',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['新天地', 'サグリオニス', 'ギムノカリキウム新天地'],
    scientificName: 'Gymnocalycium saglionis',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['白星', 'マミラリア白星', 'プルモーサ'],
    scientificName: 'Mammillaria plumosa',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['姫春星', 'マミラリア姫春星', 'フンボルティ'],
    scientificName: 'Mammillaria humboldtii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['カルメナエ', 'マミラリアカルメナエ'],
    scientificName: 'Mammillaria carmenae',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['ヘルナンデシー', 'マミラリアヘルナンデシー'],
    scientificName: 'Mammillaria hernandezii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['テレサエ', 'マミラリアテレサエ'],
    scientificName: 'Mammillaria theresae',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['ルエッティ', 'マミラリアルエッティ'],
    scientificName: 'Mammillaria luethyi',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['菊水', 'ストロンボカクタス菊水', 'ディスキフォルミス'],
    scientificName: 'Strombocactus disciformis',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['花籠', 'アズテキウム花籠', 'リッテリ'],
    scientificName: 'Aztekium ritteri',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['ヒントニー', 'アズテキウムヒントニー'],
    scientificName: 'Aztekium hintonii',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['ペクチニフェラ', 'ユーベルマニアペクチニフェラ'],
    scientificName: 'Uebelmannia pectinifera',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['精巧丸', 'ペレキフォラ精巧丸', 'アセリフォルミス'],
    scientificName: 'Pelecyphora aselliformis',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['精巧殿', 'ツルビニカルプス精巧殿'],
    scientificName: 'Turbinicarpus pseudopectinatus',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['月世界', 'エピテランサ月世界'],
    scientificName: 'Epithelantha micromeris',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['ゲオメトリクス', 'テフロカクタスゲオメトリクス'],
    scientificName: 'Tephrocactus geometricus',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['武蔵野', 'テフロカクタス武蔵野'],
    scientificName: 'Tephrocactus articulatus var. papyracanthus',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['竜神木', 'ミルチロカクタス竜神木'],
    scientificName: 'Myrtillocactus geometrizans',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['福禄竜神木'],
    scientificName: 'Myrtillocactus geometrizans f. cristata',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['王冠竜', 'フェロカクタス王冠竜'],
    scientificName: 'Ferocactus glaucescens',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['神仙玉', 'フェロカクタス神仙玉'],
    scientificName: 'Ferocactus gracilis',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['日の出丸', 'フェロカクタス日の出丸'],
    scientificName: 'Ferocactus latispinus',
    category: 'cactus',
    prefix: 'COP',
  },
  {
    keywords: ['綾波', 'ホマロケファラ綾波'],
    scientificName: 'Homalocephala texensis',
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
    keywords: ['オペルクリカリアヒファエノイデス', 'オペルクリカリア・ヒファエノイデス', 'ヒファエノイデス'],
    scientificName: 'Operculicarya hyphaenoides',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['オペルクリカリアボレアリス', 'オペルクリカリア・ボレアリス', 'ボレアリス'],
    scientificName: 'Operculicarya borealis',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['オペルクリカリアヒルスタ', 'ヒルスタ'],
    scientificName: 'Operculicarya hirsuta',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラモンストローサ', 'コミフォラ・モンストローサ', 'モンストローサ'],
    scientificName: 'Commiphora monstrosa',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラカタフ', 'コミフォラ・カタフ', 'カタフ', 'ピュアカタフ'],
    scientificName: 'Commiphora kataf',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['カタフターカネンシス', 'ターカネンシス', 'コミフォラターカネンシス'],
    scientificName: 'Commiphora kataf var. turkanensis',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラエイル', 'コミフォラ・エイル', 'エイル'],
    scientificName: "Commiphora sp. 'Eyl'",
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラホルトジアナ', 'ホルトジアナ'],
    scientificName: 'Commiphora holtziana',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラオルビクラリス', 'オルビクラリス'],
    scientificName: 'Commiphora orbicularis',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラグイドッティ', 'グイドッティ'],
    scientificName: 'Commiphora guidottii',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラミルラ', 'ミルラ'],
    scientificName: 'Commiphora myrrha',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラアフリカーナ', 'アフリカーナ'],
    scientificName: 'Commiphora africana',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラフォリアセア', 'フォリアセア'],
    scientificName: 'Commiphora foliacea',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラシンプリキフォリア', 'シンプリキフォリア'],
    scientificName: 'Commiphora simplicifolia',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラワイティ', 'ワイティ'],
    scientificName: 'Commiphora wightii',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラカペンシス'],
    scientificName: 'Commiphora capensis',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['コミフォラセルビフォリア', 'セルビフォリア'],
    scientificName: 'Commiphora cervifolia',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['ボスウェリアネグレクタ', 'ボスウェリア・ネグレクタ', 'ネグレクタ'],
    scientificName: 'Boswellia neglecta',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['ボスウェリアサクラ', 'ボスウェリア・サクラ'],
    scientificName: 'Boswellia sacra',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['ボスウェリアナナ', 'ボスウェリア・ナナ'],
    scientificName: 'Boswellia nana',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['ボスウェリアソコトラナ', 'ソコトラナ'],
    scientificName: 'Boswellia socotrana',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['ボスウェリアアメーロ', 'アメーロ'],
    scientificName: 'Boswellia ameero',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['ボスウェリアエロンガータ', 'エロンガータ'],
    scientificName: 'Boswellia elongata',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['ボスウェリアディオスコリディス', 'ディオスコリディス'],
    scientificName: 'Boswellia dioscoridis',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['ボスウェリアフレレアナ', 'フレレアナ'],
    scientificName: 'Boswellia frereana',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['ブルセラファガロイデス', 'ブルセラ・ファガロイデス', 'ファガロイデス'],
    scientificName: 'Bursera fagaroides',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['ブルセラミクロフィラ', 'ミクロフィラ'],
    scientificName: 'Bursera microphylla',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['ブルセラヒンドシアナ', 'ヒンドシアナ'],
    scientificName: 'Bursera hindsiana',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['パキコルムスディスカラー', '象の木', 'ディスカラー'],
    scientificName: 'Pachycormus discolor',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['センナメリディオナリス', 'センナ・メリディオナリス', 'センナ', 'メリディオナリス'],
    scientificName: 'Senna meridionalis',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['フォークイエリアコルムナリス', '観峰玉', 'コルムナリス'],
    scientificName: 'Fouquieria columnaris',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['フォークイエリアプルプシー', 'プルプシー'],
    scientificName: 'Fouquieria purpusii',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['フォークイエリアファシクラータ', 'ファシクラータ'],
    scientificName: 'Fouquieria fasciculata',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['フォークイエリアディグエティ', 'ディグエティ'],
    scientificName: 'Fouquieria diguetii',
    category: 'shrub',
    prefix: 'CDX',
  },
  {
    keywords: ['フォークイエリアマクドウガリー', 'マクドウガリー'],
    scientificName: 'Fouquieria macdougallii',
    category: 'shrub',
    prefix: 'CDX',
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
    keywords: ['アデニアグラウカ', '幻蝶かずら', 'グラウカ'],
    scientificName: 'Adenia glauca',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['アデニアペチュエリー', 'ペチュエリー'],
    scientificName: 'Adenia pechuelii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['アデニアバリー', 'バリー'],
    scientificName: 'Adenia ballyi',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['アデニアペリエリー', 'ペリエリー'],
    scientificName: 'Adenia perrieri',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['アデニアキルキー', 'キルキー'],
    scientificName: 'Adenia kirkii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['アデニアステイロフィラ', 'ステイロフィラ', 'スタイローサ'],
    scientificName: 'Adenia stylosa',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['アデニアエピゲア', 'エピゲア'],
    scientificName: 'Adenia epigea',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ドルステニアギガス', 'ドルステニア・ギガス', 'ギガス'],
    scientificName: 'Dorstenia gigas',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ドルステニアフォエチダ', 'ドルステニア・フォエチダ', 'フォエチダ'],
    scientificName: 'Dorstenia foetida',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ドルステニアホルウッディ', 'ホルウッディ'],
    scientificName: 'Dorstenia horwoodii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ドルステニアラブラニー', 'ラブラニー'],
    scientificName: 'Dorstenia lavrani',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ドルステニアクリスパ', 'クリスパ'],
    scientificName: 'Dorstenia crispa',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ドルステニアバルニミアナ', 'バルニミアナ'],
    scientificName: 'Dorstenia barnimiana',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['亀甲竜', 'アフリカ亀甲竜', 'エレファンティペス', 'ディオスコレアエレファンティペス'],
    scientificName: 'Dioscorea elephantipes',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['メキシコ亀甲竜', 'ディオスコレアメキシカーナ'],
    scientificName: 'Dioscorea mexicana',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['シルバチカ', 'ディオスコレアシルバチカ'],
    scientificName: 'Dioscorea sylvatica',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['フォッケアエデュリス', '火星人', 'エデュリス'],
    scientificName: 'Fockea edulis',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['フォッケアカペンシス'],
    scientificName: 'Fockea capensis',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['チレコドンレティキュラーツス', '万物想', 'レティキュラーツス', 'レティキュラータス'],
    scientificName: 'Tylecodon reticulatus',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['チレコドンペアルソニー', '白象', 'ペアルソニー'],
    scientificName: 'Tylecodon pearsonii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['チレコドンパニクラーツス', '阿房宮', 'パニクラーツス', 'パニクラータス'],
    scientificName: 'Tylecodon paniculatus',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['チレコドンワリチー', '奇峰錦', 'ワリチー'],
    scientificName: 'Tylecodon wallichii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['チレコドンブッコルジアヌス', 'ブッコルジアヌス'],
    scientificName: 'Tylecodon buchholzianus',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['チレコドンシェーフェリアヌス', 'シェーフェリアヌス'],
    scientificName: 'Tylecodon schaeferianus',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['チレコドンスルフレウス', 'スルフレウス'],
    scientificName: 'Tylecodon sulphureus',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['チレコドンノルティ', 'ノルティ'],
    scientificName: 'Tylecodon nolteei',
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
    keywords: ['オトンナカカリオイデス', 'カカリオイデス'],
    scientificName: 'Othonna cacalioides',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['オトンナユーフォルビオイデス', '黒鬼城', 'ユーフォルビオイデス'],
    scientificName: 'Othonna euphorbioides',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['オトンナヘレイ', '蛮鬼塔', 'ヘレイ'],
    scientificName: 'Othonna herrei',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['オトンナレトロフラクタ', 'レトロフラクタ'],
    scientificName: 'Othonna retrofracta',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['オトンナアルミアナ', 'アルミアナ'],
    scientificName: 'Othonna armiana',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['オトンナフルカタ', 'フルカタ'],
    scientificName: 'Othonna furcata',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['オトンナトリプリネルビア', 'トリプリネルビア'],
    scientificName: 'Othonna triplinervia',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['オトンナロバタ', 'ロバタ'],
    scientificName: 'Othonna lobata',
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
    keywords: ['ペラルゴニウムトリステ', 'トリステ'],
    scientificName: 'Pelargonium triste',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ペラルゴニウムカルノーサム', 'カルノーサム'],
    scientificName: 'Pelargonium carnosum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ペラルゴニウムクリツミフォリウム', 'クリツミフォリウム'],
    scientificName: 'Pelargonium crithmifolium',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ペラルゴニウムアッペンディクラツム', 'アッペンディクラツム'],
    scientificName: 'Pelargonium appendiculatum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ペラルゴニウムアルテルナンス', 'アルテルナンス'],
    scientificName: 'Pelargonium alternans',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ケラリアピグマエア', 'ケラリア・ピグマエア', 'ピグマエア(ケラリア)'],
    scientificName: 'Ceraria pygmaea',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ケラリアナマクエンシス', 'ナマクエンシス'],
    scientificName: 'Ceraria namaquensis',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['サルコカウロンヘレー', 'モンソニアヘレー', '竜骨城'],
    scientificName: 'Monsonia herrei',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['サルコカウロンムルチフィズム', 'モンソニアムルチフィダ', 'ムルチフィズム', 'ムルチフィダ'],
    scientificName: 'Monsonia multifida',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['サルコカウロンバンデリエティアエ', 'モンソニアバンデリエティアエ', 'バンデリエティアエ'],
    scientificName: 'Monsonia vanderietiae',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['サルコカウロンペニクリナム', 'モンソニアペニクリナム', 'ペニクリナム'],
    scientificName: 'Monsonia peniculina',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['サルコカウロンクラシカウレ', 'モンソニアクラシカウレ', 'クラシカウレ'],
    scientificName: 'Monsonia crassicaule',
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
  {
    keywords: ['アデニウムソコトラナム', 'ソコトラナム'],
    scientificName: 'Adenium socotranum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ステファニアエレクタ', 'エレクタ'],
    scientificName: 'Stephania erecta',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ステファニアスベローサ', 'スベローサ'],
    scientificName: 'Stephania suberosa',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ステファニアヴェノサ', 'ヴェノサ', 'ベノサ'],
    scientificName: 'Stephania venosa',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['フィランサスミラビリス', 'ミラビリス'],
    scientificName: 'Phyllanthus mirabilis',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ヤトロファポダグリカ', '珊瑚油桐', 'サンゴアブラギリ', 'ポダグリカ'],
    scientificName: 'Jatropha podagrica',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ヤトロファベルランディエリ', '錦珊瑚', 'ベルランディエリ'],
    scientificName: 'Jatropha berlandieri',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['断崖の女王', 'シンニンギアレウコトリカ', 'レウコトリカ'],
    scientificName: 'Sinningia leucotricha',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['シンニンギアブルラータ', 'ブルラータ'],
    scientificName: 'Sinningia bullata',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['眠り布袋', 'ゲラルダンサスマクロリザス', 'マクロリザス'],
    scientificName: 'Gerrardanthus macrorhizus',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['イポメアホルビー', 'ホルビー'],
    scientificName: 'Ipomoea holubii',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ボンバックスエリプチカム', 'プセウドボンバックスエリプチカム', 'エリプチカム', 'ボンバックス'],
    scientificName: 'Pseudobombax ellipticum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['バオバブ', 'アダンソニアディギタータ', 'ディギタータ'],
    scientificName: 'Adansonia digitata',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ウンカリーナルーズリアナ', 'ルーズリアナ'],
    scientificName: 'Uncarina roeoesliana',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['サイフォステマユッタエ', 'キフォステンマユッタエ', 'ユッタエ', '葡萄甕'],
    scientificName: 'Cyphostemma juttae',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['サイフォステマベティフォルメ', 'キフォステンマベティフォルメ', 'ベティフォルメ'],
    scientificName: 'Cyphostemma betiforme',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['サイフォステママクロプス', 'キフォステンママクロプス', 'マクロプス'],
    scientificName: 'Cyphostemma macropus',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['メストクレマツベローサム', 'ツベローサム'],
    scientificName: 'Mestoklema tuberosum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['トリコディアデマブルボーサム', 'ブルボーサム'],
    scientificName: 'Trichodiadema bulbosum',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['アルブカスピラリス', 'フリズルシズル', 'スピラリス'],
    scientificName: "Albuca spiralis 'Frizzle Sizzle'",
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['シゾバシスイントリカータ', 'イントリカータ'],
    scientificName: 'Schizobasis intricata',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ブーファンディスティチャ', '太閤秀吉', 'ディスティチャ', 'ディスティカ'],
    scientificName: 'Boophone disticha',
    category: 'caudex',
    prefix: 'CDX',
  },
  {
    keywords: ['ブーファンハエマンソイデス', 'ハエマンソイデス'],
    scientificName: 'Boophone haemanthoides',
    category: 'caudex',
    prefix: 'CDX',
  },

  // --- ハオルチア・アロエ・その他多肉・ビカクシダ等 (Other) ---
  {
    keywords: ['オブツーサ', 'ハオルチアオブツーサ', '雫石', 'トゥルンカータ'],
    scientificName: 'Haworthia cooperi var. truncata',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['玉扇', 'ハオルチア玉扇'],
    scientificName: 'Haworthia truncata',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['万象', 'ハオルチア万象', 'モーガニー'],
    scientificName: 'Haworthia maughanii',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['ピクタ', 'ハオルチアピクタ'],
    scientificName: 'Haworthia picta',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['十二の巻', 'ハオルチア十二の巻'],
    scientificName: 'Haworthia fasciata',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['アロエポリフィラ', 'ポリフィラ', 'スパイラルアロエ'],
    scientificName: 'Aloe polyphylla',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['アロエプリカティリス', 'プリカティリス'],
    scientificName: 'Aloe plicatilis',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['アロエディコトマ', 'ディコトマ'],
    scientificName: 'Aloe dichotoma',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['アロエラモシシマ', 'ラモシシマ'],
    scientificName: 'Aloe ramosissima',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['アロエエリナケア', 'エリナケア'],
    scientificName: 'Aloe erinacea',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['アロエカスティロニアエ', 'カスティロニアエ'],
    scientificName: 'Aloe castilloniae',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['臥牛', 'ガステリア臥牛', 'アームストロンギー'],
    scientificName: 'Gasteria armstrongii',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['ディッキアゴエリンギー', 'ゴエリンギー'],
    scientificName: 'Dyckia goehringii',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['マルニエルラポストレイ', 'ディッキアマルニエルラポストレイ'],
    scientificName: 'Dyckia marnier-lapostollei',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['エンセファラルトスホリダス', 'ホリダス'],
    scientificName: 'Encephalartos horridus',
    category: 'other',
    prefix: 'CDX',
  },
  {
    keywords: ['ユッカロストラータ', 'ロストラータ'],
    scientificName: 'Yucca rostrata',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['ユッカリギダ', 'リギダ'],
    scientificName: 'Yucca rigida',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['ビカクシダリドレイ', 'リドレイ', 'プラティセリウムリドレイ'],
    scientificName: 'Platycerium ridleyi',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['ビカクシダウィリンキー', 'ウィリンキー', 'プラティセリウムウィリンキー'],
    scientificName: 'Platycerium willinckii',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['ビカクシダビフルカツム', 'ビフルカツム', 'コウモリラン'],
    scientificName: 'Platycerium bifurcatum',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['ビカクシダコロナリウム', 'コロナリウム'],
    scientificName: 'Platycerium coronarium',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['ビカクシダマダガスカリエンセ', 'マダガスカリエンセ'],
    scientificName: 'Platycerium madagascariense',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['ビカクシダエレファントティス', 'エレファントティス'],
    scientificName: 'Platycerium elephantotis',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['ビカクシダビーチー', 'ベイチー', 'ビーチー'],
    scientificName: 'Platycerium veitchii',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['サンスベリアピングイキュラ', 'ピングイキュラ'],
    scientificName: 'Sansevieria pinguicula',
    category: 'other',
    prefix: 'AGV',
  },
  {
    keywords: ['サンスベリアロリダ', 'ロリダ'],
    scientificName: 'Sansevieria rorida',
    category: 'other',
    prefix: 'AGV',
  },
];

// ============================================================================
// 2. 属名・上位分類パーツ辞書 (GENUS_PREFIX_LIST)
// 長いキーワードから順にマッチさせるため配列で定義
// ============================================================================
interface GenusEntry {
  kana: string;
  latin: string;
  category: PlantNameMaster['category'];
  prefix: string;
  isSpeciesBase?: boolean; // trueの場合、後続の園芸品種名を '' で囲むか判断する補助
}

const RAW_GENUS_ENTRIES: GenusEntry[] = [
  // 複合ベース（属＋種）
  { kana: 'アガベチタノタ', latin: 'Agave titanota', category: 'agave', prefix: 'AGV', isSpeciesBase: true },
  { kana: 'アガベオテロイ', latin: 'Agave oteroi', category: 'agave', prefix: 'AGV', isSpeciesBase: true },
  { kana: 'アガベユタエンシス', latin: 'Agave utahensis', category: 'agave', prefix: 'AGV', isSpeciesBase: true },
  { kana: 'アガベパリー', latin: 'Agave parryi', category: 'agave', prefix: 'AGV', isSpeciesBase: true },
  { kana: 'アガベオバティフォリア', latin: 'Agave ovatifolia', category: 'agave', prefix: 'AGV', isSpeciesBase: true },
  { kana: 'アガベポタトラム', latin: 'Agave potatorum', category: 'agave', prefix: 'AGV', isSpeciesBase: true },
  { kana: 'アガベビクトリアレジーナ', latin: 'Agave victoriae-reginae', category: 'agave', prefix: 'AGV', isSpeciesBase: true },
  { kana: 'アガベ笹の雪', latin: 'Agave victoriae-reginae', category: 'agave', prefix: 'AGV', isSpeciesBase: true },

  // 塊根・灌木
  { kana: 'パキポディウム', latin: 'Pachypodium', category: 'caudex', prefix: 'CDX' },
  { kana: 'パキポジューム', latin: 'Pachypodium', category: 'caudex', prefix: 'CDX' },
  { kana: 'オペルクリカリア', latin: 'Operculicarya', category: 'caudex', prefix: 'CDX' },
  { kana: 'コミフォラ', latin: 'Commiphora', category: 'shrub', prefix: 'CDX' },
  { kana: 'ボスウェリア', latin: 'Boswellia', category: 'shrub', prefix: 'CDX' },
  { kana: 'ブルセラ', latin: 'Bursera', category: 'shrub', prefix: 'CDX' },
  { kana: 'フォークイエリア', latin: 'Fouquieria', category: 'shrub', prefix: 'CDX' },
  { kana: 'パキコルムス', latin: 'Pachycormus', category: 'shrub', prefix: 'CDX' },
  { kana: 'センナ', latin: 'Senna', category: 'shrub', prefix: 'CDX' },
  { kana: 'アデニア', latin: 'Adenia', category: 'caudex', prefix: 'CDX' },
  { kana: 'アデニウム', latin: 'Adenium', category: 'caudex', prefix: 'CDX' },
  { kana: 'ドルステニア', latin: 'Dorstenia', category: 'caudex', prefix: 'CDX' },
  { kana: 'チレコドン', latin: 'Tylecodon', category: 'caudex', prefix: 'CDX' },
  { kana: 'オトンナ', latin: 'Othonna', category: 'caudex', prefix: 'CDX' },
  { kana: 'ペラルゴニウム', latin: 'Pelargonium', category: 'caudex', prefix: 'CDX' },
  { kana: 'ケラリア', latin: 'Ceraria', category: 'caudex', prefix: 'CDX' },
  { kana: 'サルコカウロン', latin: 'Monsonia', category: 'caudex', prefix: 'CDX' },
  { kana: 'モンソニア', latin: 'Monsonia', category: 'caudex', prefix: 'CDX' },
  { kana: 'ディオスコレア', latin: 'Dioscorea', category: 'caudex', prefix: 'CDX' },
  { kana: 'フォッケア', latin: 'Fockea', category: 'caudex', prefix: 'CDX' },
  { kana: 'ステファニア', latin: 'Stephania', category: 'caudex', prefix: 'CDX' },
  { kana: 'フィランサス', latin: 'Phyllanthus', category: 'caudex', prefix: 'CDX' },
  { kana: 'ヤトロファ', latin: 'Jatropha', category: 'caudex', prefix: 'CDX' },
  { kana: 'シンニンギア', latin: 'Sinningia', category: 'caudex', prefix: 'CDX' },
  { kana: 'ゲラルダンサス', latin: 'Gerrardanthus', category: 'caudex', prefix: 'CDX' },
  { kana: 'ケドロスティス', latin: 'Kedrostis', category: 'caudex', prefix: 'CDX' },
  { kana: 'イポメア', latin: 'Ipomoea', category: 'caudex', prefix: 'CDX' },
  { kana: 'ラフィオナクメ', latin: 'Raphionacme', category: 'caudex', prefix: 'CDX' },
  { kana: 'プセウドボンバックス', latin: 'Pseudobombax', category: 'caudex', prefix: 'CDX' },
  { kana: 'ボンバックス', latin: 'Pseudobombax', category: 'caudex', prefix: 'CDX' },
  { kana: 'アダンソニア', latin: 'Adansonia', category: 'caudex', prefix: 'CDX' },
  { kana: 'ウンカリーナ', latin: 'Uncarina', category: 'caudex', prefix: 'CDX' },
  { kana: 'サイフォステマ', latin: 'Cyphostemma', category: 'caudex', prefix: 'CDX' },
  { kana: 'キフォステンマ', latin: 'Cyphostemma', category: 'caudex', prefix: 'CDX' },
  { kana: 'メストクレマ', latin: 'Mestoklema', category: 'caudex', prefix: 'CDX' },
  { kana: 'トリコディアデマ', latin: 'Trichodiadema', category: 'caudex', prefix: 'CDX' },
  { kana: 'アルブカ', latin: 'Albuca', category: 'caudex', prefix: 'CDX' },
  { kana: 'オーニソガラム', latin: 'Ornithogalum', category: 'caudex', prefix: 'CDX' },
  { kana: 'シゾバシス', latin: 'Schizobasis', category: 'caudex', prefix: 'CDX' },
  { kana: 'ブーファン', latin: 'Boophone', category: 'caudex', prefix: 'CDX' },
  { kana: 'ドリミオプシス', latin: 'Drimiopsis', category: 'caudex', prefix: 'CDX' },
  { kana: 'レデボウリア', latin: 'Ledebouria', category: 'caudex', prefix: 'CDX' },
  { kana: 'エリオスペルマム', latin: 'Eriospermum', category: 'caudex', prefix: 'CDX' },
  { kana: 'ブラキステルマ', latin: 'Brachystelma', category: 'caudex', prefix: 'CDX' },
  { kana: 'セロペギア', latin: 'Ceropegia', category: 'caudex', prefix: 'CDX' },
  { kana: 'モモルディカ', latin: 'Momordica', category: 'caudex', prefix: 'CDX' },
  { kana: 'コラロカルプス', latin: 'Corallocarpus', category: 'caudex', prefix: 'CDX' },
  { kana: 'イベルビレア', latin: 'Ibervillea', category: 'caudex', prefix: 'CDX' },
  { kana: 'ジゴシキオス', latin: 'Zygosicyos', category: 'caudex', prefix: 'CDX' },
  { kana: 'クッソニア', latin: 'Cussonia', category: 'caudex', prefix: 'CDX' },
  { kana: 'セサモタムナス', latin: 'Sesamothamnus', category: 'caudex', prefix: 'CDX' },
  { kana: 'プテロディスクス', latin: 'Pterodiscus', category: 'caudex', prefix: 'CDX' },
  { kana: 'カリバナス', latin: 'Calibanus', category: 'caudex', prefix: 'CDX' },
  { kana: 'ボーカルネア', latin: 'Beaucarnea', category: 'caudex', prefix: 'CDX' },
  { kana: 'トックリラン', latin: 'Beaucarnea recurvata', category: 'caudex', prefix: 'CDX', isSpeciesBase: true },
  { kana: 'モリンガ', latin: 'Moringa', category: 'caudex', prefix: 'CDX' },
  { kana: 'フィカス', latin: 'Ficus', category: 'caudex', prefix: 'CDX' },
  { kana: 'エンセファラルトス', latin: 'Encephalartos', category: 'other', prefix: 'CDX' },
  { kana: 'ディオーン', latin: 'Dioon', category: 'other', prefix: 'CDX' },
  { kana: 'ザミア', latin: 'Zamia', category: 'other', prefix: 'CDX' },
  { kana: 'マクロザミア', latin: 'Macrozamia', category: 'other', prefix: 'CDX' },
  { kana: 'サイカス', latin: 'Cycas', category: 'other', prefix: 'CDX' },

  // アガベ・ユッカ・ブロメリア系
  { kana: 'アガベ', latin: 'Agave', category: 'agave', prefix: 'AGV' },
  { kana: 'チタノタ', latin: 'Agave titanota', category: 'agave', prefix: 'AGV', isSpeciesBase: true },
  { kana: 'オテロイ', latin: 'Agave oteroi', category: 'agave', prefix: 'AGV', isSpeciesBase: true },
  { kana: 'マンガベ', latin: '× Mangave', category: 'agave', prefix: 'AGV' },
  { kana: 'ユッカ', latin: 'Yucca', category: 'other', prefix: 'AGV' },
  { kana: 'ダシリリオン', latin: 'Dasylirion', category: 'other', prefix: 'AGV' },
  { kana: 'ノリナ', latin: 'Nolina', category: 'other', prefix: 'AGV' },
  { kana: 'ヘスペラロエ', latin: 'Hesperaloe', category: 'other', prefix: 'AGV' },
  { kana: 'フルクラエア', latin: 'Furcraea', category: 'other', prefix: 'AGV' },
  { kana: 'ディッキア', latin: 'Dyckia', category: 'other', prefix: 'AGV' },
  { kana: 'ヘクチア', latin: 'Hechtia', category: 'other', prefix: 'AGV' },
  { kana: 'エンコリリウム', latin: 'Encholirium', category: 'other', prefix: 'AGV' },
  { kana: 'オルソフィツム', latin: 'Orthophytum', category: 'other', prefix: 'AGV' },
  { kana: 'プヤ', latin: 'Puya', category: 'other', prefix: 'AGV' },
  { kana: 'チランジア', latin: 'Tillandsia', category: 'other', prefix: 'AGV' },
  { kana: 'ティランジア', latin: 'Tillandsia', category: 'other', prefix: 'AGV' },
  { kana: 'ビルベルギア', latin: 'Billbergia', category: 'other', prefix: 'AGV' },
  { kana: 'ネオレゲリア', latin: 'Neoregelia', category: 'other', prefix: 'AGV' },
  { kana: 'エクメア', latin: 'Aechmea', category: 'other', prefix: 'AGV' },
  { kana: 'ホヘンベルギア', latin: 'Hohenbergia', category: 'other', prefix: 'AGV' },
  { kana: 'クリプタンサス', latin: 'Cryptanthus', category: 'other', prefix: 'AGV' },

  // ユーフォルビア
  { kana: 'ユーフォルビア', latin: 'Euphorbia', category: 'euphorbia', prefix: 'EUP' },
  { kana: 'モナデニウム', latin: 'Monadenium', category: 'euphorbia', prefix: 'EUP' },
  { kana: 'ペディランサス', latin: 'Pedilanthus', category: 'euphorbia', prefix: 'EUP' },
  { kana: 'シナデニウム', latin: 'Synadenium', category: 'euphorbia', prefix: 'EUP' },

  // サボテン
  { kana: 'コピアポア', latin: 'Copiapoa', category: 'cactus', prefix: 'COP' },
  { kana: 'アストロフィツム', latin: 'Astrophytum', category: 'cactus', prefix: 'COP' },
  { kana: 'ギムノカリキウム', latin: 'Gymnocalycium', category: 'cactus', prefix: 'COP' },
  { kana: 'ロフォフォラ', latin: 'Lophophora', category: 'cactus', prefix: 'COP' },
  { kana: 'アリオカルプス', latin: 'Ariocarpus', category: 'cactus', prefix: 'COP' },
  { kana: 'オブレゴニア', latin: 'Obregonia', category: 'cactus', prefix: 'COP' },
  { kana: 'レウクテンベルギア', latin: 'Leuchtenbergia', category: 'cactus', prefix: 'COP' },
  { kana: 'エキノカクタス', latin: 'Echinocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'フェロカクタス', latin: 'Ferocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'マミラリア', latin: 'Mammillaria', category: 'cactus', prefix: 'COP' },
  { kana: 'コリファンタ', latin: 'Coryphantha', category: 'cactus', prefix: 'COP' },
  { kana: 'エスコバリア', latin: 'Escobaria', category: 'cactus', prefix: 'COP' },
  { kana: 'ツルビニカルプス', latin: 'Turbinicarpus', category: 'cactus', prefix: 'COP' },
  { kana: 'エピテランサ', latin: 'Epithelantha', category: 'cactus', prefix: 'COP' },
  { kana: 'ペレキフォラ', latin: 'Pelecyphora', category: 'cactus', prefix: 'COP' },
  { kana: 'アズテキウム', latin: 'Aztekium', category: 'cactus', prefix: 'COP' },
  { kana: 'ゲオヒントニア', latin: 'Geohintonia', category: 'cactus', prefix: 'COP' },
  { kana: 'ストロンボカクタス', latin: 'Strombocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'ユーベルマニア', latin: 'Uebelmannia', category: 'cactus', prefix: 'COP' },
  { kana: 'メロカクタス', latin: 'Melocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'ディスコカクタス', latin: 'Discocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'テフロカクタス', latin: 'Tephrocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'プナ', latin: 'Puna', category: 'cactus', prefix: 'COP' },
  { kana: 'マイフエニア', latin: 'Maihuenia', category: 'cactus', prefix: 'COP' },
  { kana: 'マイフエニオプシス', latin: 'Maihueniopsis', category: 'cactus', prefix: 'COP' },
  { kana: 'オプンチア', latin: 'Opuntia', category: 'cactus', prefix: 'COP' },
  { kana: 'テロカクタス', latin: 'Thelocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'ステノカクタス', latin: 'Stenocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'エキノフォスロカクタス', latin: 'Echinofossulocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'パロディア', latin: 'Parodia', category: 'cactus', prefix: 'COP' },
  { kana: 'ノトカクタス', latin: 'Notocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'エリオカクタス', latin: 'Eriocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'フライレア', latin: 'Frailea', category: 'cactus', prefix: 'COP' },
  { kana: 'エキノプシス', latin: 'Echinopsis', category: 'cactus', prefix: 'COP' },
  { kana: 'ロビビア', latin: 'Lobivia', category: 'cactus', prefix: 'COP' },
  { kana: 'トリコケレウス', latin: 'Trichocereus', category: 'cactus', prefix: 'COP' },
  { kana: 'レブチア', latin: 'Rebutia', category: 'cactus', prefix: 'COP' },
  { kana: 'スルコレブチア', latin: 'Sulcorebutia', category: 'cactus', prefix: 'COP' },
  { kana: 'ワインガルチア', latin: 'Weingartia', category: 'cactus', prefix: 'COP' },
  { kana: 'マツカナ', latin: 'Matucana', category: 'cactus', prefix: 'COP' },
  { kana: 'オロヤ', latin: 'Oroya', category: 'cactus', prefix: 'COP' },
  { kana: 'エリオシケ', latin: 'Eriosyce', category: 'cactus', prefix: 'COP' },
  { kana: 'ネオポルテリア', latin: 'Neoporteria', category: 'cactus', prefix: 'COP' },
  { kana: 'ネオチレニア', latin: 'Neochilenia', category: 'cactus', prefix: 'COP' },
  { kana: 'ホリドカクタス', latin: 'Horridocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'イスラヤ', latin: 'Islaya', category: 'cactus', prefix: 'COP' },
  { kana: 'エキノケレウス', latin: 'Echinocereus', category: 'cactus', prefix: 'COP' },
  { kana: 'セレウス', latin: 'Cereus', category: 'cactus', prefix: 'COP' },
  { kana: 'ケレウス', latin: 'Cereus', category: 'cactus', prefix: 'COP' },
  { kana: 'ピロソケレウス', latin: 'Pilosocereus', category: 'cactus', prefix: 'COP' },
  { kana: 'ミルチロカクタス', latin: 'Myrtillocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'パキケレウス', latin: 'Pachycereus', category: 'cactus', prefix: 'COP' },
  { kana: 'ステノケレウス', latin: 'Stenocereus', category: 'cactus', prefix: 'COP' },
  { kana: 'クレストカクタス', latin: 'Cleistocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'オレオケレウス', latin: 'Oreocereus', category: 'cactus', prefix: 'COP' },
  { kana: 'エスポストア', latin: 'Espostoa', category: 'cactus', prefix: 'COP' },
  { kana: 'セファロケレウス', latin: 'Cephalocereus', category: 'cactus', prefix: 'COP' },
  { kana: 'リプサリス', latin: 'Rhipsalis', category: 'cactus', prefix: 'COP' },
  { kana: 'エピフィルム', latin: 'Epiphyllum', category: 'cactus', prefix: 'COP' },
  { kana: 'ペレスキア', latin: 'Pereskia', category: 'cactus', prefix: 'COP' },
  { kana: 'ホマロケファラ', latin: 'Homalocephala', category: 'cactus', prefix: 'COP' },
  { kana: 'スクレロカクタス', latin: 'Sclerocactus', category: 'cactus', prefix: 'COP' },
  { kana: 'ペディオカクタス', latin: 'Pediocactus', category: 'cactus', prefix: 'COP' },

  // 多肉・観葉・シダ・その他
  { kana: 'ハオルチア', latin: 'Haworthia', category: 'other', prefix: 'AGV' },
  { kana: 'ハオルシア', latin: 'Haworthia', category: 'other', prefix: 'AGV' },
  { kana: 'アロエ', latin: 'Aloe', category: 'other', prefix: 'AGV' },
  { kana: 'ガステリア', latin: 'Gasteria', category: 'other', prefix: 'AGV' },
  { kana: 'アストロロバ', latin: 'Astroloba', category: 'other', prefix: 'AGV' },
  { kana: 'エケベリア', latin: 'Echeveria', category: 'other', prefix: 'AGV' },
  { kana: 'セダム', latin: 'Sedum', category: 'other', prefix: 'AGV' },
  { kana: 'クラッスラ', latin: 'Crassula', category: 'other', prefix: 'AGV' },
  { kana: 'パキフィツム', latin: 'Pachyphytum', category: 'other', prefix: 'AGV' },
  { kana: 'グラプトペタルム', latin: 'Graptopetalum', category: 'other', prefix: 'AGV' },
  { kana: 'アエオニウム', latin: 'Aeonium', category: 'other', prefix: 'AGV' },
  { kana: 'カランコエ', latin: 'Kalanchoe', category: 'other', prefix: 'AGV' },
  { kana: 'コチレドン', latin: 'Cotyledon', category: 'other', prefix: 'AGV' },
  { kana: 'アドロミスクス', latin: 'Adromischus', category: 'other', prefix: 'AGV' },
  { kana: 'センペルビウム', latin: 'Sempervivum', category: 'other', prefix: 'AGV' },
  { kana: 'ダドレア', latin: 'Dudleya', category: 'other', prefix: 'AGV' },
  { kana: 'オロスタキス', latin: 'Orostachys', category: 'other', prefix: 'AGV' },
  { kana: 'セネシオ', latin: 'Senecio', category: 'other', prefix: 'AGV' },
  { kana: 'リトープス', latin: 'Lithops', category: 'other', prefix: 'AGV' },
  { kana: 'コノフィツム', latin: 'Conophytum', category: 'other', prefix: 'AGV' },
  { kana: 'プレイオスピロス', latin: 'Pleiospilos', category: 'other', prefix: 'AGV' },
  { kana: 'フォーカリア', latin: 'Faucaria', category: 'other', prefix: 'AGV' },
  { kana: 'モニラリア', latin: 'Monilaria', category: 'other', prefix: 'AGV' },
  { kana: 'フェネストラリア', latin: 'Fenestraria', category: 'other', prefix: 'AGV' },
  { kana: 'フリチア', latin: 'Frithia', category: 'other', prefix: 'AGV' },
  { kana: 'アルギロデルマ', latin: 'Argyroderma', category: 'other', prefix: 'AGV' },
  { kana: 'ギバエウム', latin: 'Gibbaeum', category: 'other', prefix: 'AGV' },
  { kana: 'ケイリドプシス', latin: 'Cheiridopsis', category: 'other', prefix: 'AGV' },
  { kana: 'チタンオプシス', latin: 'Titanopsis', category: 'other', prefix: 'AGV' },
  { kana: 'アロイノプシス', latin: 'Aloinopsis', category: 'other', prefix: 'AGV' },
  { kana: 'ナナンタス', latin: 'Nananthus', category: 'other', prefix: 'AGV' },
  { kana: 'デロスペルマ', latin: 'Delosperma', category: 'other', prefix: 'AGV' },
  { kana: 'アナカンプロセス', latin: 'Anacampseros', category: 'other', prefix: 'AGV' },
  { kana: 'アボニア', latin: 'Avonia', category: 'other', prefix: 'AGV' },
  { kana: 'ポーチュラカリア', latin: 'Portulacaria', category: 'other', prefix: 'AGV' },
  { kana: 'スタペリア', latin: 'Stapelia', category: 'other', prefix: 'AGV' },
  { kana: 'フェルニア', latin: 'Huernia', category: 'other', prefix: 'AGV' },
  { kana: 'オルベア', latin: 'Orbea', category: 'other', prefix: 'AGV' },
  { kana: 'カラルマ', latin: 'Caralluma', category: 'other', prefix: 'AGV' },
  { kana: 'エディトコレア', latin: 'Edithcolea', category: 'other', prefix: 'AGV' },
  { kana: 'プセウドリトス', latin: 'Pseudolithos', category: 'caudex', prefix: 'CDX' },
  { kana: 'ラリレア', latin: 'Larryleachia', category: 'caudex', prefix: 'CDX' },
  { kana: 'ラリーリーチア', latin: 'Larryleachia', category: 'caudex', prefix: 'CDX' },
  { kana: 'フーディア', latin: 'Hoodia', category: 'caudex', prefix: 'CDX' },
  { kana: 'タバレシア', latin: 'Tavaresia', category: 'caudex', prefix: 'CDX' },
  { kana: 'ホヤ', latin: 'Hoya', category: 'other', prefix: 'AGV' },
  { kana: 'ディスキディア', latin: 'Dischidia', category: 'other', prefix: 'AGV' },
  { kana: 'ビカクシダ', latin: 'Platycerium', category: 'other', prefix: 'AGV' },
  { kana: 'プラティセリウム', latin: 'Platycerium', category: 'other', prefix: 'AGV' },
  { kana: 'ドリナリア', latin: 'Drynaria', category: 'other', prefix: 'AGV' },
  { kana: 'レカノプテリス', latin: 'Lecanopteris', category: 'other', prefix: 'AGV' },
  { kana: 'アグラオモルファ', latin: 'Aglaomorpha', category: 'other', prefix: 'AGV' },
  { kana: 'サンスベリア', latin: 'Sansevieria', category: 'other', prefix: 'AGV' },
  { kana: 'サンセベリア', latin: 'Sansevieria', category: 'other', prefix: 'AGV' },
  { kana: 'ドラセナ', latin: 'Dracaena', category: 'other', prefix: 'AGV' },
  { kana: 'モンステラ', latin: 'Monstera', category: 'other', prefix: 'AGV' },
  { kana: 'フィロデンドロン', latin: 'Philodendron', category: 'other', prefix: 'AGV' },
  { kana: 'アンスリウム', latin: 'Anthurium', category: 'other', prefix: 'AGV' },
  { kana: 'アロカシア', latin: 'Alocasia', category: 'other', prefix: 'AGV' },
  { kana: 'コロカシア', latin: 'Colocasia', category: 'other', prefix: 'AGV' },
  { kana: 'アグラオネマ', latin: 'Aglaonema', category: 'other', prefix: 'AGV' },
  { kana: 'ディフェンバキア', latin: 'Dieffenbachia', category: 'other', prefix: 'AGV' },
  { kana: 'シンゴニウム', latin: 'Syngonium', category: 'other', prefix: 'AGV' },
  { kana: 'カラジウム', latin: 'Caladium', category: 'other', prefix: 'AGV' },
  { kana: 'アミドリウム', latin: 'Amydrium', category: 'other', prefix: 'AGV' },
  { kana: 'ラフィドフォラ', latin: 'Rhaphidophora', category: 'other', prefix: 'AGV' },
  { kana: 'エピプレムナム', latin: 'Epipremnum', category: 'other', prefix: 'AGV' },
  { kana: 'スキンダプサス', latin: 'Scindapsus', category: 'other', prefix: 'AGV' },
  { kana: 'ホマロメナ', latin: 'Homalomena', category: 'other', prefix: 'AGV' },
  { kana: 'スキスマトグロッティス', latin: 'Schismatoglottis', category: 'other', prefix: 'AGV' },
  { kana: 'ブセファランドラ', latin: 'Bucephalandra', category: 'other', prefix: 'AGV' },
  { kana: 'アヌビアス', latin: 'Anubias', category: 'other', prefix: 'AGV' },
  { kana: 'クリプトコリネ', latin: 'Cryptocoryne', category: 'other', prefix: 'AGV' },
  { kana: 'ザミオクルカス', latin: 'Zamioculcas', category: 'other', prefix: 'AGV' },
  { kana: 'ベゴニア', latin: 'Begonia', category: 'other', prefix: 'AGV' },
  { kana: 'ペペロミア', latin: 'Peperomia', category: 'other', prefix: 'AGV' },
  { kana: 'ピレア', latin: 'Pilea', category: 'other', prefix: 'AGV' },
  { kana: 'カラテア', latin: 'Calathea', category: 'other', prefix: 'AGV' },
  { kana: 'マランタ', latin: 'Maranta', category: 'other', prefix: 'AGV' },
  { kana: 'ストロマンテ', latin: 'Stromanthe', category: 'other', prefix: 'AGV' },
  { kana: 'クテナンテ', latin: 'Ctenanthe', category: 'other', prefix: 'AGV' },
  { kana: 'ネペンテス', latin: 'Nepenthes', category: 'other', prefix: 'AGV' },
  { kana: 'ウツボカズラ', latin: 'Nepenthes', category: 'other', prefix: 'AGV' },
  { kana: 'サラセニア', latin: 'Sarracenia', category: 'other', prefix: 'AGV' },
  { kana: 'ドロセラ', latin: 'Drosera', category: 'other', prefix: 'AGV' },
  { kana: 'ピンギキュラ', latin: 'Pinguicula', category: 'other', prefix: 'AGV' },
  { kana: 'ヘリアンフォラ', latin: 'Heliamphora', category: 'other', prefix: 'AGV' },
  { kana: 'セファロタス', latin: 'Cephalotus', category: 'other', prefix: 'AGV' },
  { kana: 'ミルメコディア', latin: 'Myrmecodia', category: 'caudex', prefix: 'CDX' },
  { kana: 'ヒドノフィツム', latin: 'Hydnophytum', category: 'caudex', prefix: 'CDX' },
];

const GENUS_ENTRIES: GenusEntry[] = [...RAW_GENUS_ENTRIES].sort((a, b) => b.kana.length - a.kana.length);

// ============================================================================
// 3. 種小名・園芸品種パーツ辞書 (SPECIES_TOKEN_MAP)
// ============================================================================
const SPECIES_TOKEN_MAP: Record<string, string> = {
  // パキポディウム・塊根・多肉で頻出する種小名
  ホロンベンセ: '"horombense"',
  グラキリス: 'gracilius',
  ブレビカウレ: 'brevicaule',
  レウコキサンツム: 'var. leucoxanthum',
  マカイエンセ: 'makayense',
  バロニー: 'baronii',
  ウィンゾリー: 'var. windsorii',
  ウインゾリー: 'var. windsorii',
  アンボンゲンセ: 'ambongense',
  デンシフローラム: 'densiflorum',
  タッキー: 'var. takyi',
  イノピナツム: 'inopinatum',
  イノピナーツム: 'inopinatum',
  エブレネウム: 'eburneum',
  ロスラツム: 'rosulatum',
  ロスラーツム: 'rosulatum',
  カクチペス: 'cactipes',
  ドラケイ: 'drakei',
  ビスピノーサム: 'bispinosum',
  サキュレンタム: 'succulentum',
  グリクアナム: 'griquense',
  ラメリー: 'lamerei',
  ラモスム: 'ramosum',
  ゲアイー: 'geayi',
  ゲアイ: 'geayi',
  ナマクアナム: 'namaquanum',
  サンデルシー: 'saundersii',
  レアリー: 'lealii',
  ルテンベルギアヌム: 'rutenbergianum',
  ルテンベルギアナム: 'rutenbergianum',
  ソフィエンセ: 'sofiense',
  メナベウム: 'menabeum',
  デカリー: 'decaryi',
  ブレビカリックス: 'brevicalyx',
  マイクア: 'mikea',
  パキプス: 'pachypus',
  ヒファエノイデス: 'hyphaenoides',
  ボレアリス: 'borealis',
  ヒルスタ: 'hirsuta',
  モンストローサ: 'monstrosa',
  カタフ: 'kataf',
  ターカネンシス: 'var. turkanensis',
  エイル: "sp. 'Eyl'",
  ホルトジアナ: 'holtziana',
  オルビクラリス: 'orbicularis',
  グイドッティ: 'guidottii',
  ミルラ: 'myrrha',
  アフリカーナ: 'africana',
  フォリアセア: 'foliacea',
  シンプリキフォリア: 'simplicifolia',
  ワイティ: 'wightii',
  カペンシス: 'capensis',
  セルビフォリア: 'cervifolia',
  グランディフォリア: 'grandifolia',
  ネグレクタ: 'neglecta',
  サクラ: 'sacra',
  ナナ: 'nana',
  ソコトラナ: 'socotrana',
  ソコトラナム: 'socotranum',
  アメーロ: 'ameero',
  エロンガータ: 'elongata',
  ディオスコリディス: 'dioscoridis',
  フレレアナ: 'frereana',
  リバ: 'rivae',
  ファガロイデス: 'fagaroides',
  ミクロフィラ: 'microphylla',
  ヒンドシアナ: 'hindsiana',
  シマルバ: 'simaruba',
  ディスカラー: 'discolor',
  メリディオナリス: 'meridionalis',
  コルムナリス: 'columnaris',
  プルプシー: 'purpusii',
  ファシクラータ: 'fasciculata',
  ディグエティ: 'diguetii',
  マクドウガリー: 'macdougallii',
  グロボーサ: 'globosa',
  スピノーサ: 'spinosa',
  グラウカ: 'glauca',
  ペチュエリー: 'pechuelii',
  バリー: 'ballyi',
  ペリエリー: 'perrieri',
  キルキー: 'kirkii',
  ステイロフィラ: 'stylosa',
  スタイローサ: 'stylosa',
  エピゲア: 'epigea',
  フルチコーサ: 'fruticosa',
  ギガス: 'gigas',
  フォエチダ: 'foetida',
  ホルウッディ: 'horwoodii',
  ラブラニー: 'lavrani',
  クリスパ: 'crispa',
  バルニミアナ: 'barnimiana',
  ヒルデブランティ: 'hildebrandtii',
  エレファンティペス: 'elephantipes',
  メキシカーナ: 'mexicana',
  シルバチカ: 'sylvatica',
  ヘミクリプタ: 'hemicrypta',
  エデュリス: 'edulis',
  ムルチフローラ: 'multiflora',
  マルチフローラム: 'multiflorum',
  レティキュラーツス: 'reticulatus',
  レティキュラータス: 'reticulatus',
  ペアルソニー: 'pearsonii',
  パニクラーツス: 'paniculatus',
  パニクラータス: 'paniculatus',
  ワリチー: 'wallichii',
  ブッコルジアヌス: 'buchholzianus',
  シェーフェリアヌス: 'schaeferianus',
  スルフレウス: 'sulphureus',
  ノルティ: 'nolteei',
  クラビフォリア: 'clavifolia',
  カカリオイデス: 'cacalioides',
  ユーフォルビオイデス: 'euphorbioides',
  ヘレイ: 'herrei',
  ヘレー: 'herrei',
  レトロフラクタ: 'retrofracta',
  アルミアナ: 'armiana',
  フルカタ: 'furcata',
  トリプリネルビア: 'triplinervia',
  ロバタ: 'lobata',
  ロバツム: 'lobatum',
  クレムノフィラ: 'cremnophila',
  ミラビレ: 'mirabile',
  ミラビリス: 'mirabilis',
  トリステ: 'triste',
  カルノーサム: 'carnosum',
  クリツミフォリウム: 'crithmifolium',
  アッペンディクラツム: 'appendiculatum',
  アルテルナンス: 'alternans',
  ピグマエア: 'pygmaea',
  ナマクエンシス: 'namaquensis',
  バンデリエティアエ: 'vanderietiae',
  ムルチフィズム: 'multifida',
  ムルチフィダ: 'multifida',
  クラシカウレ: 'crassicaule',
  ペニクリナム: 'peniculina',
  パターソニー: 'patersonii',
  オベスム: 'obesum',
  アラビカム: 'arabicum',
  ボエミアナム: 'boehmianum',
  エレクタ: 'erecta',
  スベローサ: 'suberosa',
  ヴェノサ: 'venosa',
  ベノサ: 'venosa',
  ピエレイ: 'pierrei',
  ポダグリカ: 'podagrica',
  マルギナータ: 'marginata',
  ベルランディエリ: 'berlandieri',
  レウコトリカ: 'leucotricha',
  ブルラータ: 'bullata',
  マクロリザス: 'macrorhizus',
  ホルビー: 'holubii',
  プラテンシス: 'platensis',
  エリプチカム: 'ellipticum',
  ディギタータ: 'digitata',
  グランディディエリ: 'grandidieri',
  ルーズリアナ: 'roeoesliana',
  ユッタエ: 'juttae',
  ベティフォルメ: 'betiforme',
  マクロプス: 'macropus',
  エレファントプス: 'elephantopus',
  ラザ: 'laza',
  ツベローサム: 'tuberosum',
  ブルボーサム: 'bulbosum',
  スピラリス: 'spiralis',
  トルツオーサム: 'tortuosum',
  イントリカータ: 'intricata',
  ディスティチャ: 'disticha',
  ディスティカ: 'disticha',
  ハエマンソイデス: 'haemanthoides',
  ミグラント: 'migrant',

  // アガベ・ユーフォルビア・サボテン・多肉・観葉の種小名
  チタノタ: 'titanota',
  オテロイ: 'oteroi',
  ユタエンシス: 'utahensis',
  エボリスピナ: 'var. eborispina',
  ネバデンシス: 'var. nevadensis',
  カイバベンシス: 'var. kaibabensis',
  パリー: 'parryi',
  トランカータ: 'var. truncata',
  トゥルンカータ: 'truncata',
  ホーチエンシス: 'var. huachucensis',
  クーエシー: 'var. couesii',
  オバティフォリア: 'ovatifolia',
  オバティフォーリア: 'ovatifolia',
  モンタナ: 'montana',
  ホリダ: 'horrida',
  ペロテンシス: 'ssp. perotensis',
  ビクトリアレジーナ: 'victoriae-reginae',
  ポタトラム: 'potatorum',
  アテナータ: 'attenuata',
  マクロアカンサ: 'macroacantha',
  コロラータ: 'colorata',
  アルボピロサ: 'albopilosa',
  ジェントリー: 'gentryi',
  ストリクタ: 'stricta',
  シジゲラ: 'schidigera',
  フィリフェラ: 'filifera',
  アメリカーナ: 'americana',
  イシスメンシス: 'isthmensis',
  ニッケルシー: 'nickelsiae',
  パルメリ: 'palmeri',
  ネオメキシカーナ: 'neomexicana',
  ハーバーディアナ: 'havardiana',
  グアダラハラナ: 'guadalajarana',
  マルモラータ: 'marmorata',
  ゼブリナ: 'zebrina',
  トゥメヤナ: 'toumeyana',

  オベサ: 'obesa',
  シンメトリカ: 'ssp. symmetrica',
  ポリゴナ: 'polygona',
  ギラウミニアナ: 'guillauminiana',
  バリダ: 'valida',
  メロフォルミス: 'meloformis',
  クラビゲラ: 'clavigera',
  プセウドグロボーサ: 'pseudoglobosa',
  トゥレアレンシス: 'tulearensis',
  チュレアレンシス: 'tulearensis',
  フランコイシー: 'francoisii',
  アンボボンベンシス: 'ambovombensis',
  カプサインテマリエンシス: 'capsaintemariensis',
  シリンドリフォリア: 'cylindrifolia',
  キリンドリフォリア: 'cylindrifolia',
  ポイソニー: 'poissonii',
  ベネニフィカ: 'venenifica',
  ユニスピナ: 'unispina',
  パキポディオイデス: 'pachypodioides',
  ブプレウリフォリア: 'bupleurifolia',
  プルビナータ: 'pulvinata',
  エノプラ: 'enopla',
  ステリスピナ: 'stellispina',
  イネルミス: 'inermis',
  フラナガニー: 'flanaganii',
  ゴルゴニス: 'gorgonis',
  カプトメデューサ: 'caput-medusae',
  ステラータ: 'stellata',
  スクアローサ: 'squarrosa',
  プリムリフォリア: 'primulifolia',
  トリコデニア: 'trichadenia',
  ラクテア: 'lactea',
  ミリー: 'milii',
  ロッシィ: 'rossii',
  ヘディオトイデス: 'hedyotoides',
  デセプタ: 'decepta',
  エスクレンタ: 'esculenta',
  アブデルクリ: 'abdelkuri',
  プラティクラダ: 'platyclada',
  スザンナエ: 'susannae',
  ピスカデルマ: 'piscidermis',
  ピスキデルミス: 'piscidermis',
  トルチラマ: 'tortirama',
  グロエンワルディ: 'groenewaldii',

  シネレア: 'cinerea',
  コルムナアルバ: 'var. columna-alba',
  ハセルトニアナ: 'haseltoniana',
  デアルバータ: 'dealbata',
  グリセオビオラセア: 'griseoviolacea',
  ヒポガエア: 'hypogaea',
  テヌイシマ: 'tenuissima',
  クラインジア: 'krainziana',
  クラインジアナ: 'krainziana',
  ギガンティア: 'gigantea',
  セルペンティスルカータ: 'serpentisulcata',
  グルソニー: 'grusonii',
  ホリゾンタロニウス: 'horizonthalonius',
  アステリアス: 'asterias',
  ミリオスティグマ: 'myriostigma',
  オルナツム: 'ornatum',
  カプリコルネ: 'capricorne',
  フィスラツス: 'fissuratus',
  レツーサス: 'retusus',
  トリゴヌス: 'trigonus',
  フルフラセウス: 'var. furfuraceus',
  フルフラセア: 'furfuracea',
  コッツチョウベヤヌス: 'kotschoubeyanus',
  アガボイデス: 'agavoides',
  ブラボアナス: 'bravoanus',
  デネグリー: 'denegrii',
  プリンキピス: 'principis',
  ウィリアムシー: 'williamsii',
  ディフーサ: 'diffusa',
  フリッチー: 'fricii',
  テキサーナ: 'var. texana',
  ミハノビッチ: 'mihanovichii',
  フリードリッヒ: 'friedrichii',
  スペガッツィーニ: 'spegazzinii',
  カルデナシアナム: 'cardenasianum',
  デヌダツム: 'denudatum',
  バッテリー: 'vatteri',
  サグリオニス: 'saglionis',
  ステラツム: 'stellatum',
  アニシッツィ: 'anisitsii',
  ブエネケリ: 'buenekeri',
  プルモーサ: 'plumosa',
  フンボルティ: 'humboldtii',
  カルメナエ: 'carmenae',
  ヘルナンデシー: 'hernandezii',
  テレサエ: 'theresae',
  ルエッティ: 'luethyi',
  ペクチニフェラ: 'pectinifera',
  ハーニアナ: 'hahniana',
  プセウドペクチナツス: 'pseudopectinatus',
  シュミディケアヌス: 'schmiedickeanus',
  バルデジアヌス: 'valdezianus',
  ミクロメリス: 'micromeris',
  アセリフォルミス: 'aselliformis',
  ストロビリフォルミス: 'strobiliformis',
  リッテリ: 'ritteri',
  ヒントニー: 'hintonii',
  バルデジー: 'valdezii',
  ディスキフォルミス: 'disciformis',
  マタンザヌス: 'matanzanus',
  ゲオメトリクス: 'geometricus',
  ゲオメトリザンス: 'geometrizans',
  ミクロダシス: 'microdasys',
  グラウケッセンス: 'glaucescens',
  ラティスピナス: 'latispinus',
  テキセンシス: 'texensis',

  クーペリー: 'cooperi',
  モーガニー: 'maughanii',
  ピクタ: 'picta',
  スプレンデンス: 'splendens',
  コレクタ: 'correcta',
  コンプトニアナ: 'comptoniana',
  バディア: 'badia',
  ファシアータ: 'fasciata',
  ポリフィラ: 'polyphylla',
  プリカティリス: 'plicatilis',
  ディコトマ: 'dichotoma',
  ラモシシマ: 'ramosissima',
  ピランシー: 'pillansii',
  エリナケア: 'erinacea',
  ペグレラエ: 'peglerae',
  メラナカンサ: 'melanacantha',
  カスティロニアエ: 'castilloniae',
  アームストロンギー: 'armstrongii',
  ゴエリンギー: 'goehringii',
  マルニエルラポストレイ: 'marnier-lapostollei',
  ホリダス: 'horridus',
  トリスピノーサス: 'trispinosus',
  レーマニー: 'lehmannii',
  プリンセプス: 'princeps',
  エデュレ: 'edule',
  レボルタ: 'revoluta',
  カイルンシアナ: 'cairnsiana',
  ロストラータ: 'rostrata',
  リギダ: 'rigida',
  ロンギシマム: 'longissimum',
  ウィーレリ: 'wheeleri',
  リドレイ: 'ridleyi',
  ウィリンキー: 'willinckii',
  ビフルカツム: 'bifurcatum',
  コロナリウム: 'coronarium',
  ワンダエ: 'wandae',
  マダガスカリエンセ: 'madagascariense',
  エレファントティス: 'elephantotis',
  ベイチー: 'veitchii',
  ビーチー: 'veitchii',
  ヒリー: 'hillii',
  アルシコルネ: 'alcicorne',
  ピングイキュラ: 'pinguicula',
  ロリダ: 'rorida',
  エーレンベルギー: 'ehrenbergii',
  ラウイ: 'laui',
  カンテ: 'cante',
  ロメオ: 'romeo',
  リンゼアナ: 'lindsayana',
  チワワエンシス: 'chihuahuaensis',
  ザラゴーサ: 'zaragozae',
  ミニマ: 'minima',
  エレガンス: 'elegans',
  デリシオーサ: 'deliciosa',
  ボルシギアナ: 'borsigiana',
  アダンソニー: 'adansonii',
  グロリオーサム: 'gloriosum',
  クリスタリナム: 'crystallinum',
  クラリネルビウム: 'clarinervium',
  ワロクアーナム: 'warocqueanum',
  マグニフィカム: 'magnificum',
  レガレ: 'regale',
  フォルゲッティ: 'forgetii',
  ビッタリフォリウム: 'vittariifolium',
  ルクスリアンス: 'luxurians',
  パピリラミナム: 'papillilaminum',
  キセログラフィカ: 'xerographica',
  イオナンタ: 'ionantha',
  ストレプトフィラ: 'streptophylla',
  ウンベラータ: 'umbellata',
  ベンガレンシス: 'benghalensis',
  アルテシマ: 'altissima',
  エラスティカ: 'elastica',
  リラータ: 'lyrata',
  ミクロカルパ: 'microcarpa',
};

// ============================================================================
// 4. 特徴・状態修飾語パーツ (MODIFIER_PATTERNS)
// ============================================================================
interface ModifierRule {
  keywords: string[];
  suffix: string;
}

const MODIFIER_RULES: ModifierRule[] = [
  { keywords: ['白中斑'], suffix: 'var. mediopicta f. alba' },
  { keywords: ['黄中斑'], suffix: 'var. mediopicta f. aurea' },
  { keywords: ['中斑'], suffix: 'var. mediopicta' },
  { keywords: ['白覆輪', '白覆輪斑'], suffix: 'f. albo-marginata' },
  { keywords: ['黄覆輪', '黄覆輪斑'], suffix: 'f. aureo-marginata' },
  { keywords: ['覆輪斑', '覆輪'], suffix: 'f. marginata' },
  { keywords: ['白斑'], suffix: 'f. albo-variegata' },
  { keywords: ['黄斑'], suffix: 'f. aureo-variegata' },
  { keywords: ['散り斑', '散斑', '斑入り', '斑入', '錦'], suffix: 'f. variegata' },
  { keywords: ['糊斑'], suffix: 'f. striata' },
  { keywords: ['綴化', 'せっか', 'セッカ', '石化'], suffix: 'f. cristata' },
  { keywords: ['モンストローサ', 'モンスト', '獅子'], suffix: 'f. monstruosa' },
  { keywords: ['無刺', '刺無し', '刺なし'], suffix: 'f. inermis' },
  { keywords: ['ドワーフ', '矮性'], suffix: "'Dwarf'" },
  { keywords: ['コンパクタ', 'コンパクト'], suffix: "'Compacta'" },
  { keywords: ['ジャイアント'], suffix: "'Giant'" },
  { keywords: ['ダルマ', 'だるま', '達磨'], suffix: "'Daruma'" },
];

// ============================================================================
// 5. 漢字・園芸用語 → 英字/ローマ字変換辞書 (KANJI_BOTANICAL_MAP)
// 辞書にない漢字交じりの園芸品種名でも英名/ローマ字に変換するためのテーブル
// ============================================================================
const KANJI_PHRASE_MAP: Array<[string, string]> = [
  // 2文字以上の複合語
  ['南アフリカダイヤモンド', 'South Africa Diamond'],
  ['ホワイトファイヤー', 'White Fire'],
  ['ブラックファイヤー', 'Black Fire'],
  ['レッドキャットウィーズル', 'Red Catweezle'],
  ['ブラックアンドブルー', 'Black and Blue'],
  ['スナグルトゥース', 'Snaggle Tooth'],
  ['ソーラーエクリプス', 'Solar Eclipse'],
  ['ホワイトゴースト', 'White Ghost'],
  ['グレートホワイトシャーク', 'Great White Shark'],
  ['ドラゴントゥース', 'Dragon Toes'],
  ['キングコング', 'King Kong'],
  ['白火焔', 'White Fire'],
  ['黒火焔', 'Black Fire'],
  ['白犀牛', 'White Rhino'],
  ['黒犀牛', 'Black Rhino'],
  ['緑犀牛', 'Green Rhino'],
  ['大白鯊', 'Great White Shark'],
  ['姫厳竜', 'Hime Genryu'],
  ['姫厳龍', 'Hime Genryu'],
  ['厳竜', 'Genryu'],
  ['厳龍', 'Genryu'],
  ['白鯨', 'Hakugei'],
  ['黒鯨', 'Kokugei'],
  ['赤猫', 'Red Cat'],
  ['ゴリ猫', 'Gori Neko'],
  ['悪魔くん', 'Bakemono'],
  ['悪魔', 'Akuma'],
  ['追星', 'Cock'],
  ['皇冠', 'Crown'],
  ['海王', 'Kaioh'],
  ['清櫻', 'Seo'],
  ['清桜', 'Seo'],
  ['魔丸', 'Mamaru'],
  ['阿修羅', 'Ashura'],
  ['覇王竜', 'Tyrannosaurus'],
  ['覇王龍', 'Tyrannosaurus'],
  ['白幽霊', 'White Ghost'],
  ['狼人', 'Werewolf'],
  ['流星', 'Meteor'],
  ['金剛', 'King Kong'],
  ['烈焔', 'Blaze'],
  ['白豪刺', 'Byakugoushi'],
  ['恐竜牙歯', 'Hades'],
  ['黒帝斯', 'Hades'],
  ['凱撒', 'Caesar'],
  ['圓葉拇指', 'Filigree'],
  ['狂刺', 'Kyoshi'],
  ['強刺', 'Kyoshi'],
  ['強棘', 'Kyokyoku'],
  ['連刺', 'Continuous Spine'],
  ['陽炎', 'Kagerou'],
  ['夕映', 'Yubae'],
  ['黒豹', 'Black Panther'],
  ['白豹', 'White Leopard'],
  ['赤豹', 'Red Leopard'],
  ['金豹', 'Golden Leopard'],
  ['黒帝', 'Kokutei'],
  ['白帝', 'Hakutei'],
  ['赤帝', 'Sekitei'],
  ['青帝', 'Seitei'],
  ['炎帝', 'Entei'],
  ['雷帝', 'Raitei'],
  ['竜王', 'Ryuoh'],
  ['龍王', 'Ryuoh'],
  ['獣王', 'Juoh'],
  ['獅王', 'Shioh'],
  ['魔王', 'Maoh'],
  ['冥王', 'Meioh'],
  ['拳王', 'Kenoh'],
  ['覇王', 'Haoh'],
  ['鳳凰', 'Phoenix'],
  ['麒麟', 'Kirin'],
  ['朱雀', 'Suzaku'],
  ['玄武', 'Genbu'],
  ['青竜', 'Seiryu'],
  ['青龍', 'Seiryu'],
  ['白虎', 'Byakko'],
  ['黒竜', 'Kokuryu'],
  ['黒龍', 'Kokuryu'],
  ['白竜', 'Hakuryu'],
  ['白龍', 'Hakuryu'],
  ['赤竜', 'Sekiryu'],
  ['赤龍', 'Sekiryu'],
  ['金竜', 'Kinryu'],
  ['金龍', 'Kinryu'],
  ['銀竜', 'Ginryu'],
  ['銀龍', 'Ginryu'],
  ['火竜', 'Karyu'],
  ['火龍', 'Karyu'],
  ['水竜', 'Suiryu'],
  ['水龍', 'Suiryu'],
  ['風竜', 'Furyu'],
  ['雷竜', 'Rairyu'],
  ['恐竜', 'Kyoryu'],
  ['飛竜', 'Hiryu'],
  ['飛龍', 'Hiryu'],
  ['九頭竜', 'Kuzuryu'],
  ['黒王丸', 'Kokuohmaru'],
  ['孤竜丸', 'Koryumaru'],
  ['逆鱗丸', 'Gekirinmaru'],
  ['黒士冠', 'Kokushikan'],
  ['太平丸', 'Taiheimaru'],
  ['兜丸', 'Kabutomaru'],
  ['瑠璃兜', 'Rurikabuto'],
  ['鸞鳳玉', 'Ranpogyoku'],
  ['亀甲牡丹', 'Kikkoubotan'],
  ['玉牡丹', 'Tamabotan'],
  ['岩牡丹', 'Iwabotan'],
  ['三角牡丹', 'Sankakubotan'],
  ['花牡丹', 'Hanabotan'],
  ['黒牡丹', 'Kurobotan'],
  ['姫牡丹', 'Himebotan'],
  ['緋牡丹', 'Hibotan'],
  ['牡丹玉', 'Botangyoku'],
  ['銀牡丹', 'Ginbotan'],
  ['鳥羽玉', 'Ubadama'],
  ['烏羽玉', 'Ubadama'],
  ['翠冠玉', 'Suikangyoku'],
  ['銀冠玉', 'Ginkangyoku'],
  ['金鯱', 'Kinshachi'],
  ['鯱頭', 'Shachigashira'],
  ['日の出丸', 'Hinodemaru'],
  ['王冠竜', 'Ohkanryu'],
  ['神仙玉', 'Shinsengyoku'],
  ['天平丸', 'Tenpeimaru'],
  ['光琳玉', 'Kouringyoku'],
  ['海王丸', 'Kaiohmaru'],
  ['聖王丸', 'Seiohmaru'],
  ['守殿玉', 'Shutengyoku'],
  ['翠晃冠', 'Suikoukan'],
  ['新天地', 'Shintenchi'],
  ['精巧丸', 'Seikoumaru'],
  ['精巧殿', 'Seikouden'],
  ['月世界', 'Gessekai'],
  ['かぐや姫', 'Kaguyahime'],
  ['花籠', 'Hanakago'],
  ['菊水', 'Kikusui'],
  ['帝冠', 'Teikan'],
  ['晃山', 'Kouzan'],
  ['白星', 'Shiraboshi'],
  ['姫春星', 'Himeharuboshi'],
  ['玉翁', 'Gyokuoh'],
  ['金手毬', 'Kintemari'],
  ['銀手毬', 'Gintemari'],
  ['武蔵野', 'Musashino'],
  ['竜神木', 'Ryujinboku'],
  ['鬼面角', 'Kimenkaku'],
  ['黄金柱', 'Ougonchuu'],
  ['弁慶柱', 'Benkeichuu'],
  ['黒鬼城', 'Kuroonijou'],
  ['蛮鬼塔', 'Bankitou'],
  ['竜骨城', 'Ryuukotsujou'],
  ['白馬城', 'Hakubajou'],
  ['万物想', 'Banbutsusou'],
  ['阿房宮', 'Aboukyuu'],
  ['象牙宮', 'Zougekyuu'],
  ['魔界玉', 'Makaigyoku'],
  ['観峰玉', 'Kanpougyoku'],
  ['鉄甲丸', 'Tekkoumaru'],
  ['怪魔玉', 'Kaimagyoku'],
  ['孔雀丸', 'Kujakumaru'],
  ['紅彩閣', 'Kousaikaku'],
  ['群星冠', 'Gunseikan'],
  ['貴青玉', 'Kiseigyoku'],
  ['玉鱗宝', 'Gyokurinhou'],
  ['金輪際', 'Konrinzai'],
  ['峨眉山', 'Gabizan'],
  ['奇怪ヶ島', 'Kikaigashima'],
  ['蘇鉄キリン', 'Sotetsu Kirin'],
  ['稚児キリン', 'Chigo Kirin'],
  ['花キリン', 'Hana Kirin'],
  ['亀甲竜', 'Kikkouryu'],
  ['火星人', 'Kaseijin'],
  ['恵比寿笑い', 'Ebisu Warai'],
  ['恵比寿大黒', 'Ebisu Daikoku'],
  ['天馬空', 'Tenmakuu'],
  ['亜阿相界', 'Aasoukai'],
  ['光堂', 'Koudou'],
  ['白象', 'Hakuzou'],
  ['奇峰錦', 'Kihounishiki'],
  ['砂漠の薔薇', 'Desert Rose'],
  ['象の木', 'Elephant Tree'],
  ['幻蝶かずら', 'Genchou Kazura'],
  ['珊瑚油桐', 'Sango Aburagiri'],
  ['錦珊瑚', 'Nishiki Sango'],
  ['断崖の女王', 'Queen of the Abyss'],
  ['眠り布袋', 'Nemuri Hotei'],
  ['葡萄甕', 'Budougame'],
  ['太閤秀吉', 'Taikou Hideyoshi'],
  ['吉祥天', 'Kisshouten'],
  ['吉祥冠', 'Kisshoukan'],
  ['王妃雷神', 'Ouhi Raijin'],
  ['雷神', 'Raijin'],
  ['笹の雪', 'Sasanoyuki'],
  ['氷山', 'Hyouzan'],
  ['輝山', 'Kizan'],
  ['華厳', 'Kegon'],
  ['吹上', 'Fukiage'],
  ['滝の白糸', 'Taki no Shiraito'],
  ['乱れ雪', 'Midareyuki'],
  ['竜舌蘭', 'Agave'],
  ['雫石', 'Shizukuishi'],
  ['玉扇', 'Gyokusen'],
  ['万象', 'Banshou'],
  ['十二の巻', 'Juuninomaki'],
  ['臥牛', 'Gagyuu'],
  ['恐竜', 'Kyouryuu'],
  ['実生選抜', 'Seedling Select'],
  ['選抜', 'Select'],
  ['現地球', 'Wild'],
  ['山木', 'Yamaki'],
  ['山採り', 'Yamadori'],
  ['カキ仔', 'Offset'],
  ['かき仔', 'Offset'],
  ['子株', 'Pup'],
  ['実生', 'Seedling'],
];

const SINGLE_KANJI_MAP: Record<string, string> = {
  白: 'Haku', 黒: 'Koku', 赤: 'Seki', 紅: 'Beni', 青: 'Ao', 蒼: 'Sou', 翠: 'Sui', 緑: 'Midori',
  黄: 'Ki', 金: 'Kin', 銀: 'Gin', 紫: 'Murasaki', 桃: 'Momo', 桜: 'Sakura', 櫻: 'Sakura',
  藍: 'Ai', 碧: 'Heki', 瑠: 'Ru', 璃: 'Ri', 朱: 'Shu', 緋: 'Hi', 茜: 'Akane', 黄金: 'Ougon',
  王: 'Oh', 皇: 'Kou', 帝: 'Tei', 姫: 'Hime', 妃: 'Hi', 殿: 'Den', 宮: 'Kyuu', 城: 'Jou',
  塔: 'Tou', 閣: 'Kaku', 冠: 'Kan', 宝: 'Hou', 玉: 'Gyoku', 丸: 'Maru', 珠: 'Shu', 錦: 'Nishiki',
  竜: 'Ryu', 龍: 'Ryu', 虎: 'Tora', 豹: 'Hyou', 獅: 'Shi', 子: 'Ko', 象: 'Zou', 犀: 'Sai',
  牛: 'Gyu', 馬: 'Ba', 麒麟: 'Kirin', 狼: 'Ookami', 猫: 'Neko', 犬: 'Inu', 狐: 'Kitsune',
  熊: 'Kuma', 兎: 'Usagi', 亀: 'Kame', 鶴: 'Tsuru', 鳳: 'Hou', 凰: 'Ou', 鷹: 'Taka', 鷲: 'Washi',
  烏: 'Karasu', 鳥: 'Tori', 孔: 'Ku', 雀: 'Jaku', 鯨: 'Kujira', 鯊: 'Same', 鮫: 'Same',
  鰐: 'Wani', 蛇: 'Hebi', 蛙: 'Kaeru', 蟹: 'Kani', 蜘蛛: 'Kumo', 蠍: 'Sasori', 蝶: 'Chou',
  蜂: 'Hachi', 蟻: 'Ari', 虫: 'Mushi', 魚: 'Uo', 貝: 'Kai',
  神: 'Shin', 仙: 'Sen', 鬼: 'Oni', 魔: 'Ma', 悪: 'Aku', 霊: 'Rei', 幽: 'Yuu', 怪: 'Kai',
  天: 'Ten', 地: 'Chi', 海: 'Kai', 山: 'Zan', 川: 'Sen', 河: 'Ka', 湖: 'Ko', 池: 'Ike',
  島: 'Shima', 岩: 'Iwa', 石: 'Ishi', 砂: 'Suna', 土: 'Tsuchi', 森: 'Mori', 林: 'Hayashi',
  空: 'Kuu', 雲: 'Kumo', 風: 'Fuu', 雨: 'Ame', 雪: 'Yuki', 氷: 'Koori', 霜: 'Shimo', 霧: 'Kiri',
  霞: 'Kasumi', 露: 'Tsuyu', 虹: 'Niji', 雷: 'Rai', 電: 'Den', 光: 'Kou', 輝: 'Ki', 星: 'Hoshi',
  月: 'Getsu', 日: 'Nichi', 陽: 'You', 太陽: 'Taiyou', 影: 'Kage', 闇: 'Yami', 夜: 'Yoru',
  朝: 'Asa', 夕: 'Yuu', 暁: 'Akatsuki', 春: 'Haru', 夏: 'Natsu', 秋: 'Aki', 冬: 'Fuyu',
  火: 'Ka', 炎: 'En', 焔: 'En', 烈: 'Retsu', 爆: 'Baku', 水: 'Sui', 波: 'Nami', 滝: 'Taki',
  泉: 'Izumi', 氷河: 'Hyouga',
  大: 'Dai', 中: 'Chuu', 小: 'Shou', 極: 'Goku', 超: 'Chou', 新: 'Shin', 古: 'Ko', 老: 'Rou',
  若: 'Waka', 長: 'Chou', 短: 'Tan', 高: 'Kou', 低: 'Tei', 広: 'Kou', 幅: 'Haba', 細: 'Hoso',
  太: 'Futo', 厚: 'Atsu', 薄: 'Usu', 丸葉: 'Maruba', 細葉: 'Hosoba', 短葉: 'Tanba', 広葉: 'Hiroba',
  強: 'Kyou', 弱: 'Jaku', 狂: 'Kyou', 猛: 'Mou', 荒: 'Ara', 優: 'Yuu', 美: 'Bi', 麗: 'Rei',
  華: 'Ka', 花: 'Hana', 草: 'Kusa', 木: 'Boku', 樹: 'Ju', 葉: 'You', 根: 'Kon', 幹: 'Kan',
  枝: 'Eda', 芽: 'Me', 実: 'Mi', 種: 'Tane', 刺: 'Shi', 棘: 'Toge', 爪: 'Tsume', 牙: 'Kiba',
  歯: 'Ha', 角: 'Kaku', 羽: 'Hane', 翼: 'Tsubasa', 毛: 'Ke', 皮: 'Kawa', 甲: 'Kou', 骨: 'Kotsu',
  頭: 'Tou', 目: 'Me', 眼: 'Gan', 耳: 'Mimi', 口: 'Kuchi', 手: 'Te', 足: 'Ashi', 指: 'Yubi',
  心: 'Shin', 魂: 'Tamashii', 夢: 'Yume', 幻: 'Maboroshi', 想: 'Sou', 笑: 'Warai', 涙: 'Namida',
  一: 'Ichi', 二: 'Ni', 三: 'San', 四: 'Yon', 五: 'Go', 六: 'Roku', 七: 'Nana', 八: 'Hachi',
  九: 'Kyuu', 十: 'Juu', 百: 'Hyaku', 千: 'Sen', 万: 'Man', 億: 'Oku', 零: 'Zero',
  東: 'Tou', 西: 'Sei', 南: 'Nan', 北: 'Hoku', 上: 'Jou', 下: 'Ge', 左: 'Sa', 右: 'U',
  先: 'Sen', 元: 'Gen', 本: 'Hon', 真: 'Shin', 正: 'Sei', 奇: 'Ki', 妙: 'Myou', 珍: 'Chin',
  聖: 'Sei', 剣: 'Ken', 刀: 'Tou', 槍: 'Yari', 盾: 'Tate', 鎧: 'Yoroi', 兜: 'Kabuto',
  玉座: 'Gyokuza', 覇: 'Ha', 武: 'Bu', 士: 'Shi', 将: 'Shou', 軍: 'Gun', 戦: 'Sen', 勝: 'Shou',
  福: 'Fuku', 禄: 'Roku', 寿: 'Ju', 吉: 'Kichi', 祥: 'Shou', 瑞: 'Zui', 慶: 'Kei', 祝: 'Iwai',
};

// ============================================================================
// 6. カタカナ・ひらがな → ラテン語（ローマ字）自動変換関数
// ============================================================================
const KANA_DIGRAPHS: Record<string, string> = {
  ファ: 'fa', フィ: 'fi', フェ: 'fe', フォ: 'fo', フュ: 'fyu',
  ヴァ: 'va', ヴィ: 'vi', ヴ: 'vu', ヴェ: 've', ヴォ: 'vo', ヴュ: 'vyu',
  ティ: 'ti', トゥ: 'tu', テュ: 'tyu',
  ディ: 'di', ドゥ: 'du', デュ: 'dyu',
  ウィ: 'wi', ウェ: 'we', ウォ: 'wo',
  クァ: 'kwa', クィ: 'kwi', クェ: 'kwe', クォ: 'kwo',
  グァ: 'gwa', グィ: 'gwi', グェ: 'gwe', グォ: 'gwo',
  ツァ: 'tsa', ツィ: 'tsi', ツェ: 'tse', ツォ: 'tso',
  キャ: 'kya', キュ: 'kyu', キョ: 'kyo',
  ギャ: 'gya', ギュ: 'gyu', ギョ: 'gyo',
  シャ: 'sha', シュ: 'shu', ショ: 'sho', シェ: 'she',
  ジャ: 'ja', ジュ: 'ju', ジョ: 'jo', ジェ: 'je',
  チャ: 'cha', チュ: 'chu', チョ: 'cho', チェ: 'che',
  ヂャ: 'ja', ヂュ: 'ju', ヂョ: 'jo',
  ニャ: 'nya', ニュ: 'nyu', ニョ: 'nyo',
  ヒャ: 'hya', ヒュ: 'hyu', ヒョ: 'hyo',
  ビャ: 'bya', ビュ: 'byu', ビョ: 'byo',
  ピャ: 'pya', ピュ: 'pyu', ピョ: 'pyo',
  ミャ: 'mya', ミュ: 'myu', ミョ: 'myo',
  リャ: 'rya', リュ: 'ryu', リョ: 'ryo',
  イェ: 'ye', スィ: 'si', ズィ: 'zi',
};

const KANA_MONOGRAPHS: Record<string, string> = {
  ア: 'a', イ: 'i', ウ: 'u', エ: 'e', オ: 'o',
  カ: 'ka', キ: 'ki', ク: 'ku', ケ: 'ke', コ: 'ko',
  ガ: 'ga', ギ: 'gi', グ: 'gu', ゲ: 'ge', ゴ: 'go',
  サ: 'sa', シ: 'shi', ス: 'su', セ: 'se', ソ: 'so',
  ザ: 'za', ジ: 'ji', ズ: 'zu', ゼ: 'ze', ゾ: 'zo',
  タ: 'ta', チ: 'chi', ツ: 'tsu', テ: 'te', ト: 'to',
  ダ: 'da', ヂ: 'ji', ヅ: 'zu', デ: 'de', ド: 'do',
  ナ: 'na', ニ: 'ni', ヌ: 'nu', ネ: 'ne', ノ: 'no',
  ハ: 'ha', ヒ: 'hi', フ: 'fu', ヘ: 'he', ホ: 'ho',
  バ: 'ba', ビ: 'bi', ブ: 'bu', ベ: 'be', ボ: 'bo',
  パ: 'pa', ピ: 'pi', プ: 'pu', ペ: 'pe', ポ: 'po',
  マ: 'ma', ミ: 'mi', ム: 'mu', メ: 'me', モ: 'mo',
  ヤ: 'ya', ユ: 'yu', ヨ: 'yo',
  ラ: 'ra', リ: 'ri', ル: 'ru', レ: 're', ロ: 'ro',
  ワ: 'wa', ヰ: 'i', ヱ: 'e', ヲ: 'o', ン: 'n',
  ァ: 'a', ィ: 'i', ゥ: 'u', ェ: 'e', ォ: 'o',
  ャ: 'ya', ュ: 'yu', ョ: 'yo', ヮ: 'wa',
};

// 学名特有の語尾パターン（より自然なラテン語学名にするための変換ルール）
const BOTANICAL_LATIN_SUFFIXES: Array<[RegExp, string]> = [
  [/エンシス$/, 'ensis'],
  [/エンセ$/, 'ense'],
  [/イアナ$/, 'iana'],
  [/イアヌス$/, 'ianus'],
  [/イアナム$/, 'ianum'],
  [/オイデス$/, 'oides'],
  [/フォリア$/, 'folia'],
  [/フォリウム$/, 'folium'],
  [/フォリウス$/, 'folius'],
  [/フローラ$/, 'flora'],
  [/フローラム$/, 'florum'],
  [/フローラス$/, 'florus'],
  [/スピノーサ$/, 'spinosa'],
  [/スピノーサム$/, 'spinosum'],
  [/スピナ$/, 'spina'],
  [/グロボーサ$/, 'globosa'],
  [/グロボーサム$/, 'globosum'],
  [/モンストローサ$/, 'monstrosa'],
  [/マキュラータ$/, 'maculata'],
  [/ストリアータ$/, 'striata'],
  [/マルギナータ$/, 'marginata'],
  [/レティキュラータ$/, 'reticulata'],
  [/ウンデュラータ$/, 'undulata'],
  [/フォルミス$/, 'formis'],
  [/フォルメ$/, 'forme'],
  [/カウリス$/, 'caulis'],
  [/カウレ$/, 'caule'],
  [/フィラ$/, 'phylla'],
  [/フィラム$/, 'phyllum'],
  [/カルパ$/, 'carpa'],
  [/カルプ$/, 'carp'],
  [/リザ$/, 'rhiza'],
  [/リザス$/, 'rhizus'],
  [/セファラ$/, 'cephala'],
  [/セファルス$/, 'cephalus'],
];

/**
 * ひらがなをカタカナに統一する
 */
function toKatakana(str: string): string {
  return str.replace(/[\u3041-\u3096]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60));
}

/**
 * カタカナ・漢字・ひらがな文字列をラテン文字（学名/英名風）に変換する
 */
export function transliterateToBotanicalLatin(input: string, capitalizeFirst = true): string {
  if (!input) return '';

  let working = input.trim();

  // 1. 既知の種小名・園芸名トークン完全一致チェック
  const katakanaInput = toKatakana(working).replace(/[\s・\-_/／'"「」『』()（）]/g, '');
  if (SPECIES_TOKEN_MAP[katakanaInput]) {
    const mapped = SPECIES_TOKEN_MAP[katakanaInput];
    if (capitalizeFirst && /^[a-z]/.test(mapped)) {
      return mapped.charAt(0).toUpperCase() + mapped.slice(1);
    }
    return mapped;
  }

  // 2. 漢字複合語を英名・ローマ字に置換
  for (const [kanjiPhrase, eng] of KANJI_PHRASE_MAP) {
    if (working.includes(kanjiPhrase)) {
      working = working.split(kanjiPhrase).join(` ${eng} `);
    }
  }

  // 3. 単漢字をローマ字に置換
  working = working.replace(/[\u4E00-\u9FFF]/g, (ch) => {
    return SINGLE_KANJI_MAP[ch] ? SINGLE_KANJI_MAP[ch] : '';
  });

  // 4. ひらがなをカタカナへ
  working = toKatakana(working);

  // 5. 学名語尾パターンの適用（カタカナ部分に対して）
  let suffixReplaced = '';
  let kataCore = working;
  for (const [regex, latinSuffix] of BOTANICAL_LATIN_SUFFIXES) {
    if (regex.test(kataCore)) {
      kataCore = kataCore.replace(regex, '');
      suffixReplaced = latinSuffix;
      break;
    }
  }

  // 6. カタカナ1文字・2文字ずつローマ字化
  let result = '';
  let i = 0;
  while (i < kataCore.length) {
    const ch = kataCore[i];
    const next = kataCore[i + 1] || '';
    const pair = ch + next;

    // 促音「ッ」
    if (ch === 'ッ') {
      const afterNext = kataCore[i + 2] || '';
      const nextPair = next + afterNext;
      const nextRoma = KANA_DIGRAPHS[nextPair] || KANA_MONOGRAPHS[next] || '';
      if (nextRoma) {
        result += nextRoma[0];
      }
      i += 1;
      continue;
    }

    // 長音「ー」
    if (ch === 'ー') {
      // 学名では長音を重ねずそのままにするのが自然（例: ラメリー → lamerei / lameri）
      i += 1;
      continue;
    }

    // 2文字拗音・外来音
    if (KANA_DIGRAPHS[pair]) {
      result += KANA_DIGRAPHS[pair];
      i += 2;
      continue;
    }

    // 1文字カナ
    if (KANA_MONOGRAPHS[ch]) {
      result += KANA_MONOGRAPHS[ch];
      i += 1;
      continue;
    }

    // 英数字・スペース・ハイフン等はそのまま保持
    result += ch;
    i += 1;
  }

  result += suffixReplaced;

  // 余分な空白の整理
  result = result.replace(/\s+/g, ' ').trim();

  if (!result) return '';

  if (capitalizeFirst) {
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  return result.toLowerCase();
}

// ============================================================================
// 7. 検索・正規化・整形ユーティリティ
// ============================================================================

// 文字列を正規化（ひらがな→カタカナ、空白・中黒・記号を除去）
export function normalizePlantQuery(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    // 全角英数字を半角に変換
    .replace(/[\uFF21-\uFF3A\uFF41-\uFF5A\uFF10-\uFF19]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
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
  return name.replace(/["'“”]*\bhorombense\b["'“”]*/gi, '"horombense"');
}

/**
 * カテゴリからデフォルトの管理IDプレフィックスを返す
 */
function getPrefixByCategory(category?: PlantNameMaster['category'], scientificName = ''): string {
  if (category === 'agave') return 'AGV';
  if (category === 'caudex') return 'CDX';
  if (category === 'shrub') return 'CDX';
  if (category === 'cactus') return 'COP';
  if (category === 'euphorbia') return 'EUP';
  if (/^Pachypodium|Operculicarya|Adenia|Dorstenia|Tylecodon|Othonna|Pelargonium|Ceraria|Dioscorea|Fockea|Adenium/i.test(scientificName)) {
    return 'CDX';
  }
  if (/^Euphorbia|Monadenium/i.test(scientificName)) return 'EUP';
  if (/^Copiapoa|Astrophytum|Gymnocalycium|Lophophora|Ariocarpus|Mammillaria|Echinocactus|Ferocactus/i.test(scientificName)) return 'COP';
  return 'AGV';
}

/**
 * 入力文字列から末尾・内部の修飾語（錦・斑入り・綴化・モンスト等）を分離する
 */
function extractModifiers(rawInput: string): { baseText: string; modifierSuffixes: string[] } {
  let baseText = rawInput.trim();
  const modifierSuffixes: string[] = [];

  // 「(実生)」「実生」「発根済」「現地球」などの管理用メモ語尾は学名変換時にノイズにならないよう除去
  baseText = baseText.replace(/[\s()（）]*(実生苗|実生株|実生|発根済み|発根済|未発根|現地球|輸入株|国内実生|カキ仔|かき仔|子株)[\s()（）]*$/g, '').trim();

  for (const rule of MODIFIER_RULES) {
    for (const kw of rule.keywords) {
      if (baseText.length > kw.length && baseText.endsWith(kw)) {
        baseText = baseText.slice(0, baseText.length - kw.length).trim();
        if (!modifierSuffixes.includes(rule.suffix)) {
          modifierSuffixes.push(rule.suffix);
        }
        break;
      }
    }
  }

  return {
    baseText: baseText || rawInput.trim(),
    modifierSuffixes,
  };
}

/**
 * 入力された和名・通称から最もマッチする学名・英名情報を検索・自動生成する
 * どの「和名・通称」を入力しても必ず対応する学名・英名を返す
 * @param japaneseInput 和名・通称の入力文字列
 * @param existingPlants 過去に登録済みの株リスト（ユーザー学習履歴）
 */
export function lookupScientificName(
  japaneseInput: string,
  existingPlants: Array<{ japaneseName?: string; name: string; category?: any }> = []
): PlantNameMaster | null {
  const trimmed = japaneseInput.trim();
  if (!trimmed) return null;

  const normFull = normalizePlantQuery(trimmed);
  if (!normFull) return null;

  // 修飾語（錦、斑入り、綴化、実生など）を分離したベース文字列も用意
  const { baseText, modifierSuffixes } = extractModifiers(trimmed);
  const normBase = normalizePlantQuery(baseText);

  const appendModifiers = (sciName: string): string => {
    let finalName = sciName;
    for (const mod of modifierSuffixes) {
      if (!finalName.toLowerCase().includes(mod.toLowerCase())) {
        finalName = `${finalName} ${mod}`;
      }
    }
    return formatScientificName(finalName);
  };

  // --------------------------------------------------------------------------
  // Step 1: 内蔵マスター辞書 (PLANT_DICTIONARY) との完全一致（全体 または ベース部分）
  // --------------------------------------------------------------------------
  for (const entry of PLANT_DICTIONARY) {
    for (const kw of entry.keywords) {
      const normKw = normalizePlantQuery(kw);
      if (normKw === normFull) {
        return {
          ...entry,
          scientificName: formatScientificName(entry.scientificName),
        };
      }
      if (normBase && normKw === normBase) {
        return {
          ...entry,
          scientificName: appendModifiers(entry.scientificName),
        };
      }
    }
  }

  // --------------------------------------------------------------------------
  // Step 2: ユーザーの過去登録履歴との「完全一致」のみ照合（部分一致での誤爆を防止）
  // ※学名欄に英字が含まれている有効な登録データのみ学習対象にする
  // --------------------------------------------------------------------------
  for (const plant of existingPlants) {
    if (plant.japaneseName && plant.name && /[a-zA-Z]/.test(plant.name)) {
      const normHist = normalizePlantQuery(plant.japaneseName);
      if (normHist === normFull) {
        const cat = plant.category || 'other';
        return {
          keywords: [plant.japaneseName],
          scientificName: formatScientificName(plant.name),
          category: cat,
          prefix: getPrefixByCategory(cat, plant.name),
        };
      }
      if (normBase && normHist === normBase) {
        const cat = plant.category || 'other';
        return {
          keywords: [plant.japaneseName],
          scientificName: appendModifiers(plant.name),
          category: cat,
          prefix: getPrefixByCategory(cat, plant.name),
        };
      }
    }
  }

  // --------------------------------------------------------------------------
  // Step 3: 属名パーツ辞書 (GENUS_ENTRIES) ＋ 種小名・品種パーツ分解＆自動変換
  // 例: 「パキポディウム・アンボンゲンセ」「ユーフォルビア・デセプタ」「アガベ・チタノタ 黒豹」等
  // --------------------------------------------------------------------------
  const kataBase = toKatakana(baseText).replace(/[\s・\-_/／'"「」『』()（）]/g, '');

  for (const genus of GENUS_ENTRIES) {
    const normGenus = normalizePlantQuery(genus.kana);
    if (normBase.startsWith(normGenus)) {
      const remainderKata = kataBase.slice(genus.kana.length).trim();

      // 属名のみが入力されている段階（例: 「パキポディウム」「ユーフォルビア」）
      if (!remainderKata) {
        return {
          keywords: [trimmed],
          scientificName: appendModifiers(genus.latin),
          category: genus.category,
          prefix: genus.prefix,
        };
      }

      // 残りの種小名・品種名部分が PLANT_DICTIONARY のキーワードに一致するか確認
      for (const entry of PLANT_DICTIONARY) {
        if (entry.category === genus.category || genus.category === 'other') {
          for (const kw of entry.keywords) {
            if (normalizePlantQuery(kw) === normalizePlantQuery(remainderKata)) {
              return {
                ...entry,
                scientificName: appendModifiers(entry.scientificName),
              };
            }
          }
        }
      }

      // 残りの部分が SPECIES_TOKEN_MAP に完全一致するか確認
      if (SPECIES_TOKEN_MAP[remainderKata]) {
        const speciesLatin = SPECIES_TOKEN_MAP[remainderKata];
        return {
          keywords: [trimmed],
          scientificName: appendModifiers(`${genus.latin} ${speciesLatin}`),
          category: genus.category,
          prefix: genus.prefix,
        };
      }

      // 「チタノタ＋園芸品種名」のように途中で種小名を含む複合ケースをチェック
      if (genus.latin === 'Agave' && remainderKata.startsWith('チタノタ')) {
        const cultPart = remainderKata.slice('チタノタ'.length);
        const cultLatin = transliterateToBotanicalLatin(cultPart, true);
        const formattedCult = cultLatin ? ` '${cultLatin.replace(/^'+|'+$/g, '')}'` : '';
        return {
          keywords: [trimmed],
          scientificName: appendModifiers(`Agave titanota${formattedCult}`),
          category: 'agave',
          prefix: 'AGV',
        };
      }

      // 未知の種小名・品種名をラテン文字へ自動変換
      // 漢字が含まれる場合や isSpeciesBase (Agave titanota 等) の場合は園芸品種名 ('Cultivar') として整形
      const hasKanji = /[\u4E00-\u9FFF]/.test(baseText.slice(genus.kana.length));
      if (genus.isSpeciesBase || hasKanji) {
        const cultivarLatin = transliterateToBotanicalLatin(remainderKata, true);
        const cleanCult = cultivarLatin.replace(/^'+|'+$/g, '');
        return {
          keywords: [trimmed],
          scientificName: appendModifiers(cleanCult ? `${genus.latin} '${cleanCult}'` : genus.latin),
          category: genus.category,
          prefix: genus.prefix,
        };
      } else {
        const speciesLatin = transliterateToBotanicalLatin(remainderKata, false);
        return {
          keywords: [trimmed],
          scientificName: appendModifiers(speciesLatin ? `${genus.latin} ${speciesLatin}` : genus.latin),
          category: genus.category,
          prefix: genus.prefix,
        };
      }
    }
  }

  // --------------------------------------------------------------------------
  // Step 4: 内蔵辞書の部分一致（例: 「実生パキポディウム・ホロンベンセ選抜」など先頭に修飾がある場合）
  // ※入力側が辞書のキーワードを完全に含んでいる場合のみ（短い入力で別品種に誤爆するのを防ぐ）
  // --------------------------------------------------------------------------
  let bestPartial: PlantNameMaster | null = null;
  let maxKwLen = 0;

  for (const entry of PLANT_DICTIONARY) {
    for (const kw of entry.keywords) {
      const normKw = normalizePlantQuery(kw);
      if (normKw.length >= 3 && normBase.includes(normKw)) {
        if (normKw.length > maxKwLen) {
          maxKwLen = normKw.length;
          bestPartial = {
            ...entry,
            scientificName: appendModifiers(entry.scientificName),
          };
        }
      }
    }
  }
  if (bestPartial) {
    return bestPartial;
  }

  // --------------------------------------------------------------------------
  // Step 5: 単独の種小名トークン辞書照合（属名なしで種小名だけ入力された場合）
  // --------------------------------------------------------------------------
  if (SPECIES_TOKEN_MAP[kataBase]) {
    const speciesLatin = SPECIES_TOKEN_MAP[kataBase];
    const formatted = speciesLatin.startsWith('"')
      ? speciesLatin
      : speciesLatin.charAt(0).toUpperCase() + speciesLatin.slice(1);
    return {
      keywords: [trimmed],
      scientificName: appendModifiers(formatted),
      category: 'other',
      prefix: 'AGV',
    };
  }

  // --------------------------------------------------------------------------
  // Step 6: 中黒（・）やスペースで区切られた未知の「属名・種小名」の自動変換
  // 例: 「エケベリア・ラウイ」「セダム・モーガニアナム」など
  // --------------------------------------------------------------------------
  const parts = baseText.split(/[・\s/／]+/).filter(Boolean);
  if (parts.length >= 2) {
    const genusPart = transliterateToBotanicalLatin(parts[0], true);
    const restParts = parts.slice(1).map((p, idx) => {
      const hasKanji = /[\u4E00-\u9FFF]/.test(p);
      const trans = transliterateToBotanicalLatin(p, hasKanji || idx > 0);
      return hasKanji ? `'${trans}'` : trans;
    });
    const combined = [genusPart, ...restParts].filter(Boolean).join(' ');
    if (combined) {
      return {
        keywords: [trimmed],
        scientificName: appendModifiers(combined),
        category: 'other',
        prefix: 'AGV',
      };
    }
  }

  // --------------------------------------------------------------------------
  // Step 7: 最終フォールバック（どんな未知の和名・通称でもラテン/英名表記に自動変換）
  // --------------------------------------------------------------------------
  const fallbackLatin = transliterateToBotanicalLatin(baseText, true);
  if (fallbackLatin) {
    return {
      keywords: [trimmed],
      scientificName: appendModifiers(fallbackLatin),
      category: 'other',
      prefix: 'AGV',
    };
  }

  return null;
}
