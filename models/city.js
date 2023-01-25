const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({

    name: { type: String, required: true },
    country: { type: String, required: true },
    continent: { type: String, required: true },
    description: { type: String, required: true },
    hashtags: { type: Array, required: true },
    picture: { type: String, required: true }
    

})
const City = mongoose.model('cities', citySchema) 

module.exports = City 