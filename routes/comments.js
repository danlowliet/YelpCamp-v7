const express = require("express")
const router = express.Router({mergeParams: true})
const Campground = require("../models/campground")
const Comment = require("../models/comment")


//comments new
router.get("/new", isloggedIn, function (req, res) {  
    //find campground by id
    Campground.findById(req.params.id, function (err, campground) {  
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground})
        }
    })
})

router.post("/", isloggedIn, function (req, res) {
    //lookup campground using id
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            //create new comment
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment)
                    campground.save()
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
            //connect new comment to campground
            //redirect campground/show page
        }
    })
})

//middleware
function isloggedIn (req, res, next) {  
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

module.exports = router