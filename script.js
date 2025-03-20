// ضع مفتاح API الجديد هنا
const API_KEY = "AIzaSyAw-THig0bPAf997EYbrANA6Vjlk_Aj36s"; // استبدل بمفتاحك الجديد
const CHANNEL_ID = "UC1h0oky2jplc41qdmmwrvdw"; // استبدل بمعرف قناتك على اليوتيوب
const MAX_RESULTS = 6; // عدد الفيديوهات المراد جلبها

async function fetchLatestVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        const videoContainer = document.getElementById("video-container");

        // التحقق من وجود بيانات
        if (!data.items) {
            throw new Error("لم يتم العثور على فيديوهات. تأكد من إعدادات API.");
        }

        videoContainer.innerHTML = ""; // تفريغ المحتوى السابق

        data.items.forEach(item => {
            if (item.id.videoId) {
                const videoElement = document.createElement("div");
                videoElement.classList.add("video");
                videoElement.innerHTML = `
                    <iframe width="360" height="202" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                    <p>${item.snippet.title}</p>
                `;
                videoContainer.appendChild(videoElement);
            }
        });
    } catch (error) {
        console.error("خطأ في جلب الفيديوهات:", error);
    }
}

// استدعاء الدالة عند تحميل الصفحة
window.onload = fetchLatestVideos;
