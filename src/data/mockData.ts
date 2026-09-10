import { GameItem, NominalItem, PaymentMethod, PromoCode } from '../types';

export const POPULAR_GAMES: GameItem[] = [
  {
    id: 're-requiem',
    title: 'Resident Evil Requiem Deluxe Edition (PC) - Steam Key',
    slug: 'resident-evil-requiem',
    category: 'key',
    publisher: 'CAPCOM Co., Ltd.',
    developers: 'CAPCOM Co., Ltd.',
    releaseDate: '26 Februari 2026',
    genres: 'Action, Adventure, Horror',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
    ],
    minPrice: 883200,
    rating: 4.9,
    reviewsCount: '183 ulasan',
    soldCount: '183 terjual',
    instantDelivery: true,
    isPopular: true,
    isHot: true,
    badge: 'Key Resmi',
    platform: 'Steam',
    region: 'Southeast-Asia',
    typeLabel: 'Key Digital',
    activationNote: 'Kamu akan terima key digital untuk langsung redeem di Steam. Aktivasi tersedia di Indonesia.',
    description: 'This is a preorder item. Delivery by 27 February 2026. Requiem for the dead. Nightmare for the living. Prepare to escape death in a heart-stopping experience that will chill you to your core.',
    editionDetail: "Resident Evil Requiem - Grace's Costume: Apocalypse, Bonus Weapon Attachment & Artbook Digital.",
    systemRequirements: {
      min: {
        os: 'Windows 11 (64bit required)',
        processor: 'Intel core i5-8500 / AMD Ryzen 5 3500',
        memory: '16 GB RAM',
        graphics: 'GeForce GTX 1660 6GB / Radeon RX 5500 XT 8GB',
        directX: 'Version 12'
      },
      rec: {
        os: 'Windows 11 (64bit required)',
        processor: 'Intel core i7-8700 / AMD Ryzen 5 5500',
        memory: '16 GB RAM',
        graphics: 'GeForce RTX 2060 Super 8GB / Radeon RX 6600 8GB',
        directX: 'Version 12'
      }
    },
    sellers: [
      {
        id: 'seller-dnt',
        name: 'dntStore',
        rating: 4.9,
        reviewCount: '151.3rb',
        soldCount: 183,
        price: 883200,
        originalPrice: 910000,
        isOnline: true,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      },
      {
        id: 'seller-firefly',
        name: 'firefly',
        rating: 4.9,
        reviewCount: '147.7rb',
        soldCount: 39,
        price: 885000,
        originalPrice: 910000,
        isOnline: true,
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80'
      }
    ],
    faqs: [
      {
        question: 'Why should you buy Resident Evil Requiem Steam Key Southeast-Asia on pojan topup?',
        answer: 'Pojan Topup memberikan jaminan key original 100% langsung dari distributor resmi Capcom dengan garansi uang kembali jika key bermasalah serta pengiriman otomatis 24 jam nonstop.'
      },
      {
        question: 'Is it safe to buy Resident Evil Requiem Steam Key Southeast-Asia on pojan topup?',
        answer: 'Sangat aman! Seluruh transaksi dienkripsi 256-bit SSL dan penjual telah melewati verifikasi identitas (KYC) resmi Pojan Topup.'
      },
      {
        question: 'How easy is it to buy Resident Evil Requiem Steam Key on pojan topup?',
        answer: 'Sangat mudah, cukup pilih edisi game, masukkan email Anda untuk pengiriman kode, selesaikan pembayaran via QRIS / VA, dan CD-Key langsung muncul di layar Anda!'
      },
      {
        question: 'How to redeem the Resident Evil Requiem key on Steam?',
        answer: 'Buka aplikasi Steam di PC Anda > Klik menu "Games" di pojok kiri atas > Pilih "Activate a Product on Steam..." > Masukkan CD-Key yang Anda dapatkan lalu klik Next.'
      }
    ],
    idFormat: {
      userIdLabel: 'Email Pengiriman Key Steam',
      userIdPlaceholder: 'emailkamu@gmail.com',
      requiresZoneId: false,
      guideTip: 'CD-Key Steam resmi akan dikirim otomatis ke email dan ditampilkan di invoice setelah bayar.'
    }
  },
  {
    id: 'mlbb',
    title: 'Mobile Legends',
    slug: 'mobile-legends',
    category: 'topup',
    publisher: 'Moonton',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    minPrice: 1500,
    rating: 4.9,
    soldCount: '45.2k+',
    instantDelivery: true,
    isPopular: true,
    isHot: true,
    badge: 'Populer',
    idFormat: {
      userIdLabel: 'User ID',
      userIdPlaceholder: 'Contoh: 12345678',
      requiresZoneId: true,
      zoneIdLabel: 'Zone ID / Server',
      zoneIdPlaceholder: 'Contoh: 2024',
      guideTip: 'Buka profil MLBB di pojok kiri atas. ID ada di bawah nama akun Anda, format: 12345678 (2024).'
    }
  },
  {
    id: 'ff',
    title: 'Garena Free Fire',
    slug: 'free-fire',
    category: 'topup',
    publisher: 'Garena',
    coverImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80',
    minPrice: 1000,
    rating: 4.8,
    soldCount: '38.9k+',
    instantDelivery: true,
    isPopular: true,
    badge: 'Kilat',
    idFormat: {
      userIdLabel: 'Player ID',
      userIdPlaceholder: 'Contoh: 987654321',
      requiresZoneId: false,
      guideTip: 'Buka profil Free Fire Anda di sudut kiri atas layar utama, salin Player ID Anda.'
    }
  },
  {
    id: 'genshin',
    title: 'Genshin Impact',
    slug: 'genshin-impact',
    category: 'topup',
    publisher: 'HoYoverse',
    coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    minPrice: 16000,
    rating: 4.9,
    soldCount: '29.1k+',
    instantDelivery: true,
    isPopular: true,
    badge: 'Resmi',
    idFormat: {
      userIdLabel: 'UID Genshin Impact',
      userIdPlaceholder: 'Contoh: 812345678',
      requiresZoneId: true,
      zoneIdLabel: 'Server Game',
      zoneIdPlaceholder: 'Pilih Server (Asia / America / Europe / TW)',
      guideTip: 'UID tertera di pojok kanan bawah layar saat dalam game atau pada menu Paimon.'
    }
  },
  {
    id: 'roblox',
    title: 'Roblox (Robux & Item)',
    slug: 'roblox',
    category: 'roblox',
    publisher: 'Roblox Corporation',
    coverImage: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=1200&q=80',
    minPrice: 140,
    rating: 4.9,
    soldCount: '62.4k+',
    instantDelivery: true,
    isPopular: true,
    isHot: true,
    badge: 'Termurah',
    idFormat: {
      userIdLabel: 'Roblox Username',
      userIdPlaceholder: 'Contoh: PlayerGamer123',
      requiresZoneId: false,
      guideTip: 'Masukkan username Roblox Anda yang terdaftar tanpa spasi.'
    }
  },
  {
    id: 'hsr',
    title: 'Honkai: Star Rail',
    slug: 'honkai-star-rail',
    category: 'topup',
    publisher: 'HoYoverse',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    minPrice: 16000,
    rating: 4.9,
    soldCount: '19.4k+',
    instantDelivery: true,
    idFormat: {
      userIdLabel: 'UID Honkai Star Rail',
      userIdPlaceholder: 'Contoh: 801234567',
      requiresZoneId: true,
      zoneIdLabel: 'Server',
      zoneIdPlaceholder: 'Pilih Server',
      guideTip: 'UID dapat dilihat pada menu pause di profil Trailblazer Anda.'
    }
  },
  {
    id: 'pubgm',
    title: 'PUBG Mobile',
    slug: 'pubg-mobile',
    category: 'topup',
    publisher: 'Level Infinite',
    coverImage: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=1200&q=80',
    minPrice: 14500,
    rating: 4.8,
    soldCount: '22.8k+',
    instantDelivery: true,
    idFormat: {
      userIdLabel: 'Player ID (UID)',
      userIdPlaceholder: 'Contoh: 5123456789',
      requiresZoneId: false,
      guideTip: 'Klik avatar profil Anda di sudut kiri atas menu utama untuk melihat ID PUBG.'
    }
  },
  {
    id: 'valorant',
    title: 'Valorant Points',
    slug: 'valorant',
    category: 'topup',
    publisher: 'Riot Games',
    coverImage: 'https://images.unsplash.com/photo-1552824792-74431a478142?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1552824792-74431a478142?auto=format&fit=crop&w=1200&q=80',
    minPrice: 15000,
    rating: 4.9,
    soldCount: '34.5k+',
    instantDelivery: true,
    isPopular: true,
    badge: 'Instant Riot',
    idFormat: {
      userIdLabel: 'Riot ID (Username#Tag)',
      userIdPlaceholder: 'Contoh: JettMaster#INA',
      requiresZoneId: false,
      guideTip: 'Masukkan Riot ID lengkap beserta Tagline pemisah tanda pagar (#).'
    }
  },
  {
    id: 'bloodstrike',
    title: 'Blood Strike',
    slug: 'blood-strike',
    category: 'topup',
    publisher: 'NetEase Games',
    coverImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80',
    minPrice: 13500,
    rating: 4.8,
    soldCount: '12.3k+',
    instantDelivery: true,
    badge: 'Diskon',
    idFormat: {
      userIdLabel: 'User ID Blood Strike',
      userIdPlaceholder: 'Contoh: 10098234',
      requiresZoneId: false,
      guideTip: 'Buka profil karakter Anda di menu utama untuk melihat User ID.'
    }
  },
  {
    id: 'steam-wallet',
    title: 'Steam Wallet IDR',
    slug: 'steam-wallet',
    category: 'giftcard',
    publisher: 'Valve Corporation',
    coverImage: 'https://images.unsplash.com/photo-1612287271186-476eec2a9b24?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1612287271186-476eec2a9b24?auto=format&fit=crop&w=1200&q=80',
    minPrice: 12000,
    rating: 4.95,
    soldCount: '51.1k+',
    instantDelivery: true,
    isPopular: true,
    badge: 'Voucher Resmi',
    idFormat: {
      userIdLabel: 'Email Pengiriman Kode',
      userIdPlaceholder: 'emailkamu@gmail.com',
      requiresZoneId: false,
      guideTip: 'Kode voucher digital akan dikirimkan otomatis ke email dan nomor WhatsApp Anda.'
    }
  },
  {
    id: 'google-play',
    title: 'Google Play Gift Card',
    slug: 'google-play',
    category: 'giftcard',
    publisher: 'Google LLC',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    minPrice: 20000,
    rating: 4.9,
    soldCount: '27.4k+',
    instantDelivery: true,
    idFormat: {
      userIdLabel: 'Email Penerima',
      userIdPlaceholder: 'emailkamu@gmail.com',
      requiresZoneId: false,
      guideTip: 'Kode redeem resmi region Indonesia akan langsung dikirim setelah verifikasi bayar.'
    }
  },
  {
    id: 'hok',
    title: 'Honor of Kings',
    slug: 'honor-of-kings',
    category: 'topup',
    publisher: 'Level Infinite',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    minPrice: 12000,
    rating: 4.85,
    soldCount: '15.6k+',
    instantDelivery: true,
    idFormat: {
      userIdLabel: 'Player ID (UID)',
      userIdPlaceholder: 'Contoh: 1234567890',
      requiresZoneId: false,
      guideTip: 'Buka profil di pojok kiri atas dan salin UID Anda.'
    }
  },
  {
    id: 'psn',
    title: 'PlayStation Network Card',
    slug: 'playstation-network',
    category: 'giftcard',
    publisher: 'Sony Interactive Ent.',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    minPrice: 100000,
    rating: 4.9,
    soldCount: '11.8k+',
    instantDelivery: true,
    idFormat: {
      userIdLabel: 'Email Pengiriman Kode',
      userIdPlaceholder: 'emailkamu@gmail.com',
      requiresZoneId: false,
      guideTip: 'Kode voucher digital PSN Wallet IDR terkirim otomatis detik itu juga.'
    }
  }
];

export const NOMINALS_BY_GAME: Record<string, NominalItem[]> = {
  're-requiem': [
    { 
      id: 're-standard', 
      gameId: 're-requiem', 
      title: 'Resident Evil Requiem (PC) Steam Key Southeast-Asia', 
      amount: 'Standard Edition Preorder', 
      price: 749000, 
      originalPrice: 799000, 
      categoryTag: 'Key' 
    },
    { 
      id: 're-deluxe', 
      gameId: 're-requiem', 
      title: 'Resident Evil Requiem Deluxe Edition (PC) Steam Key Southeast-Asia', 
      amount: 'Deluxe Edition + Grace Costume Apocalypse', 
      price: 883200, 
      originalPrice: 910000, 
      isPopular: true, 
      categoryTag: 'Key' 
    },
  ],
  mlbb: [
    { id: 'ml-wdp', gameId: 'mlbb', title: 'Weekly Diamond Pass (WDP)', amount: '210 Diamonds + Reward', price: 27500, originalPrice: 35000, isPopular: true, categoryTag: 'Pass' },
    { id: 'ml-86', gameId: 'mlbb', title: '86 Diamonds', amount: '78 + 8 Bonus', price: 20500, categoryTag: 'Diamonds' },
    { id: 'ml-172', gameId: 'mlbb', title: '172 Diamonds', amount: '156 + 16 Bonus', price: 41000, isPopular: true, categoryTag: 'Diamonds' },
    { id: 'ml-257', gameId: 'mlbb', title: '257 Diamonds', amount: '234 + 23 Bonus', price: 61500, categoryTag: 'Diamonds' },
    { id: 'ml-706', gameId: 'mlbb', title: '706 Diamonds', amount: '625 + 81 Bonus', price: 168000, originalPrice: 185000, isPopular: true, categoryTag: 'Diamonds' },
    { id: 'ml-2195', gameId: 'mlbb', title: '2195 Diamonds', amount: '1860 + 335 Bonus', price: 505000, originalPrice: 550000, categoryTag: 'Diamonds' },
    { id: 'ml-sl', gameId: 'mlbb', title: 'Starlight Card (Bulan Ini)', amount: '300 Diamond Value', price: 89000, originalPrice: 110000, categoryTag: 'Pass' },
    { id: 'ml-slp', gameId: 'mlbb', title: 'Starlight Plus Card', amount: 'Premium Perks', price: 185000, categoryTag: 'Pass' },
  ],
  ff: [
    { id: 'ff-70', gameId: 'ff', title: '70 Diamonds', amount: '70 Diamonds', price: 9500, categoryTag: 'Diamonds' },
    { id: 'ff-140', gameId: 'ff', title: '140 Diamonds', amount: '140 Diamonds', price: 18000, originalPrice: 20000, isPopular: true, categoryTag: 'Diamonds' },
    { id: 'ff-355', gameId: 'ff', title: '355 Diamonds', amount: '355 Diamonds', price: 45000, categoryTag: 'Diamonds' },
    { id: 'ff-720', gameId: 'ff', title: '720 Diamonds', amount: '720 Diamonds', price: 90000, originalPrice: 100000, isPopular: true, categoryTag: 'Diamonds' },
    { id: 'ff-1450', gameId: 'ff', title: '1450 Diamonds', amount: '1450 Diamonds', price: 180000, categoryTag: 'Diamonds' },
    { id: 'ff-member-m', gameId: 'ff', title: 'Membership Mingguan', amount: '450 Diamond Value', price: 29000, isPopular: true, categoryTag: 'Pass' },
    { id: 'ff-member-b', gameId: 'ff', title: 'Membership Bulanan', amount: '2600 Diamond Value', price: 89000, categoryTag: 'Pass' },
  ],
  genshin: [
    { id: 'gi-welkin', gameId: 'genshin', title: 'Blessing of the Welkin Moon', amount: '3000 Primogem Value', price: 79900, originalPrice: 105000, isPopular: true, categoryTag: 'Pass' },
    { id: 'gi-60', gameId: 'genshin', title: '60 Genesis Crystals', amount: '60 Crystals', price: 15500, categoryTag: 'Diamonds' },
    { id: 'gi-300', gameId: 'genshin', title: '300 + 30 Genesis Crystals', amount: '330 Crystals', price: 72000, categoryTag: 'Diamonds' },
    { id: 'gi-980', gameId: 'genshin', title: '980 + 110 Genesis Crystals', amount: '1090 Crystals', price: 225000, isPopular: true, categoryTag: 'Diamonds' },
    { id: 'gi-1980', gameId: 'genshin', title: '1980 + 260 Crystals', amount: '2240 Crystals', price: 449000, originalPrice: 489000, categoryTag: 'Diamonds' },
    { id: 'gi-3280', gameId: 'genshin', title: '3280 + 600 Crystals', amount: '3880 Crystals', price: 739000, categoryTag: 'Diamonds' },
  ],
  roblox: [
    { id: 'rbx-100', gameId: 'roblox', title: '100 Robux (Instant)', amount: '100 Robux', price: 17500, originalPrice: 20000, categoryTag: 'Diamonds' },
    { id: 'rbx-250', gameId: 'roblox', title: '250 Robux (Instant)', amount: '250 Robux', price: 42000, categoryTag: 'Diamonds' },
    { id: 'rbx-500', gameId: 'roblox', title: '500 Robux (Instant)', amount: '500 Robux', price: 84000, originalPrice: 95000, isPopular: true, categoryTag: 'Diamonds' },
    { id: 'rbx-800', gameId: 'roblox', title: '800 Robux Gift Code', amount: '800 Robux', price: 149000, originalPrice: 165000, isPopular: true, categoryTag: 'Pass' },
    { id: 'rbx-1000', gameId: 'roblox', title: '1000 Robux Gamepass (5 Hari)', amount: '1000 Robux', price: 140000, categoryTag: 'Promo' },
    { id: 'rbx-2000', gameId: 'roblox', title: '2000 Robux (Instant Delivery)', amount: '2000 Robux', price: 325000, categoryTag: 'Diamonds' },
  ],
  'steam-wallet': [
    { id: 'stm-12', gameId: 'steam-wallet', title: 'Steam Wallet IDR 12.000', amount: 'Kode Digital Resmi', price: 13500, categoryTag: 'Promo' },
    { id: 'stm-45', gameId: 'steam-wallet', title: 'Steam Wallet IDR 45.000', amount: 'Kode Digital Resmi', price: 48000, isPopular: true, categoryTag: 'Diamonds' },
    { id: 'stm-90', gameId: 'steam-wallet', title: 'Steam Wallet IDR 90.000', amount: 'Kode Digital Resmi', price: 95000, isPopular: true, categoryTag: 'Diamonds' },
    { id: 'stm-250', gameId: 'steam-wallet', title: 'Steam Wallet IDR 250.000', amount: 'Kode Digital Resmi', price: 262000, categoryTag: 'Diamonds' },
    { id: 'stm-400', gameId: 'steam-wallet', title: 'Steam Wallet IDR 400.000', amount: 'Kode Digital Resmi', price: 418000, categoryTag: 'Diamonds' },
  ],
  valorant: [
    { id: 'val-125', gameId: 'valorant', title: '125 Valorant Points', amount: '125 VP', price: 15000, categoryTag: 'Diamonds' },
    { id: 'val-420', gameId: 'valorant', title: '420 Valorant Points', amount: '420 VP', price: 50000, isPopular: true, categoryTag: 'Diamonds' },
    { id: 'val-700', gameId: 'valorant', title: '700 Valorant Points', amount: '700 VP', price: 80000, categoryTag: 'Diamonds' },
    { id: 'val-1375', gameId: 'valorant', title: '1375 Valorant Points', amount: '1375 VP', price: 155000, isPopular: true, categoryTag: 'Diamonds' },
    { id: 'val-2400', gameId: 'valorant', title: '2400 Valorant Points', amount: '2400 VP', price: 260000, categoryTag: 'Diamonds' },
  ]
};

// Fallback generator for other games
export const getNominalsForGame = (gameId: string): NominalItem[] => {
  if (NOMINALS_BY_GAME[gameId]) {
    return NOMINALS_BY_GAME[gameId];
  }
  return [
    { id: `${gameId}-item-1`, gameId, title: 'Paket Starter', amount: 'Item / Koin Dasar', price: 15000, categoryTag: 'Diamonds' },
    { id: `${gameId}-item-2`, gameId, title: 'Paket Regular', amount: 'Best Value Top Up', price: 49000, isPopular: true, categoryTag: 'Diamonds' },
    { id: `${gameId}-item-3`, gameId, title: 'Paket Spesial Pass', amount: 'Monthly Privilege', price: 89000, originalPrice: 109000, categoryTag: 'Pass' },
    { id: `${gameId}-item-4`, gameId, title: 'Paket Sultan Mega', amount: 'Bonus Maksimal', price: 299000, categoryTag: 'Promo' },
  ];
};

export const FLASH_SALE_ITEMS = [
  {
    id: 'flash-1',
    gameId: 'mlbb',
    gameTitle: 'Mobile Legends',
    itemTitle: 'Weekly Diamond Pass (WDP)',
    badge: 'Terlaris',
    originalPrice: 35000,
    discountPrice: 27500,
    discountPercent: 21,
    soldCount: '52.076 terjual',
    rating: 4.87,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
    nominalId: 'ml-wdp'
  },
  {
    id: 'flash-2',
    gameId: 'bloodstrike',
    gameTitle: 'Blood Strike',
    itemTitle: '100 Golds Instant',
    badge: 'Diskon 15%',
    originalPrice: 16000,
    discountPrice: 13635,
    discountPercent: 15,
    soldCount: '2.960 terjual',
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=400&q=80',
    nominalId: 'bloodstrike-item-1'
  },
  {
    id: 'flash-3',
    gameId: 'ff',
    gameTitle: 'Garena Free Fire',
    itemTitle: '140 Diamonds Murah',
    badge: 'Kilat',
    originalPrice: 20000,
    discountPrice: 18000,
    discountPercent: 10,
    soldCount: '6.744 terjual',
    rating: 4.83,
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=400&q=80',
    nominalId: 'ff-140'
  },
  {
    id: 'flash-4',
    gameId: 'pubgm',
    gameTitle: 'PUBG Mobile',
    itemTitle: '60 UC Instant Delivery',
    badge: 'Hot Deal',
    originalPrice: 18500,
    discountPrice: 14500,
    discountPercent: 22,
    soldCount: '1.499 terjual',
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=400&q=80',
    nominalId: 'pubgm-item-1'
  },
  {
    id: 'flash-5',
    gameId: 'genshin',
    gameTitle: 'Genshin Impact',
    itemTitle: 'Blessing of Welkin Moon',
    badge: 'Resmi HoYoverse',
    originalPrice: 105000,
    discountPrice: 79900,
    discountPercent: 24,
    soldCount: '24.661 terjual',
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80',
    nominalId: 'gi-welkin'
  },
  {
    id: 'flash-6',
    gameId: 'roblox',
    gameTitle: 'Roblox',
    itemTitle: '500 Robux Instant Transfer',
    badge: 'Paling Dicari',
    originalPrice: 95000,
    discountPrice: 84000,
    discountPercent: 12,
    soldCount: '12.612 terjual',
    rating: 4.87,
    image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=400&q=80',
    nominalId: 'rbx-500'
  }
];

export const ROBLOX_ITEMS = [
  {
    id: 'rblx-1',
    title: 'Robux 500 Fast Via Username',
    game: 'Roblox Global',
    price: 84000,
    tag: 'Instan',
    sold: '2.880 terjual',
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rblx-2',
    title: 'Blox Fruits Akun Box Fruit + Bedrock Edition',
    game: 'Blox Fruits',
    price: 6000,
    tag: 'Instan',
    sold: '5.159 terjual',
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rblx-3',
    title: 'Fisch It! Evolved Enchant Stone Rare',
    game: 'Fisch',
    price: 700,
    tag: 'Instan',
    sold: '9.273 terjual',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rblx-4',
    title: 'Murder Mystery 2 Icewing Weapon Godly',
    game: 'Murder Mystery 2',
    price: 19200,
    tag: 'Instan',
    sold: '1.092 terjual',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rblx-5',
    title: 'Grow A Garden 2 Star Fruit Mutation',
    game: 'Grow A Garden',
    price: 1400,
    tag: 'Instan',
    sold: '278 terjual',
    rating: 4.75,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'rblx-6',
    title: 'Blox Fruits Joki Mastery Max Level Super Cepat',
    game: 'Blox Fruits',
    price: 3500,
    tag: 'Joki',
    sold: '17.670 terjual',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1552824792-74431a478142?auto=format&fit=crop&w=300&q=80'
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'qris',
    name: 'QRIS (All E-Wallet & Mobile Banking)',
    category: 'qris',
    groupName: 'Pembayaran Instan (QRIS)',
    logo: 'qris',
    feeFlat: 0,
    feePercent: 0.7,
    description: 'Bebas biaya admin transfer! Scan via GoPay, OVO, DANA, BCA, Livin, dll.',
    promoBadge: 'Paling Populer',
    instructions: [
      'Buka aplikasi e-wallet atau mobile banking favorit Anda.',
      'Pilih menu Scan / QRIS.',
      'Arahkan kamera ke kode QRIS yang ditampilkan di layar.',
      'Periksa nominal pembayaran dan selesaikan transaksi.'
    ]
  },
  {
    id: 'bca_va',
    name: 'BCA Virtual Account',
    category: 'va',
    groupName: 'Transfer Virtual Account',
    logo: 'bca',
    feeFlat: 2000,
    feePercent: 0,
    description: 'Verifikasi otomatis 24 jam tanpa perlu upload bukti transfer.',
    instructions: [
      'Buka m-BCA atau KlikBCA.',
      'Pilih m-Transfer > BCA Virtual Account.',
      'Masukkan nomor VA yang diberikan.',
      'Pastikan nominal sesuai dan konfirmasi PIN Anda.'
    ]
  },
  {
    id: 'mandiri_va',
    name: 'Mandiri Virtual Account',
    category: 'va',
    groupName: 'Transfer Virtual Account',
    logo: 'mandiri',
    feeFlat: 2000,
    feePercent: 0,
    description: 'Verifikasi instan via Livin by Mandiri atau ATM Mandiri.',
    instructions: [
      'Buka aplikasi Livin by Mandiri.',
      'Pilih menu Bayar > Multi Payment.',
      'Masukkan nomor Virtual Account.',
      'Periksa detail tagihan dan lakukan pembayaran.'
    ]
  },
  {
    id: 'bri_va',
    name: 'BRI Virtual Account (BRIVA)',
    category: 'va',
    groupName: 'Transfer Virtual Account',
    logo: 'bri',
    feeFlat: 2000,
    feePercent: 0,
    description: 'Proses otomatis via BRImo kapan saja.',
    instructions: [
      'Masuk ke aplikasi BRImo.',
      'Pilih menu Pembayaran > BRIVA.',
      'Masukkan kode BRIVA dan selesaikan transaksi.'
    ]
  },
  {
    id: 'dana',
    name: 'DANA E-Wallet',
    category: 'ewallet',
    groupName: 'E-Wallet',
    logo: 'dana',
    feeFlat: 1000,
    feePercent: 1.5,
    description: 'Bayar cepat dengan saldo DANA Anda.',
    promoBadge: 'Cashback 5%',
    instructions: [
      'Klik tombol bayar, aplikasi DANA akan terbuka otomatis.',
      'Konfirmasi detail pembelian dan PIN DANA.',
      'Pesanan langsung diproses seketika.'
    ]
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    category: 'ewallet',
    groupName: 'E-Wallet',
    logo: 'shopeepay',
    feeFlat: 1000,
    feePercent: 1.5,
    description: 'Diskon ekstra ShopeePay hingga Rp 10.000.',
    promoBadge: 'Promo Diskon',
    instructions: [
      'Anda akan diarahkan ke aplikasi Shopee.',
      'Pilih opsi ShopeePay dan verifikasi PIN atau Face ID.'
    ]
  },
  {
    id: 'gopay',
    name: 'GoPay',
    category: 'ewallet',
    groupName: 'E-Wallet',
    logo: 'gopay',
    feeFlat: 1000,
    feePercent: 1.5,
    description: 'Praktis dan cepat via aplikasi GoPay.',
    instructions: [
      'Gunakan aplikasi Gojek atau GoPay untuk bayar.',
      'Konfirmasi pembayaran untuk memproses pesanan otomatis.'
    ]
  },
  {
    id: 'indomaret',
    name: 'Indomaret / Alfamart',
    category: 'retail',
    groupName: 'Gerai Retail',
    logo: 'retail',
    feeFlat: 3500,
    feePercent: 0,
    description: 'Bayar tunai di kasir Indomaret / Alfamart terdekat.',
    instructions: [
      'Kunjungi gerai Indomaret atau Alfamart terdekat.',
      'Tunjukkan kode pembayaran kepada kasir.',
      'Simpan struk pembayaran sebagai bukti transaksi.'
    ]
  }
];

export const AVAILABLE_PROMOS: PromoCode[] = [
  {
    code: 'POJANHEMAT',
    discountType: 'fixed',
    value: 5000,
    minOrder: 25000,
    description: 'Potongan Rp 5.000 untuk minimal transaksi Rp 25.000'
  },
  {
    code: 'POJANBARU',
    discountType: 'percentage',
    value: 10,
    maxDiscount: 15000,
    minOrder: 10000,
    description: 'Diskon 10% s.d Rp 15.000 untuk pengguna baru'
  },
  {
    code: 'SULTANVIP',
    discountType: 'fixed',
    value: 15000,
    minOrder: 150000,
    description: 'Spesial potongan Rp 15.000 untuk pembelian sultan min Rp 150.000'
  }
];
