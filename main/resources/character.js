'use strict';

const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const config = require('../../config/defaults');
const dataPath = config.dataPaths;

class Character {
  constructor(attrs) {
    this.name = attrs.name;
    this.game = attrs.game;
    this.version = attrs.version;
    this.normalsOnly = attrs.normalsOnly;
    this.path = path.join(__dirname, '../../', dataPath[this.game], `s${this.version}`, `${this.name}.json`);
  }

  validVersion() {
    return this.version == 1 ||
      this.version == 2;
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
      fs.readFile(this.path, 'utf8', (err, contents) => {
        if (err) {
          reject(new Error('Failed to get frame data'));
        } else {
          resolve(contents);
        }
      });
    });

    return p;
  }

  normalsWithMetadata(data) {
    const frameData = JSON.parse(data);
    const filteredData = {
      metadata: frameData.metadata,
      attacks: {}
    };
    const normals = _.each(frameData.attacks, (obj, name) => {
      if (obj.normal)
        filteredData.attacks[name] = obj;
    });
    return filteredData;
  }
}

module.exports = Character;
