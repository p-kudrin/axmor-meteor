Template.editableField.helpers({
  value: function() {
    return ObjAndPath.valueFromPath(this.data, this.path);
  },
  name: function() {
    return ObjAndPath.nameFromPath(this.scope, this.path);
  },
  hasIcon: function() {
    return this.icon || this.iconSymbol;
  },
  inputGroupClass: function() {
    return (this.icon || this.iconSymbol) && 'input-group' || '';
  }
});

Template.editableField.events({
  'change .Field': function(event, template) {
    var data;
    data = $(event.target).serializeJSON();
    return $(template.firstNode).trigger('changed', [data]);
  }
});