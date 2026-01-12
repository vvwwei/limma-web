const PageContact = {
    id: 'contact',
    label: 'Activity',
    title: '視聽聯覺實驗系列',
    content: `
        <div style="margin:3rem auto; max-width:1040px; line-height:1.8; text-align:left;">
            <style>
                .si-wrapper { font-size:0.98rem; }
                .si-wrapper p { margin:0; }
                .si-intro { margin-bottom:2.5rem; }
                .si-intro p + p { margin-top:0.35rem; }
                .si-stack {
                    display:flex;
                    flex-direction:column;
                    gap:2.4rem;
                }

                .si-tabs-input { display:none; }
                .si-shell {
                    border-radius:18px;
                    background:linear-gradient(135deg, rgba(255,255,255,0.06), rgba(0,0,0,0.6));
                    border:1px solid rgba(255,255,255,0.16);
                    box-shadow:0 22px 60px rgba(0,0,0,0.55);
                    padding:1.4rem 1.6rem 1.6rem;
                }
                .si-tabs {
                    display:flex;
                    gap:0.75rem;
                    margin-bottom:1rem;
                    flex-wrap:wrap;
                }
                .si-tab-label {
                    flex:1 1 0;
                    min-width:180px;
                    padding:0.55rem 0.9rem;
                    border-radius:999px;
                    border:1px solid rgba(214,255,90,0.4);
                    background:rgba(0,0,0,0.45);
                    color:#f5f5f5;
                    font-size:0.9rem;
                    letter-spacing:0.06em;
                    text-align:center;
                    cursor:pointer;
                    transition:all 0.18s ease-out;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    gap:0.4rem;
                    white-space:nowrap;
                }
                .si-tab-label span.si-tag {
                    opacity:0.85;
                }
                .si-tab-label span.si-title {
                    font-weight:600;
                }

                .si-slides {
                    position:relative;
                    border-radius:14px;
                    overflow:hidden;
                    background:#050505;
                    min-height:320px;
                }
                .si-slide {
                    display:none;
                    height:100%;
                }
                .si-slide-inner {
                    position:relative;
                    display:flex;
                    align-items:stretch;
                    justify-content:space-between;
                    gap:1.4rem;
                    padding:1.1rem 1rem 1rem;
                }
                .si-shot {
                    flex:1.7;
                    border-radius:12px;
                    overflow:hidden;
                    background:#111;
                    border:1px solid rgba(255,255,255,0.12);
                    position:relative;
                    width:100%;
                    aspect-ratio:5 / 4;   /* 橫向 5:4 比例 */
                    min-height:220px;
                    max-height:420px;
                }
                .si-shot img {
                    position:absolute;
                    inset:0;
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    display:block;
                    opacity:0;
                    animation:siFade 18s infinite;
                }
                .si-shot img:nth-child(1) { animation-delay:0s; }
                .si-shot img:nth-child(2) { animation-delay:6s; }
                .si-shot img:nth-child(3) { animation-delay:12s; }

                @keyframes siFade {
                    0%, 31% { opacity:1; }   /* 保持顯示約三分之一循環時間 */
                    32%, 100% { opacity:0; } /* 到下一張出現時直接切換，避免黑畫面 */
                }
                .si-meta {
                    flex:1;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-between;
                    padding:0.4rem 0.2rem 0.4rem 0.6rem;
                }
                .si-meta h3 {
                    margin:0 0 0.5rem 0;
                    font-size:1.08rem;
                    letter-spacing:0.08em;
                }
                .si-meta small {
                    opacity:0.78;
                    font-size:0.82rem;
                }
                .si-feature {
                    margin-top:0.8rem;
                    font-size:0.88rem;
                    line-height:1.7;
                }
                .si-feature h4 {
                    margin:0 0 0.4rem 0;
                    font-size:0.9rem;
                    letter-spacing:0.08em;
                }
                .si-feature ul {
                    margin:0;
                    padding-left:0;
                    list-style:none;
                }
                .si-feature li {
                    margin-bottom:0.3rem;
                }
                .si-cta {
                    margin-top:0.95rem;
                    display:inline-flex;
                    align-items:center;
                    gap:0.45rem;
                    padding:0.65rem 1.55rem;
                    border-radius:999px;
                    border:none;
                    background:radial-gradient(circle at 0% 0%, #FFFFFF, #D6FF5A);
                    color:#101010;
                    font-weight:700;
                    font-size:0.9rem;
                    text-decoration:none;
                    cursor:pointer;
                    box-shadow:0 14px 30px rgba(214,255,90,0.45);
                    letter-spacing:0.06em;
                    text-transform:uppercase;
                }
                .si-cta span.si-cta-sub {
                    text-transform:none;
                    font-weight:500;
                    opacity:0.8;
                }

                .si-badge {
                    display:inline-flex;
                    align-items:center;
                    gap:0.4rem;
                    padding:0.35rem 0.8rem;
                    border-radius:999px;
                    background:rgba(0,0,0,0.65);
                    border:1px solid rgba(255,255,255,0.22);
                    font-size:0.78rem;
                    opacity:0.9;
                }

                /* Tabs active states */
                #si-tab-1:checked ~ .si-shell .si-slides .si-slide[data-slide="1"],
                #si-tab-2:checked ~ .si-shell .si-slides .si-slide[data-slide="2"],
                #si-tab-3:checked ~ .si-shell .si-slides .si-slide[data-slide="3"] {
                    display:block;
                }

                #si-tab-1:checked ~ .si-shell .si-tabs label[for="si-tab-1"],
                #si-tab-2:checked ~ .si-shell .si-tabs label[for="si-tab-2"],
                #si-tab-3:checked ~ .si-shell .si-tabs label[for="si-tab-3"] {
                    background:linear-gradient(135deg, #D6FF5A, #ffffff);
                    color:#101010;
                    box-shadow:0 10px 22px rgba(214,255,90,0.5);
                }

                /* Responsive */
                @media (max-width: 900px) {
                    .si-slide-inner {
                        flex-direction:column;
                        padding:0.9rem;
                    }
                    .si-meta {
                        padding:0.6rem 0.1rem 0.2rem;
                    }
                    .si-shell {
                        padding:1.1rem 1.1rem 1.3rem;
                    }
                }
            </style>

            <div class="si-wrapper">
                <div class="si-intro">
                    <p>
                        視聽聯覺實驗系列（Synesthetic Instruments）是一個以感官轉譯（sensory translation）為核心的互動實驗系列。透過可操作的聲音模組，它探索聲音創作的新可能，將演奏從單純的音符重現，轉化為自由即興的視聽創作體驗。
            本系列以微分音與聯覺為靈感，探索聲音與色彩在連續光譜中的對應關係，並透過視覺介面作為聲音生成的橋樑，讓觀者同時「看見聲音」與「聽見顏色」。
                        
                        
                    </p>
                    ⚠️ 互動模組目前僅支援電腦操作，手機瀏覽尚在開發中。
                </div>

                <div class="si-stack">
                    <section class="si-shell">
                        <div class="si-tabs">
                            <div class="si-tab-label">
                                <span class="si-tag">①</span>
                                <span class="si-title">Auditory Color Picker｜聲音色彩選擇器</span>
                            </div>
                        </div>
                        <div class="si-slide-inner">
                            <div class="si-shot">
                                <img src="./assets/images/視聽聯覺實驗系列_截圖-20251225T032652Z-1-001/視聽聯覺實驗系列_截圖/Auditory Color Picker｜聲音色彩選擇器.png" alt="Auditory Color Picker｜聲音色彩選擇器 介面截圖 1">
                                <img src="./assets/images/視聽聯覺實驗系列_截圖-20251225T032652Z-1-001/視聽聯覺實驗系列_截圖/Auditory Color Picker｜聲音色彩選擇器（鍵盤演奏＋錄音功能-1）png.png" alt="Auditory Color Picker｜聲音色彩選擇器 介面截圖 2">
                                <img src="./assets/images/視聽聯覺實驗系列_截圖-20251225T032652Z-1-001/視聽聯覺實驗系列_截圖/Auditory Color Picker｜聲音色彩選擇器（鍵盤演奏＋錄音功能-2）.png" alt="Auditory Color Picker｜聲音色彩選擇器 介面截圖 3">
                            </div>
                            <div class="si-meta">
                                <div>
                                    <div class="si-badge">
                                        🎨 <span>互動聲音色彩介面 · Auditory Color Picker</span>
                                    </div>
                                </div>
                                <div class="si-feature">
                                    <h4>互動特色:</h4>
                                    <ul>
                                        <li>🎚 滑動演奏：拖曳滑鼠可產生連續音高變化，模擬微分音滑動感，創造流動性的音場體驗。</li>
                                        <li>🎧 錄音功能：可錄下個人演奏並下載保存，形成專屬即興音軌。</li>
                                        <li>🎹 多重操作介面：支援鍵盤彈奏與滑鼠拖曳，聲音表現更具層次。</li>
                                        <li>🌈 視聽同步：音色變化同時對應色彩變化，形成即時可視的聲音軌跡。</li>
                                    </ul>
                                </div>
                                <div>
                                    <a class="si-cta" href="https://olive-uicreator.github.io/auditory-color-picker-/" target="_blank" rel="noopener noreferrer">
                                        立即進入體驗 ➜
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="si-shell">
                        <div class="si-tabs">
                            <div class="si-tab-label">
                                <span class="si-tag">②</span>
                                <span class="si-title">Image Sound Synesthesia｜圖像聲音聯覺器</span>
                            </div>
                        </div>
                        <div class="si-slide-inner">
                            <div class="si-shot">
                                <img src="./assets/images/視聽聯覺實驗系列_截圖-20251225T032652Z-1-001/視聽聯覺實驗系列_截圖/Image Sound Synesthesia｜圖像聲音聯覺器，範例圖片1.webp" alt="Image Sound Synesthesia｜圖像聲音聯覺器 介面截圖 1">
                                <img src="./assets/images/視聽聯覺實驗系列_截圖-20251225T032652Z-1-001/視聽聯覺實驗系列_截圖/Image Sound Synesthesia｜圖像聲音聯覺器1-1(10 pixel).png" alt="Image Sound Synesthesia｜圖像聲音聯覺器 介面截圖 2">
                                <img src="./assets/images/視聽聯覺實驗系列_截圖-20251225T032652Z-1-001/視聽聯覺實驗系列_截圖/Image Sound Synesthesia｜圖像聲音聯覺器1-2(74 pixel).png" alt="Image Sound Synesthesia｜圖像聲音聯覺器 介面截圖 3">
                            </div>
                            <div class="si-meta">
                                <div>
                                    <div class="si-badge">
                                        🖼️ <span>圖像轉聲音場景 · Image Sound Synesthesia</span>
                                    </div>
                                </div>
                                <div class="si-feature">
                                    <h4>互動特色:</h4>
                                    <ul>
                                        <li>🟪 視覺音化（visual-to-sonic translation）：將影像分解為色彩單元，根據顏色、亮度與位置生成音高與節奏。</li>
                                        <li>🎼 聲音組構：每張圖片被轉化為獨特的聲音結構或節奏序列，形成可演奏的視覺樂譜。</li>
                                        <li>🖱 參與式演奏：使用者可點擊不同色塊觸發音符，探索影像與聲音的多樣互動。</li>
                                    </ul>
                                </div>
                                <div>
                                    <a class="si-cta" href="https://olive-uicreator.github.io/image-sound-synesthesia/" target="_blank" rel="noopener noreferrer">
                                        立即進入體驗 ➜
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="si-shell">
                        <div class="si-tabs">
                            <div class="si-tab-label">
                                <span class="si-tag">③</span>
                                <span class="si-title">3D Spatial Audio Player｜立體聲音互動播放器</span>
                            </div>
                        </div>
                        <div class="si-slide-inner">
                            <div class="si-shot">
                                <img src="./assets/images/視聽聯覺實驗系列_截圖-20251225T032652Z-1-001/視聽聯覺實驗系列_截圖/3D Spatial Audio Player｜立體聲音互動播放器。右聲道（左右移動會改變聲道）.png" alt="3D Spatial Audio Player｜立體聲音互動播放器 介面截圖 1">
                                <img src="./assets/images/視聽聯覺實驗系列_截圖-20251225T032652Z-1-001/視聽聯覺實驗系列_截圖/3D Spatial Audio Player｜立體聲音互動播放器。音量大（縮放遠近會改變音量）.png.png" alt="3D Spatial Audio Player｜立體聲音互動播放器 介面截圖 2">
                                <img src="./assets/images/視聽聯覺實驗系列_截圖-20251225T032652Z-1-001/視聽聯覺實驗系列_截圖/3D Spatial Audio Player｜立體聲音互動播放器。點擊圓形按鈕載入音樂，顯示歌名.png" alt="3D Spatial Audio Player｜立體聲音互動播放器 介面截圖 3">
                            </div>
                            <div class="si-meta">
                                <div>
                                    <div class="si-badge">
                                        🕹️ <span>空間化聲音控制 · 3D Spatial Audio Player</span>
                                    </div>
                                </div>
                                <div class="si-feature">
                                    <h4>互動特色:</h4>
                                    <ul>
                                        <li>使用者能在虛擬空間中快速模擬立體環境音場，探索不同的音質、空間感與聲音表現。</li>
                                        <li>3D 聲音空間操作：透過滑鼠旋轉與縮放操作，改變聲音的左右聲道與音質，感受聲音在虛擬環境中的微妙變化。</li>
                                    </ul>
                                </div>
                                <div>
                                    <a class="si-cta" href="https://olive-uicreator.github.io/3D-Spatial-Audio-Player---Interactive-Demo/" target="_blank" rel="noopener noreferrer">
                                        立即進入體驗 ➜
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    `
};



