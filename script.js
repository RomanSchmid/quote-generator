const english = {
    languageCode: "EN",
    otherLanguages: ["ES", "DE", "CZ"],
    flag: "#",
    voiceNumber: 7,
    url: "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en"
}

const spanish = {
    languageCode: "ES",
    otherLanguages: ["EN", "DE", "CZ"],
    flag: "#",
    voiceNumber: 8,
    url: "https://quotes15.p.rapidapi.com/quotes/random/?language_code=es"
}

const german = {
    languageCode: "DE",
    otherLanguages: ["EN", "ES", "CZ"],
    flag: "#",
    voiceNumber: 4,
    url: "https://quotes15.p.rapidapi.com/quotes/random/?language_code=de"
}

const czech = {
    languageCode: "CZ",
    otherLanguages: ["EN", "ES", "DE"],
    flag: "#",
    voiceNumber: 0,
    url: "https://quotes15.p.rapidapi.com/quotes/random/?language_code=cs"
}

const currentLanguage = document.getElementById("current-language");
const languageList = document.querySelector(".language-list");
const languageOptions = document.querySelectorAll(".language-option");

localStorage.setItem("test", JSON.stringify(english));
let obj = JSON.parse(localStorage.getItem("test"));
console.log(obj);

// Check if the language is already set in the Local Storage
if (localStorage.getItem("language")) {
    currentLanguage.innerText = localStorage.getItem("language");
} else {
    localStorage.setItem("language", english.languageCode);
    currentLanguage.innerText = english.languageCode;
}

const quoteText = document.querySelector(".quote-text");
const authorName = document.querySelector(".author");

const firstGenerateButton = document.getElementById("firstGenerateButton");
const soundButton = document.getElementById("sound-button");
const copyButton = document.getElementById("copy-button");
const twitterButton = document.getElementById("twitter-button");
const newQuoteButton = document.getElementById("new-quote-button");

let voices;
let voiceNumber = 7;
// wait on voices to be loaded before fetching list
window.speechSynthesis.onvoiceschanged = function() {
    window.speechSynthesis.getVoices();
    voices = speechSynthesis.getVoices();
    console.log(voices);
}

let quoteUrl = 'https://quotes15.p.rapidapi.com/quotes/random/?language_code=en';
if (localStorage.getItem("quoteUrl")) {
    quoteUrl = localStorage.getItem("quoteUrl");
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '9e3e5a7e08msh66a670a24f70e7ap1390b5jsn3d1ac380d71d',
        'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
    }
};

/* Function for fetching data from Quote API and displaying it */
function randomQuote() {   
    newQuoteButton.classList.add("loading");
    newQuoteButton.innerText = "...";
    fetch(quoteUrl, options)
    .then(response => response.json())
	.then(response => {
        console.log(response)
        quoteText.innerText = response.content;
        // If fetched quote doesn't have an author, set it to "Anonymous"
        if (response.originator === null) {
            authorName.innerText = "Anonymous"
        } else {
            authorName.innerText = response.originator.name
        }
    })
	.catch(err => console.error(err));
    newQuoteButton.innerText = "NEW Quote";
    newQuoteButton.classList.remove("loading");
}

/* Revealing or hiding language list */
currentLanguage.addEventListener("click", () => {
    languageList.classList.toggle("show-up");
})

firstGenerateButton.addEventListener("click", () => {
    randomQuote();
    // After 0.3s hide firstGenerateButton and reveal content and button part
    setTimeout(() => {
        firstGenerateButton.classList.add("hide");
        document.querySelector(".content").classList.remove("hide");
        document.querySelector(".buttons").classList.remove("hide");
    }, 300);
})

languageOptions.forEach(e => e.addEventListener("click", () => {
    currentLanguage.innerText = e.innerText;
    e.innerText = localStorage.getItem("language");
    localStorage.setItem("language", currentLanguage.innerText);
    // After 200 miliseconds, hide the language list (becouse of performing tranform scale animation of selected language)
    setTimeout(() => languageList.classList.remove("show-up"), 150);

    // Based on language selection update quoteUrl to fetch correct quotes
    switch(currentLanguage.innerText) {
        case "EN":
            quoteUrl = quoteUrl.slice(0, quoteUrl.length - 2).concat("en");
            localStorage.setItem("quoteUrl", quoteUrl);
            firstGenerateButton.classList.remove("hide");
            document.querySelector(".content").classList.add("hide");
            document.querySelector(".buttons").classList.add("hide");
            voiceNumber = 7;
            break;
        case "ES":
            quoteUrl = quoteUrl.slice(0, quoteUrl.length - 2).concat("es");
            localStorage.setItem("quoteUrl", quoteUrl);
            firstGenerateButton.classList.remove("hide");
            document.querySelector(".content").classList.add("hide");
            document.querySelector(".buttons").classList.add("hide");
            voiceNumber = 8;
            break;
        case "DE":
            quoteUrl = quoteUrl.slice(0, quoteUrl.length - 2).concat("de");
            localStorage.setItem("quoteUrl", quoteUrl);
            firstGenerateButton.classList.remove("hide");
            document.querySelector(".content").classList.add("hide");
            document.querySelector(".buttons").classList.add("hide");
            voiceNumber = 4;
            break;
        case "CZ":
            quoteUrl = quoteUrl.slice(0, quoteUrl.length - 2).concat("cs");
            localStorage.setItem("quoteUrl", quoteUrl);
            firstGenerateButton.classList.remove("hide");
            document.querySelector(".content").classList.add("hide");
            document.querySelector(".buttons").classList.add("hide");
            voiceNumber = 0;
            break;
    }
}));

soundButton.addEventListener("click", () => {
    // SpeechSynthesisUtterance interface of the Web Speech API represents a speech request   
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    utterance.voice = voices[voiceNumber];
    speechSynthesis.speak(utterance); // speak method of speechSynthesis reads passed string
});

copyButton.addEventListener("click", () => {
    // Copying the quoteText on copyButton click
    // writeText() property writes the specified text string to the system clipboard
    navigator.clipboard.writeText(quoteText.innerText);
})

twitterButton.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

newQuoteButton.addEventListener("click", randomQuote);