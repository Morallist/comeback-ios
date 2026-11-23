// Comeback Mini App Engine

// Initialize Telegram WebApp
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor('#070709');
  tg.setBackgroundColor('#070709');
}

// Trigger Haptic Feedback safely
function triggerHaptic(type = 'light') {
  if (tg?.HapticFeedback) {
    if (type === 'selection') tg.HapticFeedback.selectionChanged();
    else if (type === 'impact') tg.HapticFeedback.impactOccurred('medium');
    else if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
  }
}

// Expanded Authentic App Catalog
const APPS = [
  // БАНКИ И ФИНАНСЫ
  {
    id: 'sber',
    name: 'СберБанк Онлайн',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '15.15.0',
    size: '284 MB',
    badge: 'Топ №1',
    iconUrl: 'icons/sber.svg',
    desc: 'Оригинальный мобильный банк СберБанка. Управляйте переводами, картами, вкладами и платежами через СБП без ограничений.',
    bundleId: 'ru.sberbank.sberbankonline',
    source: 'App Store (Оригинал)'
  },
  {
    id: 'tbank',
    name: 'Т-Банк (Тинькофф)',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '6.28.0',
    size: '260 MB',
    badge: 'Популярно',
    iconUrl: 'icons/tbank.svg',
    desc: 'Оригинальный клиент Т-Банка: мгновенные переводы, кэшбэк рублями, брокерский счет, связь и оплата услуг.',
    bundleId: 'com.tinkoff.mobile',
    source: 'App Store (Оригинал)'
  },
  {
    id: 'alfa',
    name: 'Альфа-Банк',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '14.3.0',
    size: '240 MB',
    badge: 'Топ',
    iconUrl: 'icons/alfa.svg',
    desc: 'Умный мобильный банк от Альфа-Банка. Бесплатные переводы без комиссий, инвестиции, кредитные карты и повышенный кэшбэк.',
    bundleId: 'ru.alfabank.mobile',
    source: 'App Store (Оригинал)'
  },
  {
    id: 'vtb',
    name: 'ВТБ Онлайн',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '19.0.0',
    size: '290 MB',
    badge: 'Оригинал',
    iconUrl: 'icons/vtb.svg',
    desc: 'Официальное приложение банка ВТБ. Платежи по QR-коду, переводы родным, оплата штрафов и безопасность счетов.',
    bundleId: 'ru.vtb24.mobilebanking',
    source: 'App Store (Оригинал)'
  },
  {
    id: 'gpb',
    name: 'Газпромбанк',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '4.18.0',
    size: '225 MB',
    badge: 'Оригинал',
    iconUrl: 'icons/gpb.svg',
    desc: 'Официальное мобильное приложение Газпромбанка. Вклады с высокой ставкой, дебетовые карты и переводы без комиссии.',
    bundleId: 'ru.gpb.mobile',
    source: 'App Store (Оригинал)'
  },
  {
    id: 'sovcom',
    name: 'Совкомбанк (Халва)',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '12.4.0',
    size: '210 MB',
    badge: 'Рассрочка',
    iconUrl: 'icons/sovcom.svg',
    desc: 'Карта рассрочки «Халва» и мобильный банк Совкомбанка. Покупки без переплат, вклады и платежи по СБП.',
    bundleId: 'ru.sovcombank.halva',
    source: 'App Store (Оригинал)'
  },
  {
    id: 'ozonbank',
    name: 'Ozon Банк',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '2.14.0',
    size: '180 MB',
    badge: 'Скидки',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/41/01/75/41017552-195d-caa1-a068-d6981882d921/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    desc: 'Ozon Карта со скидками до 30% на маркетплейсе Ozon и кэшбэком рублями на покупки вне маркетплейса.',
    bundleId: 'ru.ozon.bank',
    source: 'App Store'
  },
  {
    id: 'raiffeisen',
    name: 'Райффайзен Онлайн',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '10.5.0',
    size: '215 MB',
    badge: 'Банк',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/94/39/08/94390871-2d67-f58c-bb07-f952f44c4ec0/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    desc: 'Удобный и надежный банк для управления личными финансами, переводами за рубеж и валютными счетами.',
    bundleId: 'ru.raiffeisen.mobile',
    source: 'App Store'
  },

  // МУЗЫКА И МЕДИА
  {
    id: 'vkmusic',
    name: 'VK Музыка',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '6.38.0',
    size: '145 MB',
    badge: 'Хит',
    iconUrl: 'icons/vkmusic.svg',
    desc: 'Миллионы треков, умный Сниппет-радио, персональные плейлисты и прослушивание музыки офлайн без интернета.',
    bundleId: 'com.vk.vkclient.music',
    source: 'App Store (Оригинал)'
  },
  {
    id: 'moosic',
    name: 'Moosic (Офлайн плеер)',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '6.38.0',
    size: '95 MB',
    badge: 'Без рекламы',
    iconUrl: 'icons/moosic.svg',
    desc: 'Легендарный плеер с функцией бесплатного кэширования любых аудиозаписей из ВК без ограничений и рекламы.',
    bundleId: 'com.mail.moosic',
    source: 'Archive'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '8.9.40',
    size: '175 MB',
    badge: 'Стриминг',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ce/b5/1c/ceb51c33-0a95-71bb-fa55-1563f6ebc45f/AppIcon-0-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/512x512bb.jpg',
    desc: 'Лучший музыкальный сервис в мире с непревзойденными алгоритмами рекомендаций подборок и треков.',
    bundleId: 'com.spotify.client',
    source: 'App Store'
  },
  {
    id: 'youtube',
    name: 'YouTube ReVanced',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '19.20.0',
    size: '210 MB',
    badge: 'Премиум',
    iconUrl: 'icons/youtube.svg',
    desc: 'YouTube с функцией фонового воспроизведения при заблокированном экране, PiP (картинка-в-картинке) и без рекламы.',
    bundleId: 'com.google.ios.youtube',
    source: 'Custom IPA'
  },
  {
    id: 'tiktok',
    name: 'TikTok Mod',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '35.0.0',
    size: '230 MB',
    badge: 'Все регионы',
    iconUrl: 'icons/tiktok.svg',
    desc: 'Модифицированный TikTok со встроенной сменой региона. Смотрите новые мировые тренды и публикуйте свои видео.',
    bundleId: 'com.zhiliaoapp.musically',
    source: 'Mod Store'
  },

  // СОЦСЕТИ И МЕССЕНДЖЕРЫ
  {
    id: 'vk',
    name: 'ВКонтакте',
    category: 'social',
    categoryName: 'Соцсети',
    version: '8.60.0',
    size: '210 MB',
    badge: 'Соцсеть',
    iconUrl: 'icons/vk.svg',
    desc: 'Официальный клиент ВКонтакте: лента новостей, мессенджер с видеозвонками, сообщества, мини-игры и VK Клипы.',
    bundleId: 'com.vk.vkclient',
    source: 'App Store (Оригинал)'
  },
  {
    id: 'telegram',
    name: 'Telegram Messenger',
    category: 'social',
    categoryName: 'Соцсети',
    version: '10.14.0',
    size: '160 MB',
    badge: 'Мессенджер',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/2f/1b/e8/2f1be808-3e4c-9e2e-2a28-3e3cb98e404f/AppIcon-0-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/512x512bb.jpg',
    desc: 'Быстрый и защищенный мессенджер с облачным хранением файлов, каналами, группами и ботами.',
    bundleId: 'ph.telegra.Telegraph',
    source: 'App Store'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'social',
    categoryName: 'Соцсети',
    version: '335.0.0',
    size: '190 MB',
    badge: 'Фото',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e3/33/79/e3337974-a4b5-68ae-8b2b-0bb5b128e469/AppIcon-0-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/512x512bb.jpg',
    desc: 'Официальное приложение Instagram: делитесь фото, снимайте Reels и общайтесь в Direct.',
    bundleId: 'com.burbn.instagram',
    source: 'App Store'
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'social',
    categoryName: 'Соцсети',
    version: '228.0.0',
    size: '185 MB',
    badge: 'Общение',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6a/2f/ba/6a2fba87-e0d0-0a75-b613-258d4a66e60d/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    desc: 'Голосовые комнаты, текстовые каналы и стримы для геймеров и дружеских сообществ.',
    bundleId: 'com.hammerandchisel.discord',
    source: 'App Store'
  },

  // КАРТЫ И ТРАНСПОРТ
  {
    id: '2gis',
    name: '2ГИС — Карты и навигатор',
    category: 'nav',
    categoryName: 'Карты и навигация',
    version: '6.22.0',
    size: '190 MB',
    badge: 'Офлайн',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d7/b6/ef/d7b6efb0-23d9-3273-46de-0c3eb72658c3/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    desc: 'Точные подробные офлайн-карты городов, навигатор с подсказками по полосам и схемы этажей торговых центров.',
    bundleId: 'ru.dublgis.2GIS',
    source: 'App Store (Оригинал)'
  },
  {
    id: 'rzd',
    name: 'РЖД Пассажирам',
    category: 'nav',
    categoryName: 'Карты и навигация',
    version: '3.12.0',
    size: '150 MB',
    badge: 'Билеты',
    iconUrl: 'icons/rzd.svg',
    desc: 'Покупка билетов на поезда дальнего следования и пригородные электрички без наценок и очередей.',
    bundleId: 'ru.rzd.pass',
    source: 'App Store (Оригинал)'
  },
  {
    id: 'yandexmaps',
    name: 'Яндекс Карты',
    category: 'nav',
    categoryName: 'Карты и навигация',
    version: '17.4.0',
    size: '220 MB',
    badge: 'Навигатор',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/3e/67/23/3e6723e2-bbce-b5a0-d26b-29d28a38b29d/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    desc: 'Поиск мест, расписание городского транспорта в реальном времени и удобный автомобильный навигатор.',
    bundleId: 'ru.yandex.traffic',
    source: 'App Store'
  },

  // ИГРЫ
  {
    id: 'brawlstars',
    name: 'Brawl Stars',
    category: 'games',
    categoryName: 'Игры',
    version: '55.230',
    size: '420 MB',
    badge: 'Экшен',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b3/65/2d/b3652d49-c09e-7164-ce52-44df0e10b2df/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    desc: 'Динамичные командные бои 3-на-3 и королевская битва от Supercell с десятками уникальных бойцов.',
    bundleId: 'com.supercell.brawlstars',
    source: 'App Store'
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    category: 'games',
    categoryName: 'Игры',
    version: '1.21.0',
    size: '650 MB',
    badge: 'Песочница',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fb/a7/be/fba7bef5-24e6-ee30-efee-c3d3170756e1/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220-0.png/512x512bb.jpg',
    desc: 'Стройте, исследуйте бесконечные процедурно генерируемые миры и выживайте в культовой игре от Mojang.',
    bundleId: 'com.mojang.minecraftpe',
    source: 'App Store'
  },
  {
    id: 'roblox',
    name: 'Roblox',
    category: 'games',
    categoryName: 'Игры',
    version: '2.628.0',
    size: '280 MB',
    badge: 'Мультиплеер',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/05/b8/b8/05b8b8cc-14f7-873d-8869-705b6b198166/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    desc: 'Виртуальная вселенная, где можно играть в миллионы пользовательских режимов вместе с друзьями со всего мира.',
    bundleId: 'com.roblox.robloxmobile',
    source: 'App Store'
  },
  {
    id: 'subwaysurfers',
    name: 'Subway Surfers',
    category: 'games',
    categoryName: 'Игры',
    version: '3.28.0',
    size: '310 MB',
    badge: 'Раннер',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7a/8d/4f/7a8d4f08-98e9-4e78-90b5-e63d3cb4ec78/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    desc: 'Бегите по железнодорожным путям, уворачивайтесь от приближающихся поездов и собирайте монеты.',
    bundleId: 'com.kiloo.subwaysurfers',
    source: 'App Store'
  }
];

// State
let currentCategory = 'all';
let searchQuery = '';
let activeModalApp = null;

// DOM Elements
const appsGrid = document.getElementById('appsGrid');
const appsCount = document.getElementById('appsCount');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const catPills = document.querySelectorAll('.cat-pill');
const appModal = document.getElementById('appModal');
const faqModal = document.getElementById('faqModal');

// Render Catalog
function renderApps() {
  const filtered = APPS.filter(app => {
    const matchesCategory = currentCategory === 'all' || app.category === currentCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  appsCount.textContent = filtered.length;

  if (filtered.length === 0) {
    appsGrid.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-sub);">
        <div style="font-size: 36px; margin-bottom: 8px;">🔍</div>
        <strong style="color: #FFF; font-size: 15px; display: block;">Ничего не найдено</strong>
        <span style="font-size: 13px;">Попробуйте изменить поисковый запрос</span>
      </div>
    `;
    return;
  }

  appsGrid.innerHTML = filtered.map(app => `
    <div class="app-card" onclick="openAppModal('${app.id}')">
      <div class="app-left">
        <div class="app-icon">
          <img src="${app.iconUrl}" alt="${app.name}" loading="lazy">
        </div>
        <div class="app-details">
          <span class="app-title">${app.name}</span>
          <div class="app-meta">
            <span>${app.categoryName.split(' ')[0]}</span>
            <span class="app-dot">•</span>
            <span>${app.size}</span>
          </div>
        </div>
      </div>
      <button class="action-btn" onclick="event.stopPropagation(); openAppModal('${app.id}')">
        Вернуть
      </button>
    </div>
  `).join('');
}

// Category Tabs Handlers
catPills.forEach(pill => {
  pill.addEventListener('click', () => {
    triggerHaptic('selection');
    catPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentCategory = pill.dataset.category;
    renderApps();
  });
});

// Search Input Handlers
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  clearSearch.style.display = searchQuery.length > 0 ? 'block' : 'none';
  renderApps();
});

clearSearch.addEventListener('click', () => {
  triggerHaptic('selection');
  searchInput.value = '';
  searchQuery = '';
  clearSearch.style.display = 'none';
  renderApps();
});

// Modal Handlers
window.openAppModal = function(appId) {
  triggerHaptic('impact');
  const app = APPS.find(a => a.id === appId);
  if (!app) return;

  activeModalApp = app;
  
  const iconEl = document.getElementById('modalAppIcon');
  iconEl.innerHTML = `<img src="${app.iconUrl}" alt="${app.name}">`;

  document.getElementById('modalAppName').textContent = app.name;
  document.getElementById('modalAppCategory').textContent = app.categoryName;
  document.getElementById('modalAppVersion').textContent = `v${app.version}`;
  document.getElementById('modalAppSize').textContent = app.size;
  document.getElementById('modalAppDesc').textContent = app.desc;

  appModal.style.display = 'flex';
};

document.getElementById('closeModal').addEventListener('click', () => {
  triggerHaptic('selection');
  appModal.style.display = 'none';
});

// Start Installation Action
document.getElementById('startInstallBtn').addEventListener('click', () => {
  triggerHaptic('success');
  
  if (tg) {
    tg.showPopup({
      title: `Возврат ${activeModalApp.name}`,
      message: `Готово к установке! Сейчас откроется Safari для активации лицензии Apple ID. Нажмите «Продолжить».`,
      buttons: [
        { id: 'ok', type: 'default', text: 'Продолжить в Safari' },
        { type: 'cancel', text: 'Отмена' }
      ]
    }, (btnId) => {
      if (btnId === 'ok') {
        window.open(`https://apple.com`, '_blank');
      }
    });
  } else {
    alert(`Запуск установки ${activeModalApp.name} через Safari!`);
  }
});

// Bottom Navigation Handlers
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    triggerHaptic('selection');
    const nav = btn.dataset.nav;

    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (nav === 'faq') {
      faqModal.style.display = 'flex';
    } else if (nav === 'guide') {
      alert('Инструкция: выберите приложение в каталоге, нажмите «Вернуть» и подтвердите загрузку в Safari.');
    }
  });
});

document.getElementById('closeFaq').addEventListener('click', () => {
  triggerHaptic('selection');
  faqModal.style.display = 'none';
  document.querySelector('[data-nav="catalog"]').classList.add('active');
  document.querySelector('[data-nav="faq"]').classList.remove('active');
});

// Initial Render
renderApps();
