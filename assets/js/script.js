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
    const cards = document.querySelector("#books-container");

    while (cards.firstChild) {
      cards.removeChild(cards.firstChild);
    }
  }
  // Make an API call to OpenLibrary API with the searcterm as parameter
  fetch(`https://openlibrary.org/search.json?q=${query}`)
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
        bookLink.href = `https://openlibrary.org/isbn/${data.docs[i].isbn[0]}`;
        bookLink.innerHTML =
          "<h4>" +
          data.docs[i].title +
          "</h4> <p> Author: " +
          data.docs[i].author_name +
          "</p>";
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
    const query = document.querySelector("input").value; // the value of the input when the user clicks the search button

    if (!query) {
      alert("Please enter your interest");
      return;
    }

    storeQuery(query);

    const booksSection = document.querySelector(".bodyContainer");
    booksSection.removeAttribute("hidden");

    getArticles(query); // Main function to completely deal with
    // getbooks(query);
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
