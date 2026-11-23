// Comeback iOS Engine v4.0.0 — Powered by IPA_Downloader & Apple Store API

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

// State
let ALL_APPS = [];
let currentCategory = 'all';
let searchQuery = '';
let activeModalApp = null;
let currentAppleUser = localStorage.getItem('comeback_apple_user') || null;
let displayLimit = 60;

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

// Load Full Catalog from Backend (IPA_Downloader AppsList.txt)
async function loadCatalog() {
  appsGrid.innerHTML = `
    <div style="text-align: center; padding: 50px 20px; color: var(--text-sub);">
      <div style="font-size: 32px; margin-bottom: 12px; animation: spin 1s infinite linear;">⏳</div>
      <strong style="color: #FFF; font-size: 15px; display: block;">Загрузка каталога IPA_Downloader...</strong>
      <span style="font-size: 13px;">Подключение к базе из 713 приложений</span>
    </div>
  `;

  try {
    const res = await fetch('/api/apps');
    if (res.ok) {
      const data = await res.json();
      ALL_APPS = data.apps || [];
      renderApps();
      return;
    }
  } catch (err) {
    console.warn('Не удалось загрузить /api/apps, используем резервный каталог:', err.message);
  }

  // Fallback if offline
  ALL_APPS = [
    { id: '1054372220', appId: '1054372220', name: 'ВК Музыка (VK Музыка)', category: 'media', categoryName: 'Музыка и видео', iconUrl: '/icons/vkmusic.svg', isReady: true, readyFile: 'ВК_Музыка_(VK_Музыка)_8.30.1_iOS_16.6+_denisalexanrovich142@bk.ru.ipa', readySizeMb: '180.7 MB', desc: 'Официальный музыкальный плеер ВКонтакте.' },
    { id: '492224193', appId: '492224193', name: 'СберБанк Онлайн (Оригинал)', category: 'banks', categoryName: 'Банки и финансы', iconUrl: '/icons/sber.svg', isReady: false, readySizeMb: '284 MB', desc: 'Официальный мобильный банк СберБанка.' },
    { id: '455652438', appId: '455652438', name: 'Тинькофф (Оригинал)', category: 'banks', categoryName: 'Банки и финансы', iconUrl: '/icons/tbank.svg', isReady: false, readySizeMb: '260 MB', desc: 'Официальный клиент Т-Банка.' }
  ];
  renderApps();
}

// Filter and Render Apps
function renderApps() {
  const q = searchQuery.toLowerCase();
  const filtered = ALL_APPS.filter(app => {
    let matchesCategory = false;
    if (currentCategory === 'all') matchesCategory = true;
    else if (currentCategory === 'ready') matchesCategory = app.isReady === true;
    else matchesCategory = app.category === currentCategory;

    const matchesSearch = app.name.toLowerCase().includes(q) || 
                          (app.categoryName && app.categoryName.toLowerCase().includes(q)) ||
                          (app.appId && app.appId.includes(q));
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

  const itemsToRender = filtered.slice(0, displayLimit);

  appsGrid.innerHTML = itemsToRender.map(app => {
    const readyBadge = app.isReady ? `<span style="display: inline-block; padding: 2px 7px; background: rgba(52, 199, 89, 0.2); color: #4cd964; border-radius: 6px; font-size: 10px; font-weight: 700; margin-left: 6px;">Готово ✓</span>` : '';
    const actionLabel = app.isReady ? 'Скачать' : 'Выгрузить';
    const actionClass = app.isReady ? 'action-btn ready-btn' : 'action-btn';

    return `
      <div class="app-card" onclick="openAppModal('${app.id}')">
        <div class="app-left">
          <div class="app-icon">
            <img src="${app.iconUrl}" alt="${app.name}" width="52" height="52" loading="lazy" onerror="this.onerror=null; this.src='/icons/2gis.svg';">
          </div>
          <div class="app-details">
            <span class="app-title">${app.name} ${readyBadge}</span>
            <div class="app-meta">
              <span>${app.categoryName || 'App Store'}</span>
              <span class="app-dot">•</span>
              <span>${app.readySizeMb || 'IPA'}</span>
            </div>
          </div>
        </div>
        <button class="${actionClass}" onclick="event.stopPropagation(); openAppModal('${app.id}')">
          ${actionLabel}
        </button>
      </div>
    `;
  }).join('');

  // "Load more" button if results exceed displayLimit
  if (filtered.length > displayLimit) {
    const moreBtn = document.createElement('div');
    moreBtn.style.cssText = 'text-align: center; padding: 16px 0;';
    moreBtn.innerHTML = `
      <button class="secondary-btn" style="width: auto; padding: 10px 24px; font-size: 13px;" onclick="loadMoreApps()">
        Показать еще (${filtered.length - displayLimit})
      </button>
    `;
    appsGrid.appendChild(moreBtn);
  }
}

window.loadMoreApps = function() {
  triggerHaptic('selection');
  displayLimit += 60;
  renderApps();
};

// Category Tabs Handlers
catPills.forEach(pill => {
  pill.addEventListener('click', () => {
    triggerHaptic('selection');
    catPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentCategory = pill.dataset.category;
    displayLimit = 60;
    renderApps();
  });
});

// Search Input Handlers
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  clearSearch.style.display = searchQuery.length > 0 ? 'block' : 'none';
  displayLimit = 60;
  renderApps();
});

clearSearch.addEventListener('click', () => {
  triggerHaptic('selection');
  searchInput.value = '';
  searchQuery = '';
  clearSearch.style.display = 'none';
  displayLimit = 60;
  renderApps();
});

// Open App Modal
window.openAppModal = function(appId) {
  triggerHaptic('impact');
  const app = ALL_APPS.find(a => a.id === appId || a.appId === appId);
  if (!app) return;

  activeModalApp = app;
  
  const iconEl = document.getElementById('modalAppIcon');
  iconEl.innerHTML = `<img src="${app.iconUrl}" alt="${app.name}" width="68" height="68" onerror="this.src='/icons/2gis.svg';">`;

  document.getElementById('modalAppName').textContent = app.name;
  document.getElementById('modalAppCategory').textContent = app.categoryName || 'App Store';
  document.getElementById('modalAppVersion').textContent = app.version || 'vОригинал';
  document.getElementById('modalAppSize').textContent = app.readySizeMb || '150 MB';
  document.getElementById('modalAppDesc').textContent = app.desc || `Официальное приложение ${app.name} из базы IPA_Downloader.`;

  const statusBox = document.getElementById('downloadStatusBox');
  if (statusBox) statusBox.style.display = 'none';

  const startBtn = document.getElementById('startInstallBtn');
  startBtn.disabled = false;

  if (app.isReady) {
    startBtn.innerHTML = `<span>Скачать .IPA (Готово на ПК)</span>`;
    startBtn.style.background = '#34c759';
  } else {
    startBtn.innerHTML = `<span>Выгрузить из App Store</span>`;
    startBtn.style.background = '';
  }

  appModal.style.display = 'flex';
};

document.getElementById('closeModal').addEventListener('click', () => {
  triggerHaptic('selection');
  appModal.style.display = 'none';
  const statusBox = document.getElementById('downloadStatusBox');
  if (statusBox) statusBox.style.display = 'none';
});

// Real App Download / Delivery Trigger
document.getElementById('startInstallBtn').addEventListener('click', async () => {
  triggerHaptic('impact');
  
  const startBtn = document.getElementById('startInstallBtn');
  const statusBox = document.getElementById('downloadStatusBox');

  // If app is not ready and not logged in, prompt to log in
  if (!activeModalApp.isReady && !currentAppleUser) {
    appModal.style.display = 'none';
    showAuthModal();
    if (tg?.showAlert) {
      tg.showAlert('Для выгрузки этого приложения из базы App Store сначала войдите в свой Apple ID.');
    } else {
      alert('Сначала войдите в свой Apple ID для подтверждения лицензии.');
    }
    return;
  }

  statusBox.style.display = 'block';

  if (activeModalApp.isReady) {
    statusBox.style.background = 'rgba(52, 199, 89, 0.15)';
    statusBox.style.border = '1px solid rgba(52, 199, 89, 0.4)';
    statusBox.style.color = '#4cd964';
    statusBox.innerHTML = `
      <strong>⚡️ Файл уже выкачан!</strong><br>
      Оригинальный .ipa файл <strong>${activeModalApp.name}</strong> (${activeModalApp.readySizeMb}) находится в папке IPA_Downloader.<br>
      Подготавливаю прямую ссылку и отправку в Telegram...
    `;
  } else {
    statusBox.style.background = 'rgba(10, 132, 255, 0.15)';
    statusBox.style.border = '1px solid rgba(10, 132, 255, 0.4)';
    statusBox.style.color = '#5ac8fa';
    statusBox.innerHTML = `
      <strong>⏳ Запрос к Apple Store API...</strong><br>
      Выгрузка <strong>${activeModalApp.name}</strong> с серверов Apple по вашей лицензии.<br>
      Это может занять 1–2 минуты.
    `;
  }

  startBtn.disabled = true;
  startBtn.innerHTML = `<span>Обработка запроса...</span>`;

  try {
    const chatId = tg?.initDataUnsafe?.user?.id || null;
    const response = await fetch('/api/app/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appId: activeModalApp.appId,
        name: activeModalApp.name,
        readyFile: activeModalApp.readyFile || null,
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
        🎉 <strong>Успешно готово!</strong><br>
        Оригинальный пакет <strong>${activeModalApp.name}</strong> (${data.sizeMb}) сохранен в базе.<br>
        ${chatId ? '💬 Файл отправлен вам в чат бота в Telegram!' : '📁 Файл сохранен в папку IPA_Downloader/Apps на вашем ПК.'}<br><br>
        <a href="${data.downloadUrl}" target="_blank" style="display: inline-block; padding: 10px 18px; background: #34c759; color: #000; border-radius: 10px; font-weight: bold; text-decoration: none; margin-top: 4px;">📥 Скачать .IPA файл прямо сейчас</a>
      `;
      startBtn.innerHTML = `<span>Готово к установке ✓</span>`;
    } else {
      triggerHaptic('impact');
      statusBox.style.background = 'rgba(255, 59, 48, 0.15)';
      statusBox.style.border = '1px solid rgba(255, 59, 48, 0.4)';
      statusBox.style.color = '#ff6b6b';
      statusBox.innerHTML = `
        ❌ <strong>Ошибка выгрузки:</strong><br>
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
loadCatalog();
