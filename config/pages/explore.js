const PageExplore = {
    id: 'explore',
    label: 'EXPLORE',
    title: 'EXPLORE',
    content: `
        <style>
            /* EXPLORE Overview cards */
            .exp-btn { 
                margin-top: 0; padding: .55rem .95rem; 
                background: transparent; color: var(--accent-color);
                border: 1.5px solid var(--accent-color);
                font-family:'Orbitron',sans-serif; letter-spacing:.6px;
                border-radius: 6px; cursor:pointer;
                box-sizing: border-box;
            }
            /* 固定概覽卡片底部的按鈕，不影響展開層的返回鍵 */
            #explore-overview .exp-btn{
                position: absolute; left: 1.5rem; right: 1.5rem; bottom: 4rem; 
            }
            .exp-btn:hover { 
                background: rgba(214,255,90,.12);
                transform: translateY(-1px);
            }
            .exp-title-en { display:none; }
            .exp-hash { color:#c8ff66; } 
            .exp-detail h4 { margin:1.2rem 0 .6rem 0; color:#2a6f00; }
            .exp-back { margin-top:1.2rem; background:#222; color:#fff; border:1px solid #333; }
            .exp-list { margin:.2rem 0 .8rem 0; padding-left:1.2rem; color:#ccc; }
            .exp-cap { color:#9ad100; font-size:.9rem; margin:.6rem 0; }

            /* Rectangular wide cards - change to flex so單欄展開不影響其它欄高 */
            #explore-overview.gallery-grid { 
                display: flex;
                flex-wrap: wrap;
                gap: 1.25rem;
                align-items: stretch;
            }
            #explore-overview .gallery-item.exp-card { 
                min-height: 600px; 
                display:flex; 
                position: relative;
                padding-right: 24px;
                padding-bottom: 88px;
                cursor: pointer;
                /* 修正寬度計算：扣掉 gap 後平均分配 */
                flex: 1 1 calc((100% - 2.5rem) / 3);
                min-width: 300px;
                box-sizing: border-box;
            }
            #explore-overview .gallery-item .item-info{ display:flex; flex-direction:column; justify-content:flex-start; height:100%; }
            #explore-overview .gallery-item .item-desc{ line-height: 1.7; color:#ddd; }
            #explore-overview .gallery-item .exp-brief{ margin:.35rem 0 .35rem 0; padding-left:1.1rem; color:#ddd; }
            #explore-overview .gallery-item .exp-brief li{ margin:.2rem 0; }
            #explore-overview .gallery-item .item-title{
                margin-bottom:3.5rem;
                font-size: clamp(1.4rem, 2.2vw, 2rem);
                line-height:1.2;
            }
            .ex-tag{ 
                display:inline-block; font-size:.8rem; color:var(--accent-color);
                border:1px solid var(--accent-color); padding:.15rem .5rem; border-radius:16px;
                margin-bottom:.35rem; letter-spacing:.6px;
            }
            .item-title .ex-title{ 
                display:block;
                margin-top:.15rem;
                color: var(--accent-color); font-weight:800;
                letter-spacing:.5px; white-space: normal; word-break: break-word;
                font-size: clamp(1.2rem, 1.9vw, 2.2rem);
                line-height: 1.18;
            }
            #explore-overview .item-title .ex-title{
                font-size: clamp(1.8rem, 2.6vw, 2.9rem);
            }
            .exp-header{
                min-height: 120px;
                display:flex; flex-direction:column; align-items:flex-start; justify-content:flex-start;
            }

            /* hashtags -> tags */
            .tagset{ display:flex; flex-wrap:wrap; gap:.35rem; margin-top:1.6rem; }
            .tag{ 
                background: rgba(214,255,90,.12); color: var(--accent-color);
                border: 1px solid var(--accent-color); border-radius: 999px;
                padding: .12rem .55rem; font-size: .8rem; letter-spacing:.2px;
            }
            .exp-gap{ height: .25rem; flex: 0 0 auto; }

            .explore-intro{
                font-size: clamp(1.05rem, 1.6vw, 1.35rem);
                line-height: 1.9;
                color: #f6f6f6;
                margin: 0 0 2.2rem 0;
                text-wrap: pretty;
            }

            @media (max-width: 768px){
                .explore-intro{
                    font-size: 1rem;
                    line-height: 1.75;
                    margin-bottom: 1.2rem;
                }
            }

            /* Decorative rotating geometry */
            .exp-geo{ width: 72px; height: 72px; perspective:700px; opacity:.85; pointer-events:none; margin:0 0 3.5rem 0; }
            .spin3d{ animation: spin3d 8s linear infinite; transform-style:preserve-3d; }
            @keyframes spin3d{
                0%{ transform: rotateX(0deg) rotateY(0deg); }
                50%{ transform: rotateX(25deg) rotateY(180deg); }
                100%{ transform: rotateX(0deg) rotateY(360deg); }
            }
            .geo-square{ width:100%; height:100%; background:rgba(214,255,90,.14); border:2px solid var(--accent-color); }
            .geo-circle{ width:100%; height:100%; border-radius:50%; border:3px solid var(--accent-color); background: radial-gradient(transparent 55%, rgba(214,255,90,.12) 56%); }
            .geo-triangle{ width:0; height:0; border-left:36px solid transparent; border-right:36px solid transparent; border-bottom:64px solid var(--accent-color); filter: drop-shadow(0 8px 18px rgba(214,255,90,.22)); }

            /* Frosted modal for detail */
            #explore-detail{
                position: fixed; inset: 0; display:none;
                align-items:center; justify-content:center;
                background: rgba(255,255,255,0.08);
                -webkit-backdrop-filter: blur(12px);
                backdrop-filter: blur(12px);
                z-index: 120;
            }
            #explore-detail .exp-modal-card{
                max-width: 920px; width: calc(100% - 48px);
                background: #ffffff;
                -webkit-backdrop-filter: none;
                backdrop-filter: none;
                color:#111; border-radius: 12px; padding: 2rem 2rem 1.5rem 2rem;
                box-shadow: 0 20px 60px rgba(0,0,0,0.35);
                border: 1px solid rgba(0,0,0,0.06);
            }
            #explore-detail .item-title{ color:#111; }
            #explore-detail .exp-list{ color:#333; }
            #explore-detail .exp-cap{ color:#357a00; }

            /* Inline expand detail inside card */
            .inline-detail{
                display:none;
                margin-top: 1.25rem;
                padding-top: 1rem;
                border-top: 1px solid #2a2a2a;
                color:#ddd;
            }
            .inline-detail h4{
                margin:.5rem 0 .4rem 0;
                color: var(--accent-color);
                font-size: 1rem;
            }
            .inline-detail ul{
                margin: .4rem 0 0 1.1rem;
                padding: 0;
                padding-right: 10px; /* 避免項目符號或文字太靠右 */
            }
            .inline-detail li{
                margin:.25rem 0;
            }
        </style>

        <p class="explore-intro">快速探索 Limma lab 的方法論與能力地景；理解我們如何把AI智能、美學語彙與跨媒體工程連成可持續的商業解決辦法。</p>

        <!-- Overview -->
        <div id="explore-overview" class="gallery-grid">
            <div class="gallery-item exp-card">
                <div class="item-info">
                    <div class="exp-header">
                        <div class="ex-tag">EX‑01</div>
                        <h3 class="item-title"><span class="ex-title">智慧系統架構與 AI 模型建置</span></h3>
                        <div class="exp-geo"><div class="geo-square spin3d"></div></div>
                    </div>
                    <p class="item-desc">建置企業專屬的生成式系統基礎設施，涵蓋音樂、影像、知識型模型與工作流。</p>
                    <div class="tagset">
                        <span class="tag">#音樂生產模型</span>
                        <span class="tag">#AI Agent 引擎</span>
                        <span class="tag">#影像工作流</span>
                    </div>

                    <!-- Inline expand content for EX-01 -->
                    <div class="inline-detail" id="ex01-inline">
                        <h4>Why it matters</h4>
                        <p style="margin:0 0 .6rem 0;">確保 AI 服務高穩定、可控、可審計，並能依照實際情境安全落地。</p>
                        <h4>How Limma lab 做</h4>
                        <ul>
                            <li>AI 系統工程與活化策略：從架構設計到長期顧問，維持系統可演進。</li>
                            <li>AI Agent 數據庫與知識庫建構：以語言學分析搭建專屬對話與知識管理。</li>
                            <li>客製化生成模型：音訊、抽象畫面、視覺概念等模型訓練與 API 化。</li>
                            <li>跨感官美學參數化：把視覺／聽覺標準轉為訓練參數，輸出具美學一致性。</li>
                        </ul>
                    </div>
                    <div class="exp-gap" style="flex-grow: 1;"></div>
                    <button class="exp-btn" onclick="LIMMA_EXPLORE.toggleInline('ex01', event)">LEARN MORE</button>
                </div>
            </div>
            <div class="gallery-item exp-card">
                <div class="item-info">
                    <div class="exp-header">
                        <div class="ex-tag">EX‑02</div>
                        <h3 class="item-title"><span class="ex-title">AI 企業級數位流程建構與轉型</span></h3>
                        <div class="exp-geo"><div class="geo-triangle spin3d"></div></div>
                    </div>
                    <p class="item-desc">把品牌識別、流程治理與內容生產整合成一條龍的轉型方案。</p>
                    <div class="tagset">
                        <span class="tag">#品牌再定位</span>
                        <span class="tag">#互動網站</span>
                        <span class="tag">#AI內容工廠</span>
                        <span class="tag">#流程自動化</span>
                        <span class="tag">#資料治理</span>
                    </div>

                    <!-- Inline expand content for EX-02 -->
                    <div class="inline-detail" id="ex02-inline">
                        <h4>Why it matters</h4>
                        <p style="margin:0 0 .6rem 0;">既有資料與流程得以重新編排，品牌敘事與營運節點共享同一決策邏輯。</p>
                        <h4>How Limma lab 做</h4>
                        <ul>
                            <li>資料—流程—回應全鏈路：盤點系統、重建 API 與工作流。</li>
                            <li>應用情境藍圖：拆解任務模組，導入 AI 工作流與自動化。</li>
                            <li>品牌識別 × 再定位：AI 導入、網站、形象影片、互動體驗。</li>
                            <li>數位資產重塑：短影音、有聲書、MV、Podcast 等一體化製作。</li>
                            <li>跨媒體延展：海報、刊物、包裝與周邊皆維持一致感官標準。</li>
                        </ul>
                    </div>
                    <div class="exp-gap" style="flex-grow: 1;"></div>
                    <button class="exp-btn" onclick="LIMMA_EXPLORE.toggleInline('ex02')">LEARN MORE</button>
                </div>
            </div>
            <div class="gallery-item exp-card">
                <div class="item-info">
                    <div class="exp-header">
                        <div class="ex-tag">EX‑03</div>
                        <h3 class="item-title"><span class="ex-title">AI 跨感官展演策畫與體驗工程</span></h3>
                        <div class="exp-geo"><div class="geo-circle spin3d"></div></div>
                    </div>
                    <p class="item-desc">以跨媒材藝術結合科技，策畫沉浸式展演與空間體驗。</p>
                    <div class="tagset">
                        <span class="tag">#互動介面</span>
                        <span class="tag">#環繞聲音</span>
                        <span class="tag">#投影視覺裝置</span>
                    </div>

                    <!-- Inline expand content for EX-03 -->
                    <div class="inline-detail" id="ex03-inline">
                        <h4>Why it matters</h4>
                        <p style="margin:0 0 .6rem 0;">讓品牌、場館或活動在多感層次中與觀眾建立記憶點。</p>
                        <h4>How Limma lab 做</h4>
                        <ul>
                            <li>策展與製作統籌：主題設定、行銷宣傳、導覽與跨團隊協作。</li>
                            <li>聲音與空間包覆：環繞音場、聲景雕塑、客製音樂／音像資料庫。</li>
                            <li>AI 互動介面與劇場敘事：觸控桌、感應牆、舞台，以故事整合動線。</li>
                            <li>互動投影與視覺生成：3D 投影、動態追蹤、AI 影像讓行為即時成畫面。</li>
                        </ul>
                    </div>
                    <div class="exp-gap" style="flex-grow: 1;"></div>
                    <button class="exp-btn" onclick="LIMMA_EXPLORE.toggleInline('ex03', event)">LEARN MORE</button>
                </div>
            </div>
        </div>

        <!-- Detail -->
        <div id="explore-detail" class="exp-detail" style="display:none;">
            <div id="ex01" class="exp-modal-card" style="display:none;">
                <h3 class="item-title">EX‑01 智慧系統架構與 AI 模型建置</h3>
                <h4>What it is</h4>
                <p>建置企業專屬的生成式系統基礎設施，涵蓋音樂、影像、知識型模型與工作流。</p>
                <h4>Why it matters</h4>
                <p>確保 AI 服務高穩定、可控、可審計，並能依照實際情境安全落地。</p>
                <h4>How Limma lab 做</h4>
                <ul class="exp-list">
                    <li>AI 系統工程與活化策略：從架構設計到長期顧問，維持系統可演進。</li>
                    <li>AI Agent 數據庫與知識庫建構：以語言學分析搭建專屬對話與知識管理。</li>
                    <li>客製化生成模型：音訊、抽象畫面、視覺概念等模型訓練與 API 化。</li>
                    <li>跨感官美學參數化：把視覺／聽覺標準轉為訓練參數，輸出具美學一致性。</li>
                </ul>
                <p class="exp-cap">Capabilities：Music Generation｜Domain AI Agent Engine｜Video/Image Workflow｜Model Fine‑tuning｜Evaluation & Governance</p>
                <p class="exp-cap">Case / Application：音樂版權資料庫自動編曲、跨語系客服 Agent、視覺素材一鍵生成等。</p>
                <button class="exp-btn exp-back" onclick="LIMMA_EXPLORE.back()">回到概覽</button>
            </div>

            <div id="ex02" class="exp-modal-card" style="display:none;">
                <h3 class="item-title">EX‑02 AI 企業級數位流程建構與轉型</h3>
                <h4>What it is</h4>
                <p>把品牌識別、流程治理與內容生產整合成一條龍的轉型方案。</p>
                <h4>Why it matters</h4>
                <p>既有資料與流程得以重新編排，品牌敘事與營運節點共享同一決策邏輯。</p>
                <h4>How Limma lab 做</h4>
                <ul class="exp-list">
                    <li>資料—流程—回應全鏈路：盤點系統、重建 API 與工作流。</li>
                    <li>應用情境藍圖：拆解任務模組，導入 AI 工作流與自動化。</li>
                    <li>品牌識別 × 再定位：AI 導入、網站、形象影片、互動體驗。</li>
                    <li>數位資產重塑：短影音、有聲書、MV、Podcast 等一體化製作。</li>
                    <li>跨媒體延展：海報、刊物、包裝與周邊皆維持一致感官標準。</li>
                </ul>
                <p class="exp-cap">Capabilities：Brand Strategy｜Immersive Web/App｜AI Content Factory｜Voice/Visual Restoration｜Workflow Orchestration｜Measurement & Dashboards</p>
                <p class="exp-cap">Case / Application：老字號品牌再定位＋AI 修復影像、互動展間與周邊等完整轉型專案。</p>
                <button class="exp-btn exp-back" onclick="LIMMA_EXPLORE.back()">回到概覽</button>
            </div>

            <div id="ex03" class="exp-modal-card" style="display:none;">
                <h3 class="item-title">EX‑03 AI 跨感官展演策畫與體驗工程</h3>
                <h4>What it is</h4>
                <p>以跨媒材藝術結合科技，策畫沉浸式展演與空間體驗。</p>
                <h4>Why it matters</h4>
                <p>讓品牌、場館或活動在多感層次中與觀眾建立記憶點。</p>
                <h4>How Limma lab 做</h4>
                <ul class="exp-list">
                    <li>策展與製作統籌：主題設定、行銷宣傳、導覽與跨團隊協作。</li>
                    <li>聲音與空間包覆：環繞音場、聲景雕塑、客製音樂／音像資料庫。</li>
                    <li>AI 互動介面與劇場敘事：觸控桌、感應牆、舞台，以故事整合動線。</li>
                    <li>互動投影與視覺生成：3D 投影、動態追蹤、AI 影像讓行為即時成畫面。</li>
                </ul>
                <p class="exp-cap">Capabilities：Interactive Interface｜Immersive Audio｜Projection & Generative Visuals｜Installation Design｜Show Control｜On‑site Operations</p>
                <p class="exp-cap">Case / Application：跨感官品牌展、沉浸式新品發表、常設體驗館、互動藝術裝置等。</p>
                <button class="exp-btn exp-back" onclick="LIMMA_EXPLORE.back()">回到概覽</button>
            </div>
        </div>

        <script>
            window.LIMMA_EXPLORE = {
              toggleInline: function(id){
                try{
                  var panel = document.getElementById(id + '-inline');
                  var btns = document.querySelectorAll('.exp-btn');
                  if(!panel) return;
                  var isOpen = panel.style.display === 'block';
                  panel.style.display = isOpen ? 'none' : 'block';
                  // update button text for the same card
                  var card = panel.closest('.exp-card');
                  if(card){
                    var btn = card.querySelector('.exp-btn');
                    if(btn){ btn.textContent = isOpen ? 'LEARN MORE' : 'HIDE'; }
                  }
                }catch(e){}
              },
              fitTitles: function(){
                try{
                  var nodes = document.querySelectorAll('#explore-overview .ex-title');
                  nodes.forEach(function(el){
                    // Reset to computed base then shrink until兩行內
                    el.style.fontSize = ''; // use CSS clamp as starting point
                    var cs = window.getComputedStyle(el);
                    var lineH = parseFloat(cs.lineHeight) || (parseFloat(cs.fontSize) * 1.2);
                    var maxH = lineH * 2 + 1;
                    var fs = parseFloat(cs.fontSize);
                    var tries = 0;
                    while (el.scrollHeight > maxH && fs > 12 && tries < 40){
                      fs -= 1;
                      el.style.fontSize = fs + 'px';
                      tries++;
                    }
                  });
                  
                  // Calculate and sync card heights (excluding expanded content)
                  if(window.innerWidth >= 768){
                    var cards = document.querySelectorAll('#explore-overview .gallery-item');
                    // 1. Temporary hide all details and reset min-height to measure natural height
                    var states = [];
                    cards.forEach(function(c, i){
                        var detail = c.querySelector('.inline-detail');
                        states[i] = (detail && detail.style.display === 'block');
                        if(detail) detail.style.display = 'none';
                        c.style.minHeight = ''; 
                    });
                    
                    // 2. Find max height
                    var maxH = 0;
                    cards.forEach(function(c){
                        if(c.offsetHeight > maxH) maxH = c.offsetHeight;
                    });
                    
                    // 3. Apply max height as min-height and restore detail state
                    cards.forEach(function(c, i){
                        c.style.minHeight = maxH + 'px';
                        var detail = c.querySelector('.inline-detail');
                        if(states[i] && detail) detail.style.display = 'block';
                    });
                  } else {
                    // Mobile: reset
                     var cards = document.querySelectorAll('#explore-overview .gallery-item');
                     cards.forEach(function(c){ c.style.minHeight = ''; });
                  }
                  
                }catch(e){}
              },
              show: function(id){
                var ov = document.getElementById('explore-overview');
                var dt = document.getElementById('explore-detail');
                if(!ov || !dt) return;
                ov.style.display='none';
                dt.style.display='block';
                ['ex01','ex02','ex03'].forEach(function(k){
                  var sec = document.getElementById(k);
                  if(sec) sec.style.display = (k===id)?'block':'none';
                });
              },
              back: function(){
                var ov = document.getElementById('explore-overview');
                var dt = document.getElementById('explore-detail');
                if(!ov || !dt) return;
                dt.style.display='none';
                ov.style.display='flex';
                window.requestAnimationFrame(function(){
                  if(window.LIMMA_EXPLORE && window.LIMMA_EXPLORE.fitTitles){
                    window.LIMMA_EXPLORE.fitTitles();
                  }
                });
              }
            };
            window.requestAnimationFrame(function(){
              if(window.LIMMA_EXPLORE && window.LIMMA_EXPLORE.fitTitles){
                window.LIMMA_EXPLORE.fitTitles();
              }
            });
            window.addEventListener('resize', function(){
              if(window.LIMMA_EXPLORE && window.LIMMA_EXPLORE.fitTitles){
                window.LIMMA_EXPLORE.fitTitles();
              }
            });
        </script>
    `
};


