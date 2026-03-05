document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('gp-buffer-video');
    const sceneButtons = document.querySelectorAll('.gp-scene-btn');
    const playPauseBtn = document.getElementById('gp-play-pause');
    const icon = playPauseBtn.querySelector('i');

    // State
    let currentScene = '1';

    // Scene Map
    const sceneMap = {
        '1': '0a485338bbdaf19ba9090b874bb36ef0599a9c9a475a382c22903cf5981c6ea6',
        '2': '8cb2e97d26a639f05a571476240a8fa86988e6853f0f13cc05830d1578002aad',
        '3': '03482c3bd66de195'
    };

    function updateVideo() {
        const sceneDir = sceneMap[currentScene];
        const newSrc = `./videos/gp-buffer/${sceneDir}/grid_visualization.mp4`;

        const source = videoElement.querySelector('source');
        if (source.getAttribute('src') !== newSrc) {
            source.setAttribute('src', newSrc);
            videoElement.load();
            videoElement.play();
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        }
    }

    function setScene(sceneId) {
        currentScene = sceneId;

        // Update UI
        sceneButtons.forEach(btn => {
            if (btn.dataset.scene === sceneId) {
                btn.classList.add('is-info', 'is-active');
            } else {
                btn.classList.remove('is-info', 'is-active');
            }
        });

        updateVideo();
    }

    // Event Listeners
    sceneButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            setScene(e.target.dataset.scene);
        });
    });

    // Play/Pause Logic
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (videoElement.paused) {
                videoElement.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                videoElement.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }
        });
    }

    if (videoElement) {
        videoElement.addEventListener('play', () => {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
        });

        videoElement.addEventListener('pause', () => {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        });
    }

    // Fullscreen Logic
    const fullscreenBtn = document.getElementById('gp-fullscreen');
    if (fullscreenBtn && videoElement) {
        fullscreenBtn.addEventListener('click', () => {
            if (videoElement.requestFullscreen) {
                videoElement.requestFullscreen();
            } else if (videoElement.webkitRequestFullscreen) { /* Safari */
                videoElement.webkitRequestFullscreen();
            } else if (videoElement.msRequestFullscreen) { /* IE11 */
                videoElement.msRequestFullscreen();
            }
        });
    }
});
