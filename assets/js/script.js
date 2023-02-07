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

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button"); // the search button

  button.addEventListener("click", (event) => {
    event.preventDefault(); // stops the form from submitting
    const query = document.querySelector("input").value; // the value of the input when the user clicks the search button

    fetch(
      // `https://content.guardianapis.com/search?api-key=9287d661-de4e-4534-8f58-65c75165cd92&q=${query}`
      `https://gnews.io/api/v4/search?token=d06b56befd778f95afde57c26ebc9890&q=${query}`
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
  });
});
