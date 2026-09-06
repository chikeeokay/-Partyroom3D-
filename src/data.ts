import { CatStaff, VenueRoom, BoardGameEvent, MahjongRule, PrintingShowcase, VenuePhoto } from './types';

export const CAT_STAFF: CatStaff[] = [
  {
    id: 'cat-1',
    name: '阿池 (Chi)',
    role: '自動麻將機監工 ‧ 高級質檢經理',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop',
    specialty: '最喜歡躺在熱呼呼的電動麻將機出牌口，或者鑽進開著的桌遊紙盒裡監工，是全場的靈魂店長。',
    bgColor: 'bg-amber-100 border-amber-300'
  },
  {
    id: 'cat-2',
    name: '肥橘 (Chubby)',
    role: '策略桌遊陪玩 ‧ 重量級店員',
    avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=400&auto=format&fit=crop',
    specialty: '常駐大場實木長桌，專門在玩家思考重策《夏克頓基地》或《五大部落》時，趴在計分板上施加「重量級」精神壓力。',
    bgColor: 'bg-orange-100 border-orange-300'
  }
];

export const VENUE_ROOMS: VenueRoom[] = [
  {
    id: 'room-large',
    name: '大場 (Main Lounge)',
    title: '溫馨舒適 ‧ 700實呎超大聚會空間',
    description: '配備豪華實木長木桌、舒適皮革沙發和整面落地桌遊牆（藏書高達500副以上！）。設有大電視打機區域、專業電子飛鏢機，並有店貓隨時陪玩，氛圍輕鬆愜意。',
    images: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=800&auto=format&fit=crop'
    ],
    features: [
      '500+ 副各類熱門桌上遊戲任玩',
      '大屏幕電視 (Switch 遊戲機任玩)',
      '專業電子飛鏢機 (支援連App連線)',
      '獨廁 + Pantry (備有冷熱水、微波爐)',
      '寵物友善空間 (歡迎攜帶寵物進場)',
      '無限紙包飲品任飲'
    ],
    slogan: '可預約參觀場地，搞手 Host 或機構長期合作，價錢可議！'
  },
  {
    id: 'room-small',
    name: '細房 (Private Rooms)',
    title: '獨立包廂 ‧ 多功能自動麻將/派對房',
    description: '適合尋求私密性的麻將愛好者、狼人殺團隊或私人派對。配備最頂級的自動36號/42號電動麻將機（支援多種玩法如跑馬仔、廣東牌、日麻、越南百搭等），設有隔音牆與專屬沙發電視，提供完美私密玩樂體驗。',
    images: [
      'https://images.unsplash.com/photo-1601987177651-8edfe6c20009?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=800&auto=format&fit=crop'
    ],
    features: [
      '頂級電動36號台式/越南百搭/電動日麻',
      '電動42號牌（跑馬仔/廣東牌/有花無花）',
      '專業隔音及私密包廂設計',
      '專屬電視與舒適沙發打機區',
      '血染/狼人殺專業面具套裝與氛圍背景燈',
      '一樣享受紙包飲品任飲！'
    ],
    slogan: '不限人數包場，平日最低僅 $400 起，即可享受極致私人玩樂時光！'
  }
];

export const BOARD_GAME_EVENTS: BoardGameEvent[] = [
  {
    id: 'event-1',
    title: '池記桌遊 3D打印收納免費贈送活動',
    badge: '',
    badgeBg: '',
    time: '不定期舉辦 (需店內自取，不連遊戲)',
    price: '免費贈送 (限自取)',
    description: '池記特別福利！我們自家 3D 打印工作室設計並打印的多款熱門桌遊精美收納盒（如 Scout、Moon Adventure、Startups 等），不定期在活動中免費贈送給桌遊同好！幫您的遊戲配件排得整整齊齊，省去繁瑣設置時間。',
    imageUrl: '/event-1.png.jpg',
    tags: ['3D打印', '桌遊收納', '免費福利', '現貨自取']
  },
  {
    id: 'event-2',
    title: '池記桌遊 桌遊盲盒之夜',
    badge: '',
    badgeBg: '',
    time: '星期五 7.11.2025 (1900-2400)',
    price: 'HK$80 / 位 (包教學及紙包飲品任飲)',
    description: '每逢星期五晚，池記桌遊為您準備了神祕的「桌遊盲盒之夜」！不知道玩什麼好？由店主親自為您挑選並教學多款有趣桌遊，充滿驚喜與歡樂，適合所有玩家參與。',
    imageUrl: '/event-2.png.jpg',
    tags: ['盲盒桌遊', '紙包飲品任飲', '驚喜不斷']
  },
  {
    id: 'event-3',
    title: '主題之夜：SHACKLETON (沙克爾頓)',
    badge: '',
    badgeBg: '',
    time: '星期四 23.10.2025 (1900-2400)',
    price: 'HK$80 / 位 (包教學及紙包飲品任飲)',
    description: '本次主題之夜主打極地探險桌遊《Shackleton》。招募勇敢的探險家一同重溫這段傳奇歷史，運用策略與資源管理，在冰雪中求生！同場亦會提供其他精彩桌遊。',
    imageUrl: '/event-3.png.jpg',
    tags: ['主題之夜', '策略桌遊', '紙包飲品任飲']
  },
  {
    id: 'event-4',
    title: '重陽節/紅日特別假期：桌遊狂歡日',
    badge: '',
    badgeBg: '',
    time: '重陽節/紅日 29.10.2025 13:00 - 24:00 (1300-2400)',
    price: 'HK$100 / 位',
    description: '假期就要從中午一直玩到深夜！長達 11 小時不限時暢玩，特設熱門經典與新派桌遊教學專場，主打《五大部落 Five Tribes》、《北灣漁村 Saltfjord》及多款輕鬆幽默的小品桌遊（如《電梯前》等）。大場與細房同時開放，還有電動麻雀、Switch 與飛鏢任你解鎖！',
    imageUrl: '/event-4.png.jpg',
    theme: '主打《五大部落》、《北灣漁村》、輕Games及各類Partyroom配套',
    tags: ['長時暢玩', '紙包飲品任飲', '電動麻雀', '節日狂歡']
  }
];

export const MAHJONG_RULES: MahjongRule[] = [
  {
    id: 'rule-1',
    title: '齊四人即開班 ‧ 唔打錢',
    fans: 0,
    description: '由池記精心組織的港式台灣牌（16張）新手教學日，純粹趣味交流、社交與番數計算學習，絕不涉及任何真錢賭博，給您最無壓力的優質學習環境。',
    example: '適合：從未打過、只懂廣東牌想學台牌、或打牌慢怕被駡的新手玩家。'
  },
  {
    id: 'rule-2',
    title: '最大永遠一蚊番 (統一番表)',
    fans: 1,
    description: '我們社群內部「輕鬆打谷」的標準規則。為確保大家打得輕鬆、無壓力、不傷和氣，最大限制為一元一分，並採用池記制定的清晰統一番數對照表。',
    example: '即使拉莊、自摸、或做出天牌大牌，也只在極低限額內，打牌純粹是為了口水、吹水和體驗做牌樂趣！'
  },
  {
    id: 'rule-3',
    title: '摸錯撞/上六打九，唔驚！我地包容！',
    fans: 10,
    description: '在池記台灣牌谷中，新手犯錯是絕對被允許的！不小心摸錯牌、撞牌、或者上六萬卻打出九萬，大家只會笑笑口，甚至溫柔提醒您「收返埋」重打，絕對不會有Deadair或老牌手黑面。',
    example: '詐糊也只須極低賠償（如每位$30元/或直接算對手叫和番數），打得慢不要緊，下家選擇困難症、上家開牌慢，大家一樣包容。'
  }
];

export const PRINTING_SHOWCASE_ITEMS: PrintingShowcase[] = [
  {
    id: 'p-1',
    title: 'Scout 3D打印專屬收納',
    category: 'insert',
    description: '為經典卡牌桌遊《Scout》量身定製的3D打印內盒！卡牌槽完美相容厚牌套，圓形代幣槽、得分指針、加分指示物等配件各有專屬收納槽，一秒開盒，免去橡筋和密封袋的雜亂。',
    imageUrl: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?q=80&w=600&auto=format&fit=crop',
    specs: '材料: 高強度環保 PLA ‧ 特點: 完美卡扣, 支援加厚保護套'
  },
  {
    id: 'p-2',
    title: 'Moon Adventure & Startups 桌遊收納',
    category: 'insert',
    description: '針對 Oink Games 系列迷你包裝桌遊精心設計的 3D 打印超緊湊收納。極致利用包裝盒內每一毫米空間，代幣分類一目了然，並提供多種清新糖果配色，極具裝飾感。',
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=600&auto=format&fit=crop',
    specs: '材料: 彩色 PLA ‧ 特點: 雙層分類架, 輕便防指紋面'
  },
  {
    id: 'p-3',
    title: '精細城堡模型與 TRPG 跑團地形',
    category: 'model',
    description: '採用高精度 FDM 3D 打印機（Creality / Bambu Lab）及光固化樹脂（Anycubic Photon M3 Premium）打印的超精細奇幻城堡與哥德式大教堂。磚牆、微型樹木和山體岩石紋理歷歷在目，可用於 TRPG 戰棋或微縮景觀擺設。',
    imageUrl: 'https://images.unsplash.com/photo-1544654803-b69110db26c6?q=80&w=600&auto=format&fit=crop',
    specs: '材料: 高清灰色樹脂 / 高精密 FDM ‧ 特點: 0.05mm 層高極致細節'
  },
  {
    id: 'p-4',
    title: '可愛黃色恐龍與手機支架',
    category: 'accessory',
    description: '趣味創意的 3D 打印日常潮玩配件。亮黃色三角龍多功能桌面擺設，尾部可容納水筆或工具，背部提供舒適的角度用作手機支架或卡牌展示架，為您的書桌增添亮麗色彩！',
    imageUrl: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=600&auto=format&fit=crop',
    specs: '材料: 優質 PETG ‧ 特點: 一體化打印, 穩固耐摔'
  }
];

export const VENUE_PHOTOS: VenuePhoto[] = [
  {
    "id": "photo-user-1",
    "title": "大場 ‧ 池記現場實景 (2026 02 19)",
    "category": "main_hall",
    "imageUrl": "/uploads/venue-main_hall-1788661994239-9551.jpg",
    "description": "池記桌遊大場實景拍攝，舒適長桌與齊全桌遊設施。",
    "tags": [
      "大場",
      "池記桌遊",
      "場地相片"
    ],
    "featured": true,
    "date": "2026-02"
  },
  {
    "id": "photo-1",
    "title": "大場 ‧ 700呎溫馨長桌與500+桌遊藏書牆",
    "category": "main_hall",
    "imageUrl": "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop",
    "description": "實木超大長桌，支援 10-18 人同場開局！背靠整面 500+ 款各類熱門與絕版桌遊藏書牆。",
    "tags": [
      "大場",
      "超大長桌",
      "500款桌遊牆"
    ],
    "featured": true,
    "date": "2025-2026"
  },
  {
    "id": "photo-2",
    "title": "細房 ‧ 獨立電動麻將私密包廂實景",
    "category": "small_room",
    "imageUrl": "https://images.unsplash.com/photo-1601987177651-8edfe6c20009?q=80&w=1000&auto=format&fit=crop",
    "description": "配備靜音自動洗牌電動麻將機（支援 36 號及 42 號大牌），獨立私密隔音包廂。",
    "tags": [
      "細房",
      "電動麻將機",
      "獨立包廂",
      "舒適沙發"
    ],
    "featured": false,
    "date": "2025-2026"
  },
  {
    "id": "photo-3",
    "title": "桌遊相片 ‧ 500+款經典策略與熱門派對遊戲",
    "category": "boardgames",
    "imageUrl": "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1000&auto=format&fit=crop",
    "description": "全店收藏超過 500 款國內外正版桌遊，涵蓋重度歐式策略、陣營推理、歡樂派對及雙人對戰。",
    "tags": [
      "桌遊相片",
      "策略遊戲",
      "派對歡樂",
      "店主親授"
    ],
    "featured": true,
    "date": "2025-2026"
  },
  {
    "id": "photo-4",
    "title": "店貓日常 ‧ 靈魂店長阿池與肥橘監工中",
    "category": "cat",
    "imageUrl": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop",
    "description": "常駐大場與電動麻將機出牌口的店貓阿池，隨時陪伴各位玩家一同開局與放鬆。",
    "tags": [
      "店貓日常",
      "阿池",
      "肥橘",
      "寵物友善"
    ],
    "featured": false,
    "date": "2025-2026"
  },
  {
    "id": "photo-5",
    "title": "大場 ‧ 電子飛鏢機與 Switch 娛樂打機專區",
    "category": "main_hall",
    "imageUrl": "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=1000&auto=format&fit=crop",
    "description": "專業聯網電子飛鏢機與高清大電視 Switch 遊戲專區，桌遊休息時隨時開局！",
    "tags": [
      "大場",
      "電子飛鏢",
      "Switch打機",
      "沙發放鬆"
    ],
    "featured": false,
    "date": "2025-2026"
  },
  {
    "id": "photo-6",
    "title": "細房 ‧ 沉浸式狼人殺/血染鐘樓配置",
    "category": "small_room",
    "imageUrl": "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop",
    "description": "專屬氛圍燈光與說書人專用魔典面具，享受無干擾的極致推理體驗。",
    "tags": [
      "細房",
      "血染鐘樓",
      "狼人殺",
      "私密隔音"
    ],
    "featured": false,
    "date": "2025-2026"
  }
];
