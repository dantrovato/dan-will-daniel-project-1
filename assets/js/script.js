// Gets an array of objects. It shuffles it and returns the first few as specified by 'num'
function getArticlesAtRandom(array, num) {
  const randomisedArr = array.sort(() => (Math.random() > 0.5 ? 1 : -1));
  return randomisedArr.slice(0, num);
}

document.addEventListener("DOMContentLoaded", () => {
  const articlesContainer = document.querySelector("#articles-container"); // the div element that will contain articles
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

        // create div for each article and put them in the article section
        articlesObjects.forEach((articleObj) => {
          let { content, description, image, title, url } = articleObj; // object destructuring - takes these properties out of the articleObj and stores them in the specified variables
          const articleDiv = document.createElement("div");
          articleDiv.setAttribute("id", "article-div");
          const descriptionP = document.createElement("p");
          descriptionP.textContent = description;
          const titleP = document.createElement("p");
          titleP.textContent = title;

          articleDiv.appendChild(titleP);
          articleDiv.appendChild(descriptionP);
          articlesContainer.appendChild(articleDiv);
        });
      });
  });
});
