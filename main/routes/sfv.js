'use strict';

const express = require('express');
const router = express.Router();
const Character = require('../resources/character');
const game = 'sfv';

router.get('/:name', function(req, res, next) {
  res.set('Content-Type', 'application/json');
  const character = new Character(req.params.name, game);

  character.exists()
    .then((character) => {
      character.frames()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(404).json({
            game, message: err.message
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        game, message: err.message
      });
    });
});

module.exports = router;
