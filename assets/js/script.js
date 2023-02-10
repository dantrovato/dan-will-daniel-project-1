function vidSearch(searchTerm) {
  // number of videos to list, 0 - 50
  const maxResults = 3;
  // takes a string, returns only embeddable videos if set to 'true', returns any video if set to 'any'
  const videoEmbeddable = "any";
  // takes a string, returns only videos that can be played outside of youtube if set to 'true', returns any video if set to 'any'
  const videoSyndicated = "any";
  // for holding the youtube video IDs
  let videoIdArray = [];
  // the youtube API query
  let queryURL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${searchTerm}&type=video&videoEmbeddable=${videoEmbeddable}&videoSyndicated=${videoSyndicated}&key=AIzaSyAaHlsRrNz-Id4A5QSxQDmMAAg7Atuz5V0`;
  fetch(queryURL)
    .then((response) => response.json())
    .then(function (response) {
      console.log(response);
      const vidList = response.items;
      console.log(vidList);
      let allVideosEl = document.querySelector("#video-container");
      // this section builds and attaches the elements containing the video title, thumbnail and description to the video section
      for (let i = 0; i < vidList.length; i++) {
        console.log(`loop ${i}`);

        // the video id for links and embed
        const videoId = vidList[i].id.videoId;
        videoIdArray.push(videoId);
        console.log(videoIdArray);
        // the key that contains the video data we want
        const video = vidList[i].snippet;

        // adds to the video section
        let videoEl = allVideosEl.children[i];
        videoEl.innerHTML = `<button type="button" class="btn" data-toggle="modal" data-id="${i}" data-target="#embed${i}">
              <h6 class='card-title' id='video-title'>${video.title}</h6>
              <img src=${video.thumbnails.default.url} class='card-img-top'>
              <div class=card-body>
                  <p>${video.description}</p>
                  <p>by ${video.channelTitle}</p>
              </div>
              </button>`;
      }

      // this section embeds videos in modals

      // loads the iframe API asynchronously
      let tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      let firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // creates the youtube players
      window.onYouTubeIframeAPIReady = function () {
        console.log("YouTube API Ready");
        player = new YT.Player(`video0`, {
          height: "315",
          width: "500",
          videoId: videoIdArray[0],
          playerVars: {
            playsinline: 1,
          },
        });
        player2 = new YT.Player(`video1`, {
          height: "315",
          width: "500",
          videoId: videoIdArray[1],
          playerVars: {
            playsinline: 1,
          },
        });
        player3 = new YT.Player(`video2`, {
          height: "315",
          width: "500",
          videoId: videoIdArray[2],
          playerVars: {
            playsinline: 1,
          },
        });
      };
    });
}

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
    `https://gnews.io/api/v4/search?q=${query}&apikey=6a66f081716576b412e2973a4c83402e&`
    // `https://gnews.io/api/v4/search?q=${query}&apikey=2985aadea72fe28e813b0d6821215a04`
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
    const cards = document.querySelector("#books-container");

    while (cards.firstChild) {
      cards.removeChild(cards.firstChild);
    }
  }
  // Make an API call to OpenLibrary API with the searcterm as parameter
  // Make an API call to OpenLibrary API with the searcterm as parameter
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      removePreviousSearch();
      // Get all cards elements in books section and loothrough them to update their content with data froAPI response
      const cards = document.querySelector("#books-container");
      // create 3 div cards
      for (let i = 0; i < 3; i++) {
        // create a div element
        let card = document.createElement("div");
        card.setAttribute("id", "book-div");
        // create an anchor element
        let bookLink = document.createElement("a");
        // update link source with book adress from APresponse
        bookLink.href = `http://play.google.com/books/reader?id=${data.items[i].id}&hl=&source=gbs_api`;
        bookLink.innerHTML = `<h4>${data.items[i].volumeInfo.title}</h4> <p> Author: ${data.items[i].volumeInfo.authors[0]}</p>`;
        // append link element to card element
        card.appendChild(bookLink);
        // create an image element
        let bookImg = document.createElement("img");
        // update card image source with imgUrl from APresponse
        bookImg.src = data.items[i].volumeInfo.imageLinks.smallThumbnail;
        // append image element to card element
        card.appendChild(bookImg);
        // append card element to books-container dielement
        cards.appendChild(card);
      }
    });
}

function storeQuery(query) {
  localStorage.setItem(`${query}`, `${query}`);

  console.log(Object.values(localStorage));
}

document.addEventListener("DOMContentLoaded", () => {
  const queries = Object.values(localStorage); // returns an array with the queries [cabbage, beer...]
  const formButton = document.querySelector("#form-button"); // the search button
  const searchHistoryButton = document.querySelector("#search-history-button");
  const searchHistory = document.querySelector("#search-history");
  const reset = document.querySelector("#reset");

  formButton.addEventListener("click", (event) => {
    event.preventDefault(); // stops the form from submitting
    const query = document.querySelector(".form-control").value; // the value of the input when the user clicks the search button

    if (!query) {
      document.querySelector(".form-control").placeholder =
        "Please enter your search term!";
    } else {
      storeQuery(query);

      const booksSection = document.querySelector(".bodyContainer");
      booksSection.removeAttribute("hidden");

      getArticles(query);
      getbooks(query);
      vidSearch(query);
    }
  });

  searchHistoryButton.addEventListener("click", (event) => {
    searchHistory.innerHTML = ""; // removes previous links to the dropdown menu

    // populate the searchHistory div with the queries from local storage
    queries.forEach((query) => {
      const a = document.createElement("a");
      a.classList.add("dropdown-item");
      a.setAttribute("href", "#");
      a.textContent = query;
      searchHistory.appendChild(a);
    });
  });

  reset.addEventListener("click", (event) => {
    queries.forEach((query) => {
      localStorage.removeItem(query);
      // searchHistory.innerHTML = ""; // removes previous links to the dropdown menu
    });
    document.location.reload();
  });
});

$(document).on("hide.bs.modal", function (e) {
  let iframeAll = document.querySelectorAll("iframe");
  iframeAll.forEach(function (iframe) {
    let temp = iframe.src;
    iframe.src = temp;
  });
});
