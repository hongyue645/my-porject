const asyncHandler = require('express-async-handler')

const ShoppingList = require('../models/shoppingListModel');
const User = require('../models/userModel')

// @desc    Get all shopping lisrs for logged-in user
// @route   GET /api/lists
// @access  Private
const getLists = asyncHandler(async (req, res) => {
  const lists = await ShoppingList.find({ user: req.user.id });
  res.status(200).json(lists);
});

// @desc    Set a new shopping List
// @route   POST /api/lists
// @access  Private
const createList = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a name field');
  }
  const list = await ShoppingList.create({
    user: req.user.id,
    name: req.body.name,
  });
  res.status(201).json(list);
});


// @desc    Delete list
// @route   DELETE /api/lists/:id
// @access  Private
const deleteList = asyncHandler(async (req, res) => {
  const list = await ShoppingList.findById(req.params.id);
  if (!list) {
    res.status(404);
    throw new Error('List not found');
  }
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  await list.remove();
  res.status(200).json({ id: req.params.id });
});

// @desc    Add an item to a shopping list
// @route   POST /api/lists/:id/items
// @access  Private
const addItem = asyncHandler(async (req, res) => {
   console.log('addItem body:', req.body)
  const { name, checked } = req.body;
  if (!name) {
    res.status(400);
    throw new Error('Please add an item name');
  }
  const list = await ShoppingList.findById(req.params.id);
  if (!list) {
    res.status(404);
    throw new Error('List not found');
  }
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  const isChecked = 
   checked === true || checked === 'true'
 list.items.push({ name, checked: isChecked });
  await list.save();
  res.status(201).json(list);
});

// @desc    Remove an item from a shopping list
// @route   DELETE /api/lists/:listId/items/:itemId
// @access  Private
const removeItem = asyncHandler(async (req, res) => {
  const { listId, itemId } = req.params;
  const list = await ShoppingList.findById(listId);
  if (!list) {
    res.status(404);
    throw new Error('List not found');
  }
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  const item = list.items.id(itemId);
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  item.remove();
  await list.save();
  res.status(200).json(list);
});

// @desc    Toggle an item's checked status
// @route   PATCH /api/lists/:listId/items/:itemId/toggle
// @access  Private
const toggleItem = asyncHandler(async (req, res) => {
  const { listId, itemId } = req.params;
  const list = await ShoppingList.findById(listId);
  if (!list) {
    res.status(404);
    throw new Error('List not found');
  }
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  const item = list.items.id(itemId);
  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }
  item.checked = !item.checked;
  await list.save();
  res.status(200).json(list);
});


module.exports = {
  getLists,
  createList,
  deleteList,
  addItem,
  removeItem,
  toggleItem,
};
