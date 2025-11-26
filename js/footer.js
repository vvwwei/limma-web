window.Footer = {
    attachToOverlay(routeKey) {
        try {
            const container = document.querySelector('#content-overlay .content-container');
            if (!container || !window.SiteFooter) return;
            // remove old footer if any to avoid duplicates
            const old = container.querySelector('.site-footer');
            if (old) old.remove();
            container.insertAdjacentHTML('beforeend', SiteFooter.html);
            const footerEl = container.querySelector('.site-footer');
            // Swap logo for specific pages (e.g., yuan uses black text on white bg)
            try {
                if (routeKey === 'yuan') {
                    const img = footerEl.querySelector('.footer-brand img');
                    if (img) {
                        const fallbacks = [
                            'assets/images/中文黑字+透明背景.png',
                            './中文黑字+透明背景.png',
                            './中文黑字+透明背景 .png',
                            'assets/images/中文黑字+透明背景 .png'
                        ];
                        const whitePath = img.getAttribute('src') || './中文+白字+透明背景.png';
                        let idx = 0;
                        const tryNext = function() {
                            if (idx < fallbacks.length) {
                                img.onerror = tryNext;
                                img.style.filter = '';
                                img.src = fallbacks[idx++];
                            } else {
                                img.onerror = null;
                                img.src = whitePath;
                                // 以濾鏡轉為黑色，確保在白底可讀
                                img.style.filter = 'brightness(0) saturate(100%)';
                            }
                        };
                        tryNext();
                    }
                }
            } catch (e) {}
            this._bind(footerEl);
        } catch (e) {}
    },
    attachToIntro() {
        try {
            const intro = document.getElementById('intro-overlay');
            if (!intro || !window.SiteFooter) return;
            if (intro.querySelector('.site-footer')) return;
            intro.insertAdjacentHTML('beforeend', SiteFooter.html);
            const ft = intro.querySelector('.site-footer');
            if (ft) {
                ft.classList.add('on-intro');
                this._bind(ft);
            }
        } catch (e) {}
    },
    _bind(footerRoot) {
        if (!footerRoot) return;
        const links = footerRoot.querySelectorAll('[data-route]');
        links.forEach(a => {
            a.addEventListener('click', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                const route = a.getAttribute('data-route');
                const openRoute = () => {
                    if (route === 'home') {
                        if (typeof OverlayController !== 'undefined') OverlayController.close();
                        return;
                    }
                    document.body.classList.add('content-open');
                    if (typeof OverlayController !== 'undefined') OverlayController.show(route);
                };
                const intro = document.getElementById('intro-overlay');
                if (intro) {
                    // fade out intro then navigate
                    intro.classList.add('fade-out');
                    setTimeout(() => {
                        try { intro.remove(); } catch (e) {}
                        openRoute();
                    }, 600);
                } else {
                    openRoute();
                }
            });
        });
    }
};


