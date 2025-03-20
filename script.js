const apiKey = 'AIzaSyAdK5VvGF-_Cer_C6xH6wZImJfgZFWYBMw';  // 🔹 استبدلها بمفتاح API الخاص بك
const channelId = 'UC1H0oKY2Jplc41QDmmWRVDw';  // 🔹 استبدلها بـ ID قناتك
const maxResults = 6;  // ⬅️ زيادة عدد الفيديوهات إلى 6
const videoContainer = document.getElementById('video-container');

async function fetchLatestVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`);
        const data = await response.json();

        videoContainer.innerHTML = "";  // مسح أي فيديوهات قديمة

        data.items.forEach(item => {
            if (item.id.videoId) {
                const videoFrame = document.createElement('iframe');
                videoFrame.classList.add('video');
                videoFrame.src = `https://www.youtube.com/embed/${item.id.videoId}`;
                videoFrame.allowFullscreen = true;
                videoContainer.appendChild(videoFrame);
            }
        });

    } catch (error) {
        console.error('خطأ في جلب الفيديوهات:', error);
    }
}

// استدعاء الدالة عند تحميل الصفحة
fetchLatestVideos();
