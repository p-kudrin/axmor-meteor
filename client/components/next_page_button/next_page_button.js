Template.nextPageButton.helpers({
  loaded: function() {
    var ctrl = Router.current();
    if (ctrl.pageable) {
      return ctrl.loaded(this.name);
    } else {
      return true;
    }
  }
});

Template.nextPageButton.events({
  'click .NextPageButton': function(event) {
    var ctrl = Router.current();
    if (ctrl.pageable) {
      return ctrl.incLimit(this.name, this.perPage);
    }
  }
});
