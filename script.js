const languageSelect = document.getElementById("current-language");
const languageList = document.querySelector(".language-list");

const quoteText = document.querySelector(".quote-text");
const authorName = document.querySelector(".author");

const newQuoteButton = document.querySelector("button");

let quoteUrl = 'https://quotes15.p.rapidapi.com/quotes/random/?language_code=en';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '9e3e5a7e08msh66a670a24f70e7ap1390b5jsn3d1ac380d71d',
        'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
    }
};

/* Function for fetching data from Quote API and displaying it */
function randomQuote() {    
    fetch(quoteUrl, options)
    .then(response => response.json())
	.then(response => {
        console.log(response)
        quoteText.innerText = response.content;
        authorName.innerText = response.originator.name
    })
	.catch(err => console.error(err));
}

/* Revealing or hiding language list */
languageSelect.addEventListener("click", () => {
    if (languageList.style.display === "none") {
        languageList.style.display = "flex";
    } else {
        languageList.style.display = "none"
    }
})
newQuoteButton.addEventListener("click", randomQuote);