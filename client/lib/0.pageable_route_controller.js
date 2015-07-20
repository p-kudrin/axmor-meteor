var varName = function (inst, name) {
	if (name == null) {
    	name = null;
  	}
 	name = name && ("_" + name) || "";
 	return "" + inst.constructor.name + name + "_limit";
};

PagableRouteController = RouteController.extend({
	pageable: true,
	perPage: 20,
	limit: function (name) {
		if (name == null) {
    	name = null;
  	}
		return Session.get(varName(this, name)) || this.perPage;
	},
	incLimit: function(name, inc) {    	
    	inc || (inc = this.perPage);
    	return Session.set(varName(this, name), this.limit(name) + inc);
 	},
 	resetLimit: function(name) {    	
    	return Session.set(varName(this, name), null);
  	},
  loaded: function (name) {
  	return true;
  }
});
