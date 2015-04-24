var model = require('./models/mainModel');
var httpModule = require('http');
var frameModule = require('ui/frame');

var url = 'http://www.reddit.com/.json?after=';
var after;

var loadItems = function() {
  httpModule.getJSON(url + after).then(function(response) {
    after = response.data.after;
    response.data.children.forEach(function(item) {
      model.reddit.push({
        title: item.data.title,
        url: item.data.url
      });
    });
  });
};

exports.pageLoaded = function(args) {
  page = args.object;
  page.bindingContext = model;

  // navigation controller reference
  var controller = page.ios.navigationController;

  // f-13 show navigation bar
  controller.navigationBarHidden = false;

  // change title 
  page.ios.title = 'Top';

  // f-14 set color
  // change bar color, this time with RGB instead of system constant
  controller.navigationBar.barTintColor = UIColor.colorWithRedGreenBlueAlpha(0.81, 0.89, 0.97, 1);

  loadItems();
};

exports.itemTap = function(args) {
  var item = model.reddit.getItem(args.index);
  frameModule.topmost().navigate({
    moduleName: 'browser',
    context: item
  });
};

exports.loadMoreItems = function() {
  loadItems();
};