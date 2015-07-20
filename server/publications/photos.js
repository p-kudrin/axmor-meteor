Meteor.publish('photos', function(userId, limit) {
  if (limit == null) {
    limit = 20;
  }
  var findOptions = {
    limit: limit,
    sort: {
      createdAt: -1
    }
  };
  var cursor;
  if (userId) {
    cursor = PhotosCollection.findByUser(userId, findOptions);
  } else {
    var acc = UsersCollection.findOneUser(this.userId);
    cursor = PhotosCollection.findByUsers(acc.profile.subscribers, findOptions);
  }
  return cursor
});