'use strict';

const path = require('path');
const fs = require('fs');
const config = require('../../config/defaults');
const dataPath = config.dataPaths.sfv;

class Character {
  constructor(name, game) {
    this.name = name;
    this.game = game;
    this.path = path.join(__dirname, '../../', dataPath, `${this.name}.json`);
  }

  exists() {
    fs.stat(this.path, (err, _) => {
      if (err) {
        console.log(`Error: ${err.message}`);
        console.log(err.stack);
        return false;
      }
    });
    return true;
  }

  frames(cb) {
    fs.readFile(this.path, (err, contents) => {
      if (err) {
        console.log(`Error: ${err.message}`);
        console.log(err.stack);
        return { message: 'Failed to get frame data' };
      }
      return cb(err, contents);
    });
  }
}

module.exports = Character;
