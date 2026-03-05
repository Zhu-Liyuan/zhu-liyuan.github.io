document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('novel-view-video');
    const sceneButtons = document.querySelectorAll('.scene-btn');
    const playPauseBtn = document.getElementById('novel-play-pause');

    if (!playPauseBtn || !videoElement) {
        console.error('Required elements not found');
        return;
    }

    const icon = playPauseBtn.querySelector('i');

    // State
    let currentScene = '1';

    // Scene Map
    const sceneMap = {
        '1': 'wholefoods',
        '2': '01842c6b21e1d679',
        '3': '0278b3d8abd9654d',
        '4': 'b6d1134cb03c855d246f916beaa2d3d01290cf47937a5176011ff39b850ec615',
        '5': 'e9360e7a89bee835dc847cf8796093e634b759ff582558788dcfe8326f6e8901'
    };

    function updateVideo() {
        const sceneDir = sceneMap[currentScene];
        const newSrc = `./videos/comparison/${sceneDir}/grid_comparison.mp4`;

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

    videoElement.addEventListener('play', () => {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    });

    videoElement.addEventListener('pause', () => {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    });

    // Fullscreen Logic
    const fullscreenBtn = document.getElementById('novel-fullscreen');
    if (fullscreenBtn) {
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
