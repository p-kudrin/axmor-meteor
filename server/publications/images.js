Meteor.publish('images', function(userId, limit){
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
    cursor = ImagesCollection.find({
      owner: userId
    });
  } else {
    var acc = UsersCollection.findOneUser(this.userId);
    console.log('acc ' + acc);
    cursor = ImagesCollection.findByUsers(acc.profile.subscribers);
  }
  return cursor
});