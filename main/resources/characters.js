'use strict';

const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const config = require('../../config/defaults');
const dataPath = config.dataPaths;

class Characters {
  constructor(game, version) {
    this.game = game;
    this.version = version;
    this.path = path.join(
      __dirname,
      '../../',
      dataPath[this.game],
      `s${version}`
    );
  }

  basename(name) {
    return path.basename(name, '.json');
  }

  list() {
    const p = new Promise((resolve, reject) => {
      fs.readdir(this.path, (err, files) => {
        if (err) {
          reject(new Error('Characters not found'));
        } else {
          resolve(_.flatMap(files, this.basename));
        }
      });
    });
    return p;
  }
}

module.exports = Characters;