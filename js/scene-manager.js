const SceneManager = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    raycaster: null,
    mouse: new THREE.Vector2(),
    initialCameraZ: 25,
    isZoomed: false,

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        this.scene.fog = new THREE.FogExp2(0xffffff, 0.008);

        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        
        const aspect = window.innerWidth / window.innerHeight;
        if (window.innerWidth < 768) {
            this.initialCameraZ = aspect < 0.6 ? 45 : 38;
        } else {
            this.initialCameraZ = 28;
        }
        this.camera.position.z = this.initialCameraZ;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 1.2;
        this.controls.minDistance = 5;
        this.controls.maxDistance = this.initialCameraZ;
        this.controls.enablePan = false;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.5;

        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Points.threshold = 0.3;

        this.addLights();
        this.setupEventListeners();
    },

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
        mainLight.position.set(20, 30, 20);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);
        
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(-20, 0, -20);
        this.scene.add(fillLight);
    },

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize(), false);
    },

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        if (!this.isZoomed) {
            // 根據寬高比動態調整距離，確保在手機直式螢幕上視野足夠
            let targetZ = 28;
            if (window.innerWidth < 768) {
                // 手機版，根據寬高比計算合適距離
                const aspect = window.innerWidth / window.innerHeight;
                // 寬高比越小（越細長），距離需要越遠
                targetZ = aspect < 0.6 ? 45 : 38;
            }
            
            // 更新控制器限制，允許新的最大距離
            if (this.controls) {
                this.controls.maxDistance = targetZ;
            }

            new TWEEN.Tween(this.camera.position)
                .to({ z: targetZ }, 500)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();
        }
    },

    render() {
        this.renderer.render(this.scene, this.camera);
    },

    update() {
        this.controls.update();
    }
};

