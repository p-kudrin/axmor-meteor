var imageStore = new FS.Store.FileSystem('images');

Images = new FS.Collection('images', {
 stores: [imageStore]
});

Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

Images.allow({
 insert: function(){
 return true;
 },
 update: function(){
 return true;
 },
 remove: function(){
 return true;
 },
 download: function(){
 return true;
 }
});

_.extend(Images, {
  findByUser: function(userId, options) {
    if (userId == null) {
      userId = Meteor.userId();
    }
    return Images.find(
      {
        owner: userId
      }
      , options);
  },
  findByUsers: function(users, options) {
    if (!users) {      
      var acc = UsersCollection.findOne({_id: Meteor.userId()});
      console.log('findByUsers acc ' + acc);
      users = acc.profile.subscribers;
    }
    console.log('findByUsers users ' + users);
    return Images.find({
      owner: {$in: users}
    }, options);
  }
});

this.ImagesCollection = Images;