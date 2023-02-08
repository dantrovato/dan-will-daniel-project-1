
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
        let allVideosEl = document.querySelector('#video-container');
        // builds and attaches the elements containing the video title, thumbnail and description to the video section
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

function getArticles(query) {
  // Gets an array of objects. It shuffles it and returns the first few as specified by 'num'
  function getArticlesAtRandom(array, num) {
    const randomisedArr = array.sort(() => (Math.random() > 0.5 ? 1 : -1));
    return randomisedArr.slice(0, num);
  }

  // Makes a p and h5 for description and title, puts a link to the article and prints it to the articles div
  function displayArticles(description, title, url) {
    const articlesContainer = document.querySelector("#articles-container"); // the div element that will contain articles
    const articleDiv = document.createElement("div"); // create container for each article
    articleDiv.setAttribute("id", "article-div"); // give it an id for css styling


    const descriptionP = document.createElement("p"); // create p element and give it the description string as text
    descriptionP.innerHTML = `<a href="${url}">${description}</a>`;

    const titleEl = document.createElement("h5"); // create h5 element and give it the title string as text
    titleEl.innerHTML = `<a href="${url}">${title}</a>`;

    const a = document.createElement("a");

    articleDiv.appendChild(titleEl); // build the individual div with tile and description
    articleDiv.appendChild(descriptionP);
    articlesContainer.appendChild(articleDiv);
  }

  // Removes any previous articles in case the user clicks search more than once
  function clearArticles() {
    const articlesContainer = document.querySelector("#articles-container");
    articlesContainer.innerHTML = "";
  }

  fetch(
    `https://gnews.io/api/v4/search?q=${query}&apikey=a3da074793d989f84d2beb007c724681&`
  )
    .then((res) => res.json()) // get json response and make it into a js object
    .then((res) => {
      // debugger;
      const resultsArray = res.articles; // store the results into an array of ojbects
      const articlesObjects = getArticlesAtRandom(resultsArray, 3); // get 5 articles at random
      clearArticles(); // removes any previous articles in case the user clicks search more than once

      // create div for each article and put them in the article section
      articlesObjects.forEach((articleObj) => {
        let { content, description, image, title, url } = articleObj; // object destructuring - takes these properties out of the articleObj and stores them in the specified variables
        displayArticles(description, title, url);
      });
    });
}

function getbooks(query) {
  // Removes any previous search result in case the useclicks search more than once
  function removePreviousSearch() {
    const cards = document.querySelector('#books-container');

    while (cards.firstChild) {
      cards.removeChild(cards.firstChild);
    }
  }
  // Make an API call to OpenLibrary API with the searcterm as parameter
  fetch(`https://openlibrary.org/search.json?q=${query}`)
    .then(res => res.json())
    .then((data) => {
      console.log(data);

      removePreviousSearch()
      // Get all cards elements in books section and loothrough them to update their content with data froAPI response
      const cards = document.querySelector('#books-container');

      // create 3 div cards 
      for (let i = 0; i < 3; i++) {
        // create a div element
        let card = document.createElement('div');
        card.setAttribute("id", "book-div");
        // create an anchor element 
        let bookLink = document.createElement("a");
        // update link source with book adress from APresponse 
        bookLink.href = `https://openlibrary.org/isbn/${data.docs[i].isbn[0]}`;
        bookLink.innerHTML = "<h4>" + data.docs[i].title + "</h4> <p> Author: " + data.docs[i].author_name + "</p>";
        // append link element to card element
        card.appendChild(bookLink);
        // create an image element 
        let bookImg = document.createElement("img");
        // update card image source with imgUrl from APresponse 
        bookImg.src = `https://covers.openlibrary.org/b/isbn/${data.docs[i].isbn[0]}-M.jpg?default=false`;
        // append image element to card element 
        card.appendChild(bookImg);
        // append card element to books-container dielement
        cards.appendChild(card);
      }
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button"); // the search button

  button.addEventListener("click", (event) => {
    event.preventDefault(); // stops the form from submitting
    const query = document.querySelector("input").value; // the value of the input when the user clicks the search button
    if (!query) {
      alert("Please enter your interest");
      return;
    }
    const booksSection = document.querySelector('.bodyContainer');
    booksSection.removeAttribute('hidden');

    getArticles(query); // Main function to completely deal with 
    getbooks(query);
    vidSearch(query);
  });

});
