const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
    quote:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

module.exports = mongoose.model("Quote",QuoteSchema)