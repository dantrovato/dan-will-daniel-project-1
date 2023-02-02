let searchTerm = 'surfing';
vidSearch(searchTerm);

function vidSearch(searchTerm){

    // number of videos to list, 0 - 50
    const maxResults = 5;

    // takes a string, returns only embeddable videos if set to 'true', returns any video if set to 'any'
    const videoEmbeddable = 'any';

    // takes a string, returns only videos that can be played outside of youtube if set to 'true', returns any video if set to 'any'
    const videoSyndicated = 'any';

    let queryURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchTerm}&type=video&videoEmbeddable=${videoEmbeddable}&videoSyndicated=${videoSyndicated}&key=AIzaSyAaHlsRrNz-Id4A5QSxQDmMAAg7Atuz5V0`;
    fetch(queryURL)
    .then(response => response.json())
    .then(function(response){
        console.log(response);
        const vidList = response.items;
        console.log(vidList);
        let body = document.querySelector('body');

        for (let i = 0; i < vidList.length; i++) {
            const videoId = vidList[i].id.videoId;
            const video = vidList[i].snippet;
            console.log(video);
            let divEl = document.createElement('div');

            let titleEl = document.createElement('h4');
            titleEl.textContent = video.title;
            divEl.appendChild(titleEl);

            // let anchorEl = document.createElement('a');
            // anchorEl.setAttribute('');
            let thumbnailEl = document.createElement('img');
            thumbnailEl.setAttribute('src', video.thumbnails.default.url);
            divEl.appendChild(thumbnailEl);

            let descriptionEl = document.createElement('p');
            descriptionEl.textContent = video.description;
            divEl.appendChild(descriptionEl);

            let channelEl = document.createElement('p');
            channelEl.textContent = `by ${video.channelTitle}`;
            divEl.appendChild(channelEl);
            
            body.appendChild(divEl);

        }
    })
}