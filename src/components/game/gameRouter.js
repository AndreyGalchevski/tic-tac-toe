const { Router } = require('express');
const gameController = require('./gameController');

const router = new Router();

router.put('/make-move', gameController.makeMove);

module.exports = router;
