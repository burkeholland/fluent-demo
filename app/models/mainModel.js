var observableModule = require('data/observable');
var observableArrayModule = require('data/observable-array');

var model = new observableModule.Observable();

model.reddit = new observableArrayModule.ObservableArray([]);

module.exports = model;