document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('ff-comparison-video');
    const sceneButtons = document.querySelectorAll('.ff-scene-btn');
    const playPauseBtn = document.getElementById('ff-play-pause');

    if (!playPauseBtn || !videoElement) {
        console.error('Required elements not found');
        return;
    }

    const icon = playPauseBtn.querySelector('i');

    // State
    let currentScene = '1';

    // Scene Map
    const sceneMap = {
        '1': '000db54a47db43fe',
        '2': '0068e97c1c1f61aa',
        '3': '0122933cf8ab3317',
        '4': '01eca393f86d37c5',
        '5': '01fa6190cd47d125'
    };

    function updateVideo() {
        const sceneDir = sceneMap[currentScene];
        const newSrc = `./videos/FF_comparison/${sceneDir}/grid_comparison.mp4`;

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
    const fullscreenBtn = document.getElementById('ff-fullscreen');
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
