const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://localhost:27017/lastdynamicwebsite",
   {useFindAndModify:false, 
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then( () => console.log("connection successful for mongodb compass"))
.catch( (err) => console.log(err));