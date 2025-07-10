// ==UserScript==
// @name         D A R K (bloxd.io)
// @version      1.0.0
// @description  Premium hack client for bloxd.io
// @author       lorddenish
// @match        https://bloxd.io/*
// @icon         https://bloxd.io/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Remove existing UI if present
  document.querySelectorAll('.dark-ui').forEach(el => el.remove());

  // Enhanced UI Styles
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    
    :root {
      --bg-primary: #0f0f13;
      --bg-secondary: #1a1a24;
      --accent: #8a2be2;
      --accent-light: #a855f7;
      --text-primary: #f0f0f0;
      --text-secondary: #b0b0b0;
      --border: #2a2a3a;
      --success: #00c853;
      --danger: #ff4444;
      --warning: #ffbb33;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Poppins', 'Segoe UI', sans-serif;
    }
    
    .dark-ui {
      position: fixed;
      top: 50px;
      left: 50px;
      width: 850px;
      height: 600px;
      background: var(--bg-primary);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      overflow: hidden;
      z-index: 999999;
      border: 1px solid var(--border);
      opacity: 0;
      transform: scale(0.95) translateY(20px);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .dark-ui.visible {
      opacity: 1;
      transform: scale(1) translateY(0);
    }

    .dark-ui.fade-out {
      opacity: 0;
      transform: scale(0.95) translateY(20px);
    }
    
    /* Themes */
    .dark-ui.theme-dark {
      --bg-primary: #0f0f13;
      --bg-secondary: #1a1a24;
      --accent: #8a2be2;
      --accent-light: #a855f7;
      --text-primary: #f0f0f0;
      --text-secondary: #b0b0b0;
      --border: #2a2a3a;
    }
    
    .dark-ui.theme-purple {
      --bg-primary: #1a052a;
      --bg-secondary: #2a0a5a;
      --accent: #9333ea;
      --accent-light: #a855f7;
      --text-primary: #ffffff;
      --text-secondary: #d0b0ff;
      --border: #4a00e0;
    }
    
    .dark-ui.theme-light {
      --bg-primary: #f5f5f5;
      --bg-secondary: #e0e0e0;
      --accent: #6200ea;
      --accent-light: #7c4dff;
      --text-primary: #333333;
      --text-secondary: #666666;
      --border: #b0b0b0;
    }
    
    .dark-ui.theme-cyber {
      --bg-primary: #0d0d15;
      --bg-secondary: #15152a;
      --accent: #00ff88;
      --accent-light: #00ffbb;
      --text-primary: #ffffff;
      --text-secondary: #a0a0a0;
      --border: #00ff88;
    }
    
    .dark-ui.theme-midnight {
      --bg-primary: #0a0a12;
      --bg-secondary: #121220;
      --accent: #6a5acd;
      --accent-light: #9370db;
      --text-primary: #ffffff;
      --text-secondary: #c0c0c0;
      --border: #483d8b;
    }
    
    .dark-header {
      width: 100%;
      background: linear-gradient(90deg, var(--bg-secondary), var(--accent));
      color: var(--text-primary);
      padding: 15px;
      font-weight: 700;
      font-size: 18px;
      text-align: center;
      border-bottom: 1px solid var(--border);
      cursor: move;
      user-select: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .dark-header-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .dark-header-title span {
      text-shadow: 0 0 8px var(--accent-light);
    }

    .dark-header-version {
      font-size: 12px;
      opacity: 0.7;
      margin-left: 5px;
    }
    
    .dark-close-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 20px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .dark-close-btn:hover {
      color: var(--danger);
      transform: rotate(90deg);
    }
    
    .dark-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    
    .dark-sidebar {
      width: 220px;
      background: var(--bg-secondary);
      padding: 15px 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
      border-right: 1px solid var(--border);
    }
    
    .dark-sidebar-btn {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 14px;
      padding: 14px 25px;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 500;
      position: relative;
      overflow: hidden;
    }
    
    .dark-sidebar-btn::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: var(--accent);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }
    
    .dark-sidebar-btn:hover,
    .dark-sidebar-btn.active {
      color: var(--text-primary);
      background: rgba(var(--accent-rgb), 0.1);
    }
    
    .dark-sidebar-btn.active::before {
      transform: translateX(0);
    }
    
    .dark-sidebar-btn i {
      font-size: 16px;
      width: 20px;
      text-align: center;
    }
    
    .dark-content {
      flex: 1;
      padding: 25px;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 15px;
      align-content: flex-start;
    }

    .dark-full-content {
      flex: 1;
      padding: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    
    .dark-module {
      background: var(--bg-secondary);
      border-radius: 12px;
      padding: 18px;
      border: 1px solid var(--border);
      transition: all 0.3s ease;
    }
    
    .dark-module:hover {
      border-color: var(--accent);
      box-shadow: 0 5px 15px rgba(var(--accent-rgb), 0.2);
      transform: translateY(-3px);
    }
    
    .dark-module-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    
    .dark-module-title {
      color: var(--text-primary);
      font-weight: 600;
      font-size: 15px;
    }
    
    .dark-module-desc {
      color: var(--text-secondary);
      font-size: 13px;
      margin-bottom: 15px;
      line-height: 1.5;
    }
    
    .dark-toggle {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 24px;
    }
    
    .dark-toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .dark-toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #333;
      transition: .4s;
      border-radius: 24px;
    }
    
    .dark-toggle-slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background: white;
      transition: .4s;
      border-radius: 50%;
    }
    
    input:checked + .dark-toggle-slider {
      background: var(--accent);
    }
    
    input:checked + .dark-toggle-slider:before {
      transform: translateX(26px);
    }
    
    .dark-btn {
      background: linear-gradient(135deg, var(--accent), var(--accent-light));
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      color: white;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(var(--accent-rgb), 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      margin-top: 10px;
    }
    
    .dark-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(var(--accent-rgb), 0.3);
    }
    
    .dark-btn.secondary {
      background: var(--bg-secondary);
      color: var(--text-primary);
      border: 1px solid var(--border);
    }
    
    .dark-btn.secondary:hover {
      border-color: var(--accent);
    }
    
    .dark-keybind {
      background: rgba(var(--accent-rgb), 0.2);
      border: 1px solid var(--accent);
      border-radius: 6px;
      padding: 5px 10px;
      font-size: 12px;
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.2s;
      min-width: 30px;
      text-align: center;
    }
    
    .dark-keybind:hover {
      background: rgba(var(--accent-rgb), 0.3);
    }
    
    .dark-keybind.edit-mode {
      background: rgba(255, 165, 0, 0.3);
      border-color: orange;
      animation: pulse 1s infinite;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .dark-slider {
      width: 100%;
      margin: 15px 0;
    }
    
    .dark-slider input[type="range"] {
      width: 100%;
      height: 6px;
      -webkit-appearance: none;
      background: #333;
      border-radius: 3px;
      outline: none;
    }
    
    .dark-slider input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      background: var(--accent);
      border-radius: 50%;
      cursor: pointer;
    }
    
    .dark-slider-value {
      text-align: right;
      color: var(--text-secondary);
      font-size: 12px;
      margin-top: 5px;
    }
    
    /* Console Styles */
    .dark-console-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--bg-primary);
      padding: 15px;
      overflow: hidden;
    }

    .dark-console-logs {
      flex: 1;
      overflow-y: auto;
      background: var(--bg-secondary);
      border-radius: 8px;
      padding: 15px;
      font-family: monospace;
      font-size: 13px;
      color: var(--text-primary);
      border: 1px solid var(--border);
      margin-bottom: 15px;
    }

    .dark-console-input-container {
      display: flex;
      gap: 10px;
    }

    .dark-console-input {
      flex: 1;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 15px;
      color: var(--text-primary);
      font-family: monospace;
      font-size: 13px;
      outline: none;
      transition: all 0.3s;
    }

    .dark-console-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px rgba(var(--accent-rgb), 0.2);
    }

    .dark-console-execute {
      background: var(--accent);
      border: none;
      border-radius: 8px;
      padding: 0 20px;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .dark-console-execute:hover {
      background: var(--accent-light);
    }

    /* Config Manager Styles */
    .dark-config-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--bg-primary);
      padding: 15px;
      overflow: hidden;
    }

    .dark-config-input-container {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }

    .dark-config-input {
      flex: 1;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 15px;
      color: var(--text-primary);
      font-size: 14px;
      outline: none;
      transition: all 0.3s;
    }

    .dark-config-input:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px rgba(var(--accent-rgb), 0.2);
    }

    .dark-config-save {
      background: var(--accent);
      border: none;
      border-radius: 8px;
      padding: 0 20px;
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .dark-config-save:hover {
      background: var(--accent-light);
    }

    .dark-config-list {
      flex: 1;
      overflow-y: auto;
      background: var(--bg-secondary);
      border-radius: 8px;
      padding: 15px;
      border: 1px solid var(--border);
    }

    .dark-config-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid var(--border);
      transition: all 0.3s;
    }

    .dark-config-item:hover {
      background: rgba(var(--accent-rgb), 0.1);
    }

    .dark-config-item:last-child {
      border-bottom: none;
    }

    .dark-config-item-name {
      font-weight: 500;
    }

    .dark-config-item-actions {
      display: flex;
      gap: 8px;
    }

    .dark-config-item-btn {
      background: rgba(var(--accent-rgb), 0.2);
      border: none;
      border-radius: 6px;
      padding: 6px 12px;
      color: var(--text-primary);
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .dark-config-item-btn:hover {
      background: rgba(var(--accent-rgb), 0.3);
    }

    .dark-config-item-btn.delete {
      background: rgba(var(--danger-rgb), 0.2);
    }

    .dark-config-item-btn.delete:hover {
      background: rgba(var(--danger-rgb), 0.3);
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .dark-module {
      animation: fadeIn 0.3s ease forwards;
    }
    
    /* Responsive */
    @media (max-width: 900px) {
      .dark-ui {
        width: 95%;
        left: 2.5%;
      }
    }
  `;
  document.head.appendChild(style);

  // Create UI Elements
  const ui = document.createElement("div");
  ui.className = "dark-ui theme-dark";
  document.body.appendChild(ui);

  // Create Header
  const header = document.createElement("div");
  header.className = "dark-header";
  header.innerHTML = `
    <div class="dark-header-title">
      <i>🎮</i>
      <span>D A R K</span>
      <span class="dark-header-version">v1.0.0</span>
    </div>
    <button class="dark-close-btn">✕</button>
  `;
  ui.appendChild(header);

 // Create Body (add this near your header creation)
    const body = document.createElement("div");
    body.className = "dark-body";
    ui.appendChild(body);

// Create Sidebar
    const sidebar = document.createElement("div");
    sidebar.className = "dark-sidebar";
    body.appendChild(sidebar);

  // Create Content Area
  const content = document.createElement("div");
  content.className = "dark-content";
  body.appendChild(content);

  // Show UI with animation
  setTimeout(() => ui.classList.add("visible"), 10);

  // Close button functionality
  header.querySelector(".dark-close-btn").addEventListener("click", () => {
    ui.classList.remove("visible");
    setTimeout(() => ui.remove(), 300);
  });

  // Draggable functionality
  let isDragging = false;
  let offsetX = 0, offsetY = 0;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - ui.getBoundingClientRect().left;
    offsetY = e.clientY - ui.getBoundingClientRect().top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    ui.style.left = `${e.clientX - offsetX}px`;
    ui.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => isDragging = false);

  // ========================
  // Core Systems
  // ========================

  // Language System
  const languages = {
    en: {
      combat: "Combat",
      movement: "Movement",
      visual: "Visual",
      player: "Player",
      settings: "Settings",
      about: "About",
      console: "Console",
      config: "Config",
      killaura: "Kill Aura",
      reach: "Reach",
      antikb: "Anti-Knockback",
      fly: "Fly",
      speed: "Speed",
      bhop: "Bunny Hop",
      esp: "ESP",
      xray: "X-Ray",
      tracers: "Tracers",
      nofall: "No Fall",
      autoheal: "Auto-Heal",
      theme: "Theme",
      language: "Language",
      keybinds: "Keybinds",
      join_discord: "Join Discord",
      support: "Support",
      version: "Version",
      developer: "Developer",
      save_config: "Save Config",
      load_config: "Load Config",
      delete_config: "Delete",
      config_name: "Config Name"
    },
    es: {
      combat: "Combate",
      movement: "Movimiento",
      visual: "Visual",
      player: "Jugador",
      settings: "Ajustes",
      about: "Acerca de",
      console: "Consola",
      config: "Configuración",
      killaura: "Aura de Muerte",
      reach: "Alcance",
      antikb: "Anti-Retroceso",
      fly: "Volar",
      speed: "Velocidad",
      bhop: "Salto de Conejo",
      esp: "ESP",
      xray: "Rayos X",
      tracers: "Trazadores",
      nofall: "Sin Caída",
      autoheal: "Auto-Curación",
      theme: "Tema",
      language: "Idioma",
      keybinds: "Teclas",
      join_discord: "Unirse a Discord",
      support: "Soporte",
      version: "Versión",
      developer: "Desarrollador",
      save_config: "Guardar Config",
      load_config: "Cargar Config",
      delete_config: "Eliminar",
      config_name: "Nombre Config"
    },
    fr: {
      combat: "Combat",
      movement: "Mouvement",
      visual: "Visuel",
      player: "Joueur",
      settings: "Paramètres",
      about: "À propos",
      console: "Console",
      config: "Configuration",
      killaura: "Aura de Mort",
      reach: "Portée",
      antikb: "Anti-Recul",
      fly: "Voler",
      speed: "Vitesse",
      bhop: "Saut de Lapin",
      esp: "ESP",
      xray: "Rayons X",
      tracers: "Traceurs",
      nofall: "Anti-Chute",
      autoheal: "Auto-Soin",
      theme: "Thème",
      language: "Langue",
      keybinds: "Raccourcis",
      join_discord: "Rejoindre Discord",
      support: "Support",
      version: "Version",
      developer: "Développeur",
      save_config: "Sauvegarder Config",
      load_config: "Charger Config",
      delete_config: "Supprimer",
      config_name: "Nom Config"
    },
    de: {
      combat: "Kampf",
      movement: "Bewegung",
      visual: "Visual",
      player: "Spieler",
      settings: "Einstellungen",
      about: "Über",
      console: "Konsole",
      config: "Konfiguration",
      killaura: "Todesaura",
      reach: "Reichweite",
      antikb: "Anti-Rückstoß",
      fly: "Fliegen",
      speed: "Geschwindigkeit",
      bhop: "Hasensprung",
      esp: "ESP",
      xray: "Röntgen",
      tracers: "Spuren",
      nofall: "Kein Fallschaden",
      autoheal: "Auto-Heilung",
      theme: "Thema",
      language: "Sprache",
      keybinds: "Tastenbelegung",
      join_discord: "Discord beitreten",
      support: "Unterstützung",
      version: "Version",
      developer: "Entwickler",
      save_config: "Config Speichern",
      load_config: "Config Laden",
      delete_config: "Löschen",
      config_name: "Config Name"
    },
    ja: {
      combat: "戦闘",
      movement: "移動",
      visual: "視覚",
      player: "プレイヤー",
      settings: "設定",
      about: "約",
      console: "コンソール",
      config: "設定",
      killaura: "キルオーラ",
      reach: "リーチ",
      antikb: "反動防止",
      fly: "飛ぶ",
      speed: "速度",
      bhop: "バニーホップ",
      esp: "ESP",
      xray: "X線",
      tracers: "トレーサー",
      nofall: "落下ダメージ無効",
      autoheal: "自動回復",
      theme: "テーマ",
      language: "言語",
      keybinds: "キーバインド",
      join_discord: "Discordに参加",
      support: "サポート",
      version: "バージョン",
      developer: "開発者",
      save_config: "設定保存",
      load_config: "設定読み込み",
      delete_config: "削除",
      config_name: "設定名"
    }
  };

  let currentLanguage = "en";

  function translate(key) {
    return languages[currentLanguage][key] || key;
  }

  // Config System
  const configs = JSON.parse(localStorage.getItem("dark-configs") || "{}");
  let currentConfig = "default";
  let saveCounter = 1;

  function saveConfig(name) {
    const config = {
      modules: {},
      keybinds: {...keybinds},
      theme: ui.className.match(/theme-(\w+)/)?.[1] || "dark",
      language: currentLanguage
    };

    // Save module states
    document.querySelectorAll(".dark-toggle input[type='checkbox']").forEach(toggle => {
      const moduleName = toggle.closest(".dark-module").querySelector(".dark-module-title").textContent.toLowerCase().replace(/ /g, "_");
      config.modules[moduleName] = toggle.checked;
    });

    configs[name] = config;
    localStorage.setItem("dark-configs", JSON.stringify(configs));
    return config;
  }

  function loadConfig(name) {
    const config = configs[name];
    if (!config) return false;

    // Load theme
    ui.className = `dark-ui theme-${config.theme || "dark"} visible`;

    // Load language
    currentLanguage = config.language || "en";
    updateUIForLanguage();

    // Load keybinds
    Object.assign(keybinds, config.keybinds || {});
    updateKeybindDisplays();

    // Load module states
    setTimeout(() => {
      document.querySelectorAll(".dark-toggle input[type='checkbox']").forEach(toggle => {
        const moduleName = toggle.closest(".dark-module").querySelector(".dark-module-title").textContent.toLowerCase().replace(/ /g, "_");
        toggle.checked = config.modules[moduleName] || false;
      });
    }, 100);

    currentConfig = name;
    return true;
  }

  function deleteConfig(name) {
    delete configs[name];
    localStorage.setItem("dark-configs", JSON.stringify(configs));
    if (currentConfig === name) {
      currentConfig = "default";
    }
  }

  function autoSaveConfig() {
    let configName = `save_${saveCounter}`;
    while (configs[configName]) {
      saveCounter++;
      configName = `save_${saveCounter}`;
    }
    saveConfig(configName);
    saveCounter++;
    return configName;
  }

  // Keybind system
  let editingKeybind = null;
  const keybinds = {
    toggleMenu: "Z",
    killaura: "R",
    fly: "F",
    esp: "X",
    speed: "Ctrl"
  };

  function updateKeybindDisplays() {
    document.querySelectorAll(".dark-keybind").forEach(el => {
      const feature = el.dataset.feature;
      if (feature && keybinds[feature]) {
        el.textContent = keybinds[feature];
      }
    });
  }

  // Console System
  const logs = [];
  
  function addLog(message, type = "info") {
    const time = new Date().toLocaleTimeString();
    logs.push({ time, message, type });
    
    // Keep only last 50 logs
    if (logs.length > 50) logs.shift();
    
    updateLogDisplay();
  }

  function updateLogDisplay() {
    const logContainer = document.querySelector(".dark-console-logs");
    if (logContainer) {
      logContainer.innerHTML = logs.map(log => `
        <div class="dark-log-entry">
          <span class="dark-log-time">[${log.time}]</span>
          <span class="dark-log-message">${log.message}</span>
        </div>
      `).join("");
      logContainer.scrollTop = logContainer.scrollHeight;
    }
  }

  // ========================
  // UI Creation Functions
  // ========================

  function updateUIForLanguage() {
    // Update sidebar
    document.querySelectorAll(".dark-sidebar-btn").forEach((btn, index) => {
      const icons = ["⚔️", "🏃", "👁️", "👤", "⚙️", "📜", "🛠️", "ℹ️"];
      const keys = ["combat", "movement", "visual", "player", "settings", "console", "config", "about"];
      if (keys[index]) {
        btn.innerHTML = `<i>${icons[index]}</i> ${translate(keys[index])}`;
      }
    });

    // Update module titles
    const moduleTranslations = {
      "Kill Aura": "killaura",
      "Reach": "reach",
      "Anti-Knockback": "antikb",
      "Fly": "fly",
      "Speed": "speed",
      "Bunny Hop": "bhop",
      "ESP": "esp",
      "X-Ray": "xray",
      "Tracers": "tracers",
      "No Fall": "nofall",
      "Auto-Heal": "autoheal",
      "Theme": "theme",
      "Language": "language",
      "Keybinds": "keybinds"
    };

    document.querySelectorAll(".dark-module-title").forEach(titleEl => {
      const originalText = titleEl.textContent;
      if (moduleTranslations[originalText]) {
        titleEl.textContent = translate(moduleTranslations[originalText]);
      }
    });

    // Update other UI elements
    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.dataset.translate;
      el.textContent = translate(key);
    });

    // Update config buttons
    document.querySelectorAll(".dark-config-item-btn.load").forEach(btn => {
      btn.textContent = translate("load_config");
    });
    document.querySelectorAll(".dark-config-item-btn.delete").forEach(btn => {
      btn.textContent = translate("delete_config");
    });
    const saveBtn = document.querySelector(".dark-config-save");
    if (saveBtn) saveBtn.textContent = translate("save_config");
    const configInput = document.querySelector(".dark-config-input");
    if (configInput) configInput.placeholder = translate("config_name");
  }

  function createModule(title, description, enabled = false, keybindName = null) {
    const module = document.createElement("div");
    module.className = "dark-module";
    
    const toggleId = `toggle-${Math.random().toString(36).substr(2, 9)}`;
    
    module.innerHTML = `
      <div class="dark-module-header">
        <div class="dark-module-title">${title}</div>
        <label class="dark-toggle">
          <input type="checkbox" ${enabled ? 'checked' : ''} id="${toggleId}">
          <span class="dark-toggle-slider"></span>
        </label>
      </div>
      <div class="dark-module-desc">${description}</div>
      ${keybindName ? `<div class="dark-keybind" data-feature="${keybindName}">${keybinds[keybindName] || 'N/A'}</div>` : ''}
    `;
    
    // Add keybind editing
    if (keybindName) {
      const keybindEl = module.querySelector(".dark-keybind");
      keybindEl.addEventListener("click", function() {
        if (editingKeybind) editingKeybind.classList.remove("edit-mode");
        editingKeybind = this;
        this.classList.add("edit-mode");
        this.textContent = "Press a key...";
      });
    }
    
    return module;
  }

  function createButtonModule(title, description, btnText, onClick) {
    const module = document.createElement("div");
    module.className = "dark-module";
    
    module.innerHTML = `
      <div class="dark-module-header">
        <div class="dark-module-title">${title}</div>
      </div>
      <div class="dark-module-desc">${description}</div>
      <button class="dark-btn">${btnText}</button>
    `;
    
    if (onClick) {
      module.querySelector("button").addEventListener("click", onClick);
    }
    
    return module;
  }

  function createSliderModule(title, description, min = 0, max = 100, value = 50) {
    const module = document.createElement("div");
    module.className = "dark-module";
    
    module.innerHTML = `
      <div class="dark-module-header">
        <div class="dark-module-title">${title}</div>
        <div class="dark-slider-value">${value}</div>
      </div>
      <div class="dark-module-desc">${description}</div>
      <div class="dark-slider">
        <input type="range" min="${min}" max="${max}" value="${value}">
      </div>
    `;
    
    return module;
  }

  function createConsoleModule() {
    const container = document.createElement("div");
    container.className = "dark-console-container";
    
    container.innerHTML = `
      <div class="dark-console-logs"></div>
      <div class="dark-console-input-container">
        <input type="text" class="dark-console-input" placeholder="Enter command...">
        <button class="dark-console-execute">></button>
      </div>
    `;
    
    const input = container.querySelector(".dark-console-input");
    const button = container.querySelector(".dark-console-execute");
    
    button.addEventListener("click", () => {
      const command = input.value.trim();
      if (command) {
        addLog(`> ${command}`, "command");
        try {
          const result = eval(command);
          addLog(result !== undefined ? result.toString() : "Command executed", "success");
        } catch (err) {
          addLog(`Error: ${err.message}`, "error");
        }
        input.value = "";
      }
    });
    
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        button.click();
      }
    });
    
    // Add initial logs
    addLog("Console initialized", "info");
    addLog("Type commands to execute them", "info");
    
    return container;
  }

  function createConfigModule() {
    const container = document.createElement("div");
    container.className = "dark-config-container";
    
    container.innerHTML = `
      <div class="dark-config-input-container">
        <input type="text" class="dark-config-input" placeholder="${translate("config_name")}">
        <button class="dark-config-save">${translate("save_config")}</button>
      </div>
      <div class="dark-config-list"></div>
    `;
    
    const nameInput = container.querySelector(".dark-config-input");
    const saveBtn = container.querySelector(".dark-config-save");
    const configList = container.querySelector(".dark-config-list");
    
    function refreshConfigList() {
      configList.innerHTML = Object.keys(configs).map(name => `
        <div class="dark-config-item">
          <div class="dark-config-item-name">${name}</div>
          <div class="dark-config-item-actions">
            <button class="dark-config-item-btn load" data-action="load" data-name="${name}">${translate("load_config")}</button>
            <button class="dark-config-item-btn delete" data-action="delete" data-name="${name}">${translate("delete_config")}</button>
          </div>
        </div>
      `).join("");
      
      configList.querySelectorAll("[data-action='load']").forEach(btn => {
        btn.addEventListener("click", () => {
          loadConfig(btn.dataset.name);
          nameInput.value = btn.dataset.name;
          addLog(`Loaded config: ${btn.dataset.name}`, "info");
        });
      });
      
      configList.querySelectorAll("[data-action='delete']").forEach(btn => {
        btn.addEventListener("click", () => {
          if (confirm(`Delete config "${btn.dataset.name}"?`)) {
            deleteConfig(btn.dataset.name);
            refreshConfigList();
            addLog(`Deleted config: ${btn.dataset.name}`, "warning");
          }
        });
      });
    }
    
    saveBtn.addEventListener("click", () => {
      const name = nameInput.value.trim() || autoSaveConfig();
      if (name) {
        saveConfig(name);
        refreshConfigList();
        nameInput.value = "";
        addLog(`Saved config: ${name}`, "success");
      }
    });

    // Auto-save when typing in the input and pressing enter
    nameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveBtn.click();
      }
    });
    
    refreshConfigList();
    return container;
  }

// ========================
// Fixed Category System
// ========================

const categories = {};
let currentContent = null;

function addCategory(name, icon, cb) {
    const btn = document.createElement("button");
    btn.className = "dark-sidebar-btn";
    btn.innerHTML = `<i>${icon}</i> ${translate(name)}`;
    sidebar.appendChild(btn);

    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        document.querySelectorAll(".dark-sidebar-btn").forEach(b => {
            b.classList.remove("active");
        });
        
        // Add active class to clicked button
        btn.classList.add("active");
        
        // Remove existing content
        if (currentContent) {
            body.removeChild(currentContent);
        }
        
        // Create new content container
        const newContent = document.createElement("div");
        newContent.className = name === "console" || name === "config" 
            ? "dark-full-content" 
            : "dark-content";
        
        // Add to body and store reference
        body.appendChild(newContent);
        currentContent = newContent;
        
        // Build the content
        cb(newContent);
    });
}
// ========================
// Initialize UI
// ========================

// After creating all categories, add this initialization code:
setTimeout(() => {
    const firstBtn = sidebar.querySelector(".dark-sidebar-btn");
    if (firstBtn) {
        firstBtn.click();
    }
}, 10);

  // Add Categories
  addCategory("combat", "⚔️", (content) => {
    content.appendChild(createModule(translate("killaura"), "Automatically attacks nearby enemies", false, "killaura"));
    content.appendChild(createModule(translate("reach"), "Extends your attack range", false, "reach"));
    content.appendChild(createModule(translate("antikb"), "Reduces knockback from attacks", false, "antikb"));
  });

  addCategory("movement", "🏃", (content) => {
    content.appendChild(createModule(translate("fly"), "Allows you to fly", false, "fly"));
    content.appendChild(createModule(translate("speed"), "Increases movement speed", false, "speed"));
    content.appendChild(createModule(translate("bhop"), "Automatically jumps while moving", false, "bhop"));
  });

  addCategory("visual", "👁️", (content) => {
    content.appendChild(createModule(translate("esp"), "Highlights players through walls", false, "esp"));
    content.appendChild(createModule(translate("xray"), "See through blocks", false, "xray"));
    content.appendChild(createModule(translate("tracers"), "Show lines to other players", false, "tracers"));
  });

  addCategory("player", "👤", (content) => {
    content.appendChild(createModule(translate("nofall"), "Prevents fall damage", false, "nofall"));
    content.appendChild(createModule(translate("autoheal"), "Automatically uses healing items", false, "autoheal"));
  });
  
  addCategory("settings", "⚙️", (content) => {
    // Theme changer
    const themeModule = document.createElement("div");
    themeModule.className = "dark-module";
    themeModule.innerHTML = `
      <div class="dark-module-header">
        <div class="dark-module-title">${translate("theme")}</div>
      </div>
      <div class="dark-module-desc">Change the UI theme</div>
      <button class="dark-btn secondary" id="theme-dark">Dark</button>
      <button class="dark-btn secondary" id="theme-purple">Purple</button>
      <button class="dark-btn secondary" id="theme-light">Light</button>
      <button class="dark-btn secondary" id="theme-cyber">Cyber</button>
      <button class="dark-btn secondary" id="theme-midnight">Midnight</button>
    `;
    content.appendChild(themeModule);


    // Language changer
    const langModule = document.createElement("div");
    langModule.className = "dark-module";
    langModule.innerHTML = `
      <div class="dark-module-header">
        <div class="dark-module-title">${translate("language")}</div>
      </div>
      <div class="dark-module-desc">Change the UI language</div>
      <button class="dark-btn secondary" data-lang="en">English</button>
      <button class="dark-btn secondary" data-lang="es">Español</button>
      <button class="dark-btn secondary" data-lang="fr">Français</button>
      <button class="dark-btn secondary" data-lang="de">Deutsch</button>
      <button class="dark-btn secondary" data-lang="ja">日本語</button>
    `;
    content.appendChild(langModule);

    // Keybind settings
    content.appendChild(createButtonModule(translate("keybinds"), "Configure all keybindings", translate("keybinds")));
  });

  addCategory("console", "📜", (content) => {
    content.appendChild(createConsoleModule());
  });

  addCategory("config", "🛠️", (content) => {
    content.appendChild(createConfigModule());
  });

  addCategory("about", "ℹ️", (content) => {
    const about = document.createElement("div");
    about.className = "dark-module";
    about.innerHTML = `
      <div class="dark-module-header">
        <div class="dark-module-title">D A R K</div>
      </div>
      <div style="margin-bottom: 15px; color: var(--text-secondary); line-height: 1.6;">
        <p>${translate("version")}: 1.0.0</p>
        <p>${translate("developer")}: lorddenish</p>
      </div>
      <button class="dark-btn" onclick="window.open('https://discord.gg/86dcW5smcA', '_blank')">
        <i>💬</i> ${translate("join_discord")}
      </button>
      <button class="dark-btn secondary" style="margin-top: 10px;">
        <i>❤️</i> ${translate("support")}
      </button>
    `;
    content.appendChild(about);
  });

  // ========================
  // Event Listeners
  // ========================

  // Theme changer functionality
  document.addEventListener("click", (e) => {
    if (e.target.id.startsWith("theme-")) {
      const theme = e.target.id.replace("theme-", "");
      ui.className = `dark-ui theme-${theme} visible`;
      addLog(`Changed theme to ${theme}`, "info");
    }
  });

  // Language changer functionality
  document.addEventListener("click", (e) => {
    if (e.target.dataset.lang) {
      currentLanguage = e.target.dataset.lang;
      updateUIForLanguage();
      addLog(`Changed language to ${currentLanguage}`, "info");
    }
  });

  // Toggle UI with custom keybind
  let uiVisible = true;
  document.addEventListener("keydown", (e) => {
    if (e.key.toUpperCase() === keybinds.toggleMenu) {
      if (uiVisible) {
        ui.classList.add("fade-out");
        setTimeout(() => {
          ui.style.display = "none";
        }, 300);
      } else {
        ui.style.display = "flex";
        setTimeout(() => {
          ui.classList.remove("fade-out");
          ui.classList.add("visible");
        }, 10);
      }
      uiVisible = !uiVisible;
      return;
    }

    if (editingKeybind) {
      e.preventDefault();
      const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      editingKeybind.textContent = key;
      editingKeybind.classList.remove("edit-mode");
      
      const feature = editingKeybind.dataset.feature;
      keybinds[feature] = key;
      addLog(`Changed ${feature} keybind to ${key}`, "info");
      editingKeybind = null;
      return;
    }
  });

  // Initialize
  loadConfig(currentConfig);
  sidebar.querySelector(".dark-sidebar-btn").click();
  addLog("D A R K client initialized", "success");
})();