var express=require('express');
var firebase=require('firebase');
var bodyParser=require("body-parser");
//server side template
var ejs=require('ejs');
//var jade=require('jade');

var app=express();

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

var ids;
app.set('views','./templates');

app.set('view engine', 'ejs');

//templating
app.post('/dis', function (req, res) {
    var name={"name":"anubhav"}
    res.render('index', name);
    
    
 });


app.post("/",function (req,res) {
    //var u1=new User(req.body);

    ids=req.body.q;
    //ref.child(ids).set("hello");
    console.log(ids);
    //req.body=null;
    //ref.push(ids);
     //console.log(ids);

  //  console.log();

    //console.log(getKey());
    res.render('index');
});

 // res.send("hello");
   // student.set({"name":"harsh"});l



app.post("/search",function (req,res) {
    //var u1=new User(req.body);

    var search_id=req.body.q;
    ref.child(ids).set(search_id);
    console.log(req.body);
    res.render('thank');
});


app.post("/set",function (req,res) {
    //var u1=new User(req.body);


   // console.log(req.body.name);
    var product1=req.body.link;      //get response of onclick
    console.log(product1);

  //  ref.child(ids).set("image name");     //set preference with user id
    
    var pic={"p":product1};
    console.log(pic);

    res.render('product',pic);
    console.log("flag-2");


   // ref.child(ids).set(product1);
    //var pic={"pic":product1}
    //res.render('product',pic);



});


app.listen(3000,function (req,res) {
    console.log("server started");
    
})