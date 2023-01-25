const Activity = require('../models/activity')

const activitiesControllers = {
    getActivities: async (req, resp) => {
        let activities;
        let error = null;
        try {
            activities = await Activity.find()
        } catch (err) { error = err }
        resp.json({
            response: error ? 'ERROR' : { activities },
            success: error ? false : true,
            error: error
        })
    },
    getOneActivity: async (req, resp) => {
        const id = req.params.id;
        let activity;
        const error = null;
        try {
            activity = await Activity.findOne({ _id: id })
        } catch (err) { error = err }
        resp.json({
            resp: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },
    addActivity: async (req, res) => {
        const { name, description, picture, itinerary } = req.body
        let activity;
        let error = null;
        try {
            activity = await new Activity({
                name: name,
                description: description,
                picture: picture,
                itinerary: itinerary
            }).save()//lo guardo
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },
    modifyActivity: async (req, res) => {
        const id = req.params.id;
        const activity = req.body;
        let activitydb
        let error = null
        try {
            activitydb = await Activity.findOneAndUpdate({ _id: id }, activity, { new: true })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : activitydb,
            success: error ? false : true,
            error: error
        })
    },
    removeActivity: async (req, res) => {
        const id = req.params.id
        let activity
        let error = null
        try {
            activity = await Activity.findOneAndDelete({ _id: id })
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : activity,
            success: error ? false : true,
            error: error
        })
    },
    activityFromItinerary: async (req, res) => {
        let activities = [];
        const itineraryId = req.params.id;
        let error = null;
        try {
            activities = await Activity.find({ itinerary: itineraryId })
        } catch (err) { error = err }
        res.json({
            res: error ? 'ERROR' : activities,
            success: error ? false : true,
            error: error
        })
    }
}

module.exports = activitiesControllers