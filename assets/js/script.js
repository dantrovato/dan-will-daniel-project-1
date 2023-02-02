

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");
    button.addEventListener("click", (event) => {
      const query = document.querySelector("input").value;
      const ul = document.querySelector("ul");
      fetch(
        `https://content.guardianapis.com/search?api-key=9287d661-de4e-4534-8f58-65c75165cd92&q=${query}`
      )
        .then((res) => res.json())
        .then((results) => {
          const resultsArray = results.response.results;
          resultsArray.forEach((element) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.setAttribute("href", element.webUrl);
            a.textContent = element.webUrl;
            li.appendChild(a);
            ul.appendChild(li);
          });
        });
    });
  });
  
  
  
  
  
  