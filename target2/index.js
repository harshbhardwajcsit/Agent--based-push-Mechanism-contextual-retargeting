var express=require('express');
var firebase=require('firebase');
var bodyParser=require("body-parser");
//server side template
var ejs=require('ejs');
//var jade=require('jade');

var app=express();
var ids;

app.use(bodyParser.json());                         //parsing commands use for post data
app.use(bodyParser.urlencoded({extended:true}));

// public middleware for front-end
app.use(express.static("public"));

//  ad server permission
firebase.initializeApp({
    serviceAccount: "firebase.json",
    databaseURL: "https://myappp-1938c.firebaseio.com/"
});
//firebase reference
var db=firebase.database();
var ref=db.ref();
var student=ref.child("student");
/*
ref.on("child_added", function(snapshot) {
    console.log(snapshot.val());                        //listener on every change
});
*/


app.set('views','./templates');

app.set('view engine', 'ejs');

//templating
app.post('/dis', function (req, res) {
    var name={"name":"anubhav"}
    res.render('index', name);
    
    
});


app.post("/",function (req,res) {

    //forward to next web page *** using express ejs templating***
   // res.render('index');
    //get value from json data
    ids=req.body.q;
    //console.log(ids);



    ref.once("value", function(snapshot) {

        var b = snapshot.child(ids).exists();
        console.log(b);

        /*
         var c = snapshot.child(ids).val();
        console.log(c);*/



       // var ad={"ad":c}

        if(b==true){
            var c = snapshot.child(ids).val();//bike
            console.log(c);
            //var ad={"ad":c}

           // res.render('registered',ad);
            
            var content=snapshot.child(c).val();
            //console.log(content);

            var s={"content":content,"ad":c}
           // console.log(s);
            
           // console.log(content);

           res.render('registered',s);

        }
        else{  res.render('non_registered'); }

    });


    req.body=null;



});

 // res.send("hello");
   // student.set({"name":"harsh"});


/*
app.post("/search",function (req,res) {
    //var u1=new User(req.body);

    var search_id=req.body.q;
    ref.child(ids).set(search_id);
    console.log(req.body);
    res.render('thank');
});
*/

app.listen(8081,function (req,res) {
    console.log("server started");
    
})