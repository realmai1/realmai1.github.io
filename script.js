const API_KEY = "AIzaSyBjP5pnS5__GyooVZ84bDw3760dz83sPn8";
const CHANNEL_ID = "UC1h0oKY2jPLc41QDMMwRvDw";
const MAX_RESULTS = 4;
const videosContainer = document.getElementById("videos-container");

async function fetchLatestVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`);
        const data = await response.json();

        if (data.items) {
            data.items.forEach(item => {
                if (item.id.videoId) {
                    const videoElement = document.createElement("div");
                    videoElement.classList.add("video-item");
                    videoElement.innerHTML = `
                        <iframe width="100%" height="150" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    `;
                    videosContainer.appendChild(videoElement);
                }
            });
        } else {
            videosContainer.innerHTML = "<p>لا توجد فيديوهات متاحة حالياً.</p>";
        }
    } catch (error) {
        console.error("خطأ في جلب الفيديوهات:", error);
        videosContainer.innerHTML = "<p>حدث خطأ أثناء تحميل الفيديوهات.</p>";
    }
}

fetchLatestVideos();
