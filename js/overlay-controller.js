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
        document.getElementById('overlay-title').innerText = data.title;
        document.getElementById('overlay-body').innerHTML = data.content;

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

