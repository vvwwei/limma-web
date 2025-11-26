function init() {
    SceneManager.init();
    NexusSystem.init();
    NodeManager.init();
    InteractionHandler.init();
    OverlayController.init();

    // Handle Intro Overlay
    const enterBtn = document.getElementById('enter-btn');
    const introOverlay = document.getElementById('intro-overlay');
    
    if (enterBtn && introOverlay) {
        enterBtn.addEventListener('click', () => {
            // Play interaction sound
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(220, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
            osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.3);
            
            gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);

            introOverlay.classList.add('fade-out');
            setTimeout(() => {
                introOverlay.remove();
            }, 1000); // Match transition duration
        });
    }

    // 讓品牌大標寬度匹配副標寬度，並保持兩行距離
    try {
        fitBrandHeader();
        window.addEventListener('resize', fitBrandHeader);
    } catch (e) {}

    setTimeout(() => {
        document.getElementById('loader').style.opacity = 0;
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 1500);

    animate();
}

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
    SceneManager.update();
    NexusSystem.updateParticles();
    SceneManager.render();
}

function fitBrandHeader() {
    var header = document.querySelector('.brand-header');
    if (!header) return;
    var title = header.querySelector('h1');
    var sub = header.querySelector('span');
    if (!title || !sub) return;

    // 以副標寬度為目標，調整大標字級
    var target = sub.getBoundingClientRect().width;
    if (target <= 0) return;
    var maxIter = 20;
    var fs = parseFloat(getComputedStyle(title).fontSize) || 96;
    var minFs = 24;
    var w = title.getBoundingClientRect().width;
    // 若差距明顯，快速比例調整一次
    if (w > 0) {
        var ratio = target / w;
        fs = Math.max(minFs, Math.min(120, fs * ratio * 0.98));
        title.style.fontSize = fs + 'px';
        w = title.getBoundingClientRect().width;
    }
    // 微調
    while (w > target && fs > minFs && maxIter-- > 0) {
        fs -= 1;
        title.style.fontSize = fs + 'px';
        w = title.getBoundingClientRect().width;
    }
}

init();

