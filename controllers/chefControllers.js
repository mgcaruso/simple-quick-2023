const Chef = require('../models/chef');

const chefsControllers = {
    getAllChefs: async(req,res)=>{
        let chefs;
        let error = null;
        try{
            chefs = await Chef.find()
        }catch(err){
            error = err
        }

        res.json({
            response: error ? 'ERROR' : chefs,
            success: error ? false : true,
            error: error
        })

    },
    getOneChef: async(req, res) => {
        const id = req.params.id;
        let chef;
        let error = null;
        try {
            chef = await Chef.findOne({ _id: id })
        } catch (err) { error = err }
        res.json({
            res: error ? 'ERROR' : chef,
            success: error ? false : true,
            error: error
        })
    }
    
}


module.exports = chefsControllers