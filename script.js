const API_KEY = "AIzaSyBjP5pnS5__GyooVZ84bDw3760dz83sPn8";
const CHANNEL_ID = "UC1H0OKY2JPLC41QDMMWRVDW";
const MAX_RESULTS = 4;
const videosContainer = document.getElementById("videos-container");

async function fetchVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`);
        const data = await response.json();

        if (data.items) {
            videosContainer.innerHTML = "";
            data.items.forEach(item => {
                if (item.id.videoId) {
                    const videoElement = document.createElement("div");
                    videoElement.classList.add("video-item");
                    videoElement.innerHTML = `
                        <iframe width="250" height="140" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    `;
                    videosContainer.appendChild(videoElement);
                }
            });
        }
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
}

// استدعاء الدالة عند تحميل الصفحة
window.onload = fetchVideos;
