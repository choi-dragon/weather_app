const request=require('request')
const geocode=(address,callback)=>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' +address+'.json?access_token=pk.eyJ1IjoidG1kZHlkY2hsIiwiYSI6ImNrNW4xajJtczE1cnYzbXF5dTJ5eGp5OHYifQ.g84Puk_JuhS_iKSKBdXXLw&country=AU&limit=1'
    request({url,json:true},(error, { body })=>{
        if(error){
            callback('No internet connection',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    }
    )
}
module.exports=geocode