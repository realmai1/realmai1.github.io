document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'AIzaSyBjP5pnS5__GyooVZ84bDw3760dz83sPn8'; // استبدل بمفتاح جديد بعد تأكيده
    const channelId = 'UCXwNeX5MSYKmG1ACxLbQT8A';
    const videoContainer = document.querySelector('.video-container');

    if (!videoContainer) {
        console.error("❌ عنصر الفيديو غير موجود في الصفحة!");
        return;
    }

    async function fetchLatestVideos() {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=4`);
            
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const data = await response.json();
            videoContainer.innerHTML = '';

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

    fetchLatestVideos();
});
