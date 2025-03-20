// مفتاح API - تأكد من استبداله بمفتاح جديد عند الحاجة
const API_KEY = 'AIzaSyBjP5pnS5__GyooVZ84bDw3760dz83sPn8';  // 🔴 استبدلها بمفتاح API الخاص بك
const CHANNEL_ID = 'UCxVnEXnM5SkYmG1cADxsbIQ'; // 🔴 ضع هنا الـ ID الخاص بقناتك
const MAX_RESULTS = 4; // عدد الفيديوهات التي سيتم جلبها
const videoContainer = document.getElementById("video-container");

// 🔹 دالة لجلب أحدث الفيديوهات من القناة
async function fetchLatestVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`);
        const data = await response.json();

        // تنظيف الحاوية قبل إضافة الفيديوهات الجديدة
        videoContainer.innerHTML = "";

        if (data.items) {
            data.items.forEach(item => {
                if (item.id.videoId) {
                    const videoFrame = document.createElement("iframe");
                    videoFrame.classList.add("video");
                    videoFrame.src = `https://www.youtube.com/embed/${item.id.videoId}`;
                    videoFrame.allowFullscreen = true;
                    videoContainer.appendChild(videoFrame);
                }
            });
        } else {
            videoContainer.innerHTML = "<p>⚠ لا توجد فيديوهات متاحة حالياً.</p>";
        }

    } catch (error) {
        console.error("خطأ في جلب الفيديوهات:", error);
        videoContainer.innerHTML = "<p>❌ حدث خطأ أثناء تحميل الفيديوهات.</p>";
    }
}

// 🔹 تحميل الفيديوهات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", fetchLatestVideos);
