const Router = require('express').Router(); //permite leer los endpoints
const passport = require('../config/passport')




//NEW - INFO TO CHECK


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
