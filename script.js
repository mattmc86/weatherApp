var issueContainer = document.getElementById('issues');
var fetchButton = document.getElementById('fetch-button');
var nameInputEl = document.querySelector('#citySearch');
var storedSearch = document.querySelector('.cus-colStored');
var dayOne = document.querySelector(".card-text");



function getApi() {
    var today = moment().format('MMM DD, YYYY');
    $("#currentDay").text(today);
   
  var cityName = nameInputEl.value.trim();
      
  var finalURL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&units=imperial&appid=51b8740ba38e6f14ed03de9b608c5b7a';                

  //clear the current result when new search is made
  if (cityName) {
    issueContainer.textContent = '';
   
    }

  fetch(finalURL)
    .then(function (response) {
      console.log(response.status)
      if (response.status === 404){
          var noResults = document.createElement('h3');
          noResults.textContent = "No city found";
          issueContainer.append(noResults);
         
        //   if (cityName) {
        //     issueContainer.textContent = '';
           
        //     }
          nameInputEl.textContent = "";
          //nameInputEl.append(cityName);
          //alert ("no city")
      }
      return response.json();
     
    })
    .then(function (data) {
       // console.log(data);
    
        var wind = document.createElement('p');
        var temp = document.createElement('p');
        var cityName = document.createElement('h2');
        var humidity = document.createElement('p');
       
       // var UVIndex = document.createElement('p');
        
        cityName.textContent = data.name + " " + today;
        wind.textContent = "Wind " + data.wind.speed + " mph";
        temp.textContent = "Temp  " + data.main.temp + "•F";
        humidity.textContent = "Humidity " + data.main.humidity + "%";
        //UVIndex.textContent = "UV ";

        
        var iconImage = document.createElement('img')
        iconImage.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        issueContainer.append(cityName);
        issueContainer.append(iconImage);
        issueContainer.append(wind);
        issueContainer.append(temp);
        issueContainer.append(humidity);
      
    });

    localStorage.setItem("cityName", cityName);
    console.log("CityName is " + cityName)
    //var searchButton = document.createElement('button');
    var savedSearch = localStorage.getItem('cityName');
    storedSearch.append(savedSearch + " ");

    var requestForecastUrl =  `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=51b8740ba38e6f14ed03de9b608c5b7a`;
    fetch(requestForecastUrl)
       .then(function (response) {
         return response.json();
       })
       .then(function (data) {
         console.log("data forecaset " + data);
       
         
           //var date = document.createElement('h3');
           //document.querySelector('.card-text').textContent = data.sys.dt_txt;
           //document.querySelector('temp').textContent = data.temp;
           //document.querySelector('htmlclassorid').textContent = data.humidty;
           
           //date.textContent = data.sys.dt_txt;
           
           //dayOne.append(date);
           //console.log("date " + date)
        
       });

}

fetchButton.addEventListener('click', getApi);

//5 day forecast

// function forecast() {
//      var cityName = nameInputEl.value.trim();
//      var requestForecastUrl =  `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=51b8740ba38e6f14ed03de9b608c5b7a`;
   
//      fetch(requestForecastUrl)
//        .then(function (response) {
//          return response.json();
//        })
//        .then(function (data) {
//          console.log(data);
//          for (var i = 0; i < data.length; i++) {
//            var date = document.createElement('h3');
           
//            date.textContent = data[i].sys.dt_text;
           
//            dayOne.append(date);
//         }
//        });
//     }

// function displaySearches(){
//     //for each cityName entered create a button with class of fetch button
//     var searchButton = document.createElement('Button');
//     storedSearch.append(savedSearch);
   
//     //
// }










