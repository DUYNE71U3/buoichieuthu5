var express = require('express');
const { ConnectionCheckOutFailedEvent } = require('mongodb');
var router = express.Router();
let categoryModel = require('../schemas/category');

/* GET all categories */
router.get('/', async function(req, res, next) {
  let categories = await categoryModel.find({});
  res.status(200).send({
    success: true,
    data: categories
  });
});

/* POST create new category */
router.post('/', async function(req, res, next) {
  try {
    let newCategory = new categoryModel({
      name: req.body.name,
      description: req.body.description
    });
    await newCategory.save();
    res.status(200).send({
      success: true,
      data: newCategory
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

/* PUT update category */
router.put('/:id', async function(req, res, next) {
  try {
    let updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).send({ success: false, message: "Category not found" });
    }
    res.status(200).send({
      success: true,
      data: updatedCategory
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

/* DELETE delete category */
router.delete('/:id', async function(req, res, next) {
  try {
    let deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).send({ success: false, message: "Category not found" });
    }
    res.status(200).send({
      success: true,
      message: "Category deleted"
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
