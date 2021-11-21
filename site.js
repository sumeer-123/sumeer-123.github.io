console.log("WELCOME TO 24/7 NEWS!!!");  

// API KEY : 0663e42f41ba48acab6dbc96771daa03
// https://newsapi.org/v2/top-headlines?country=in&apiKey=0663e42f41ba48acab6dbc96771daa03
//Here we are fetching data with  thehelp of news api.Firstly we get a api then we use above link then add country in it then add our api that we have obtained then with the help of it we fetch top headlines.But the data we obtained with this is not human readable it is only machine  readable So In Order to make it human readable we add one extension to Chromw which is JSON FORMATTER after then we reload the page then we get human readable data from it.
let country = 'in';
let apiKey = '0663e42f41ba48acab6dbc96771daa03';

//GRABBING NEWS CONTAINER :
let newsAccordion = document.getElementById('newsAccordion')
//CREATING AN AJAX GET REQUEST :
const xhr = new XMLHttpRequest();
xhr.open('GET',`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`,true);
xhr.getResponseHeader('Content-type','application/x-www-form-urlencoded');
xhr.onload = function(){
    if(this.status ==  200){     //WHEN THERE IS ERROR  WE USE  HTTP STATUS CODE i.e if status code is equal to succes only in that case success happen for another case else statment works and it shows only what is wrritten in that else statment
        let json = JSON.parse(this.responseText);//RETURNS THE OBJECT WHICH CONTAINS ALL THE DATA
        let articles = json.articles; 
        // console.log(articles);//RETURNS ONLY ARTICLES
        //NOW WE HAVE TO EXTRACT JUST TITLE AND CONTENT FROM ARTICLES.FOR THAT WE USE FOR-EACH LOOP AS OUR ARTICLES IS IN ARRRAY FORM
        let newsHTML = "";
        articles.forEach(function(element,index) {
            let news = `   <div class="accordion-item">
            <h2 class="accordion-header" id="heading${index}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
            <span class="badge bg-secondary my-3"><b>BREAKING NEWS  :${index+1}</b></span>${element["title"]}
            </button>
            </h2>
            </div>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"  data-bs-parent="#accordionExample">
            <div class="accordion-body">${element["content"]} <a target=_blank href="${element["url"]}">READ MORE..</a> </div>
            </div>
            </div>`;
        newsHTML += news;
       });
        newsAccordion.innerHTML = newsHTML;
    }
    else{
            console.error("SOME ERROR OCCURRED");
    }
}
xhr.send()
