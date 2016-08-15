'use strict';

const path = require('path');
const fs = require('fs');
const config = require('../../config/defaults');
const dataPath = config.dataPaths;

class Character {
  constructor(name, game) {
    this.name = name;
    this.game = game;
    this.path = path.join(__dirname, '../../', dataPath[this.game], `${this.name}.json`);
  }

  exists() {
    const p = new Promise((resolve, reject) => {
      fs.stat(this.path, (err, _) => {
        if (err) {
          reject(new Error(`${this.name} not found`));
        } else {
          resolve(this);
        }
      });
    });

    return p;
  }

  frames() {
    const p = new Promise((resolve, reject) => {
      fs.readFile(this.path, (err, contents) => {
        if (err) {
          reject(new Error('Failed to get frame data'));
        } else {
          resolve(contents);
        }
      });
    });

    return p;
  }
}

module.exports = Character;
