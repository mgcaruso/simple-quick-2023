const Router = require('express').Router(); //permite leer los endpoints
const passport = require('../config/passport')

const citiesControllers = require('../controllers/citiesControllers');
const { getCities, getOneCity, addCity, modifyCity, removeCity } = citiesControllers;

Router.route('/cities')
    .get(getCities)
    .post(addCity)

Router.route('/cities/:id')
    .delete(removeCity)
    .put(modifyCity)
    .get(getOneCity)



//NEW - INFO TO CHECK
const itinerariesControllers = require('../controllers/itinerariesControllers')
const { getItineraries, addItinerary, getOneItinerary, modifyItinerary, removeItinerary, getItineraryByCity, likesDislikes } = itinerariesControllers
Router.route('/itineraries')
    .get(getItineraries)
    .post(addItinerary)

Router.route('/itineraries/:id')
    .get(getOneItinerary)
    .put(modifyItinerary)
    .delete(removeItinerary)


Router.route('/itineraryByCity/:id')
    .get(getItineraryByCity)

Router.route('/itineraries/likes/:id')
    .put(passport.authenticate('jwt', {session: false}) , likesDislikes)


//USERS


const usersControllers = require('../controllers/usersControllers');
const validator = require('../config/validator');
const { userSignUp, userSignIn, getAllUsers, verifyEmail, verifyToken } = usersControllers



Router.route('/auth/signUp')
    .post(validator, userSignUp)
    .get(getAllUsers)

Router.route('/auth/signIn')
    .post(userSignIn)

Router.route('/verify/:string')
    .get(verifyEmail)

Router.route('/auth/signInToken')
    .get(passport.authenticate('jwt', {session: false}) , verifyToken)




//RECEIPES

const recipesControllers = require('../controllers/recipesControllers')
const { getAllRecipes, getOneRecipe, getRecipesByCategory, getRecipesByChef, addRecipe } = recipesControllers

Router.route('/recipes')
.get(getAllRecipes)
.post(addRecipe)

Router.route('/oneRecipe/:id')
.get(getOneRecipe)

Router.route('/recipesByCategory/:category')
.get(getRecipesByCategory)

Router.route('/recipesByChef/:chefId')
.get(getRecipesByChef)








module.exports = Router 
