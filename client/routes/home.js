Router.route("/", {
	name: "home"
});

HomeController = RouteController.extend({	
  	isUserPresent: function() {
    	return !!Meteor.userId();
  	},
  	waitOn: function() {
    	if (this.isUserPresent()) {
      		return [this.subscribe('profile'),                  
                  this.subscribe('images', Meteor.userId())];
    	}
  	},
  	data: function() {
    	if (this.isUserPresent()) {
      		return {
        		user: UsersCollection.findOne(Meteor.userId()),
            photos: ImagesCollection.find()
      		};
    	}
  	},
  	action: function() {
    	if (this.isUserPresent()) {
      		return this.render('profile');
    	} else {
      		return this.render('home');
    	}
  	}
});