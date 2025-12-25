// Define global video loader function
if (!window.loadYuanVideo) {
    window.loadYuanVideo = function(wrapper, type, id) {
        var iframe = document.createElement('iframe');
        iframe.width = "100%";
        iframe.height = "100%";
        
        var src = '';
        if (type === 'playlist') {
            // Playlist format
            src = 'https://www.youtube.com/embed/videoseries?list=' + id + '&autoplay=1&rel=0';
        } else {
            // Standard Video format
            src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
        }
        
        iframe.src = src;
        iframe.title = "YouTube video player";
        iframe.frameBorder = "0";
        // Removed strict referrerPolicy which might block file:// protocol
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        
        wrapper.innerHTML = ''; // Clear the cover image
        wrapper.appendChild(iframe);
    };
}

const PageYuan = {
    id: 'yuan',
    label: 'Artworks', 
    title: '《: 一個沒有中斷的劇》',
    content: `
        <div style="max-width: 100%; margin: 0 auto;">
            <!-- 標題旁的描述文字區域 -->
            <div class="yuan-intro">
                <p class="yuan-lead">
                    這是一張探討「冒號」與「時間」關係的藝術專輯。
                </p>
                <p class="yuan-copy">
                    收錄了五部短影音，分別從「通道」、「主觀」、「無常」、「邏輯」、「雙瞳」五個面向，呈現時間多重且不間斷的樣貌。冒號作為一種標點符號，不僅標誌著停頓，更預示著後續的展開，就像時間本身，既是終點，也是下一個起點。
                    視覺上，它利用抽象的建築結構，營造出一個不斷延伸、穿越空間的時間線，引導觀眾進入《: 一個沒有中斷的劇》。
                </p>
            </div>

            <!-- 專輯總封面圖 -->
            <div class="yuan-master-cover">
                <img src="assets/images/總封面.png" alt="《: 一個沒有中斷的劇》總封面">
            </div>

            <h3 class="yuan-section-title" style="margin-top:3rem;"></h3>
            
            <div class="gallery-grid gallery-single-column">
                <!-- Video 1: Yuàn Short -->
                <div class="gallery-item">
                    <div class="yuan-media-row">
                        <div class="yuan-poster">
                            <img src="assets/images/封面【time_0】通道 JPG.JPG" alt="【time 00:01】The Passage / 通道 海報" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <div class="yuan-video">
                            <div class="media-wrapper" style="cursor: pointer;" onclick="window.open('https://www.youtube.com/watch?v=zLyXiRSZlVo','_blank')">
                                <img src="https://img.youtube.com/vi/zLyXiRSZlVo/hqdefault.jpg" alt="Yuàn Short" style="width:100%; height:100%; object-fit:contain; background:#000;">
                                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:40px; background:rgba(0,0,0,0.7); border-radius:10px; display:flex; align-items:center; justify-content:center; pointer-events:none;">
                                    <div style="width:0; height:0; border-style:solid; border-width:10px 0 10px 16px; border-color:transparent transparent transparent #fff;"></div>
                                </div>
                            </div>
                            <div class="item-info" style="padding: 1rem;">
                                <h4 class="item-title" style="font-size: 1rem; margin:0;">【time 00:01】The Passage / 通道</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Video 2: 【time 00:02】La mer / 海 -->
                <div class="gallery-item">
                    <div class="yuan-media-row">
                        <div class="yuan-poster">
                            <img src="assets/images/封面【time_1】黑眼.png" alt="【time 00:02】La mer / 海 海報" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <div class="yuan-video">
                            <div class="media-wrapper" style="cursor: pointer;" onclick="window.open('https://www.youtube.com/watch?v=prwwlgpI51Q','_blank')">
                                <img src="https://img.youtube.com/vi/prwwlgpI51Q/hqdefault.jpg" alt="【time 00:02】La mer / 海" style="width:100%; height:100%; object-fit:contain; background:#000;">
                                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:40px; background:rgba(0,0,0,0.7); border-radius:10px; display:flex; align-items:center; justify-content:center; pointer-events:none;">
                                    <div style="width:0; height:0; border-style:solid; border-width:10px 0 10px 16px; border-color:transparent transparent transparent #fff;"></div>
                                </div>
                            </div>
                            <div class="item-info" style="padding: 1rem;">
                                <h4 class="item-title" style="font-size: 1rem; margin:0;">【time 00:02】La mer / 海</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Video 3: 【time 00:03】The Impermanent Birds / 無常的飛鳥 -->
                <div class="gallery-item">
                    <div class="yuan-media-row">
                        <div class="yuan-poster">
                            <img src="assets/images/封面【time_2】無常.png" alt="【time 00:03】The Impermanent Birds / 無常的飛鳥 海報" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <div class="yuan-video">
                            <div class="media-wrapper" style="cursor: pointer;" onclick="window.open('https://www.youtube.com/watch?v=CiTWpk9LFKQ','_blank')">
                                <img src="https://img.youtube.com/vi/CiTWpk9LFKQ/hqdefault.jpg" alt="【time 00:03】The Impermanent Birds / 無常的飛鳥" style="width:100%; height:100%; object-fit:contain; background:#000;">
                                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:40px; background:rgba(0,0,0,0.7); border-radius:10px; display:flex; align-items:center; justify-content:center; pointer-events:none;">
                                    <div style="width:0; height:0; border-style:solid; border-width:10px 0 10px 16px; border-color:transparent transparent transparent #fff;"></div>
                                </div>
                            </div>
                            <div class="item-info" style="padding: 1rem;">
                                <h4 class="item-title" style="font-size: 1rem; margin:0;">【time 00:03】The Impermanent Birds / 無常的飛鳥</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Video 4: 【time 00:04】Remembered by the Fold / 它被折痕記住 -->
                <div class="gallery-item">
                    <div class="yuan-media-row">
                        <div class="yuan-poster">
                            <img src="assets/images/封面【time_3】邏輯 (1).png" alt="【time 00:04】Remembered by the Fold / 它被折痕記住 海報" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <div class="yuan-video">
                            <div class="media-wrapper" style="cursor: pointer;" onclick="window.open('https://www.youtube.com/watch?v=7jijVrh_2MQ','_blank')">
                                <img src="https://img.youtube.com/vi/7jijVrh_2MQ/hqdefault.jpg" alt="【time 00:04】Remembered by the Fold / 它被折痕記住" style="width:100%; height:100%; object-fit:contain; background:#000;">
                                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:40px; background:rgba(0,0,0,0.7); border-radius:10px; display:flex; align-items:center; justify-content:center; pointer-events:none;">
                                    <div style="width:0; height:0; border-style:solid; border-width:10px 0 10px 16px; border-color:transparent transparent transparent #fff;"></div>
                                </div>
                            </div>
                            <div class="item-info" style="padding: 1rem;">
                                <h4 class="item-title" style="font-size: 1rem; margin:0;">【time 00:04】Remembered by the Fold / 它被折痕記住</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Video 5: 【time 00:05】The Bipupil / 雙瞳 -->
                <div class="gallery-item">
                    <div class="yuan-media-row">
                        <div class="yuan-poster">
                            <img src="assets/images/封面【time_4】黑眼.png" alt="【time 00:05】The Bipupil / 雙瞳 海報" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <div class="yuan-video">
                            <div class="media-wrapper" style="cursor: pointer;" onclick="window.open('https://www.youtube.com/watch?v=1J6Cv9ZjPgQ','_blank')">
                                <img src="https://img.youtube.com/vi/1J6Cv9ZjPgQ/hqdefault.jpg" alt="【time 00:05】The Bipupil / 雙瞳" style="width:100%; height:100%; object-fit:contain; background:#000;">
                                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:60px; height:40px; background:rgba(0,0,0,0.7); border-radius:10px; display:flex; align-items:center; justify-content:center; pointer-events:none;">
                                    <div style="width:0; height:0; border-style:solid; border-width:10px 0 10px 16px; border-color:transparent transparent transparent #fff;"></div>
                                </div>
                            </div>
                            <div class="item-info" style="padding: 1rem;">
                                <h4 class="item-title" style="font-size: 1rem; margin:0;">【time 00:05】The Bipupil / 雙瞳</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 結語文字框：延伸綠色說明 -->
            <div class="yuan-intro yuan-intro-bottom">
                <p class="yuan-copy">
                    「通道、主觀、無常、邏輯、雙瞳」，這些詞彙就像是冒號後面的「定義」，將原本抽象、單一的時間概念，拆解並重塑成多面向、可被體驗的藝術作品。
                </p>
            </div>
        </div>

        <style>
                   /* Yuan Project Grid Styling */
                   .yuan-intro{
                       margin-bottom: 4rem;
                       background: rgba(214,255,90,0.12);
                       border: 1px solid #e5f89a;
                       border-left: 4px solid var(--accent-color);
                       border-radius: 10px;
                       padding: 1.5rem 1.8rem;
                       text-wrap: pretty;
                   }
                   .yuan-intro p{
                       margin: 0 0 0.6rem 0;
                       color: #111;
                       line-height: 1.8;
                       word-break: break-word;
                   }
                   .yuan-intro .yuan-lead{
                       font-size: 1.3rem;
                       font-weight: 600;
                       letter-spacing: 0.04em;
                   }
                   .yuan-intro .yuan-copy{
                       font-size: 1.05rem;
                   }
                   .yuan-intro-bottom{
                       margin-top: 2.5rem;
                   }
                   .yuan-master-cover{
                       margin: 2.5rem auto 0;
                       max-width: 1100px;
                   }
                   .yuan-master-cover img{
                       width: 100%;
                       height: auto;
                       display: block;
                   }

                   .yuan-section-title{
                       color:#111;
                       margin-bottom: 1.5rem;
                       font-size: 1.2rem;
                       border-bottom: 1px solid #e5e5e5;
                       padding-bottom: 0.5rem;
                       letter-spacing: 0.02em;
                   }

            .yuan-project-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            .yuan-project-grid .project-item {
                flex: 1 1 calc(50% - 1.5rem); /* 一排兩個 */
                min-width: 300px; /* 手機版自動變單欄 */
                background: rgba(255,255,255,0.5);
                border: 1px solid #eee;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            }
            .yuan-project-grid .media-wrapper {
                aspect-ratio: 16 / 9; /* 寬螢幕比例 */
            }
            
            /* Artworks 單欄放大顯示 */
            .gallery-grid.gallery-single-column{
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            .gallery-grid.gallery-single-column .gallery-item{
                max-width: 900px;
                margin: 0 auto;
            }
            /* Artworks 左圖右影片版面 */
            .yuan-media-row{
                display: flex;
                gap: 1.5rem;
                align-items: stretch;
            }
            .yuan-poster{
                flex: 0 0 38%;
            }
            .yuan-poster img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
            .yuan-video{
                flex: 1;
                display: flex;
                flex-direction: column;
            }
            
            @media (max-width: 768px) {
                       .yuan-intro{
                           padding: 1.25rem;
                           margin-bottom: 2.5rem;
                       }
                       .yuan-intro .yuan-lead{
                           font-size: 1.15rem;
                           line-height: 1.6;
                           word-break: break-word;
                       }
                       .yuan-intro .yuan-copy{
                           font-size: 1rem;
                           line-height: 1.7;
                       }
                       .yuan-section-title{
                           font-size: 1.05rem;
                       }
                       .yuan-master-cover{
                           margin-top: 1.8rem;
                       }
                       .yuan-intro-bottom{
                           margin-top: 2rem;
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
                       .yuan-media-row{
                           flex-direction: column;
                       }
                       .yuan-poster{
                           flex: 0 0 auto;
                       }
            }
        </style>
    `
};



