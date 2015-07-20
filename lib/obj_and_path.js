this.ObjAndPath = {
  valueFromPath: function(object, path) {
    var i, j, len, ref;
    if (object == null) {
      object = {};
    }
    ref = path.split('.');
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      object = object[i];
      if (!object) {
        return null;
      }
    }
    return object;
  },
  nameFromPath: function(base, path) {
    path = path.split('.').join('][');
    if (path) {
      path = "[" + path + "]";
    }
    return "" + base + path;
  }
};