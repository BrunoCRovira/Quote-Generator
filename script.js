const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAhutor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];
//Show Loading 
function loading(){
    loader.hidden =false;
    quoteContainer.hidden=true;
}

//Hide LOading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;

//show New Quote

function newQuote(){
    // Pick a random quote from apiQuotes array
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quoteAhutor.textContent = quote.author; 
    // Check Quote Lengh to determing Styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote')
    } else { 
       quoteText.classList.remove('long-quote')
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
     complete();
}

// Get Quotes From API

async function getQUotes(){
     loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();  
        newQuote();         
    } catch (error) {
        
        // Catch Error Here
    }

}


// Tweet Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAhutor.textContent}`;

   window.open(twitterUrl,'_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load

getQUotes();
