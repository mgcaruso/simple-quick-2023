const Itinerary = require('../models/itinerary')

const itinerariesControllers = {
    getItineraries: async (req, resp) => {
        let itineraries;
        let error = null;
        try {
            itineraries = await Itinerary.find() //agregar el populate y luego solo hacer la llamada a este ocntrolador y de ahi sacar
        } catch (err) { error = err }
        resp.json({
            response: error ? 'ERROR' : { itineraries },
            success: error ? false : true,
            error: error
        })
    },
    getOneItinerary: async (req, resp) => {
        const id = req.params.id;
        let itinerary;
        const error = null;
        try {
            itinerary = await Itinerary.findOne({ _id: id })
        } catch (err) { error = err }
        resp.json({
            resp: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    addItinerary: async (req, res) => {
        const { itineraryName, description, userName, userImage, price, duration, city, hashtags, likes, activities } = req.body
        let itinerary;
        let error = null;
        try {
            itinerary = await new Itinerary({
                itineraryName: itineraryName,
                description: description,
                userName: userName,
                userImage: userImage,
                price: price,
                duration: duration,
                city: city,
                hashtags: hashtags,
                likes: likes,
                activities: activities
            }).save()//lo guardo
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    modifyItinerary: async (req, res) => {
        const id = req.params.id;
        const itinerary = req.body;
        let itinerarydb
        let error = null
        try {
            itinerarydb = await Itinerary.findOneAndUpdate({ _id: id }, itinerary, { new: true })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itinerarydb,
            success: error ? false : true,
            error: error
        })
    },
    removeItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOneAndDelete({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },
    getItineraryByCity: async (req, res) => {
        let itineraries = [];
        const id = req.params.id;
        try {
            itineraries = await Itinerary.find({ city: id }) 
            .populate("activities").populate("comments.userId", {password: 0, uniqueString: 0, verification: 0})
            res.json({
                res: itineraries,
                success: true,
                error: null
            })
        } catch (error) {
            console.log(error)
            res.json({
                res: error.message,
                success: false,
                error: error
            })

        
        }
        
    },


    likesDislikes: async (req,res) => {

        let userId = req.user.id
        let itineraryId = req.params.id 
        let itinerary;

        try { 
            itinerary = await Itinerary.findOne({ _id: itineraryId}) 
            if (itinerary.likes.includes(userId)) {
                Itinerary.findOneAndUpdate({_id: itineraryId}, {$pull:{likes: userId}}, {new:true})
                    .then(response => res.json({
                        response: response.likes, 
                        success: true,
                        message: "Itinerary disliked 😮"
                    }))
                    .catch(error => console.log(error))
            } else {
                Itinerary.findOneAndUpdate({_id: itineraryId}, {$push:{likes: userId}}, {new:true})
                    .then(response => res.json({
                        response: response.likes, 
                        success: true, 
                        message: "Itineray liked! 😎"
                    }))
                    .catch(error => console.log(error))
            }
        } catch (error) {
            res.json({
                response: error,
                success: false
            })
        }
    }
}

module.exports = itinerariesControllers