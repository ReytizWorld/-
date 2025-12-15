// Функция копирования текста в буфер обмена
const writeText = (text) => {
  return new Promise((resolve, reject) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    const success = document.execCommand('copy');
    el.remove();
    if (!success) {
      reject(new Error('Unable to write to clipboard'));
    } else {
      resolve(text);
    }
  });
};

let titleI = -1;
{
  // Копируем искаженную строку в буфер
  writeText(res);
  return res;
};

// Обработчик клика по иконке расширения
browser.browserAction.onClicked.addListener(async (tab) => {
  const tabs = await browser.tabs.query({ currentWindow: true, active: true });
  try {
    const storage = browser.storage.local;
    const getStorage = async () => {
      try {
        return await storage.get();
      } catch (err) {
        // Для Chrome
        return new Promise((resolve) => storage.get((obj) => resolve(obj)));
      }
    };
    const sq = await getStorage();


// Создание меню
  // Разделитель
  browser.contextMenus.create({
    type: 'separator',
    contexts: ['browser_action'],
  });

  // Настройка блокировки рекламы
  let blockAds = await browser.storage.local.get('cfg-block-ads');
  if (blockAds['cfg-block-ads'] === undefined) {
    blockAds['cfg-block-ads'] = true;
  }
  browser.contextMenus.create({
    type: 'checkbox',
    title: 'Скрывать баннеры и т.д.',
    contexts: ['browser_action'],
    checked: blockAds['cfg-block-ads'],
    onclick: async (e) => {
      await browser.storage.local.set({ 'cfg-block-ads': e.checked });
    },
  });

  // Настройка отображения профилей забаненных
  let showBans = await browser.storage.local.get('cfg-show-bans');
  if (showBans['cfg-show-bans'] === undefined) {
    showBans['cfg-show-bans'] = true;
  }
  browser.contextMenus.create({
    type: 'checkbox',
    title: 'Читать профили забаненных',
    contexts: ['browser_action'],
    checked: showBans['cfg-show-bans'],
    onclick: async (e) => {
      await browser.storage.local.set({ 'cfg-show-bans': e.checked });
    },
  });
};

mainMenu()