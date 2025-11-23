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
