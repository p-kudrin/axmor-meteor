Router.route("/subscription", {
	name: "subscription"
});

SubscriptionController = RouteController.extend({
	isUserPresent: function() {
    return !!Meteor.userId();
  },
	action: function(){
		console.log('Subscription Controller');
    this.render();
  },
  waitOn: function () {
    return [this.subscribe('images')];
  },
  data: function() {
    if (this.isUserPresent()) {
      return {        		
        photos: ImagesCollection.findByUsers()
      };
    }
  }
});