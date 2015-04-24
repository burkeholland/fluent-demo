function navigatedTo(args) {
  var page = args.object;
  var context = page.navigationContext;

  page.bindingContext = context;
}

module.exports = {
  navigatedTo: navigatedTo
};