const apiKey = 'AIzaSyB88v3OMVUsZcHAUKTbRiaPmBF84dqqYXo';  // استبدل بمفتاحك الفعلي
const channelId = 'UCpypz4F50vF1Gx4HgiGE2kg';  // استبدل بـ ID القناة
const maxResults = 4;
const videoContainer = document.getElementById('video-container');

async function fetchLatestVideos() {
    try {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=${maxResults}`;
        console.log("طلب API:", url);
        
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}, Message: ${data.error?.message}`);
        }

        console.log("البيانات المستلمة:", data);

        videoContainer.innerHTML = "";
        data.items.forEach(item => {
            const videoFrame = document.createElement('iframe');
            videoFrame.classList.add('video');
            videoFrame.src = `https://www.youtube.com/embed/${item.id.videoId}`;
            videoFrame.allowFullscreen = true;
            videoContainer.appendChild(videoFrame);
        });

    } catch (error) {
        console.error("⚠️ خطأ في جلب الفيديوهات:", error);
    }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", fetchLatestVideos);
