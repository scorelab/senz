var mongoose = require("mongoose");

/*
This is the project schema, it will contain the name of the project and
the list of devices which comes under it
*/
var projectSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    devices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "device"
    }],
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("project", projectSchema);