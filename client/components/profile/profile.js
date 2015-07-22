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
        var fsFile = new FS.File(file);
        fsFile.owner = Meteor.userId();
        Images.insert(fsFile, function (err, fileObj) {
          if (err){
             console.log('error insert');
          } else {
            console.log('image insert');                    
          }
        });
    });
  }
});
