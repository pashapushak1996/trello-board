const router = require('express').Router();

const { cardController } = require('../controllers');

router.get('/', cardController.getAllCard);

router.post('/', cardController.createCard);

router.put('/:cardId', cardController.updateCard);

router.delete('/:cardId', cardController.deleteCard);

module.exports = router;
