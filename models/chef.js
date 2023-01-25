const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
    chefName:{ type: String, required: true },
    chefImage:{ type: String, required: true }
})

const Chef = mongoose.model('chefs', chefSchema) 

module.export = Chef