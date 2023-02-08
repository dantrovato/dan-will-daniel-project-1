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

      const booksSection = document.querySelector('.bodyContainer');          
      booksSection.removeAttribute('hidden');
      // create div for each article and put them in the article section
      articlesObjects.forEach((articleObj) => {
        let { content, description, image, title, url } = articleObj; // object destructuring - takes these properties out of the articleObj and stores them in the specified variables
        displayArticles(description, title, url);
      });
    });
}

function getbooks(){
  const form = document.querySelector("button");

  // Listen for submit event on the form element
  form.addEventListener("click", (event) => {
    event.preventDefault();

    // Get the search term from the input field
    const searchTerm = document.querySelector("input").value;
    
    // Removes any previous search result in case the user clicks search more than once
    function removePreviousSearch(){
      const cards = document.querySelector('#books-container'); 
    
      while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
      }
    }
    // Make an API call to OpenLibrary API with the search term as parameter
    fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        
        removePreviousSearch()
        // Get all cards elements in books section and loop through them to update their content with data from API response
        const cards = document.querySelector('#books-container'); 

         // create 3 div cards 
        for (let i=0; i<3; i++) { 
          // create a div element
          let card = document.createElement('div');  
          card.setAttribute("id", "book-div");
          // create an anchor element 
          let bookLink = document.createElement("a");   
          // update link source with book adress from API response 
          bookLink.href = `https://openlibrary.org/isbn/${data.docs[i].isbn[0]}`;   
          bookLink.innerHTML = "<h4>" + data.docs[i].title + "</h4> <p> Author: " + data.docs[i].author_name + "</p>";
          // append link element to card element
          card.appendChild(bookLink);   
          // create an image element 
          let bookImg = document.createElement("img");   
          // update card image source with imgUrl from API response 
          bookImg.src = `https://covers.openlibrary.org/b/isbn/${data.docs[i].isbn[0]}-M.jpg`; 
          // append image element to card element 
          card.appendChild(bookImg); 
          // append card element to books-container div element
          cards.appendChild(card);    

          
        }

      //   for (let i=0; i<3; i++) {  // create 3 div cards 
      //     let card = document.createElement('div');  // create a div element
      //     card.setAttribute("id", "book-div");

      //     card.innerHTML= "<h4>" + data.docs[i].title + "</h4> <p> Author: " + data.docs[i].author_name + "</p>";  // update card content with data from API response

      //     let bookImg = document.createElement("img");   // create an image element 
      //     bookImg.src = `https://covers.openlibrary.org/b/isbn/${data.docs[i].isbn[0]}-M.jpg`;   // update card image source with imgUrl from API response 

      //     card.appendChild(bookImg);   // append image element to card element 

      //     cards.appendChild(card);   // append card element to books-container div element 

          
      //   }                      
     });              
  });  														   
}    getbooks(); 
// function getbooks(){
//   const form = document.querySelector("button");
//   // Listen for submit event on the form element
//   form.addEventListener("click", (event) => {
//     event.preventDefault();

//     // Get the search term from the input field
//     const searchTerm = document.querySelector("input").value;
   
//       // Make an API call to OpenLibrary API with the search term as parameter
//        fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
//         .then(res => res.json())
//         .then((data) => {

//           console.log(data);
    
//         // Get all cards elements in books section and loop through them to update their content with data from API response  
//         const cards = document.querySelector('#books-container');
//         cards.forEach((card, index) => {       
          
//           card.innerHTML= "<h4>" + data.docs[index].title + "</h4> <p> Author: " + data.docs[index].author_name + "</p>";  

//           // Update card image source with imgUrl from API response 
//           let bookImg = document.createElement("img");
          
//           bookImg.src = `https://covers.openlibrary.org/b/isbn/${data.docs[index].isbn[0]}-L.jpg`;

//           card.appendChild(bookImg);            
//           // card.innerHTML+= "<img src= `https://covers.openlibrary.org/b/isbn/" + data.docs[index].isbn[0] + "-M.jpg`>";  // corrected syntax error here
//           // Update card body content with description from API response  
            
//         });        
//       });    
//   });  														  
// }
  
// getbooks();
  
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button"); // the search button
 
  button.addEventListener("click", (event) => {
    event.preventDefault(); // stops the form from submitting
    const query = document.querySelector("input").value; // the value of the input when the user clicks the search button
    if (!query) {
      alert("Please enter your interest");
      return;
    } 
    getArticles(query); // Main function to completely deal with getting and display articles
  });
});
  