const router = require('express').Router();

const cardRouter = require('./card.router');
const listRouter = require('./list.router');

router.use('/cards', cardRouter);
router.use('/lists', listRouter);

module.exports = router;
