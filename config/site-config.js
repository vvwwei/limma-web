const siteConfig = {
    portfolio: {
        id: 'portfolio',
        label: 'PORTFOLIO',
        title: '精選作品集',
        externalUrl: 'https://chenwei880618.wixsite.com/mysite-1/1st-gallery',
        content: `<p>Redirecting to portfolio...</p>`
    },
    
    services: {
        id: 'services',
        label: 'SERVICES',
        title: '服務與技術支援',
        content: `
            <p>我們提供全方位的科技藝術解決方案。</p>
            <br>
            <div style="background:rgba(255,255,255,0.05); padding:2rem; border-radius:8px; margin-bottom:1.5rem;">
                <h3 style="color:#D6FF5A; margin-top:0;">01. AI 導入藝術生產流程</h3>
                <p>協助創作者建立基於 AI Agent 的工作流，整合 Midjourney、Stable Diffusion 與 LLM。</p>
            </div>
            <div style="background:rgba(255,255,255,0.05); padding:2rem; border-radius:8px; margin-bottom:1.5rem;">
                <h3 style="color:#D6FF5A; margin-top:0;">02. 3D 空間與視覺設計</h3>
                <p>WebGL 網站開發、互動式影音介面設計、3D 人物與場景建模。</p>
            </div>
            <div style="background:rgba(255,255,255,0.05); padding:2rem; border-radius:8px;">
                <h3 style="color:#D6FF5A; margin-top:0;">03. 跨域策展與顧問</h3>
                <p>提供空間劇場顧問服務，結合語言量化分析與現象學建築概念。</p>
            </div>
        `
    },
    
    team: {
        id: 'team',
        label: 'ABOUT US', 
        title: 'ABOUT US',
        content: `
            <p style="font-size:1.1rem; margin-bottom:3rem; line-height:1.8; max-width:800px;">
                <strong style="color:#D6FF5A; font-size:1.4rem; display:block; margin-bottom:0.5rem;">Limma Lab</strong>
                是一間致力於將 AI 技術導入藝術生產流程的科技藝術工作室。 <br>
                我們專注於系統開發、AI影音創造與語意的量化分析，打造跨界流動的藝術語境。
            </p>
            
            <h3 class="team-section-title">我們的團隊成員 (OUR TEAM MEMBERS)</h3>

            <div class="team-card">
                <div class="card-left">
                    <div class="role-icon"><div class="shape-square"></div></div>
                    <div class="role-label">ROLE CONFIGURATION</div>
                    <h2 class="role-title-main">The Enabler</h2>
                    <div class="role-def-text">AI 藝術系統的基石</div>
                </div>
                <div class="card-right">
                    <div class="identity-header">
                        <h3 class="name-cn">力珩</h3>
                        <span class="name-en">LIHENG</span>
                    </div>
                    <p class="role-desc">負責將跨維度的創意工作流精密化，架構 AI 藝術生產的底層基礎設施，他將混亂的需求梳理為可執行的邏輯，為藝術生產搭建基礎設施。</p>
                    <div class="system-log">
                        <div class="log-header">// SYSTEM LOG</div>
                        <div class="log-row"><span class="log-key">Status:</span><span class="log-val">Active</span></div>
                        <div class="log-row"><span class="log-key">Function:</span><span class="log-val">Infrastructure</span></div>
                        <div class="log-row"><span class="log-key">Protocol:</span><span class="log-val">Logic_Stream</span></div>
                    </div>
                </div>
            </div>

            <div class="team-card">
                <div class="card-left">
                    <div class="role-icon"><div class="shape-triangle-outline"></div></div>
                    <div class="role-label">ROLE CONFIGURATION</div>
                    <h2 class="role-title-main">The Decoder</h2>
                    <div class="role-def-text">純粹邏輯引擎</div>
                </div>
                <div class="card-right">
                    <div class="identity-header">
                        <h3 class="name-cn">力璜</h3>
                        <span class="name-en">LIHUANG</span>
                    </div>
                    <p class="role-desc">透過精密語意學，將抽象概念「解碼」為精準的執行指令，並在聲音開發領域建構與視覺邏輯同源的聲學結構。</p>
                    <div class="system-log">
                        <div class="log-header">// SYSTEM LOG</div>
                        <div class="log-row"><span class="log-key">Status:</span><span class="log-val">Active</span></div>
                        <div class="log-row"><span class="log-key">Core:</span><span class="log-val">Semantic_Analysis</span></div>
                        <div class="log-row"><span class="log-key">Output:</span><span class="log-val">Audio_Visual_Sync</span></div>
                    </div>
                </div>
            </div>

            <div class="team-card">
                <div class="card-left">
                    <div class="role-icon"><div class="shape-circle"></div></div>
                    <div class="role-label">ROLE CONFIGURATION</div>
                    <h2 class="role-title-main">The Conductor</h2>
                    <div class="role-def-text">空間敘事導演</div>
                </div>
                <div class="card-right">
                    <div class="identity-header">
                        <h3 class="name-cn">陳薇</h3>
                        <span class="name-en">CHENWEI</span>
                    </div>
                    <p class="role-desc">以藝術導演的視角，將被解碼的指令融入 3D 空間敘事，編排生成式影像的運鏡、結構與情感張力，讓虛擬維度具現化。</p>
                    <div class="system-log">
                        <div class="log-header">// SYSTEM LOG</div>
                        <div class="log-row"><span class="log-key">Status:</span><span class="log-val">Active</span></div>
                        <div class="log-row"><span class="log-key">Geometry:</span><span class="log-val">ICOSA_MESH</span></div>
                        <div class="log-row"><span class="log-key">Material:</span><span class="log-val">LIQUID_METAL</span></div>
                    </div>
                </div>
            </div>

            <div class="team-card">
                <div class="card-left">
                    <div class="role-icon"><div class="shape-diamond"></div></div>
                    <div class="role-label">ROLE CONFIGURATION</div>
                    <h2 class="role-title-main">The Integrator</h2>
                    <div class="role-def-text">感官融合專家</div>
                </div>
                <div class="card-right">
                    <div class="identity-header">
                        <h3 class="name-cn">昭惠</h3>
                        <span class="name-en">ZHAOHUI</span>
                    </div>
                    <p class="role-desc">負責感官整合，將影像、聲音與氛圍進行完美的「定調」與同步，連結數位系統與人類知覺，確保作品與觀者共振。</p>
                    <div class="system-log">
                        <div class="log-header">// SYSTEM LOG</div>
                        <div class="log-row"><span class="log-key">Status:</span><span class="log-val">Active</span></div>
                        <div class="log-row"><span class="log-key">Sensor:</span><span class="log-val">Multi_Modal</span></div>
                        <div class="log-row"><span class="log-key">Target:</span><span class="log-val">Resonance</span></div>
                    </div>
                </div>
            </div>
        `
    },
    
    contact: {
        id: 'contact',
        label: 'CONTACT',
        title: '聯絡資訊',
        content: `
            <div style="text-align:center; margin-top:3rem;">
                <img src="assets/images/limma-logo-v2.jpg" alt="Limma Logo" style="width: 360px; height: auto; margin-bottom: 2rem; display: inline-block; mix-blend-mode: screen;">
                <p>有任何合作需求或專案諮詢，歡迎與我們連絡。</p>
                <br><br>
                <p style="font-size:1.5rem;"><strong>Email:</strong> <a href="mailto:studioyuan.tw@gmail.com" style="color:#D6FF5A; text-decoration:none;">studioyuan.tw@gmail.com</a></p>
                <p><strong>Location:</strong> 台灣</p>
            </div>
        `
    },
    
    yuan: {
        id: 'yuan',
        label: 'Yuàn', 
        title: 'Yuàn (源)',
        content: `
            <div style="text-align:center; max-width: 800px; margin: 0 auto;">
                <p style="font-size:1.5rem; color:#D6FF5A; margin-bottom:2rem;">The Origin. The Core. The Silence.</p>
                <p>「Yuàn」是 Zmma Studio 的核心哲學，象徵一切數據與創意的原點。</p>
                <br>
                <p>在這裡，我們探討生成式 AI 與人類意識的交會點。它既是如岩石般古老的物質基礎，也是如月球般牽引潮汐的無形力量。</p>
                <br>
                <div style="margin: 3rem 0; padding: 2rem; border: 1px solid #333;">
                    <p style="font-style:italic;">"我們不在數據中尋找答案，我們在數據中尋找提問的方式。"</p>
                </div>
                <br>
                <p>透過科技，我們重塑了觀看的結構；透過藝術，我們找回了感知的溫度。</p>
            </div>
        `
    }
};

