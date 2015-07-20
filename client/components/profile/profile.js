var currentImage = null;

var uploadImage = function() {
  var reader;
  if (currentImage) {
    reader = new FileReader;
    reader.onload = function(e) {
      return Meteor.call('uploadImage', Meteor.userId(), e.target.result, function(error) {
        if (error) {
          return console.log(error.message);
        } else {
          return console.log('Image uploaded');
        }
      });
    };
    return reader.readAsBinaryString(currentImage);
  }
};



Template.profile.helpers({
  fieldUsername: function() {
    return {
      data: this,
      defaultValue: this.getUsername(),
      placeholder: 'Username',
      scope: 'user',
      path: 'username',
      iconSymbol: '@'
    };
  },
  fieldName: function() {
    return {
      data: this,
      defaultValue: this.getName(),
      placeholder: 'Name',
      scope: 'user',
      path: 'profile.name',
      icon: 'user'
    };
  },
  fieldEmail: function() {
    return {
      data: this,
      defaultValue: this.getPublicEmail(),
      placeholder: 'Public email',
      scope: 'user',
      path: 'profile.email',
      icon: 'envelope'
    };
  }
});

Template.profile.events({
  'changed .EditableFiled': function(event, template, data) {
    var ref, user;
    user = (ref = template.data) != null ? ref.user : void 0;
    if (!user) {
      return;
    }
    console.log('user.profile.subscribers: ' + user.profile.subscribers);
    data = data.user;
    return user.merge(data);
  },
  'change #newPhoto': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      file.owner = Meteor.userId();
        Images.insert(file, function (err, fileObj) {
          if (err){
             console.log('error insert');
          } else {
            console.log('image insert');
            console.log('fileObj url' + fileObj.url());
            var path = '/uploads/images-' + fileObj._id + "-" + fileObj.name();
            PhotosCollection.create({
              owner: Meteor.userId(),
              url: path
            }, function (err, id) {
              if (err) {
                console.log(err.message);
              } else {
                console.log('Photo uploaded!');
              }
            });
          }
        });
    });
  }
});
