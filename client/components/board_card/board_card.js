Template.boardCard.helpers({
  getOwner: function () {
    return UsersCollection.findOne(this.owner);
  }
});