Meteor.publish('profile', function () {
	if (this.userId) {
		return UsersCollection.find({
			_id: this.userId
		},
		{
			fields: {
				service: 1,
				username: 1,
				profile: 1,
				emails: 1
			}
		});
	} else {
		this.ready();
	}
});