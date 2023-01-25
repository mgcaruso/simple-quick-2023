const Recipe = require('../models/recipe');

const recipesControllers = {
    getAllRecipes: async(req,res)=>{
        let recipes;
        let error = null;
        try{
            recipes = await Recipe.find()
        }catch(err){
            error = err
        }

        res.json({
            response: error ? 'ERROR' : recipes,
            success: error ? false : true,
            error: error
        })

    },
    getOneRecipe: async(req, res) => {
        const id = req.params.id;
        let recipe;
        const error = null;
        try {
            recipe = await Recipe.findOne({ _id: id })
        } catch (err) { error = err }
        res.json({
            res: error ? 'ERROR' : recipe,
            success: error ? false : true,
            error: error
        })
    },
    getRecipesByCategory: async(req, res) => {
        const category = req.params.category;
        let recipe;
        let error = null;
        try {
            recipe = await Recipe.find({ category: { $elemMatch : { name: category } }} )
            
            console.log(recipe) //recipe es un array de objetos
        } catch (err) { error = err }
        res.json({
            res: error ? 'ERROR' : recipe,
            success: error ? false : true,
            error: error
        })
    },
    getRecipesByChef: async(req, res)=> {
        const chefId = req.params.chefId;
        let recipe;
        const error = null;
        try {
            recipe = await Recipe.findOne({ chefId: chefId })
        } catch (err) { error = err }
        res.json({
            res: error ? 'ERROR' : recipe,
            success: error ? false : true,
            error: error
        })
    },
    addRecipe: async(req, res) =>{
        const { category, videoTitle, videoUrl, thumbnail } = req.body
        let recipe;
        let error = null;
        try {
            recipe = await new City({
                category: category,
                videoTitle: videoTitle,
                videoUrl: videoUrl,
                thumbnail: thumbnail
            }).save()
        } catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    }
}


module.exports = recipesControllers