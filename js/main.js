function init() {
    SceneManager.init();
    NexusSystem.init();
    NodeManager.init();
    InteractionHandler.init();
    OverlayController.init();

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

init();

