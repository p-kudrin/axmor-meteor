Router.route("/users/:id", {
	name: "users_show"
});

UsersShowController = PagableRouteController.extend({
	template: 'profile',
	waitOn: function () {
		return [this.subscribe('user', this.params.id),
                  this.subscribe('photos', this.params.id),
                  this.subscribe('images')];
	},
	data: function () {
		return {
      		user: UsersCollection.findOneUser(this.params.id),
      		photos: ImagesCollection.findByUser(this.params.id)
    	};
	}
});