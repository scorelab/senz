var mongoose = require("mongoose");

/*
This is the user schema,it will contain list of projects for 
a particular user
*/
var userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    //One to many relation between user and projects
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    }],
    Date: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model("user", userSchema);