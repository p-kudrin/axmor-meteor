var helpers;

helpers = {
  valueFromPath: function(object, path) {
    if (object == null) {
      object = {};
    }
    return ObjAndPath.valueFromPath(object, path);
  },
  nameFromPath: function(base, path) {
    return ObjAndPath.valueFromPath(base, path);
  },
  isHomePage: function() {
    return Router.current() instanceof HomeController;
  }
};

_(helpers).map(function(value, key) {
  return Blaze.registerHelper(key, value);
});