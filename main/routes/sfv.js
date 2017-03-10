'use strict';

const express = require('express');
const router = express.Router();
const Character = require('../resources/character');
const game = 'sfv';

router.get('/s:version/:name', function(req, res, next) {
  res.set('Content-Type', 'application/json');

  const character = new Character(req.params.name, game, req.params.version);
  if (!(character.validVersion())) {
    res.status(400).json({
      game, message: "Version must either be '1' or '2'"
    })
  }

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
