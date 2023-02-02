const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    category: [{ type: Object , required: true}],
    videoTitle: { type: String, required: true },
    videoId: { type: mongoose.Types.ObjectId, required: true },
    thumbnail: { type: String, required: true },
    categoryImage:{ type: String, required: true },
    videoUlr: { type: String, required: true },
    chefId: {type: mongoose.Types.ObjectId, ref:'chefs', required: true }
})

const Recipe = mongoose.model('recipes', recipeSchema) 

module.exports = Recipe