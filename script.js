document.querySelectorAll('.video').forEach(video => {
    video.addEventListener('mouseenter', () => {
        document.querySelectorAll('.video').forEach(v => v.style.opacity = "0.5");
        video.style.opacity = "1";
    });

    video.addEventListener('mouseleave', () => {
        document.querySelectorAll('.video').forEach(v => v.style.opacity = "1");
    });
});
