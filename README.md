# LIMMA Official Website

## 專案結構

```
Limma_Official_Web/
├── index.html                 # 主入口
├── config/
│   ├── site-config.js        # 網站內容彙整入口（從 pages 匯入）
│   └── pages/                # 各頁面獨立設定
│       ├── explore.js
│       ├── services.js
│       ├── about.js
│       ├── contact.js
│       └── yuan.js
├── styles/
│   └── main.css              # 全域樣式
└── js/
    ├── main.js               # 主程式入口
    ├── scene-manager.js      # 3D 場景管理
    ├── nexus-system.js       # 粒子雲與中央 Yuan 節點
    ├── node-manager.js       # 四個功能節點管理
    ├── interaction-handler.js # 互動事件處理
    ├── overlay-controller.js  # 內容層控制
    └── texture-generator.js   # 紋理生成工具
```

## 模組說明

### 1. **config/site-config.js**
- 彙整各分頁設定為單一 `siteConfig`（對外唯一入口）
- 從 `config/pages/*` 匯入，避免單檔過於龐大
- 載入順序需在頁面設定之後（見 index.html）

### 1.1 **config/pages/**（分頁獨立檔）
- `explore.js`、`services.js`、`about.js`、`contact.js`、`yuan.js`
- 每頁面內容獨立管理、容易維護與協作

### 2. **js/scene-manager.js**
- Three.js 場景初始化
- 相機、渲染器、控制器管理
- 燈光設定
- 響應式調整

### 3. **js/nexus-system.js**
- 粒子雲系統（3000 個粒子）
- 中央 Yuan 節點（銀灰色岩石質感）
- 滑鼠互動效果
- 粒子動態更新

### 4. **js/node-manager.js**
- 四個功能節點的建立與管理
- 節點懸停效果
- 節點點擊激活邏輯
- 相機動畫控制

### 5. **js/interaction-handler.js**
- 滑鼠/觸控事件處理
- Raycasting 碰撞檢測
- 節點點擊判定
- 外部連結處理

### 6. **js/overlay-controller.js**
- 內容層顯示/隱藏
- 動畫過渡效果
- 關閉按鈕邏輯

### 7. **js/texture-generator.js**
- 岩石紋理生成
- 文字 Sprite 生成
- Canvas 紋理工具

## 如何修改內容

### 修改頁面內容
編輯對應的分頁檔，例如 `config/pages/services.js`：

```javascript
const PageServices = {
  id: 'services',
  label: 'SERVICES',
  title: '服務與技術支援',
  content: `<p>你的內容</p>`
};
```

### 新增外部連結
在分頁檔中加入 `externalUrl` 即可被點擊後導向：

```javascript
const PageExplore = {
  id: 'explore',
  externalUrl: 'https://your-link.com'
};
```

### 調整視覺效果
- 顏色：修改 `styles/main.css` 中的 `:root` 變數
- 粒子數量：修改 `js/nexus-system.js` 中的 `count`
- 節點位置：修改 `js/node-manager.js` 中的 `nodePositions`

## 載入順序（重要）
請確保 `index.html` 先載入分頁檔，再載入 `site-config.js`：

```html
<!-- Page Configs (Must be loaded before site-config.js) -->
<script src="config/pages/explore.js"></script>
<script src="config/pages/services.js"></script>
<script src="config/pages/about.js"></script>
<script src="config/pages/contact.js"></script>
<script src="config/pages/yuan.js"></script>

<!-- Aggregate -->
<script src="config/site-config.js"></script>
```

## 技術棧

- Three.js r128
- Tween.js 18.6.4
- OrbitControls
- 原生 JavaScript (ES6)
- CSS3 動畫

## 瀏覽器支援

- Chrome/Edge (推薦)
- Firefox
- Safari
- 支援觸控裝置

