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

// App Catalog Data
const APPS = [
  {
    id: 'sber',
    name: 'СберБанк Онлайн',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '15.15.0',
    size: '284 MB',
    badge: 'Топ №1',
    iconColor: '#21A038',
    iconText: '🟢',
    desc: 'Официальный мобильный банк СберБанка. Управляйте переводами, картами, вкладами и платежами через СБП без ограничений.',
    bundleId: 'ru.sberbank.sberbankonline',
    source: 'App Store'
  },
  {
    id: 'tbank',
    name: 'Т-Банк (Тинькофф)',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '6.28.0',
    size: '260 MB',
    badge: 'Популярно',
    iconColor: '#FFDD2D',
    iconText: '🟡',
    desc: 'Официальный клиент Т-Банка: переводы, кэшбэк деньгами, инвестиции, связь и сервисы для жизни.',
    bundleId: 'com.tinkoff.mobile',
    source: 'App Store'
  },
  {
    id: 'alfa',
    name: 'Альфа-Банк',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '14.3.0',
    size: '240 MB',
    badge: 'Топ',
    iconColor: '#EF3124',
    iconText: '🔴',
    desc: 'Умный мобильный банк от Альфа-Банка. Бесплатные платежи, карты, инвестиции и повышенный кэшбэк.',
    bundleId: 'ru.alfabank.mobile',
    source: 'App Store'
  },
  {
    id: 'vtb',
    name: 'ВТБ Онлайн',
    category: 'banks',
    categoryName: 'Банки и финансы',
    version: '19.0.0',
    size: '290 MB',
    badge: 'Оригинал',
    iconColor: '#002882',
    iconText: '🔵',
    desc: 'Официальное приложение банка ВТБ. Полный спектр финансовых услуг, оплата счетов и безопасность платежей.',
    bundleId: 'ru.vtb24.mobilebanking',
    source: 'App Store'
  },
  {
    id: 'vkmusic',
    name: 'VK Музыка',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '6.38.0',
    size: '145 MB',
    badge: 'Музыка',
    iconColor: '#0077FF',
    iconText: '🎵',
    desc: 'Миллионы треков, умные рекомендации, фоновое прослушивание и скачивание музыки прямо в память iPhone.',
    bundleId: 'com.vk.vkclient.music',
    source: 'App Store'
  },
  {
    id: 'vk',
    name: 'ВКонтакте',
    category: 'social',
    categoryName: 'Соцсети',
    version: '8.60.0',
    size: '210 MB',
    badge: 'Соцсеть',
    iconColor: '#0077FF',
    iconText: '💬',
    desc: 'Главная социальная сеть и мессенджер. Общение, клипы, истории, музыка и сообщества.',
    bundleId: 'com.vk.vkclient',
    source: 'App Store'
  },
  {
    id: '2gis',
    name: '2ГИС — Карты и навигатор',
    category: 'nav',
    categoryName: 'Карты и навигация',
    version: '6.22.0',
    size: '190 MB',
    badge: 'Офлайн',
    iconColor: '#17BE51',
    iconText: '🧭',
    desc: 'Офлайн-карты городов, точный навигатор для авто и пешеходов, детальные планы этажей торговых центров.',
    bundleId: 'ru.dublgis.2GIS',
    source: 'App Store'
  },
  {
    id: 'moosic',
    name: 'Moosic (Офлайн плеер)',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '6.38.0',
    size: '95 MB',
    badge: 'Легенда',
    iconColor: '#FF6B00',
    iconText: '🎧',
    desc: 'Легендарный плеер с функцией сохранения треков из ВК в кэш без рекламы и подписок.',
    bundleId: 'com.mail.moosic',
    source: 'Archive'
  },
  {
    id: 'tiktok',
    name: 'TikTok Mod',
    category: 'social',
    categoryName: 'Соцсети',
    version: '35.0.0',
    size: '230 MB',
    badge: 'Без ограничений',
    iconColor: '#000000',
    iconText: '▶️',
    desc: 'Модифицированная версия TikTok с возможностью смотреть свежие видео из любых регионов и выкладывать свои ролики.',
    bundleId: 'com.zhiliaoapp.musically',
    source: 'Mod Store'
  },
  {
    id: 'youtube',
    name: 'YouTube ReVanced',
    category: 'media',
    categoryName: 'Музыка и видео',
    version: '19.20.0',
    size: '210 MB',
    badge: 'Без рекламы',
    iconColor: '#FF0000',
    iconText: '📺',
    desc: 'YouTube с функцией фонового воспроизведения, картинки-в-картинке (PiP) и вырезанной рекламой.',
    bundleId: 'com.google.ios.youtube',
    source: 'Custom IPA'
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
        <div class="app-icon" style="background: ${app.iconColor}20; border: 1px solid ${app.iconColor}40;">
          <span>${app.iconText}</span>
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
  iconEl.style.background = `${app.iconColor}25`;
  iconEl.style.border = `1px solid ${app.iconColor}50`;
  iconEl.innerHTML = `<span>${app.iconText}</span>`;

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
      title: `Установка ${activeModalApp.name}`,
      message: `Готово к возврату! Сейчас откроется Safari для подтверждения официальной лицензии Apple ID. Нажмите «Продолжить».`,
      buttons: [
        { id: 'ok', type: 'default', text: 'Продолжить в Safari' },
        { type: 'cancel', text: 'Отмена' }
      ]
    }, (btnId) => {
      if (btnId === 'ok') {
        // Deep link trigger for Apple Store / itms-services
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
