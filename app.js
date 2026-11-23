// Comeback Mini App Engine v3.2.0

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

const CDN_BASE = 'https://morallist.github.io/comeback-ios/icons/';

// Authentic App Catalog with Absolute Icon URLs
const APPS = [
  // 1. ВК МУЗЫКА
  {
    id: 'vkmusic',
    name: 'ВК Музыка (VK Музыка)',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '6.38.0',
    size: '145 MB',
    badge: 'Топ Хит',
    iconUrl: `${CDN_BASE}vkmusic.svg`,
    desc: 'Официальный музыкальный плеер ВКонтакте. Миллионы треков, умное Сниппет-радио, персональные рекомендации и прослушивание музыки офлайн без интернета.',
    bundleId: 'com.vk.vkclient.music',
    source: 'App Store (Оригинал)'
  },
  // 2. СБЕРБАНК
  {
    id: 'sber',
    name: 'СберБанк Онлайн',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '15.15.0',
    size: '284 MB',
    badge: 'Топ №1',
    iconUrl: `${CDN_BASE}sber.svg`,
    desc: 'Официальный мобильный банк СберБанка. Управляйте переводами, картами, счетами, вкладами и платежами через СБП без ограничений.',
    bundleId: 'ru.sberbank.sberbankonline',
    source: 'App Store (Оригинал)'
  },
  // 3. Т-БАНК
  {
    id: 'tbank',
    name: 'Т-Банк (Тинькофф)',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '6.28.0',
    size: '260 MB',
    badge: 'Популярно',
    iconUrl: `${CDN_BASE}tbank.svg`,
    desc: 'Официальный клиент Т-Банка: мгновенные переводы родным, кэшбэк рублями, инвестиции, связь и сервисы для жизни.',
    bundleId: 'com.tinkoff.mobile',
    source: 'App Store (Оригинал)'
  },
  // 4. АЛЬФА-БАНК
  {
    id: 'alfa',
    name: 'Альфа-Банк',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '14.3.0',
    size: '240 MB',
    badge: 'Кэшбэк',
    iconUrl: `${CDN_BASE}alfa.svg`,
    desc: 'Умный мобильный банк от Альфа-Банка. Бесплатные переводы без комиссий, карты, инвестиции и суперкэшбэк до 100%.',
    bundleId: 'ru.alfabank.mobile',
    source: 'App Store (Оригинал)'
  },
  // 5. ВТБ ОНЛАЙН
  {
    id: 'vtb',
    name: 'ВТБ Онлайн',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '19.0.0',
    size: '290 MB',
    badge: 'Оригинал',
    iconUrl: `${CDN_BASE}vtb.svg`,
    desc: 'Официальное приложение банка ВТБ. Платежи по QR-коду, переводы родным, оплата штрафов и безопасность счетов.',
    bundleId: 'ru.vtb24.mobilebanking',
    source: 'App Store (Оригинал)'
  },
  // 6. ВКОНТАКТЕ
  {
    id: 'vk',
    name: 'ВКонтакте (VK)',
    category: 'social',
    categoryName: 'Соцсети',
    version: '8.60.0',
    size: '210 MB',
    badge: 'Соцсеть',
    iconUrl: `${CDN_BASE}vk.svg`,
    desc: 'Официальный клиент ВКонтакте: лента новостей, мессенджер с видеозвонками, сообщества, мини-игры и VK Клипы.',
    bundleId: 'com.vk.vkclient',
    source: 'App Store (Оригинал)'
  },
  // 7. 2ГИС
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
  // 8. MOOSIC
  {
    id: 'moosic',
    name: 'Moosic (Офлайн плеер)',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '6.38.0',
    size: '95 MB',
    badge: 'Без рекламы',
    iconUrl: `${CDN_BASE}moosic.svg`,
    desc: 'Легендарный плеер с функцией бесплатного сохранения аудиозаписей из ВК в кэш без рекламы и подписок.',
    bundleId: 'com.mail.moosic',
    source: 'Archive'
  },
  // 9. ГАЗПРОМБАНК
  {
    id: 'gpb',
    name: 'Газпромбанк',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '4.18.0',
    size: '225 MB',
    badge: 'Оригинал',
    iconUrl: `${CDN_BASE}gpb.svg`,
    desc: 'Официальное мобильное приложение Газпромбанка. Вклады с высокой ставкой, дебетовые карты и переводы без комиссии.',
    bundleId: 'ru.gpb.mobile',
    source: 'App Store (Оригинал)'
  },
  // 10. СОВКОМБАНК
  {
    id: 'sovcom',
    name: 'Совкомбанк (Халва)',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '12.4.0',
    size: '210 MB',
    badge: 'Рассрочка',
    iconUrl: `${CDN_BASE}sovcom.svg`,
    desc: 'Карта рассрочки «Халва» и мобильный банк Совкомбанка. Покупки без переплат, вклады и платежи по СБП.',
    bundleId: 'ru.sovcombank.halva',
    source: 'App Store (Оригинал)'
  },
  // 11. SPOTIFY
  {
    id: 'spotify',
    name: 'Spotify: Музыка и подкасты',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '8.9.40',
    size: '175 MB',
    badge: 'Стриминг',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ce/b5/1c/ceb51c33-0a95-71bb-fa55-1563f6ebc45f/AppIcon-0-0-1x_U007emarketing-0-7-0-sRGB-85-220.png/512x512bb.jpg',
    desc: 'Мировой лидер стриминга музыки с безупречными алгоритмами рекомендаций подборок и новинок.',
    bundleId: 'com.spotify.client',
    source: 'App Store'
  },
  // 12. YOUTUBE
  {
    id: 'youtube',
    name: 'YouTube ReVanced',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '19.20.0',
    size: '210 MB',
    badge: 'Без рекламы',
    iconUrl: `${CDN_BASE}youtube.svg`,
    desc: 'YouTube с функцией фонового воспроизведения при заблокированном экране, PiP (картинка-в-картинке) и без рекламы.',
    bundleId: 'com.google.ios.youtube',
    source: 'Custom IPA'
  },
  // 13. TIKTOK MOD
  {
    id: 'tiktok',
    name: 'TikTok Mod (Все регионы)',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '35.0.0',
    size: '230 MB',
    badge: 'Мод',
    iconUrl: `${CDN_BASE}tiktok.svg`,
    desc: 'Модифицированный TikTok со встроенной сменой региона. Смотрите новые мировые тренды и публикуйте свои видео.',
    bundleId: 'com.zhiliaoapp.musically',
    source: 'Mod Store'
  },
  // 14. TELEGRAM
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
  // 15. INSTAGRAM
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
  // 16. DISCORD
  {
    id: 'discord',
    name: 'Discord',
    category: 'social',
    categoryName: 'Соцсети',
    version: '228.0.0',
    size: '185 MB',
    badge: 'Голос',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6a/2f/ba/6a2fba87-e0d0-0a75-b613-258d4a66e60d/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    desc: 'Голосовые комнаты, текстовые каналы и стримы для геймеров и дружеских сообществ.',
    bundleId: 'com.hammerandchisel.discord',
    source: 'App Store'
  },
  // 17. РЖД
  {
    id: 'rzd',
    name: 'РЖД Пассажирам',
    category: 'nav',
    categoryName: 'Карты и навигация',
    version: '3.12.0',
    size: '150 MB',
    badge: 'Билеты',
    iconUrl: `${CDN_BASE}rzd.svg`,
    desc: 'Покупка билетов на поезда дальнего следования и пригородные электрички без наценок и очередей.',
    bundleId: 'ru.rzd.pass',
    source: 'App Store (Оригинал)'
  },
  // 18. ЯНДЕКС КАРТЫ
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
  // 19. BRAWL STARS
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
  // 20. MINECRAFT
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
  // 21. ROBLOX
  {
    id: 'roblox',
    name: 'Roblox',
    category: 'games',
    categoryName: 'Игры',
    version: '2.628.0',
    size: '280 MB',
    badge: 'Онлайн',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/05/b8/b8/05b8b8cc-14f7-873d-8869-705b6b198166/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    desc: 'Виртуальная вселенная, где можно играть в миллионы пользовательских режимов вместе с друзьями со всего мира.',
    bundleId: 'com.roblox.robloxmobile',
    source: 'App Store'
  },
  // 22. SUBWAY SURFERS
  {
    id: 'subwaysurfers',
    name: 'Subway Surfers',
    category: 'games',
    categoryName: 'Игры',
    version: '3.28.0',
    size: '310 MB',
    badge: 'Раннер',
    iconUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7a/8d/4f/7a8d4f08-98e9-4e78-90b5-e63d3cb4ec78/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg',
    desc: 'Бегите по железнодорожным путям, уворачивайтесь от поездов и ставьте новые мировые рекорды.',
    bundleId: 'com.kiloo.subwaysurfers',
    source: 'App Store'
  }
];

// App State
let currentCategory = 'all';
let searchQuery = '';
let activeModalApp = null;
let currentAppleUser = localStorage.getItem('comeback_apple_user') || null;

// DOM Elements
const appsGrid = document.getElementById('appsGrid');
const appsCount = document.getElementById('appsCount');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const catPills = document.querySelectorAll('.cat-pill');
const appModal = document.getElementById('appModal');
const authModal = document.getElementById('authModal');
const faqModal = document.getElementById('faqModal');

// Auth DOM
const authPillBtn = document.getElementById('authPillBtn');
const authStatusText = document.getElementById('authStatusText');
const authSubtitle = document.getElementById('authSubtitle');
const openAuthModalBtn = document.getElementById('openAuthModalBtn');
const closeAuthModal = document.getElementById('closeAuthModal');
const authStep1 = document.getElementById('authStep1');
const authStep2 = document.getElementById('authStep2');
const authSuccessView = document.getElementById('authSuccessView');
const appleIdInput = document.getElementById('appleIdInput');
const applePasswordInput = document.getElementById('applePasswordInput');
const twoFaCodeInput = document.getElementById('twoFaCodeInput');
const submitAuthBtn = document.getElementById('submitAuthBtn');
const submitTwoFaBtn = document.getElementById('submitTwoFaBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loggedEmailText = document.getElementById('loggedEmailText');

// Update Auth UI according to state
function updateAuthUI() {
  if (currentAppleUser) {
    authPillBtn.className = 'auth-pill logged';
    authStatusText.textContent = currentAppleUser.split('@')[0];
    authSubtitle.textContent = `Авторизован: ${currentAppleUser}`;
    openAuthModalBtn.textContent = 'Профиль';

    authStep1.style.display = 'none';
    authStep2.style.display = 'none';
    authSuccessView.style.display = 'block';
    loggedEmailText.textContent = currentAppleUser;
  } else {
    authPillBtn.className = 'auth-pill not-logged';
    authStatusText.textContent = 'Войти в Apple ID';
    authSubtitle.textContent = 'Войдите, чтобы подтвердить покупки и лицензии';
    openAuthModalBtn.textContent = 'Войти';

    authStep1.style.display = 'block';
    authStep2.style.display = 'none';
    authSuccessView.style.display = 'none';
  }
}

// Render Catalog with High-Res Images & Fallbacks
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
          <img src="${app.iconUrl}" alt="${app.name}" width="52" height="52" loading="eager" onerror="this.onerror=null; this.src='https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d7/b6/ef/d7b6efb0-23d9-3273-46de-0c3eb72658c3/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg';">
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

// Open App Modal
window.openAppModal = function(appId) {
  triggerHaptic('impact');
  const app = APPS.find(a => a.id === appId);
  if (!app) return;

  activeModalApp = app;
  
  const iconEl = document.getElementById('modalAppIcon');
  iconEl.innerHTML = `<img src="${app.iconUrl}" alt="${app.name}" width="68" height="68">`;

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
  const statusBox = document.getElementById('downloadStatusBox');
  if (statusBox) statusBox.style.display = 'none';
});

// Real App Download Trigger
document.getElementById('startInstallBtn').addEventListener('click', async () => {
  triggerHaptic('impact');
  
  if (!currentAppleUser) {
    appModal.style.display = 'none';
    showAuthModal();
    if (tg?.showAlert) {
      tg.showAlert('Для выгрузки оригинального дистрибутива из App Store сначала войдите в свой Apple ID.');
    } else {
      alert('Сначала войдите в свой Apple ID для подтверждения лицензии.');
    }
    return;
  }

  const startBtn = document.getElementById('startInstallBtn');
  const statusBox = document.getElementById('downloadStatusBox');

  statusBox.style.display = 'block';
  statusBox.style.background = 'rgba(10, 132, 255, 0.15)';
  statusBox.style.border = '1px solid rgba(10, 132, 255, 0.4)';
  statusBox.style.color = '#5ac8fa';
  statusBox.innerHTML = `
    <strong>⏳ Выгрузка из App Store...</strong><br>
    Запрашиваю лицензию для <strong>${activeModalApp.name}</strong> у Apple Store API.<br>
    Скачивание официального .ipa пакета может занять 1–2 минуты.
  `;

  startBtn.disabled = true;
  startBtn.innerHTML = `<span>Выкачивание из Apple...</span>`;

  try {
    const chatId = tg?.initDataUnsafe?.user?.id || null;
    const response = await fetch('/api/app/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bundleId: activeModalApp.bundleId,
        appId: activeModalApp.appId,
        name: activeModalApp.name,
        chatId: chatId
      })
    });

    const data = await response.json();

    if (response.ok && data.status === 'success') {
      triggerHaptic('success');
      statusBox.style.background = 'rgba(52, 199, 89, 0.15)';
      statusBox.style.border = '1px solid rgba(52, 199, 89, 0.4)';
      statusBox.style.color = '#4cd964';
      statusBox.innerHTML = `
        🎉 <strong>Успешно выгружено!</strong><br>
        Оригинальный пакет <strong>${activeModalApp.name}</strong> (${data.sizeMb}) сохранен.<br>
        ${chatId ? '💬 Файл отправлен вам в чат бота в Telegram!' : '📁 Файл сохранен в папку downloads на вашем ПК.'}<br><br>
        <a href="${data.downloadUrl}" target="_blank" style="display: inline-block; padding: 10px 18px; background: #34c759; color: #000; border-radius: 10px; font-weight: bold; text-decoration: none; margin-top: 4px;">📥 Скачать .IPA файл</a>
      `;
      startBtn.innerHTML = `<span>Успешно выкачано ✓</span>`;
    } else {
      triggerHaptic('impact');
      statusBox.style.background = 'rgba(255, 59, 48, 0.15)';
      statusBox.style.border = '1px solid rgba(255, 59, 48, 0.4)';
      statusBox.style.color = '#ff6b6b';
      statusBox.innerHTML = `
        ❌ <strong>Ошибка App Store:</strong><br>
        ${data.message || data.error || 'Не удалось скачать приложение.'}
      `;
      startBtn.disabled = false;
      startBtn.innerHTML = `<span>Попробовать снова</span>`;
    }
  } catch (err) {
    statusBox.style.background = 'rgba(255, 59, 48, 0.15)';
    statusBox.style.border = '1px solid rgba(255, 59, 48, 0.4)';
    statusBox.style.color = '#ff6b6b';
    statusBox.innerHTML = `❌ <strong>Ошибка соединения с сервером:</strong><br>${err.message}`;
    startBtn.disabled = false;
    startBtn.innerHTML = `<span>Попробовать снова</span>`;
  }
});

// Auth Modal Open/Close
function showAuthModal() {
  triggerHaptic('selection');
  const alertEl = document.getElementById('authAlert');
  if (alertEl) alertEl.style.display = 'none';
  authModal.style.display = 'flex';
}

authPillBtn.addEventListener('click', showAuthModal);
openAuthModalBtn.addEventListener('click', showAuthModal);
closeAuthModal.addEventListener('click', () => {
  triggerHaptic('selection');
  authModal.style.display = 'none';
});

// Check Server Auth Status on Startup
async function checkAuthStatus() {
  try {
    const res = await fetch('/api/auth/status');
    if (res.ok) {
      const data = await res.json();
      if (data.loggedIn && data.email) {
        currentAppleUser = data.email;
        localStorage.setItem('comeback_apple_user', data.email);
        updateAuthUI();
        return;
      }
    }
  } catch (err) {
    console.warn('Проверка статуса auth:', err.message);
  }
  currentAppleUser = null;
  localStorage.removeItem('comeback_apple_user');
  updateAuthUI();
}

// Step 1: Submit Real Apple Credentials to Backend (ipatool-cpp)
submitAuthBtn.addEventListener('click', async () => {
  const email = appleIdInput.value.trim();
  const password = applePasswordInput.value.trim();
  const alertEl = document.getElementById('authAlert');

  if (!email || !password) {
    if (alertEl) {
      alertEl.style.display = 'block';
      alertEl.style.background = 'rgba(255, 59, 48, 0.15)';
      alertEl.style.borderColor = 'rgba(255, 59, 48, 0.4)';
      alertEl.style.color = '#ff6b6b';
      alertEl.textContent = 'Пожалуйста, введите ваш Apple ID (email) и пароль.';
    }
    return;
  }

  triggerHaptic('impact');
  submitAuthBtn.disabled = true;
  submitAuthBtn.innerHTML = `<span>Подключение к auth.itunes.apple.com...</span>`;
  if (alertEl) alertEl.style.display = 'none';

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    submitAuthBtn.disabled = false;
    submitAuthBtn.innerHTML = `<span>Войти в аккаунт Apple</span>`;

    if (data.status === '2fa_required') {
      // Transition to Step 2 for authentic 2FA verification
      if (alertEl) {
        alertEl.style.display = 'block';
        alertEl.style.background = 'rgba(10, 132, 255, 0.15)';
        alertEl.style.borderColor = 'rgba(10, 132, 255, 0.4)';
        alertEl.style.color = '#5ac8fa';
        alertEl.textContent = data.message || 'Apple отправил 6-значный проверочный код. Введите его:';
      }
      authStep1.style.display = 'none';
      authStep2.style.display = 'block';
      twoFaCodeInput.focus();
    } else if (response.ok && data.status === 'success') {
      currentAppleUser = data.email || email;
      localStorage.setItem('comeback_apple_user', currentAppleUser);
      updateAuthUI();
      triggerHaptic('success');
      setTimeout(() => {
        authModal.style.display = 'none';
      }, 800);
    } else {
      if (alertEl) {
        alertEl.style.display = 'block';
        alertEl.style.background = 'rgba(255, 59, 48, 0.15)';
        alertEl.style.borderColor = 'rgba(255, 59, 48, 0.4)';
        alertEl.style.color = '#ff6b6b';
        alertEl.textContent = data.message || 'Ошибка авторизации в Apple ID.';
      }
    }
  } catch (err) {
    submitAuthBtn.disabled = false;
    submitAuthBtn.innerHTML = `<span>Войти в аккаунт Apple</span>`;
    if (alertEl) {
      alertEl.style.display = 'block';
      alertEl.style.background = 'rgba(255, 59, 48, 0.15)';
      alertEl.style.borderColor = 'rgba(255, 59, 48, 0.4)';
      alertEl.style.color = '#ff6b6b';
      alertEl.textContent = 'Ошибка связи с сервером: ' + err.message;
    }
  }
});

// Step 2: Submit Real 2FA Code to Backend (ipatool-cpp)
submitTwoFaBtn.addEventListener('click', async () => {
  const email = appleIdInput.value.trim();
  const password = applePasswordInput.value.trim();
  const code = twoFaCodeInput.value.trim();
  const alertEl = document.getElementById('authAlert');

  if (code.length < 4) {
    if (alertEl) {
      alertEl.style.display = 'block';
      alertEl.style.background = 'rgba(255, 59, 48, 0.15)';
      alertEl.style.borderColor = 'rgba(255, 59, 48, 0.4)';
      alertEl.style.color = '#ff6b6b';
      alertEl.textContent = 'Введите проверочный код (6 цифр).';
    }
    return;
  }

  triggerHaptic('impact');
  submitTwoFaBtn.disabled = true;
  submitTwoFaBtn.innerHTML = `<span>Проверка кода в Apple...</span>`;
  if (alertEl) alertEl.style.display = 'none';

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, authCode: code })
    });

    const data = await response.json();
    submitTwoFaBtn.disabled = false;
    submitTwoFaBtn.innerHTML = `<span>Подтвердить код</span>`;

    if (response.ok && data.status === 'success') {
      currentAppleUser = data.email || email;
      localStorage.setItem('comeback_apple_user', currentAppleUser);
      updateAuthUI();
      triggerHaptic('success');
      if (alertEl) {
        alertEl.style.display = 'block';
        alertEl.style.background = 'rgba(52, 199, 89, 0.15)';
        alertEl.style.borderColor = 'rgba(52, 199, 89, 0.4)';
        alertEl.style.color = '#4cd964';
        alertEl.textContent = '✅ Авторизация в Apple ID успешно завершена!';
      }
      setTimeout(() => {
        authModal.style.display = 'none';
      }, 1000);
    } else {
      if (alertEl) {
        alertEl.style.display = 'block';
        alertEl.style.background = 'rgba(255, 59, 48, 0.15)';
        alertEl.style.borderColor = 'rgba(255, 59, 48, 0.4)';
        alertEl.style.color = '#ff6b6b';
        alertEl.textContent = data.message || 'Неверный проверочный код или код устарел.';
      }
    }
  } catch (err) {
    submitTwoFaBtn.disabled = false;
    submitTwoFaBtn.innerHTML = `<span>Подтвердить код</span>`;
    if (alertEl) {
      alertEl.style.display = 'block';
      alertEl.style.background = 'rgba(255, 59, 48, 0.15)';
      alertEl.style.borderColor = 'rgba(255, 59, 48, 0.4)';
      alertEl.style.color = '#ff6b6b';
      alertEl.textContent = 'Ошибка отправки кода: ' + err.message;
    }
  }
});

// Real Logout
logoutBtn.addEventListener('click', async () => {
  triggerHaptic('selection');
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
  } catch (e) {}
  currentAppleUser = null;
  localStorage.removeItem('comeback_apple_user');
  appleIdInput.value = '';
  applePasswordInput.value = '';
  twoFaCodeInput.value = '';
  updateAuthUI();
  authModal.style.display = 'none';
});

// Bottom Navigation Handlers
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    triggerHaptic('selection');
    const nav = btn.dataset.nav;

    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (nav === 'auth') {
      showAuthModal();
    } else if (nav === 'faq') {
      faqModal.style.display = 'flex';
    }
  });
});

document.getElementById('closeFaq').addEventListener('click', () => {
  triggerHaptic('selection');
  faqModal.style.display = 'none';
  document.querySelector('[data-nav="catalog"]').classList.add('active');
  document.querySelector('[data-nav="faq"]').classList.remove('active');
});

// Initial Setup
checkAuthStatus();
renderApps();
