const Category = require('../../Model/categoryModel')

const getCategories = async(req,res)=>{
    try{
        const fetchCatgory = await Category.find({isBlocked:false})
        res.json(fetchCatgory)
    }catch(err){
        console.log(err)
    }
}


module.exports = {
    getCategories
}