let searchTerm = 'surfing';
vidSearch(searchTerm);
let videoIdArray = [];

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
        // builds and attaches the elements containing the videos
        for (let i = 0; i < vidList.length; i++) {
            const videoId = vidList[i].id.videoId;
            videoIdArray.push(videoId);
            const video = vidList[i].snippet;
            let videoEl = allVideosEl.children[i];
            // the quick way
            videoEl.innerHTML = `<button type="button" class="btn" data-toggle="modal" data-id="${i}" data-target="#embed">
                <h6 class='card-title' id='video-title'>${video.title}</h6>
                <img src=${video.thumbnails.default.url} class='card-img-top'>
                <div class=card-body>
                    <p>${video.description}</p>
                    <p>by ${video.channelTitle}</p>
                </div>
                </button>`

        }
    })
}

document.querySelector('#videos').addEventListener('click', function(event){
    if (event.target.matches('button')){
        console.log('event listener works')
        let index = event.target.getAttribute('data-id');
        let embedId = videoIdArray[index];

        let tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
        function onYouTubeIframeAPIReady() {
          player = new YT.Player('player', {
            height: '315',
            width: '500',
            videoId: `${embedId}`,
            playerVars: {
              'playsinline': 1
            },
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          });
        }

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
          event.target.playVideo();
        }

        // document.querySelector('iframe').innerHTML = `<iframe width="500" height="315" src="https://www.youtube.com/embed/${embedId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
})