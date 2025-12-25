const PageExplore = {
    id: 'explore',
    label: 'Cooperate',
    title: 'Cooperate',
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
            .exp-detail h4 { margin:1.2rem 0 .6rem 0; color:0x2a6f00; }
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

            /* Yuan Project Grid Styling (for Cooperate page) */
            .yuan-section-title{
                color: var(--accent-color);
                margin: 0.5rem 0 1.8rem 0;
                font-size: 1.4rem;
                border-bottom: 1px solid rgba(214,255,90,0.45);
                padding-bottom: 0.6rem;
                letter-spacing: 0.06em;
            }
            .yuan-project-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            .yuan-project-grid .project-item {
                flex: 1 1 calc(50% - 1.5rem);
                min-width: 300px;
                background: rgba(255,255,255,0.5);
                border: 1px solid #eee;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            }
            .yuan-project-grid .media-wrapper {
                aspect-ratio: 16 / 9;
            }
            @media (max-width: 768px) {
                .yuan-section-title{
                    font-size: 1.05rem;
                    margin-top: 1.8rem;
                }
                .yuan-project-grid .project-item {
                    flex: 1 1 100%;
                }
                .project-item .item-info{
                    padding: 0.85rem !important;
                }
                .project-item .item-title{
                    font-size: 0.95rem !important;
                }
            }
        </style>

        <p class="explore-intro">快速探索 Limma lab 的方法論與能力地景；理解我們如何把AI智能、美學語彙與跨媒體工程連成可持續的商業解決辦法。</p>

        <!-- Cooperate：元光寺專案搬移到此 -->
        <div id="explore-overview">
            <h3 class="yuan-section-title">元光寺AI影音專案 (Yuan Guang Temple Project)</h3>
            <div class="gallery-grid yuan-project-grid">
                <!-- Project Video 1: 阿彌陀佛歌曲版 -->
                <div class="gallery-item project-item">
                    <div class="media-wrapper" style="cursor: pointer;" onclick="window.open('https://www.youtube.com/watch?v=HuWW4mlG-Ho', '_blank')">
                        <img src="https://img.youtube.com/vi/HuWW4mlG-Ho/hqdefault.jpg" alt="阿彌陀佛歌曲版" style="width:100%; height:100%; object-fit:cover; background:#000;">
                        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:40px; background:rgba(0,0,0,0.7); border-radius:10px; display:flex; align-items:center; justify-content:center; pointer-events:none;">
                            <div style="width:0; height:0; border-style:solid; border-width:10px 0 10px 16px; border-color:transparent transparent transparent #fff;"></div>
                        </div>
                    </div>
                    <div class="item-info" style="padding: 1rem;">
                        <h4 class="item-title" style="font-size: 1rem; margin:0;">【從從容容，游刃有餘】阿彌陀佛歌曲版</h4>
                    </div>
                </div>

                <!-- Project Video 2: 普獻上人 圓寂報恩追思影片 -->
                <div class="gallery-item project-item">
                    <div class="media-wrapper" style="cursor: pointer;" onclick="window.open('https://www.youtube.com/watch?v=uVwL3XtcxIU', '_blank')">
                        <img src="https://img.youtube.com/vi/uVwL3XtcxIU/hqdefault.jpg" alt="普獻上人 圓寂報恩追思影片" style="width:100%; height:100%; object-fit:cover; background:#000;">
                        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:40px; background:rgba(0,0,0,0.7); border-radius:10px; display:flex; align-items:center; justify-content:center; pointer-events:none;">
                            <div style="width:0; height:0; border-style:solid; border-width:10px 0 10px 16px; border-color:transparent transparent transparent #fff;"></div>
                        </div>
                    </div>
                    <div class="item-info" style="padding: 1rem;">
                        <h4 class="item-title" style="font-size: 1rem; margin:0;">【普獻上人 圓寂報恩追思影片】</h4>
                    </div>
                </div>

                <!-- Project Video 3: 普獻上人 音聲重現 -->
                <div class="gallery-item project-item">
                    <div class="media-wrapper" style="cursor: pointer;" onclick="window.open('https://www.youtube.com/watch?v=F_84u3K63EE', '_blank')">
                        <img src="https://img.youtube.com/vi/F_84u3K63EE/hqdefault.jpg" alt="普獻上人 音聲重現" style="width:100%; height:100%; object-fit:cover; background:#000;">
                        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:40px; background:rgba(0,0,0,0.7); border-radius:10px; display:flex; align-items:center; justify-content:center; pointer-events:none;">
                            <div style="width:0; height:0; border-style:solid; border-width:10px 0 10px 16px; border-color:transparent transparent transparent #fff;"></div>
                        </div>
                    </div>
                    <div class="item-info" style="padding: 1rem;">
                        <h4 class="item-title" style="font-size: 1rem; margin:0;">【普獻上人 音聲重現】一小時版本《心經》演唱</h4>
                    </div>
                </div>

                <!-- Project Playlist: 祈願333 -->
                <div class="gallery-item project-item">
                    <div class="media-wrapper" style="cursor: pointer;" onclick="window.open('https://www.youtube.com/playlist?list=PLmLjF88JvZq8lRR4dJDBAZHeOG4XGqEk0', '_blank')">
                        <img src="20251015.jpg" alt="祈願333" style="width:100%; height:100%; object-fit:cover; background:#000;">
                        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:40px; background:rgba(0,0,0,0.7); border-radius:10px; display:flex; align-items:center; justify-content:center; pointer-events:none;">
                            <!-- Playlist Icon -->
                            <svg viewBox="0 0 24 24" style="width:24px;height:24px;fill:#fff;"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/></svg>
                        </div>
                        <div style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.8); color:#fff; padding:2px 6px; border-radius:4px; font-size:0.8rem; pointer-events:none;">PLAYLIST</div>
                    </div>
                    <div class="item-info" style="padding: 1rem;">
                        <h4 class="item-title" style="font-size: 1rem; margin:0;">【祈願333】《金剛經大義》+ 直播精華</h4>
                    </div>
                </div>
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



