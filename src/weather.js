const request=require('request')
const weather=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/6278cd492ea2c74d672b1ac45354dc2e/'+latitude+','+longitude+'?units=si'

    request({url,json:true}/*this is conventional in request module. Which sets the url as above url. It is then followed by json:true which is same as JSON.parse.*/ ,(error, { body })=>{ //This function is required for the request function to work. Error decides what will happen if no response is received from the server that is no internet connection. Response decides what the function will do if there is a response. I have pass {body} instead of response. This is because if you refer to other weather app, with the curly bracket you can actually get the property inside object easily without entering them every single time. So {body} calls every properties in the body: .
    // console.log(error) // this will return null if the internet is working
    // console.log(response)// this will all the information received from the server. 
    // const{temperature,summary}=response.body.currently
    if(error){ // this gives the user useful message when error occurs
        callback('No Internet Connection',undefined)
    }else if (body.error){ // this error occurs when user does not enter required information to the server. e.g latitude and longitude. 
        callback('Unable to find location',undefined)
    
    }else{
        callback(undefined,"Current weather: "+body.currently.summary+". It is currently "+ body.currently.temperature+ " degrees out.")
    }
})
}
module.exports=weather