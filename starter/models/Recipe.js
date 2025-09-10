const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    recipe:{
        type:String,
        required:[true, 'Please provide recipe name'],
        maxlength:50
    },
    ingredients:{
        type:String,
        required:[true, 'Please provide ingredients'],
        maxlength:500
    },
    status: {
        type:String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required:[true, 'Please provide user']
    }

},{timestamps:true})

module.exports = mongoose.model('Recipe', RecipeSchema)