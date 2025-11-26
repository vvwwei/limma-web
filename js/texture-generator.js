const TextureGenerator = {
    createRockTexture() {
        const size = 512;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#b0b0b0';
        ctx.fillRect(0, 0, size, size);
        
        for (let i = 0; i < 10000; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            const w = Math.random() * 3;
            const h = Math.random() * 3;
            const val = 100 + Math.floor(Math.random() * 80); 
            ctx.fillStyle = `rgba(${val},${val},${val},0.3)`;
            ctx.fillRect(x, y, w, h);
        }

        for (let i = 0; i < 500; i++) {
            const x = Math.random() * size;
            const y = Math.random() * size;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.random() * 20 - 10, y + Math.random() * 20 - 10);
            ctx.strokeStyle = `rgba(50,50,50,0.2)`;
            ctx.lineWidth = Math.random() * 2;
            ctx.stroke();
        }

        return new THREE.CanvasTexture(canvas);
    },

    /**
     * 產生布紋貼圖，並以向量方式繪製簡化的中國結作為壓印。
     * 回傳 { base, rough, bump } 三張 CanvasTexture。
     */
    createFabricTexture(options = {}) {
        const size = options.size || 1024;
        const baseColor = options.color || '#3a3a3a'; // 深灰
        const weaveScale = Math.max(2, options.weaveScale || 4); // 單位像素
        const bumpStrength = options.bumpStrength || 0.12;
        const drawKnot = options.knot !== false; // 預設畫
        // 條文參數
        const ribSpacing = Math.max(6, options.ribSpacing || 20);
        const ribWidth = Math.max(1, options.ribWidth || 3);
        const ribStrength = Math.min(0.5, Math.max(0.05, options.ribStrength || 0.22));
        const ribAngle = options.ribAngle == null ? (-Math.PI / 18) : options.ribAngle; // 約 -10 度

        // Base canvas
        const base = document.createElement('canvas');
        base.width = size;
        base.height = size;
        const bctx = base.getContext('2d');

        // 底色
        bctx.fillStyle = baseColor;
        bctx.fillRect(0, 0, size, size);

        // 織紋（經緯交錯）
        for (let y = 0; y < size; y += weaveScale) {
            const intensity = (y / weaveScale) % 2 === 0 ? 18 : -18;
            bctx.fillStyle = `rgba(${40 + intensity}, ${40 + intensity}, ${40 + intensity}, 0.25)`;
            bctx.fillRect(0, y, size, weaveScale);
        }
        for (let x = 0; x < size; x += weaveScale) {
            const intensity = (x / weaveScale) % 2 === 0 ? 16 : -16;
            bctx.fillStyle = `rgba(${40 + intensity}, ${40 + intensity}, ${40 + intensity}, 0.22)`;
            bctx.fillRect(x, 0, weaveScale, size);
        }

        // 細微雜訊
        const noise = bctx.createImageData(size, size);
        for (let i = 0; i < noise.data.length; i += 4) {
            const v = 25 + Math.random() * 30;
            noise.data[i] = v;
            noise.data[i + 1] = v;
            noise.data[i + 2] = v;
            noise.data[i + 3] = 35; // alpha
        }
        bctx.putImageData(noise, 0, 0);

        // 條文覆蓋（表面細長條紋）
        bctx.save();
        bctx.translate(size / 2, size / 2);
        bctx.rotate(ribAngle);
        bctx.translate(-size / 2, -size / 2);
        for (let y = 0; y < size; y += ribSpacing) {
            bctx.fillStyle = `rgba(255,255,255,${ribStrength * 0.35})`;
            bctx.fillRect(0, y, size, ribWidth);
            bctx.fillStyle = `rgba(0,0,0,${ribStrength * 0.5})`;
            bctx.fillRect(0, y + ribWidth, size, Math.max(1, ribWidth * 0.7));
        }
        bctx.restore();

        // 簡化中國結（暗壓印效果）
        if (drawKnot) {
            const scale = size * 0.28;
            const ox = size * 0.2;
            const oy = size * 0.22;
            bctx.save();
            bctx.translate(ox, oy);
            bctx.lineJoin = 'round';
            bctx.lineCap = 'round';

            // 背部陰影
            bctx.shadowColor = 'rgba(0,0,0,0.35)';
            bctx.shadowBlur = scale * 0.03;
            bctx.shadowOffsetX = scale * 0.015;
            bctx.shadowOffsetY = scale * 0.02;

            bctx.strokeStyle = 'rgba(255,255,255,0.10)';
            bctx.lineWidth = Math.max(2, scale * 0.10);

            // 以「∞」和方結構成的中國結輪廓
            const drawLoop = (cx, cy, rx, ry, rot = 0) => {
                bctx.save();
                bctx.translate(cx, cy);
                bctx.rotate(rot);
                bctx.beginPath();
                for (let t = 0; t <= Math.PI * 2; t += 0.02) {
                    const x = (rx * Math.sin(t)) / (1 + Math.cos(t) * Math.cos(t));
                    const y = ry * Math.sin(t) * Math.cos(t) / (1 + Math.cos(t) * Math.cos(t));
                    if (t === 0) bctx.moveTo(x, y); else bctx.lineTo(x, y);
                }
                bctx.stroke();
                bctx.restore();
            };

            // 方形結心
            bctx.beginPath();
            const s = scale * 0.55;
            bctx.moveTo(-s, 0);
            bctx.lineTo(0, -s);
            bctx.lineTo(s, 0);
            bctx.lineTo(0, s);
            bctx.closePath();
            bctx.stroke();

            // 四向繩環
            drawLoop(0, -s * 0.95, s * 0.55, s * 0.35, 0);
            drawLoop(0, s * 0.95, s * 0.55, s * 0.35, 0);
            drawLoop(-s * 0.95, 0, s * 0.55, s * 0.35, Math.PI / 2);
            drawLoop(s * 0.95, 0, s * 0.55, s * 0.35, Math.PI / 2);

            // 吊穗（簡化）
            bctx.shadowColor = 'transparent';
            bctx.beginPath();
            bctx.moveTo(0, s);
            bctx.lineTo(0, s * 1.6);
            bctx.stroke();
            bctx.restore();
        }

        // 粗糙度圖（較平滑，僅保留織紋頻率）
        const rough = document.createElement('canvas');
        rough.width = size;
        rough.height = size;
        const rctx = rough.getContext('2d');
        rctx.drawImage(base, 0, 0);
        rctx.globalAlpha = 0.35;
        rctx.globalCompositeOperation = 'overlay';
        for (let y = 0; y < size; y += weaveScale) {
            rctx.fillStyle = 'rgba(255,255,255,0.15)';
            rctx.fillRect(0, y, size, weaveScale / 2);
        }
        rctx.globalCompositeOperation = 'source-over';
        // 條文強化在粗糙度圖
        rctx.save();
        rctx.translate(size / 2, size / 2);
        rctx.rotate(ribAngle);
        rctx.translate(-size / 2, -size / 2);
        rctx.fillStyle = `rgba(255,255,255,${ribStrength * 0.45})`;
        for (let y = 0; y < size; y += ribSpacing) {
            rctx.fillRect(0, y, size, ribWidth);
        }
        rctx.restore();

        // 凹凸圖（對比再高一些）
        const bump = document.createElement('canvas');
        bump.width = size;
        bump.height = size;
        const mctx = bump.getContext('2d');
        mctx.fillStyle = '#808080';
        mctx.fillRect(0, 0, size, size);
        mctx.globalAlpha = 0.45;
        mctx.drawImage(base, 0, 0);
        mctx.globalAlpha = 0.25;
        for (let y = 0; y < size; y += weaveScale) {
            mctx.fillStyle = '#9a9a9a';
            mctx.fillRect(0, y, size, weaveScale / 2);
        }
        mctx.globalAlpha = 1;
        // 條文強化在凹凸圖（形成更清楚的筋理）
        mctx.save();
        mctx.translate(size / 2, size / 2);
        mctx.rotate(ribAngle);
        mctx.translate(-size / 2, -size / 2);
        for (let y = 0; y < size; y += ribSpacing) {
            mctx.fillStyle = '#a0a0a0';
            mctx.fillRect(0, y, size, ribWidth);
            mctx.fillStyle = '#6f6f6f';
            mctx.fillRect(0, y + ribWidth, size, Math.max(1, ribWidth * 0.6));
        }
        mctx.restore();

        // 轉為 CanvasTexture
        const baseTex = new THREE.CanvasTexture(base);
        const roughTex = new THREE.CanvasTexture(rough);
        const bumpTex = new THREE.CanvasTexture(bump);
        const aniso = SceneManager.renderer ? SceneManager.renderer.capabilities.getMaxAnisotropy() : 8;
        [baseTex, roughTex, bumpTex].forEach(t => {
            t.anisotropy = aniso;
            t.minFilter = THREE.LinearMipmapLinearFilter;
            t.magFilter = THREE.LinearFilter;
        });

        return { base: baseTex, rough: roughTex, bump: bumpTex };
    },

    createTextSprite(text, fontSize = 96) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // 提高解析度 2 倍 (1024x256)，字體也對應放大
        canvas.width = 1024; 
        canvas.height = 256;
        ctx.font = `Bold ${fontSize}px 'Orbitron', Arial`;
        ctx.fillStyle = "#000000"; 
        ctx.textAlign = "center";
        // 座標也要對應調整
        ctx.fillText(text, 512, 160);
        
        const texture = new THREE.CanvasTexture(canvas);
        // 使用最高各向異性過濾，確保傾斜時也清晰
        texture.anisotropy = SceneManager.renderer ? SceneManager.renderer.capabilities.getMaxAnisotropy() : 16;
        // 確保紋理不過度模糊
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        return texture;
    }
};
