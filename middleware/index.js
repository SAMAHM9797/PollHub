var Poll = require("../models/poll");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        
        return next();
    }
    return next();
   // req.flash("error","You need to be logged in to do that");
    //res.redirect("/login");
};


middlewareObj.checkPollOwnership = function (req,res,next){
    if(req.isAuthenticated()){
        Poll.findById(req.params.id,function(err,foundPoll){
            if(err){
                req.flash("error", "Poll not found");
                res.redirect("back");
            }
            else{
                //check if user owns campground 
                if(Poll.author.id.equals(req.user._id)){
                    next();
        
                }
                else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } 
    else {
        res.redirect("back");
    }
};

module.exports = middlewareObj;