const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({

    name: { type: String, required: true },
    picture: { type: String, required: true },
    description: { type: String, required: true }
    // itinerary: {type: mongoose.Types.ObjectId , ref:'itineraries'}

})
const Activity = mongoose.model('activities', activitySchema) 

module.exports = Activity