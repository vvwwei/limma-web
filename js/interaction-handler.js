const InteractionHandler = {
    touchStartPos: new THREE.Vector2(),

    init() {
        SceneManager.renderer.domElement.addEventListener('pointerdown', (e) => this.onPointerDown(e), false);
        SceneManager.renderer.domElement.addEventListener('pointerup', (e) => this.onPointerUp(e), false);
        window.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
    },

    onPointerDown(event) {
        if (SceneManager.isZoomed) return;
        this.touchStartPos.set(event.clientX, event.clientY);
        SceneManager.controls.autoRotate = false;
    },

    onPointerUp(event) {
        if (SceneManager.isZoomed) return;
        
        const dx = event.clientX - this.touchStartPos.x;
        const dy = event.clientY - this.touchStartPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
            SceneManager.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            SceneManager.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            SceneManager.raycaster.setFromCamera(SceneManager.mouse, SceneManager.camera);
            
            const intersectsNodes = SceneManager.raycaster.intersectObjects(NodeManager.nodesGroup.children, true);
            if (intersectsNodes.length > 0) {
                let targetObj = intersectsNodes[0].object;
                while(targetObj.parent !== NodeManager.nodesGroup) { 
                    targetObj = targetObj.parent; 
                }
                
                if (targetObj && siteConfig[targetObj.name]) { 
                    const config = siteConfig[targetObj.name];
                    if (config.externalUrl) {
                        window.open(config.externalUrl, '_blank');
                    } else {
                        NodeManager.activateNode(targetObj); 
                    }
                    return;
                }
            }

            const intersectsYuan = SceneManager.raycaster.intersectObject(NexusSystem.yuanMesh);
            if (intersectsYuan.length > 0) {
                NodeManager.activateNode(NexusSystem.yuanMesh);
            }
        }
    },

    onMouseMove(event) {
        if (SceneManager.isZoomed) return;
        
        SceneManager.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SceneManager.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        SceneManager.raycaster.setFromCamera(SceneManager.mouse, SceneManager.camera);
        
        const intersectsBox = SceneManager.raycaster.intersectObjects(NodeManager.nodesGroup.children, true)
            .filter(obj => obj.object.type === 'Mesh');
        const intersectsYuan = SceneManager.raycaster.intersectObject(NexusSystem.yuanMesh);
        
        let hoveredObj = null;
        if (intersectsBox.length > 0) {
            hoveredObj = intersectsBox[0].object;
        } else if (intersectsYuan.length > 0) {
            hoveredObj = intersectsYuan[0].object;
        }

        NodeManager.handleHover(hoveredObj);

        const intersectsSphere = SceneManager.raycaster.intersectObject(NexusSystem.hitSphere);
        if (intersectsSphere.length > 0) {
            NexusSystem.isMouseOverNexus = true;
            NexusSystem.mouse3D.copy(intersectsSphere[0].point);
        } else {
            NexusSystem.isMouseOverNexus = false;
        }
    }
};

