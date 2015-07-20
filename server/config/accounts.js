var emailTemplates = {
  from: 'AXMOR Share App <kupas@ngs.ru>',
  siteName: 'AXMOR.Meteor'
}

_.deepExtend(Accounts.emailTemplates, emailTemplates);

Accounts.config({
  sendVerificationEmail: false
});

Accounts.onCreateUser(function (options, user) {
  var u;
  if (options == null) {
    options = {};
  }
  u = UsersCollection._transform(user);
  options.profile || (options.profile = {});
  options.profile.subscribers = [];
  options.profile.emailHash = Gravatar.hash(u.getEmail() || "");
  if (user.services) {
    options.service = _(user.services).keys()[0];
  }
  return _.extend(user, options);
});

/*Meteor.startup(function () {
  console.log('start remove');
  UsersCollection.remove({});
  ImagesCollection.remove({});
  PhotosCollection.remove({});
  console.log('finish!!');
});*/