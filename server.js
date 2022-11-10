/********************************** imports **************************************/
const express=require('express');
const chalk=require("chalk");
var bodyParser = require('body-parser');
const mongoose = require('mongoose') 
/*********************************************************************************/



/*********************************** object of Express ************************************/
const app=express()
/*********************************************************************************/



/***************************** Connecting to db *************************************/
var db= mongoose.connection;
const dburl="mongodb+srv://ankit:vAOy5SdkEeEfVjTm@cluster0.p69shnp.mongodb.net/student?retryWrites=true&w=majority"
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dburl,connectionParams).then(()=>{
    console.info(chalk.white.bgRed.bold("connected....."))
}).catch((e)=>{
    console.info("Error: Connect to internet",e)
})
/********************************************************************** */




/********************************** Loading all static files **************************************/
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*********************************************************************************/




/********************************** connecting @ 50000 ************************************/  
app.listen(5000,()=>{
    console.log(chalk.green.bold("Listening at port 5000"))
})
/*********************************************************************************/





/********************************** Routing starts ****************************************/

// HOME PAGE
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-origin":'*',
    })
    res.sendFile(__dirname+'/public/index.html')
    
})

//Dashboard
app.get("/dashboard",(req,res)=>{
    res.sendFile(__dirname + '/public/dashboard.html');
})


// ABOUT PAGE
app.get("/about",(req,res)=>{
    res.sendFile(__dirname + '/public/about.html');
})

// Contact Page
app.get("/contact",(req,res)=>{
    res.sendFile(__dirname + '/public/contact.html');
    
})

// Career Page
app.get("/career",(req,res)=>{
    res.sendFile(__dirname + '/public/career.html');
})


// Signup Page
app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var mob=req.body.mob;
    var eq=req.body.eq;
    
    // Making a data obj
    var data={
        "name":name,
        "email":email,
        "mob":mob,
        "eq":eq
    }

    //inseting to db
    db.collection("student").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully")
    })
    return res.redirect('registered.html')
})
/*********************************************************************************/