var mongoose = require("mongoose");

var pollSchema = new mongoose.Schema({
   name: String,
   options: [
       {
           title: String,
           votes: { type: Number, default: 1 }
       }
    ],
    author:{
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref  : "User"
        },
        username: String
    },
    // voters:[
    //     {
    //     id:{
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref  : "User"
    //     },
    //     username: String
    //     }
    // ]
    
});

module.exports = mongoose.model("Poll", pollSchema);