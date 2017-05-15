var express = require("express");
var app = express();
var request = require('request');
var async = require("async");
var bodyParser = require("body-parser");

var titleSearch = "kwunnwl02iks2234s";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.post("/searchMovie", function(req, res){
   titleSearch = req.body.searchingMovie;
   res.redirect("/");
});


app.get("/", function(req, res){
    
    
var url = "https://api.themoviedb.org/3/search/movie?api_key=4726455b34c80dfb3a3197c5818b9a5f&query=" + titleSearch;
    request(url , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
             
            res.render("index", {data: data, titleSearch: titleSearch});
            //title gets changed back for another user
            titleSearch = "kwunnwl02iks2234s"
        }
    });
});

app.get("/movie/id/:movieID", function(req, res){
    var movieID = req.params.movieID;
   var url1 = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=4726455b34c80dfb3a3197c5818b9a5f";
   var url2 = "https://api.themoviedb.org/3/movie/" + movieID + "/release_dates?api_key=4726455b34c80dfb3a3197c5818b9a5f&certification_country=US&certification=PG";
   var url = ["https://api.themoviedb.org/3/movie/" + movieID + "?api_key=4726455b34c80dfb3a3197c5818b9a5f", 
   "https://api.themoviedb.org/3/movie/" + movieID + "/release_dates?api_key=4726455b34c80dfb3a3197c5818b9a5f&certification_country=US&certification=PG", 
   "https://api.themoviedb.org/3/movie/" + movieID + "/credits?api_key=4726455b34c80dfb3a3197c5818b9a5f&certification_country=US&certification=PG", 
   "https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=4726455b34c80dfb3a3197c5818b9a5f", 
   "https://api.themoviedb.org/3/movie/" + movieID + "/similar?api_key=4726455b34c80dfb3a3197c5818b9a5f"];
   var data;
   var cert;
   var credit;
   var video;
   var similar;
    
    async.parallel([
    /*
     * First external endpoint
     */
    function(callback) {

           request(url[0] , function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    data = JSON.parse(body);
                    // res.render("movieSearch", {data: data});
                    callback(false, data);
                }
            });
    },
    /*
     * Second external endpoint
     */
    function(callback) {
        
        request(url[1] , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    
                cert = JSON.parse(body);
                
                callback(false, cert);
                
            }
        });
            
    },
    /*
     * Third external endpoint
     */
    function(callback) {
        
        request(url[2] , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    
                credit = JSON.parse(body);
                
                callback(false, credit);
                
            }
        });
            
    },
    /*
     * Fourth external endpoint
     */
    function(callback) {
        
        request(url[3] , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    
                video = JSON.parse(body);
                
                callback(false, video);
                
            }
        });
            
    },
     /*
     * Fifth external endpoint
     */
    function(callback) {
        
        request(url[4] , function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    
                similar = JSON.parse(body);
                callback(false, similar);
                
            }
        });
            
    },
  ],
  
  
  /*
   * Collate results
   */
  function(err, results) {
    if(err) { console.log(err); res.send(500,"Server Error"); return; }
    
    res.render("movieSearch", {data: data, cert: cert, credit: credit, video: video, similar: similar});
    
  }
    );   
    
});
   
app.get("/movie", function(req, res){
   res.send("Movie");
});

app.get("*", function(req, res){
   res.send("Something went wrong");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started!!!");
});