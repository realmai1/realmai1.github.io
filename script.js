const apiKey = "AIzaSyBjP5pnS5__GyooVZ84bDw3760dz83sPn8"; // استبدل بمفتاح YouTube API الخاص بك
const channelId = "UCXvNExM5SKYmG1cADxsblQ"; // معرف قناتك على YouTube
const videoContainer = document.getElementById("video-container");

async function fetchVideos() {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=4`
        );

        if (!response.ok) {
            throw new Error("فشل تحميل الفيديوهات");
        }

        const data = await response.json();
        displayVideos(data.items);
    } catch (error) {
        console.error("خطأ:", error);
        videoContainer.innerHTML = `<p>⚠️ لا يمكن تحميل الفيديوهات حاليًا.</p>`;
    }
}

function displayVideos(videos) {
    videoContainer.innerHTML = ""; // تفريغ المحتوى القديم
    videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.medium.url;

        const videoElement = `
            <div class="video">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${thumbnail}" alt="${videoTitle}">
                </a>
                <p>${videoTitle}</p>
            </div>
        `;
        videoContainer.innerHTML += videoElement;
    });
}

// تحديث الفيديوهات تلقائيًا كل 10 دقائق
setInterval(fetchVideos, 10 * 60 * 1000);

// تحميل الفيديوهات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", fetchVideos);
