const express =require("express")
const https = require("https")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    // console.log("hi");
    res.sendFile(__dirname+"/index.html");
})

app.post('/',function(req,res){
    console.log(req.body.cityName);
    const units = 'metric';
    const city = req.body.cityName;
    const appid = '7da7d2afe530e643605014bf873e6eed'; // my api key
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+units+"&lat=44.34&appid="+appid+"&lon=10.99",(response)=>{
    // https.get("https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&lat=44.34&appid=7da7d2afe530e643605014bf873e6eed&lon=10.99",(response)=>{
    // console.log(response.statusCode)

    response.on("data",function(data){
        const d = JSON.parse(data);
        const weatherDes = d.weather[0].description;
        
        // console.log(d.main.temp);
        res.write("<h1>The temp is "+d.main.temp+"</h1>")
        res.write("<h4>The weather is "+weatherDes+"</h4>")
        res.write("<img src ='https://openweathermap.org/img/wn/" + d.weather[0].icon + "@2x.png'>")
        // console.log(response.statusCode)
        res.send()
    })

})

// res.send("hello")
    
})




app.listen(3000,function(){
    console.log("Server Started")
})