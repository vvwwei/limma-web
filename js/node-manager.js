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
            [12, 5, 5, 'portfolio'],
            [-12, 5, -5, 'services'],
            [12, -8, -5, 'contact'],
            [-12, -8, 5, 'team']
        ];

        const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
        
        nodePositions.forEach((pos) => {
            const nodeWrap = new THREE.Group();
            nodeWrap.position.set(pos[0], pos[1], pos[2]);
            nodeWrap.name = pos[3];

            const greyMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x333333, 
                roughness: 0.4, 
                metalness: 0.1
            });

            const cube = new THREE.Mesh(geometry, greyMaterial);
            cube.castShadow = true;
            cube.receiveShadow = true;
            nodeWrap.add(cube);

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
        if (hoveredObj) {
            document.body.style.cursor = 'pointer';
            if (this.currentHoveredObject !== hoveredObj) {
                if (this.currentHoveredObject) {
                    this.currentHoveredObject.material.emissive.setHex(0x000000);
                }
                this.currentHoveredObject = hoveredObj;
                if (this.currentHoveredObject.name === 'yuan') {
                    this.currentHoveredObject.material.emissive.setHex(0x333333); 
                } else {
                    this.currentHoveredObject.material.emissive.setHex(0x666666);
                }
            }
        } else {
            document.body.style.cursor = 'default';
            if (this.currentHoveredObject) {
                this.currentHoveredObject.material.emissive.setHex(0x000000);
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

