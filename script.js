const apiKey = 'AIzaSyBjP5pnS5__GyooVZ84bDw3760dz83sPn8'; // مفتاح API (يُفضل تغييره لأمانك)
const channelId = 'UCjxO8V4I9B2D7iPqTq3l7zA'; // معرف قناة Realm AI
const videoContainer = document.querySelector('.video-container');

async function fetchLatestVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=4`);
        const data = await response.json();

        videoContainer.innerHTML = ''; // مسح المحتوى الحالي
        data.items.forEach(item => {
            if (item.id.videoId) {
                const videoFrame = `
                    <iframe class="video" src="https://www.youtube.com/embed/${item.id.videoId}" allowfullscreen></iframe>
                `;
                videoContainer.innerHTML += videoFrame;
            }
        });
    } catch (error) {
        console.error('❌ حدث خطأ أثناء جلب الفيديوهات:', error);
    }
}

// تحميل الفيديوهات عند فتح الصفحة
fetchLatestVideos();
