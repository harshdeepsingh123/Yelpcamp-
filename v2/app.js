var express=require('express');
var app=express();
var bodyparser=require("body-parser");
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/yelp_campv10",{useNewUrlParser:true});
 var campgroundSchema= new mongoose.Schema({
     name:String,
     image:String,
     description:String
 });
 var Campground=mongoose.model('Campground',campgroundSchema);
/* Campground.create({
    name:"grantie hill",
    image:"https://blog.thomascook.in/wp-content/uploads/2017/09/shutterstock_152947547-Medium-1024x686.jpg",
    description:"This is a grantie hill ,no water ,no food ,beautiful combination"
 },function(err,campground){
     if(err){
         console.log(err)
     }else{
         console.log(campground);
     }
 })*/
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
/*var campgrounds=[
    {name :"salmon greek",image:"https://blog.thomascook.in/wp-content/uploads/2017/09/shutterstock_379283767-Medium-1024x737.jpg"},
    {name:"grantie hill",image:"https://blog.thomascook.in/wp-content/uploads/2017/09/shutterstock_152947547-Medium-1024x686.jpg"},
    {name:"mountain goot",image:"https://www.holidify.com/images/bgImages/MANALI.jpg"}
];*/
app.get("/",function(req,res){
    res.render("landing");
});
//INDEX - show all campgrounds
app.get("/campgrounds",function(req,res){
    //calling campground from db
        Campground.find({},function(err,allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("index",{campgrounds:allCampgrounds});
            }
        })
       
});
//CREATE -add new campgrounds
app.post("/campgrounds",function(req,res){
    //get dfata from the form and to the  campground array
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newcampground={name:name,image:image,description:desc};
    //create a new campground and save to db
    Campground.create(newcampground,function(err,newcreated){
        if(err){
            console.log(err)
        }else{
                //redirect it to campgrounds page
            res.redirect("/campgrounds");
        }
    })


});
//NEW - show form to create new campground to the data base 
app.get("/campgrounds/new",function(req,res){
    res.render("new");
});
app.get("/campgrounds/:id",function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id,function(err,foundcampground){
        if(err){
            console.log(err);
        }else{
            res.render("show",{campground:foundcampground});
        }
    });
    
});
app.listen(3000,function(){
    console.log("server app is started");
});
