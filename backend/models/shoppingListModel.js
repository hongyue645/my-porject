const mongoose = require('mongoose')
const {Schema} = mongoose;
const itemSchema = new Schema({
  name: {type: String, required: true},
  checked: {type: Boolean, default:false}
});

const shoppingListSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name:{type: String, required:true},

    items: [itemSchema],
    createdAt:{type: Date, default:Date.now},
  }
);

module.exports = mongoose.model('ShoppingList', shoppingListSchema);
