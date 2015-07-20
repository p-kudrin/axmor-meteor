var slice = [].slice;

_.extend(SimpleSchema, {
  build: function() {
    var i, len, obj, objects, result;
    objects = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    result = {};
    for (i = 0, len = objects.length; i < len; i++) {
      obj = objects[i];
      _.extend(result, obj);
    }
    return new SimpleSchema(result);
  },
  timestamp: {
    createdAt: {
      type: Date,
      denyUpdate: true,
      autoValue: function() {
        if (this.isInsert) {
          return new Date;
        }
        if (this.isUpsert) {
          return {
            $setOnInsert: new Date
          };
        }
        return this.unset();
      }
    },
    updatedAt: {
      type: Date,
      autoValue: function() {
        return new Date;
      }
    }
  }
});
