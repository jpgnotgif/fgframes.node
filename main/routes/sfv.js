'use strict'

const express = require('express');
const router = express.Router();
const Character = require('../resources/character');
const game = 'sfv';

router.get('/:name', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  const character = new Character(req.params.name, game);

  if (character.exists()) {
    character.frames((err, data) => {
      res.send(data);
    });
  } else {
      res.status(404).json({
        message: `${character.name} was not found`
      });
  }
});

module.exports = router;
