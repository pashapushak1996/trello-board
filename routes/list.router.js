const router = require('express').Router();

const { listController } = require('../controllers');

router.get('/', listController.getAllLists);

router.post('/', listController.createList);

router.put('/:listId', listController.updateList);

router.delete('/:listId', listController.deleteList);

module.exports = router;
