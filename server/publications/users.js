Meteor.publish('users', function(limit) {
  if (limit == null) {
    limit = 20;
  }
  return UsersCollection.find({}, {
    fields: {
      service: 1,
      username: 1,
      profile: 1
    },
    limit: limit
  });
});