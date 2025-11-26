function init() {
    SceneManager.init();
    NexusSystem.init();
    NodeManager.init();
    InteractionHandler.init();
    OverlayController.init();
    // Intro 不顯示頁尾，取消掛載

    // Handle Intro Overlay
    const enterBtn = document.getElementById('enter-btn');
    const introOverlay = document.getElementById('intro-overlay');
    const introVideo = document.getElementById('intro-video');
    const soundToggle = document.getElementById('sound-toggle');
    const iconSoundOn = document.getElementById('icon-sound-on');
    const iconSoundOff = document.getElementById('icon-sound-off');

    if (enterBtn && introOverlay) {
        // Ensure video plays on mobile (sometimes autoplay is blocked until interaction, but muted should work)
        if(introVideo) {
            
            function updateSoundIcon() {
                if(introVideo.muted) {
                    // Muted -> Show "Sound Off" icon (which means it is OFF, click to UNMUTE? No, user said "click to close")
                    // User: "按一下才是關閉" (Click to turn off) -> Default ON.
                    // So if it is MUTED, we are in "Sound Off" state.
                    // If UNMUTED, we are in "Sound On" state.
                    
                    // Let's stick to standard logic:
                    // If muted: Show "Off" icon (slash).
                    // If unmuted: Show "On" icon (waves).
                    if(iconSoundOn) iconSoundOn.style.display = 'none';
                    if(iconSoundOff) iconSoundOff.style.display = 'block';
                } else {
                    // Unmuted
                    if(iconSoundOn) iconSoundOn.style.display = 'block';
                    if(iconSoundOff) iconSoundOff.style.display = 'none';
                }
            }

            var playPromise = introVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Autoplay started!
                    // Check if it started unmuted
                    updateSoundIcon();
                }).catch(error => {
                    // Autoplay prevented.
                    console.log("Autoplay blocked. Muting.");
                    introVideo.muted = true;
                    introVideo.play();
                    updateSoundIcon();
                });
            }

            // iOS low power mode might suspend video, try to force play on touch
            document.body.addEventListener('touchstart', function() {
                if(introVideo.paused) introVideo.play();
                // Also try to unmute on first touch if it was force-muted by browser
                if(introVideo.muted) {
                    introVideo.muted = false;
                    updateSoundIcon();
                }
            }, {once:true});

            // Toggle Logic
            if(soundToggle) {
                soundToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    introVideo.muted = !introVideo.muted;
                    updateSoundIcon();
                });
            }
            
            // Try to unmute on any interaction with the overlay background if currently muted
            introOverlay.addEventListener('click', (e) => {
                if(e.target.id !== 'enter-btn' && e.target.id !== 'sound-toggle' && !soundToggle.contains(e.target)) {
                   // If background clicked, try to unmute if muted
                   if(introVideo.muted) {
                       introVideo.muted = false;
                       updateSoundIcon();
                   }
                }
            });
        }

        enterBtn.addEventListener('click', () => {
            // Play interaction sound
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    const audioCtx = new AudioContext();
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
                }
            } catch(e) { console.log('Audio error', e); }

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

    // Setup icon-only interaction hint
    try { setupInteractionHint(); } catch (e) {}

    setTimeout(() => {
        document.getElementById('loader').style.opacity = 0;
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 1500);

    animate();
}

function setupInteractionHint() {
    var hintWrap = document.getElementById('interaction-hint');
    if (!hintWrap) return;
    var box = hintWrap.querySelector('.interaction-icons');
    if (!box) return;
    // ensure visible (in case of earlier styles)
    box.classList.remove('hint-fade-out');

    function icon(name, title, label) {
        var svg = '';
        if (name === 'click') {
            svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2l.94 7.06L21 10l-6.06 1.94L13 19l-3.06-6.06L4 10l5.94- .94L13 2z"/></svg>';
            // Simpler pointer icon (use a cursor-like path)
            svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3l9 9-3 1 3 8 2-1-3-8 3-1L4 3z"/></svg>';
        } else if (name === 'drag') {
            svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 12l-4 0M21 12l-4 0M12 7l0-4M12 21l0-4M5 12h14M12 5v14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
        } else if (name === 'scroll') {
            svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l3 3h-2v12h2l-3 3-3-3h2V6H9l3-3z" /></svg>';
        } else if (name === 'tap') {
            svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11v7a2 2 0 0 0 2 2h4c1.1 0 2-.9 2-2v-4a2 2 0 0 0-2-2h-1v-1a2 2 0 1 0-4 0v1H9z"/></svg>';
        } else if (name === 'pinch') {
            svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3l3 3-3 3M16 21l-3-3 3-3M21 8l-3 3-3-3M3 16l3-3 3 3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        }
        return '<span class="hint-icon" title="' + title + '">'+ svg + (label ? '<span class="label">'+label+'</span>' : '') + '</span>';
    }

    var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    var html = '';
    if (isTouch) {
        html = icon('tap','點一下','Tap') + icon('pinch','捏合縮放','Pinch');
    } else {
        html = icon('click','點擊','Click') + icon('drag','拖曳旋轉','Drag') + icon('scroll','滾輪縮放','Scroll');
    }
    box.innerHTML = html;

    // 常駐顯示：不自動淡出、不因互動隱藏
    var alwaysOn = true;
    if (alwaysOn) {
        box.classList.remove('hint-fade-out');
        return;
    }

    // auto fade
    var hide = function() {
        // 若 Intro 還在，先不要隱藏
        if (document.getElementById('intro-overlay')) return;
        if (!box.classList.contains('hint-fade-out')) {
            box.classList.add('hint-fade-out');
        }
        window.removeEventListener('pointerdown', hide);
        window.removeEventListener('wheel', hide, { passive: true });
        window.removeEventListener('touchstart', hide);
    };
    // 等 Intro 移除後再啟動自動淡出計時
    var startAuto = function(){ setTimeout(hide, 12000); };
    if (!document.getElementById('intro-overlay')) {
        startAuto();
    } else {
        var iv = setInterval(function(){
            if (!document.getElementById('intro-overlay')) {
                clearInterval(iv);
                startAuto();
            }
        }, 400);
    }
    window.addEventListener('pointerdown', hide);
    window.addEventListener('wheel', hide, { passive: true });
    window.addEventListener('touchstart', hide, { passive: true });
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

