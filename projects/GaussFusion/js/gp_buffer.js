/**
 * Logic for the GP-Buffer Visualization section
 */

$(document).ready(function () {
    const videoElement = document.getElementById('gp-buffer-video');
    const buttons = document.querySelectorAll('.gp-buffer-btn');
    const playPauseBtn = document.getElementById('gp-buffer-play-pause');
    const fullscreenBtn = document.getElementById('gp-buffer-fullscreen');

    // Scene mapping
    const scenes = {
        "1": "./videos/gp-buffer/1/grid_visualization.mp4",
        "2": "./videos/gp-buffer/2/grid_visualization.mp4",
        "3": "./videos/gp-buffer/3/grid_visualization.mp4"
    };

    // Handle scene button clicks
    buttons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active state
            buttons.forEach(b => b.classList.remove('is-active', 'is-info'));
            this.classList.add('is-active', 'is-info');

            // Update video source
            const sceneId = this.getAttribute('data-scene');
            const videoSrc = scenes[sceneId];

            if (videoSrc) {
                videoElement.src = videoSrc;
                videoElement.load();
                videoElement.play();

                // Update play/pause icon
                const icon = playPauseBtn.querySelector('i');
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            }
        });
    });

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', function () {
        const icon = this.querySelector('i');
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

    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', function () {
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.webkitRequestFullscreen) { /* Safari */
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) { /* IE11 */
            videoElement.msRequestFullscreen();
        }
    });
});
