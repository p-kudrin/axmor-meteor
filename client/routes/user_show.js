Router.route("/users/:id", {
	name: "users_show"
});

UsersShowController = PagableRouteController.extend({
	template: 'profile',
	waitOn: function () {
		return [this.subscribe('user', this.params.id),
                  this.subscribe('images', this.params.id)];
	},
	data: function () {
		return {
      		user: UsersCollection.findOneUser(this.params.id),
      		photos: ImagesCollection.find()
    	};
	}
});