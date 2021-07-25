const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const requests = require("requests");
const mongoose = require("mongoose");

// require("./db/conn");
//MONGODB ATLAS PASSWORD TX7lGsLNGiIfUnGj
const User = require("./model/lastd");

const DB = 'mongodb+srv://Prashant9586:TX7lGsLNGiIfUnGj@newcluster.bdg8h.mongodb.net/lastdynamicwebsite?retryWrites=true&w=majority';

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false,  
}).then(() => {
   console.log("connection successful for mongodb atlas");
}).catch((err) => {
   console.log(err);
})

const staticPath = path.join(__dirname,"../public");
app.use(express.static(staticPath));

const staticPaths = path.join(__dirname,"../views");
app.set("views",staticPaths);
app.set("view engine","hbs");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res) => {
    res.render("index");
})

app.post("/contact",async (req,res) => {
    try {
        //res.send(req.body);
        const Userdata = new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message,
        })

        const result = await Userdata.save();
        res.status(201).render("index");
        console.log(result);

    } catch (err) {
        res.status(400).send(err).json();
        console.log(err);
    }
})

app.get("*",(req,res) => {
    res.send("page couldn't be found");
})

app.listen(port,() => {
    console.log("listening");
})
