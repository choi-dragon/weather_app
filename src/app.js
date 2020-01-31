
const express =require('express')// this brings in the express module or function. 
const app=express() // now app has express function assign this allows to utilise the express function. 
const path=require('path') // this is one of the built in node modules
const hbs=require('hbs')
const geocode=require('./geocode')
const weather=require('./weather')
const port = process.env.PORT || 3000 // process.env.PORT set the port to heroku and if fails, to 3000
console.log(path.join(__dirname,'../public')) // dirname allows you to get the directory of the folder you are currently in.
// const publicpath=path.join(__dirname,'../public')//path.join allows you to navigate to the folder you want and amend the directory.
const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views') 
const partialsPath=path.join(__dirname,'../templates/partials')
console.log(partialsPath)


app.set('view engine','hbs')// this now calls in hbs module to this js file. The first argument must be called 'view engine' with no capital otherwise it will not work.
app.set('views',viewsPath/*Refer above for its directory address*/) // this configures the directory of 'views'. Express by default only have access to folder named by views. However this line of code allows you to change the directory of views so that express get the hbs files from different folder.  

//How to use partials
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath)) // express.static finds the corresponding file in the given directory and whenever server is ran it run the file. When you use this app.use function, you no longer need the below (app.get) function because they work the same way. 

// app.get('',(req,res)=>{// This sort of looks like callback function. req stands for request and res stands of response. Response is what is displayed on html or the response to the request made by the user.
// // this get function creates the page. With empty string passed in for the first argument it makes this a default website.
//     res.send('Hello express!')// this sends the response to the web server. In another words, this will be display on the web.
// })

// app.get('/help',(req,res)=>{// this adds a page to the web.
//     res.send('Help page')
// })
// app.get('/about',(req,res)=>{// this adds a page to the web.
//     res.send('About')
// })
// app.get('/weather',(req,res)=>{// this adds a page to the web.
//     res.send('Weather')
// })

//CREATING DYNAMIC WEBPAGE using Handle
// unlike html, .hbs are called using app.get function like above. 

app.get('',(req,res)=>{
    res.render('index',{// this .render is similar to send however it selects .hbs file with matching name and project them in to the browser.
        title:'Weather app', // this object can be used in hbs files as a reference. This allows you to avoid creating duplicate lines for all your html (hbs) pages. 
        name:'Yong Choi'
    }) 
    } 
)
app.get('/about',(req,res)=>{// the first argument is added onto the web address
    res.render('about',{
        title:'About me',
        name:'Yong Choi'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){ // this allows you to set up the query string. This used when the user provides the input to the html form and do something meaning ful with it. This allows the html to get address as a value and return some kind of feedback accordingly. 
        return res.send({ // this return is needed otherwise it will crash. This is because normally you cannot send two responses at the same time.
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{ latitude, longitude, location }={})=>{
        if(error){
            return res.send({ error })
        }
        weather(latitude,longitude,(error, weatherdata)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                weatherdata:weatherdata,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Yong Choi'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        error:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        error:'404 page not found'
    })
})




app.listen(port,()=>{// this finally sets the server
    console.log('Server is up on port '+port)
})