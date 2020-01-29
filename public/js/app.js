console.log('TEST!!!')



const searchWeather=document.querySelector('form')
const search=document.querySelector('input')
const LocationDATA=document.querySelector('#location-1')
const Weather=document.querySelector('#weather')
LocationDATA.textContent=''
Weather.textContent=''

searchWeather.addEventListener('submit',(e)=>{ //addEventListener makes the form actually do something, in this case submits the value.
    e.preventDefault()// parameter e was passed (but can be called anything) and with preventDefault() function you can prevent the web page loading every single time you click the submit button. NOTE: this is set by default so needs to be removed. 

    const location=search.value // search.value is the value obtained from the input

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{ // the API or web addres here is what you have made and only adds the location so that it fetch the weather for the location that has been received from the input. 
    response.json().then((data)=>{ // this .json() function makes the data from API an json object so it can be called as an object. 
        if(data.error){
            LocationDATA.textContent=data.error
            Weather.textContent=''
        }else{
            LocationDATA.textContent=data.location
            Weather.textContent=data.weatherdata
        }
    })
})
})