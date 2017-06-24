//Show - show more info
var express = require("express");
var router = express.Router();
var Poll = require("../models/poll");
var middleware = require("../middleware/index");
var d3   = require("d3");
router.get("/",function(req,res){
   Poll.find({},function(err,allpolls){
       if(err)
            console.log(err);
        else
            res.render("polls/index",{polls:allpolls});
   });
    //res.render("Polls", {Polls:Polls});
});

router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var options = req.body.option;
    console.log(options);
    var author = {
        id: req.user._id,
        username : req.user.username
    };
    var newPoll = {name : name , author : author};
        
      //Create new poll and save to dB then add options
        Poll.create(newPoll,function(err,newlyCreated){
            if(err)
                console.log(err);
            else{
                options.forEach(function(option){ // for each option submitted
                    newlyCreated.options.push({title:option}); // push the option to the new Poll votes not sent as default value already set
              
                }); 
                
                 newlyCreated.save();
                res.redirect("/polls");
            }
        });
    });


router.get("/new",middleware.isLoggedIn,function(req, res) {
    res.render("polls/new");
});

router.get("/:id",function(req,res){
    Poll.findById(req.params.id).exec(function(err, foundPoll){
        if(err){
            console.log("can't find ");
            res.redirect("/polls");
        } else {
            //render show template with that poll
            res.render("polls/show", {poll: foundPoll});
        }
    });
});

// //Edit
// router.get("/:id/edit",middleware.checkPollOwnershipp,function(req, res){
//       Poll.findById(req.params.id, function(err, foundPoll){
//         if(err)
//             console.log(err);
            
//         res.render("polls/edit", {poll: foundPoll});
//     });
// });


//Put router changes comment
router.put("/:id",function(req,res){
    Poll.findByIdAndUpdate(req.params.id,req.body.poll,function(err,updatePoll){
            if(err)
                res.redirect("/polls");
            else {
                res.redirect("/polls/" + req.params.id);
            }
    });
});

//destroy
router.delete("/:id",middleware.checkPollOwnership,function(req,res){
    Poll.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("/polls");
        }
        else{
            res.redirect("/polls");
        }
    });
});



module.exports = router;