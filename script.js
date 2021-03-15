function attachEventListener(){
    
let dataTemplate = 
         
        Handlebars.compile( `
        
         <div id='dynamic-data'>
        
        <p class='weather-data'>{{wantedCity}}</p>
        
        <figure>
        
        <img src = '{{icon}}'>
        
        </figure>
        
        <p class='weather-data'> {{weather}} </p>
        <p class='weather-data'>{{tempeture}}°С</p>
        <p class='weather-data'>{{maxTemp}}°С/ {{minTemp}}°С</p>
        
        </div>
        
        `)
         
     



 document.getElementById('submitBtn').addEventListener('click',(e) => {

    e.preventDefault();

    let weatherSection = document.getElementById('weather-section');

    let inputCity = document.getElementById('input-city').value;

    
    let key = '0e92bf3c5468c78dfad1c8d8964a3ec4'
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${key}&units=metric`
    
    
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
    
        
        let tempeture = (data.main['temp']).toFixed(1)
        let minTemp = (data.main['temp_min']).toFixed(1);
        let maxTemp = (data.main['temp_max']).toFixed(1);
        let weather = data.weather[0].main
        let iconCode = data.weather[0].icon
        let wantedCity = data.name;
    
        const icon = `https://openweathermap.org/img/wn/${iconCode
    }@2x.png`;
        
    
    weatherSection.innerHTML = dataTemplate({icon,wantedCity,weather,tempeture,maxTemp,minTemp})
    
    backgroundChange(maxTemp);

    document.getElementById('input-city').value = ''
    

    })
    .catch(err =>{
        let h1Element = document.querySelector('h1')
        h1Element.innerHTML = 'The name you have entered is not valid'
    })
    

});

}


function backgroundChange(maxTemp){

    let header = document.querySelector('h1'); 
    let buttonElement = document.getElementById('submitBtn');
    let inputField = document.getElementById('input-city');
    let inputValue = document.getElementById('input-city').value;
    let dynamicElement = document.getElementById('dynamic-data');

    if (maxTemp < 40 && maxTemp > 20){
        document.body.style.backgroundImage = "url('images/summer.jpg')";
        header.style.color = 'LightCyan';
        buttonElement.style.backgroundColor = 'DarkTurquoise';
        buttonElement.style.color = 'white';
        inputField.style.borderBottomColor = 'DarkTurquoise';
        dynamicElement.style.borderColor = 'DarkTurquoise';
        
        return
    }
    
    if (maxTemp < 20 && maxTemp > 15){
        document.body.style.backgroundImage = "url('images/spring.jpg')";
        header.style.color = 'white';
        buttonElement.style.backgroundColor = 'MediumVioletRed';
        buttonElement.style.color = 'white';
        inputField.style.borderBottomColor = 'MediumVioletRed';
        dynamicElement.style.borderColor = 'MediumVioletRed';
        return

    }
    
    if (maxTemp < 15 && maxTemp > 10){
        document.body.style.backgroundImage = "url('images/autumn.jpg')";
        header.style.color = 'Gold';
        buttonElement.style.backgroundColor = 'Gold';
        buttonElement.style.color = 'white';
        inputField.style.borderBottomColor = 'Gold';
        dynamicElement.style.borderColor = 'Gold';
        document.body.style.transition = 'opacity 2s ease-in-out'
        return
        
    }
        document.body.style.backgroundImage = "url('images/winter.jpg')";
        header.style.color = 'LavenderBlush';
        buttonElement.style.backgroundColor = 'SteelBlue';
        buttonElement.style.color = 'white';
        inputField.style.borderBottomColor = 'PowderBlue';
        dynamicElement.style.borderColor = 'SteelBlue';
        
    
}



attachEventListener()
