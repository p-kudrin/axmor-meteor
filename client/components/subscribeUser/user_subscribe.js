Template.subscribeUser.events({
	'click .sub': function (event, template, data) {
		var ref, user;
    		user = (ref = template.data) != null ? ref.user : void 0;
    	if (!user || Meteor.userId() == user._id) {
      		return;
    	}
		var acc = UsersCollection.findOne({_id: Meteor.userId()});
		console.log('accId : ' + acc._id + ' userId: ' + user._id);
		acc.subscribeUser(user._id);
		console.log('subscribe!!');
	}
});