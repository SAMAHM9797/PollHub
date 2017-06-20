var mongoose = require("mongoose");

var pollSchema = new mongoose.Schema({
   name: String,
   options: [
       {
           title: String,
           votes: String 
       }
    ],
    author:{
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref  : "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Poll", pollSchema);