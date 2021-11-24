var issueContainer = document.getElementById('issues');
var fetchButton = document.getElementById('fetch-button');
var nameInputEl = document.querySelector('#citySearch');
var storedSearch = document.querySelector('.cus-colStored');
var dayOne = document.querySelector(".card-textOne");
var dayTwo = document.querySelector(".card-textTwo");
var dayThree = document.querySelector(".card-textThree");
var dayFour = document.querySelector(".card-textFour");
var dayFive = document.querySelector(".card-textFive");
var forecastContainer =document.querySelector('.forecastContainer');


function getApi() {
    var today = moment().format('MMM DD, YYYY');
    $("#currentDay").text(today);
    
    var dayOneDisplay = moment().add(1, 'days')
    var dayOneFull = moment(dayOneDisplay).format("MMM Do YYYY")

    var dayTwoDisplay = moment().add(2, 'days')
    var dayTwoFull = moment(dayTwoDisplay).format("MMM Do YYYY")

    var dayThreeDisplay = moment().add(3, 'days')
    var dayThreeFull = moment(dayThreeDisplay).format("MMM Do YYYY")

    var dayFourDisplay = moment().add(4, 'days')
    var dayFourFull = moment(dayFourDisplay).format("MMM Do YYYY")

    var dayFiveDisplay = moment().add(5, 'days')
    var dayFiveFull = moment(dayFiveDisplay).format("MMM Do YYYY")

   
  var cityName = nameInputEl.value.trim();
      
  var finalURL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=imperial&appid=51b8740ba38e6f14ed03de9b608c5b7a';                

  //clear the current result when new search is made
  if (cityName) {
    issueContainer.textContent = '';
    dayOne.textContent = '';
    dayTwo.textContent = '';
    dayThree.textContent = '';
    dayFour.textContent = '';
    dayFive.textContent = '';
   
    }

  fetch(finalURL)
    .then(function (response) {
      console.log(response.status)
      if (response.status === 404){
          var noResults = document.createElement('h3');
          noResults.textContent = "No city found";
          issueContainer.append(noResults);
          nameInputEl.textContent = "";
        
      }
      return response.json();
     
    })
    .then(function (data) {
        var wind = document.createElement('p');
        var temp = document.createElement('p');
        var cityName = document.createElement('h2');
        var humidity = document.createElement('p');
        var lat = data.coord.lon;
        var lon = data.coord.lat;
      
        
        
        cityName.textContent = data.name + " " + today;
        wind.textContent = "Wind " + data.wind.speed + " mph"
        temp.textContent = "Temp  " + data.main.temp + "°F";
        humidity.textContent = "Humidity " + data.main.humidity + "%";

        var coordURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&&appid=51b8740ba38e6f14ed03de9b608c5b7a';
        fetch(coordURL)
       .then(function (response) {
         return response.json();
       })
       .then(function (data) {
         console.log(data);
        var UVIndexContainer = document.createElement('div');
        

        var UVIndex = document.createElement('p');
        UVIndex.textContent = "UV " + data.current.uvi;

        if (data.current.uvi <2){
          UVIndexContainer.setAttribute('class', 'UVSpaceGreen');
        } else if(data.current.uvi >=2 && data.current.uvi<4){
          UVIndexContainer.setAttribute('class', 'UVSpaceAmber')
        } else{
        UVIndexContainer.setAttribute('class', 'UVSpaceRed')
      };

        UVIndexContainer.append(UVIndex);
        issueContainer.append(UVIndexContainer);
       });


        var iconImage = document.createElement('img')
        iconImage.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        issueContainer.append(cityName);
        issueContainer.append(iconImage);
        issueContainer.append(wind);
        issueContainer.append(temp);
        issueContainer.append(humidity);
        
      
    });

    localStorage.setItem("cityName", cityName);
    searchButton = document.createElement('button');
    searchButton.setAttribute('class','cityButton')
    var savedSearch = localStorage.getItem('cityName');
    //searchButton = document.innerHTML=savedSearch
    searchButton.textContent = savedSearch;

    storedSearch.append(searchButton);
    //storedSearch.append(savedSearch + " ");

    var requestForecastUrl =  `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=51b8740ba38e6f14ed03de9b608c5b7a`;
    fetch(requestForecastUrl)
       .then(function (response) {
         return response.json();
       })
       .then(function (data) {
         console.log(data);
         
         // Create elements for a card
  var col = document.createElement('div');
  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var cardTitle = document.createElement('h5');
  var weatherIcon = document.createElement('img');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');

  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.setAttribute('class', 'col-md');
  col.classList.add('five-day-card');
  card.setAttribute('class', 'card bg-primary h-100 text-white');
  cardBody.setAttribute('class', 'card-body p-2');
  cardTitle.setAttribute('class', 'card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');

  // Add content to elements
  cardTitle.textContent = dayOneFull
 
  weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}.png`);
  //weatherIcon.setAttribute('alt', iconDescription);
  tempEl.textContent = `Temp: ${data.list[4].main.temp} °F`;
  windEl.textContent = `Wind: ${data.list[4].wind.speed} MPH`;
  humidityEl.textContent = `Humidity: ${data.list[4].main.humidity} %`;

  dayOne.append(col);
  
           // Create elements for a card
           var colTwo = document.createElement('div');
           var cardTwo = document.createElement('div');
           var cardBodyTwo = document.createElement('div');
           var cardTitleTwo = document.createElement('h5');
           var weatherIconTwo = document.createElement('img');
           var tempElTwo = document.createElement('p');
           var windElTwo = document.createElement('p');
           var humidityElTwo = document.createElement('p');
         
           colTwo.append(cardTwo);
           cardTwo.append(cardBodyTwo);
           cardBodyTwo.append(cardTitleTwo, weatherIconTwo, tempElTwo, windElTwo, humidityElTwo);
         
           colTwo.setAttribute('class', 'col-md');
           colTwo.classList.add('five-day-card');
           cardTwo.setAttribute('class', 'card bg-primary h-100 text-white');
           cardBodyTwo.setAttribute('class', 'card-body p-2');
           cardTitleTwo.setAttribute('class', 'card-title');
           tempElTwo.setAttribute('class', 'card-text');
           windElTwo.setAttribute('class', 'card-text');
           humidityElTwo.setAttribute('class', 'card-text');
         
           // Add content to elements
          
           cardTitleTwo.textContent = dayTwoFull
         
           weatherIconTwo.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[12].weather[0].icon}.png`);;
           //weatherIcon.setAttribute('alt', iconDescription);
           tempElTwo.textContent = `Temp: ${data.list[12].main.temp} °F`;
           windElTwo.textContent = `Wind: ${data.list[12].wind.speed} MPH`;
           humidityElTwo.textContent = `Humidity: ${data.list[12].main.humidity} %`;
  
  
  
  dayTwo.append(colTwo);

   // Create elements for a card
   var colThree = document.createElement('div');
   var cardThree = document.createElement('div');
   var cardBodyThree = document.createElement('div');
   var cardTitleThree = document.createElement('h5');
   var weatherIconThree = document.createElement('img');
   var tempElThree = document.createElement('p');
   var windElThree = document.createElement('p');
   var humidityElThree = document.createElement('p');
 
   colThree.append(cardThree);
   cardThree.append(cardBodyThree);
   cardBodyThree.append(cardTitleThree, weatherIconThree, tempElThree, windElThree, humidityElThree);
 
   colThree.setAttribute('class', 'col-md');
   colThree.classList.add('five-day-card');
   cardThree.setAttribute('class', 'card bg-primary h-100 text-white');
   cardBodyThree.setAttribute('class', 'card-body p-2');
   cardTitleThree.setAttribute('class', 'card-title');
   tempElThree.setAttribute('class', 'card-text');
   windElThree.setAttribute('class', 'card-text');
   humidityElThree.setAttribute('class', 'card-text');
 
   // Add content to elements
   cardTitleThree.textContent = dayThreeFull
  
   weatherIconThree.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[20].weather[0].icon}.png`);;
   //weatherIcon.setAttribute('alt', iconDescription);
   tempElThree.textContent = `Temp: ${data.list[20].main.temp} °F`;
   windElThree.textContent = `Wind: ${data.list[20].wind.speed} MPH`;
   humidityElThree.textContent = `Humidity: ${data.list[20].main.humidity} %`;



dayThree.append(colThree);

   // Create elements for a card
   var colFour = document.createElement('div');
   var cardFour = document.createElement('div');
   var cardBodyFour = document.createElement('div');
   var cardTitleFour = document.createElement('h5');
   var weatherIconFour = document.createElement('img');
   var tempElFour = document.createElement('p');
   var windElFour = document.createElement('p');
   var humidityElFour = document.createElement('p');
 
   colFour.append(cardFour);
   cardFour.append(cardBodyFour);
   cardBodyFour.append(cardTitleFour, weatherIconFour, tempElFour, windElFour, humidityElFour);
 
   colFour.setAttribute('class', 'col-md');
   colFour.classList.add('five-day-card');
   cardFour.setAttribute('class', 'card bg-primary h-100 text-white');
   cardBodyFour.setAttribute('class', 'card-body p-2');
   cardTitleFour.setAttribute('class', 'card-title');
   tempElFour.setAttribute('class', 'card-text');
   windElFour.setAttribute('class', 'card-text');
   humidityElFour.setAttribute('class', 'card-text');
 
   // Add content to elements
   cardTitleFour.textContent = dayFourFull
  
   weatherIconFour.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[28].weather[0].icon}.png`);;
   //weatherIcon.setAttribute('alt', iconDescription);
   tempElFour.textContent = `Temp: ${data.list[28].main.temp} °F`;
   windElFour.textContent = `Wind: ${data.list[28].wind.speed} MPH`;
   humidityElFour.textContent = `Humidity: ${data.list[28].main.humidity} %`;



dayFour.append(colFour);

   // Create elements for a card
   var colFive = document.createElement('div');
   var cardFive = document.createElement('div');
   var cardBodyFive = document.createElement('div');
   var cardTitleFive = document.createElement('h5');
   var weatherIconFive = document.createElement('img');
   var tempElFive = document.createElement('p');
   var windElFive = document.createElement('p');
   var humidityElFive = document.createElement('p');
 
   colFive.append(cardFive);
   cardFive.append(cardBodyFive);
   cardBodyFive.append(cardTitleFive, weatherIconFive, tempElFive, windElFive, humidityElFive);
 
   colFive.setAttribute('class', 'col-md');
   colFive.classList.add('five-day-card');
   cardFive.setAttribute('class', 'card bg-primary h-100 text-white');
   cardBodyFive.setAttribute('class', 'card-body p-2');
   cardTitleFive.setAttribute('class', 'card-title');
   tempElFive.setAttribute('class', 'card-text');
   windElFive.setAttribute('class', 'card-text');
   humidityElFive.setAttribute('class', 'card-text');
 
   // Add content to elements
   cardTitleFive.textContent = dayFiveFull
 
   weatherIconFive.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[36].weather[0].icon}.png`);
   //weatherIcon.setAttribute('alt', iconDescription);
   tempElFive.textContent = `Temp: ${data.list[36].main.temp} °F`;
   windElFive.textContent = `Wind: ${data.list[36].wind.speed} MPH`;
   humidityElFive.textContent = `Humidity: ${data.list[36].main.humidity} %`;

dayFive.append(colFive);
     
 
        
       });

       searchButton.addEventListener('click', reRun)
       

 function reRun(){
     console.log("button text to use as cityName " + searchButton.textContent)
     cityName = searchButton.textContent;
     console.log(cityName);
     getApi(cityName);
 }

}

fetchButton.addEventListener('click', getApi);












