const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/shoppingListController');


router.use(auth);

router.get('/', ctrl.getLists);
router.post('/', ctrl.createList);
router.delete('/:id', ctrl.deleteList);
router.post('/:id/items', ctrl.addItem);
router.delete('/:listId/items/:itemId', ctrl.removeItem);
router.patch('/:listId/items/:itemId/toggle', ctrl.toggleItem);

module.exports = router;
