let searchTerm = 'surfing';
vidSearch(searchTerm);

function vidSearch(searchTerm){

    // number of videos to list, 0 - 50
    const maxResults = 3;

    // takes a string, returns only embeddable videos if set to 'true', returns any video if set to 'any'
    const videoEmbeddable = 'any';

    // takes a string, returns only videos that can be played outside of youtube if set to 'true', returns any video if set to 'any'
    const videoSyndicated = 'any';

    // the youtube API query
    let queryURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchTerm}&type=video&videoEmbeddable=${videoEmbeddable}&videoSyndicated=${videoSyndicated}&key=AIzaSyAaHlsRrNz-Id4A5QSxQDmMAAg7Atuz5V0`;
    fetch(queryURL)
    .then(response => response.json())
    .then(function(response){
        console.log(response);
        const vidList = response.items;
        console.log(vidList);
        let allVideosEl = document.querySelector('#videos');
        // allVideosEl.innerHTML = '';

        // builds and attaches the elements containing the videos
        for (let i = 0; i < vidList.length; i++) {
            const videoId = vidList[i].id.videoId;
            const video = vidList[i].snippet;
            let videoEl = allVideosEl.children[i];

            videoEl.innerHTML = `<a href=https://youtu.be/${videoId}>
                <h6 class='card-title'>${video.title}</h6>
                <img src=${video.thumbnails.default.url} class='card-img-top'>
                <div class=card-body>
                    <p>${video.description}</p>
                    <p>by ${video.channelTitle}</p>
                </div>`
            
            // let anchorEl = document.createElement('a');
            // anchorEl.setAttribute('href', `https://youtu.be/${videoId}`);

            // const video = vidList[i].snippet;
            // console.log(video);

            // let titleEl = document.createElement('h6');
            // titleEl.setAttribute('class', 'card-title');
            // titleEl.textContent = video.title;
            // anchorEl.appendChild(titleEl);

            // let thumbnailEl = document.createElement('img');
            // thumbnailEl.setAttribute('src', video.thumbnails.default.url);
            // thumbnailEl.setAttribute('class', 'card-img-top');
            // anchorEl.appendChild(thumbnailEl);

            // let divEl = document.createElement('div');

            // let descriptionEl = document.createElement('p');
            // descriptionEl.textContent = video.description;
            // divEl.appendChild(descriptionEl);

            // let channelEl = document.createElement('p');
            // channelEl.textContent = `by ${video.channelTitle}`;
            // divEl.appendChild(channelEl);

            // anchorEl.appendChild(divEl);
            
            // videoEl.appendChild(divEl);

            

        }
    })
}