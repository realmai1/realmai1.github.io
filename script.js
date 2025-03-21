const apiKey = "AIzaSyBjP5pnS5__GyooVZ84bDw3760dz83sPn8"; // استبدل بمفتاح API الصحيح
const channelId = "UCXvNeM5XSYKmG1cAxLbct3Q"; // استبدل بمعرف قناتك
const videoContainer = document.getElementById("videoContainer");

async function fetchVideos() {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&maxResults=4&order=date`
        );
        const data = await response.json();

        videoContainer.innerHTML = ""; // مسح الفيديوهات القديمة

        data.items.forEach((item) => {
            const videoId = item.id.videoId;
            const videoFrame = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
            videoContainer.innerHTML += videoFrame;
        });
    } catch (error) {
        console.error("فشل تحميل الفيديوهات", error);
    }
}

fetchVideos();
