var photosSchema = SimpleSchema.build(SimpleSchema.timestamp, {    
  'owner': {
    type: String,
    autoValue: function(doc) {
      if (this.isInsert) {
        return this.userId;
      }
      if (this.isUpsert) {
        return {
          $setOnInsert: this.userId
        };
      }
      return this.unset();
    }
  },
  'url': {
    type: String,
    optional: true
  }
});

var Photos = new Mongo.Collection('photos');

Photos.attachSchema(photosSchema);

Photos.allow({
  insert: function() {
    return true;
  }
});

_.extend(Photos, {
  findByUser: function(userId, options) {
    if (userId == null) {
      userId = Meteor.userId();
    }
    return Photos.find(
      {
        owner: userId
      }
      , options);
  },
  findByUsers: function(users, options) {
    if (!users) {
      var acc = UsersCollection.findOne({_id: Meteor.userId()});
      users = acc.profile.subscribers;
    }
    return Photos.find({
      owner: {$in: users}
    }, options);
  },  
  create: function(data, cb) {
    return Photos.insert(data, cb);
  }
});

Photos.helpers({
  getOwner: function () {
    return UsersCollection.findOne(this.owner);
  }
})

this.PhotosCollection = Photos;