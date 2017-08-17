'use strict';

const _ = require('lodash');

class Version {

  constructor(number) {
    this.number = number;
    this.validVersions = ['1', '2', '2.2'];
    this.errorMessage = `Version must be one of the following: ${this.validVersions}`;
  }

  valid() {
    return _.includes(this.validVersions, this.number)
  }
}

module.exports = Version;
