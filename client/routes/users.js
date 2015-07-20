Router.route('/users', {
  name: 'users'
});

UsersController = PagableRouteController.extend({
	repPage: 20,
	subscriptions: function() {
		return this.subscribe('users', this.limit());
	},
	data: function () {
		return {
			users: UsersCollection.find()
		};
	},
	loaded: function () {
		return this.limit() > UsersCollection.find().count();
	},
	onRun: function () {
		this.resetLimit();
		return this.next();
	}
});