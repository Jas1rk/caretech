const Category = require("../../Model/categoryModel");

const addCategory = async (req, res) => {
  try {
    const { category, description } = req.body;
    const findExist = await Category.findOne({ categoryName: category });
    if (findExist) {
      res.json("alreadyexist");
    } else {
      const newCategory = new Category({
        categoryName: category,
        categoryDescription: description,
      });
      await newCategory.save();
      res.json(newCategory);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const adminFetchCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({}).sort({ _id: -1 });
    res.json(allCategories);
  } catch (err) {
    console.log(err.message);
  }
};

const blockCategory = async (req, res) => {
  try {
    const categoryId = req.query.categId;
    const blockCategory = await Category.findByIdAndUpdate(categoryId, {
      isBlocked: true,
    });
    res.json(blockCategory);
  } catch (err) {
    console.log(err.message);
  }
};

const unblockCategory = async (req, res) => {
  try {
    const categoryId = req.query.categId;
    const unblockCategory = await Category.findByIdAndUpdate(categoryId, {
      isBlocked: false,
    });
    res.json(unblockCategory);
  } catch (err) {
    console.log(err.message);
  }
};

const editCategory = async(req,res)=>{
  try{
    const { categoryid,category,description} = req.body
    const updateCategory = await Category.updateOne({_id:categoryid},{$set:{
      categoryName:category,
      categoryDescription:description
    }})
    console.log("category updated",updateCategory)
    res.json(updateCategory)

  }catch(err){
    console.log(err.message);
  }
}

module.exports = {
  addCategory,
  adminFetchCategories,
  blockCategory,
  unblockCategory,
  editCategory
};
