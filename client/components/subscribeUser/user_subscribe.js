Template.subscribeUser.events({
	'click .sub': function (event, template, data) {
		var ref, user;
    		user = (ref = template.data) != null ? ref.user : void 0;
    	if (!user || Meteor.userId() == user._id) {
      		return;
    	}
		var acc = UsersCollection.findOne({_id: Meteor.userId()});
		acc.subscribeUser(user._id);
	}
});