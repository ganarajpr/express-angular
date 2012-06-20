var Proxy = require('node-proxy');
var EventEmitter = require('events').EventEmitter;
var ParentTrap = require('./lib/parentTrap');

function Step (name, sequence) {
  EventEmitter.call(this);
  this.name = name;
  this.sequence = sequence;
}

Step.prototype = {
  __proto__: EventEmitter.prototype,

  accepts: function (accepts) {
    this._accepts = accepts;
    return this;
  }
};


function Sequence (name, module) {
  this.name = name;
  this.module = module;
}

Sequence.prototype = {
  step: function (name) {
    var step = new Step(name, this);
    return Proxy.create(new ParentTrap(step, step.sequence), Object.prototype);
  }
};

var seq = new Sequence('hello', 'module');
console.log(
  seq
    .step('world')
      .accepts('wooo!!!')
    .step('foo')
      .accepts('aaaaa')
);
