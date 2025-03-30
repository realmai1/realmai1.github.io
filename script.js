const apiKey = 'AIzaSyBsE1pXCKgGgr9x1iosQzGYPS3V39R8zqY';  // 🔹 استبدلها بمفتاح API الذي حصلت عليه
const channelId = 'UCpypz4F50vF1Gx4HgiGE2kg';  // 🔹 استبدلها بـ ID قناتك
const maxResults = 4;
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
