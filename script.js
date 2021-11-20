var issueContainer = document.getElementById('issues');
var fetchButton = document.getElementById('fetch-button');
var nameInputEl = document.querySelector('#citySearch');



function getApi(cityName) {
   
  var cityName = nameInputEl.value.trim();
      
  var finalURL = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=51b8740ba38e6f14ed03de9b608c5b7a';
  console.log(finalURL);


  fetch(finalURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    
        var wind = document.createElement('p');
        var temp = document.createElement('p');
        var cityName = document.createElement('p');
        var humidity = document.createElement('p');
        var icon = document.createElement('img');
       // var UVIndex = document.createElement('p');
        
        cityName.textContent = data.name;
        wind.textContent = "Wind " + data.wind.speed;
        temp.textContent = "Temp " + data.main.temp;
        humidity.textContent = "Humidity " + data.main.humidity;
        //UVIndex.textContent = "UV ";
        icon.textContent = data.weather.icon;
        issueContainer.append(cityName);
        issueContainer.append(wind);
        issueContainer.append(temp);
        issueContainer.append(humidity);
        issueContainer.append(icon);
        
    });
}
fetchButton.addEventListener('click', getApi);
