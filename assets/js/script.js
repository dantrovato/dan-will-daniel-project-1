

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-item");
    const button = document.querySelector("button");
    button.addEventListener("click", (event) => {
      const query = document.querySelector("input").value;
      const ul = document.querySelector("ul");
      fetch(
        `https://content.guardianapis.com/search?api-key=9287d661-de4e-4534-8f58-65c75165cd92&q=${query}`
      )
        .then((res) => res.json())
        .then((results) => {
          const resultsArray = results.response.silce(0,3);
          resultsArray.forEach((element) => {
                 let [first, second, third] = [...querySelectorAll("p")];
                 first.text.Content[0].webURL;
                 second.text.Content[1].webURL;
                 third.text.Content[2].webURL;

            // const li = document.createElement("li");
            // const a = document.createElement("a");
            // a.setAttribute("href", element.webUrl);
            // a.textContent = element.webUrl;
            // li.appendChild(a);
            // ul.appendChild(li);
          });
        });
    });
  });
  
  
  
  
  
  