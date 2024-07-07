const youtubePlaylist = document.getElementById('youtubePlaylist');

// URL dari endpoint API YouTube dengan parameter playlistId dan apiKey
const apiUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems';
const params = {
    part: 'snippet',
    maxResults: 12,
    playlistId: 'UUbdiovrPX0spsJLbEisvAgQ', // Ganti dengan ID playlist yang kamu inginkan
    key: 'AIzaSyCI_3-GwYdeMm6wMnInJyf44rzYahQmx3M' // Ganti dengan API key YouTube kamu
};

// Membuat URL dengan parameter
const url = new URL(apiUrl);
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

// Fetch data dari API YouTube
fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Loop untuk setiap item video dalam playlist
        data.items.forEach(item => {
            const videoId = item.snippet.resourceId.videoId;
            const videoTitle = item.snippet.title;
            const videoDate = item.snippet.publishedAt;

            // Membuat HTML untuk setiap video dengan margin bottom
            const videoHTML = `
                <div class="col-md-3 mb-4"> <!-- Tambahkan class mb-4 untuk margin bottom -->
                    <div class="card">
                        <iframe class="card-img-top" width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" title="${videoTitle}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <div class="card-body">
                            <p>${videoTitle}</p>
                            <small>${new Date(videoDate).toLocaleDateString()}</small>
                        </div>
                    </div>
                </div>
            `;

            // Menambahkan video ke dalam elemen dengan id youtubePlaylist
            youtubePlaylist.innerHTML += videoHTML;
        });
    })
    .catch(err => console.error('Error fetching YouTube API:', err));