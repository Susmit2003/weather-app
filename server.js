const express = require("express");
const https = require("https");
const bodyParser=require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs")
app.use(express.static("public"))
app.get("/", function(req, res){
  res.render("home.ejs");
});

// app.get("/about",function(req,res){
//   res.render("<h1>duhfciuhfiuh<h1>");
// })
app.get("/about", (req, res) => {
 
 res.sendFile(__dirname+"/index.html")
});
app.post("/", (reqs, resp) => {

const city=reqs.body.inp1





  
   const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7699208b1c330ba3ee8c7e17146a83d0";
 
   https.get(url, function (respo) {
     respo.on("data", function (data) {
       const par = JSON.parse(data);
       const tem=Number(par.main.temp)
       const tem_in_cel=parseInt(tem-273.15);
       if(tem_in_cel>20){
        
       }
      
       resp.render("header.ejs",{temp:tem_in_cel,c:city}) 
     });
   });
 });
 

app.listen(3000, () => {
  console.log("server running on port 3000");
});
