const apiKey = 'AIzaSyAdK5VvGF-_Cer_C6xH6wZImJfgZFWYBMw';  
const channelId = 'UC1H0oKY2Jplc41QDmmWRVDw';  
const maxResults = 6;
const videoContainer = document.getElementById('video-container');
const commentsContainer = document.getElementById('comments-container');
const commentInput = document.getElementById('comment-input');

async function fetchLatestVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`);
        const data = await response.json();

        videoContainer.innerHTML = "";  

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

// نظام التعليقات المحلي
function addComment() {
    const commentText = commentInput.value.trim();
    if (commentText === "") return;

    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.textContent = commentText;

    commentsContainer.appendChild(commentDiv);
    commentInput.value = "";  
}

// تحميل الفيديوهات عند فتح الموقع
fetchLatestVideos();
