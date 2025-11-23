const NexusSystem = {
    pointsMesh: null,
    yuanMesh: null,
    yuanGroup: null,
    hitSphere: null,
    originalPositions: null,
    originalColors: null,
    mouse3D: new THREE.Vector3(),
    isMouseOverNexus: false,
    accentColor: 0xD6FF5A,

    init() {
        this.createParticleCloud();
        this.createCentralYuan();
        this.createHitSphere();
    },

    createParticleCloud() {
        const geometry = new THREE.BufferGeometry();
        const count = 3000; 
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        
        this.originalPositions = new Float32Array(count * 3);
        this.originalColors = new Float32Array(count * 3);
        
        const color = new THREE.Color(this.accentColor);

        for (let i = 0; i < count; i++) {
            const r = 11 + Math.random() * 3; 
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            this.originalPositions[i*3] = x;
            this.originalPositions[i*3+1] = y;
            this.originalPositions[i*3+2] = z;
            
            colors[i*3] = color.r; 
            colors[i*3+1] = color.g; 
            colors[i*3+2] = color.b;
            
            this.originalColors[i*3] = color.r;
            this.originalColors[i*3+1] = color.g;
            this.originalColors[i*3+2] = color.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.28, 
            vertexColors: true,
            transparent: true,
            opacity: 1.0, 
            sizeAttenuation: true
        });

        this.pointsMesh = new THREE.Points(geometry, material);
        SceneManager.scene.add(this.pointsMesh);
    },

    createCentralYuan() {
        const geometry = new THREE.IcosahedronGeometry(2.4, 20); 
        
        const posAttribute = geometry.attributes.position;
        const vertex = new THREE.Vector3();
        
        for (let i = 0; i < posAttribute.count; i++) {
            vertex.fromBufferAttribute(posAttribute, i);
            const wave1 = Math.sin(vertex.x * 0.5) * 0.4;
            const wave2 = Math.cos(vertex.y * 0.3) * 0.4;
            const wave3 = Math.sin(vertex.z * 0.6) * 0.4;
            const distortion = 1 + (wave1 + wave2 + wave3) * 0.3; 
            vertex.multiplyScalar(distortion);
            posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
        geometry.computeVertexNormals();

        const texture = TextureGenerator.createRockTexture();
        
        const material = new THREE.MeshStandardMaterial({
            map: texture,
            roughnessMap: texture,
            bumpMap: texture,
            bumpScale: 0.15, 
            roughness: 1.0,
            metalness: 0.0,
            color: 0xbbbbbb,
            emissive: 0x000000,
        });
        
        this.yuanGroup = new THREE.Group();
        SceneManager.scene.add(this.yuanGroup);

        this.yuanMesh = new THREE.Mesh(geometry, material);
        this.yuanMesh.name = 'yuan'; 
        this.yuanMesh.castShadow = true;
        this.yuanMesh.receiveShadow = true;
        this.yuanGroup.add(this.yuanMesh);

        const textTexture = TextureGenerator.createTextSprite("Yuàn");
        const spriteMat = new THREE.SpriteMaterial({ map: textTexture, transparent: true });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(0, 3.6, 0); 
        sprite.scale.set(10, 2.5, 1);
        this.yuanGroup.add(sprite);
    },

    createHitSphere() {
        const hitGeo = new THREE.SphereGeometry(13, 32, 32); 
        const hitMat = new THREE.MeshBasicMaterial({ visible: false }); 
        this.hitSphere = new THREE.Mesh(hitGeo, hitMat);
        SceneManager.scene.add(this.hitSphere);
    },

    updateParticles() {
        if (SceneManager.isZoomed) return;

        this.pointsMesh.rotation.y -= 0.0005; 
        this.hitSphere.rotation.y -= 0.0005;
        this.yuanGroup.rotation.y += 0.001; 
        
        const positions = this.pointsMesh.geometry.attributes.position.array;
        const colors = this.pointsMesh.geometry.attributes.color.array;
        const count = positions.length / 3;
        
        let localMouse3D = this.mouse3D.clone();
        this.pointsMesh.worldToLocal(localMouse3D);

        const interactionRadius = 2.5;

        for(let i = 0; i < count; i++) {
            const px = positions[i*3];
            const py = positions[i*3+1];
            const pz = positions[i*3+2];
            
            const ox = this.originalPositions[i*3];
            const oy = this.originalPositions[i*3+1];
            const oz = this.originalPositions[i*3+2];

            let dist = 9999;
            if (this.isMouseOverNexus) {
                const dx = px - localMouse3D.x;
                const dy = py - localMouse3D.y;
                const dz = pz - localMouse3D.z;
                dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            }

            if (this.isMouseOverNexus && dist < interactionRadius) {
                const force = (interactionRadius - dist) / interactionRadius; 
                const dx = px - localMouse3D.x;
                const dy = py - localMouse3D.y;
                const dz = pz - localMouse3D.z;
                
                const jitterX = (Math.random() - 0.5) * 0.05;
                const jitterY = (Math.random() - 0.5) * 0.05;
                const jitterZ = (Math.random() - 0.5) * 0.05;

                positions[i*3]   += (dx / dist) * force * 0.2 + jitterX;
                positions[i*3+1] += (dy / dist) * force * 0.2 + jitterY;
                positions[i*3+2] += (dz / dist) * force * 0.2 + jitterZ;

                colors[i*3]   = 1; 
                colors[i*3+1] = 1; 
                colors[i*3+2] = 1; 
            } else {
                positions[i*3]   += (ox - px) * 0.02; 
                positions[i*3+1] += (oy - py) * 0.02;
                positions[i*3+2] += (oz - pz) * 0.02;

                const or = this.originalColors[i*3];
                const og = this.originalColors[i*3+1];
                const ob = this.originalColors[i*3+2];

                colors[i*3]   += (or - colors[i*3])   * 0.02;
                colors[i*3+1] += (og - colors[i*3+1]) * 0.02;
                colors[i*3+2] += (ob - colors[i*3+2]) * 0.02;
            }
        }
        
        this.pointsMesh.geometry.attributes.position.needsUpdate = true;
        this.pointsMesh.geometry.attributes.color.needsUpdate = true;
    }
};

