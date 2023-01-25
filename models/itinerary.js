const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({

    city: { type: mongoose.Types.ObjectId, ref: 'cities' , required: true },
    userName: { type: String, required: true },
    userImage: { type: String, required: true },
    itineraryName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    hashtags: { type: Array, required: true },
    likes: { type: Array, required: true },
    activities: [{type:mongoose.Types.ObjectId, ref:'activities'}],
    comments: [{
        date: {type: Date},
        comment: {type: String},
        userId: {type:mongoose.Types.ObjectId, ref:'users'},
    }]

})
const Itinerary = mongoose.model('itineraries', itinerarySchema) 

module.exports = Itinerary 