_.deepExtend = function(target, source) {
  var prop;
  for (prop in source) {
    if (_.isObject(target[prop])) {
      _.deepExtend(target[prop], source[prop]);
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
};