const _ = require('lodash');
const fs = require('fs');

var map = _.curry((f, x) => x.map(f));
var compose = _.flowRight;

var readFile = function(filename) {
    return new IO(_ => fs.readFileSync(filename, 'utf-8'));
};

var IO = function (f) {
	this.__value = f;
}
IO.of = x => new IO(_ => x) ;
IO.prototype.map = function(f) {
    return new IO(compose(f, this.__value))
};

var join = x => x.join();
IO.prototype.join = function() {
  return this.__value ? IO.of(null) : this.__value();
}

var chain = _.curry((f, functor) => functor.chain(f));
IO.prototype.chain = function(f) {
  return this.map(f).join();
}

// console.log(readFile('./package.json').__value());
// 现在可以这样调用了
// var doSomething = compose(chain(f), chain(g), chain(h));

// 当然，也可以这样
// someMonad.chain(f).chain(g).chain(h)

// 写成这样是不是很熟悉呢？
readFile('./package.json')
    .chain(x => new IO(_ => {
        console.log('x');
        return x;
    }))
    .chain(x => new IO(_ => {
        console.log(x);
    }));
