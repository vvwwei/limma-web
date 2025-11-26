const NodeManager = {
    nodesGroup: null,
    currentHoveredObject: null,

    init() {
        this.nodesGroup = new THREE.Group();
        SceneManager.scene.add(this.nodesGroup);
        this.createNodes();
    },

    createNodes() {
        const nodePositions = [
            [12, 5, 5, 'explore'],
            [-12, 5, -5, 'services'],
            [12, -8, -5, 'contact'],
            [-12, -8, 5, 'team']
        ];

        const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
        
        // 生成共用布紋材質（含中國結壓印）
        const tex = TextureGenerator.createFabricTexture({
            color: '#3a3a3a',
            weaveScale: 6,
            bumpStrength: 0.14,
            ribSpacing: 22,
            ribWidth: 3,
            ribStrength: 0.28,
            ribAngle: -Math.PI / 18, // 約 -10°
            knot: true
        });
        const fabricMaterial = new THREE.MeshStandardMaterial({ 
            map: tex.base,
            roughnessMap: tex.rough,
            bumpMap: tex.bump,
            bumpScale: 0.14,
            roughness: 0.95,
            metalness: 0.0,
            color: 0x3a3a3a
        });
        const createMaterial = () => fabricMaterial.clone();

        nodePositions.forEach((pos) => {
            const nodeWrap = new THREE.Group();
            nodeWrap.position.set(pos[0], pos[1], pos[2]);
            nodeWrap.name = pos[3];

            // explore 節點使用四方塊組合，其餘維持單一方塊
            if (pos[3] === 'explore') {
                const smallSize = 1.1;
                const gap = 0.3; // 讓整體外觀接近原本 2.5 尺寸
                const smallGeom = new THREE.BoxGeometry(smallSize, smallSize, smallSize);
                const offset = (smallSize / 2) + (gap / 2); // 約 0.7
                const offsets = [-offset, offset];

                offsets.forEach((ox) => {
                    offsets.forEach((oy) => {
                        const smallCube = new THREE.Mesh(smallGeom, createMaterial());
                        smallCube.castShadow = true;
                        smallCube.receiveShadow = true;
                        smallCube.position.set(ox, oy, 0);
                        nodeWrap.add(smallCube);
                    });
                });
            } else {
                const cube = new THREE.Mesh(geometry, createMaterial());
                cube.castShadow = true;
                cube.receiveShadow = true;
                nodeWrap.add(cube);
            }

            const texture = TextureGenerator.createTextSprite(siteConfig[pos[3]].label);
            const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
            const sprite = new THREE.Sprite(spriteMat);
            sprite.position.y = 2.2; 
            sprite.scale.set(10, 2.5, 1);
            nodeWrap.add(sprite);

            this.nodesGroup.add(nodeWrap);
        });
    },

    handleHover(hoveredObj) {
        // 當內容層開啟時，不處理 3D 物件的 Hover，避免游標變成手指
        if (document.body.classList.contains('content-open')) {
            document.body.style.cursor = 'default';
            return;
        }

        if (hoveredObj) {
            document.body.style.cursor = 'pointer';
            
            // 如果是 explore 節點內的小方塊，將目標設為其父層群組 (nodeWrap)
            let target = hoveredObj;
            if (hoveredObj.parent && hoveredObj.parent.name === 'explore') {
                target = hoveredObj.parent;
            }

            if (this.currentHoveredObject !== target) {
                // 清除舊的 hover
                if (this.currentHoveredObject) {
                    if (this.currentHoveredObject.name === 'explore') {
                        this.currentHoveredObject.children.forEach(child => {
                            if (child.isMesh && child.material) child.material.emissive.setHex(0x000000);
                        });
                    } else if (this.currentHoveredObject.material) {
                        this.currentHoveredObject.material.emissive.setHex(0x000000);
                    }
                }

                this.currentHoveredObject = target;
                
                // 設定新的 hover
                const emissiveColor = (target.name === 'yuan') ? 0x333333 : 0x666666;
                if (target.name === 'explore') {
                    target.children.forEach(child => {
                        if (child.isMesh && child.material) child.material.emissive.setHex(emissiveColor);
                    });
                } else if (target.material) {
                    target.material.emissive.setHex(emissiveColor);
                }
            }
        } else {
            document.body.style.cursor = 'default';
            if (this.currentHoveredObject) {
                if (this.currentHoveredObject.name === 'explore') {
                    this.currentHoveredObject.children.forEach(child => {
                        if (child.isMesh && child.material) child.material.emissive.setHex(0x000000);
                    });
                } else if (this.currentHoveredObject.material) {
                    this.currentHoveredObject.material.emissive.setHex(0x000000);
                }
                this.currentHoveredObject = null;
            }
        }
    },

    activateNode(nodeObj) {
        SceneManager.isZoomed = true;
        SceneManager.controls.enabled = false;
        document.body.classList.add('content-open');

        const targetWorldPos = new THREE.Vector3();
        nodeObj.getWorldPosition(targetWorldPos);
        
        let camPos;
        if (nodeObj.name === 'yuan') {
            camPos = new THREE.Vector3(0, 0, 10); 
        } else {
            const nodePos = nodeObj.position.clone();
            camPos = nodePos.clone().normalize().multiplyScalar(nodePos.length() + 8);
        }

        new TWEEN.Tween(SceneManager.camera.position)
            .to({ x: camPos.x, y: camPos.y, z: camPos.z }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut)
            .start();

        new TWEEN.Tween(SceneManager.controls.target)
            .to({ x: targetWorldPos.x, y: targetWorldPos.y, z: targetWorldPos.z }, 1000)
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate(() => { SceneManager.camera.lookAt(SceneManager.controls.target); })
            .start();

        setTimeout(() => { 
            OverlayController.show(nodeObj.name); 
        }, 600);
    }
};

