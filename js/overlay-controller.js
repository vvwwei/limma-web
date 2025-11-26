const OverlayController = {
    overlay: null,
    closeBtn: null,

    init() {
        this.overlay = document.getElementById('content-overlay');
        this.closeBtn = document.getElementById('close-btn');
        this.closeBtn.addEventListener('click', () => this.close());
    },

    show(key) {
        const data = siteConfig[key];
        const titleEl = document.getElementById('overlay-title');
        if (data && data.subtitle) {
            titleEl.innerHTML = `<span class="title-main">${data.title}</span><span class="title-sub">${data.subtitle}</span>`;
            titleEl.classList.add('with-subtitle');
        } else {
            titleEl.innerText = data.title;
            titleEl.classList.remove('with-subtitle');
        }
        document.getElementById('overlay-body').innerHTML = data.content;

        // Append global footer into overlay body container
        try {
            if (window.Footer && window.SiteFooter) {
                window.Footer.attachToOverlay(key);
            }
        } catch (e) {}

        // Yuàn 頁面使用白底主題
        if (this.overlay) {
            this.overlay.classList.toggle('theme-white', key === 'yuan');
        }
        
        this.overlay.classList.add('active');
        this.overlay.scrollTop = 0; 
    },

    close() {
        this.overlay.classList.remove('active');
        this.overlay.classList.remove('theme-white');
        document.body.classList.remove('content-open');
        
        setTimeout(() => {
            const targetZ = window.innerWidth < 768 ? 38 : 28;
            new TWEEN.Tween(SceneManager.camera.position)
                .to({ x: 0, y: 0, z: targetZ }, 1200)
                .easing(TWEEN.Easing.Cubic.Out)
                .onComplete(() => {
                    SceneManager.isZoomed = false;
                    SceneManager.controls.enabled = true;
                    SceneManager.controls.autoRotate = true;
                })
                .start();
            new TWEEN.Tween(SceneManager.controls.target)
                .to({ x: 0, y: 0, z: 0 }, 1000)
                .start();
        }, 300);
    }
};

// --------- Global helpers for EXPLORE interactions (script in innerHTML won't execute) ---------
window.LIMMA_EXPLORE = window.LIMMA_EXPLORE || {
    _getContainers: function () {
        const body = document.getElementById('overlay-body');
        if (!body) return {};
        const ov = body.querySelector('#explore-overview');
        const dt = body.querySelector('#explore-detail');
        return { ov, dt };
    },
    show: function (id) {
        const c = this._getContainers();
        if (!c.ov || !c.dt) return;
        c.ov.style.display = 'none';
        c.dt.style.display = 'flex';
        ['ex01', 'ex02', 'ex03'].forEach(function (k) {
            const sec = c.dt.querySelector('#' + k);
            if (sec) sec.style.display = (k === id) ? 'block' : 'none';
        });
    },
    back: function () {
        const c = this._getContainers();
        if (!c.ov || !c.dt) return;
        c.dt.style.display = 'none';
        c.ov.style.display = 'grid';
    },
    // Inline expand/collapse inside EXPLORE cards (no overlay)
    toggleInline: function (id, ev) {
        try {
            if (ev && ev.stopPropagation) ev.stopPropagation();
            const panel = document.getElementById(id + '-inline');
            if (!panel) return;
            const isOpen = panel.style.display === 'block';
            panel.style.display = isOpen ? 'none' : 'block';
            const card = panel.closest('.gallery-item');
            if (card) {
                const btn = card.querySelector('.exp-btn');
                if (btn) btn.textContent = isOpen ? 'LEARN MORE' : 'HIDE';
            }
        } catch (e) {}
    }
};

