var Users = Meteor.users;

_.extend(Users, {
	allowFieldsForUpdate: ['profile', 'username'],
    findUser: function(id, options) {    	
    	return Users.find({
      		$or: [
        	{
          		_id: id
        	}, {
          		username: id
        	}
      	]
    	}, options);
  	},
  	findOneUser: function(id, options) {
    	return Users.findOne({
      		$or: [{
          		_id: id
        	}, {
          		username: id
        	}]},
        options);
  	}
});

Users.helpers({
	update: function (data) {
		return Users.update(this._id, data);
	},

	set: function (data) {
		var key, d = {};
		var f = _(Users.allowFieldsForUpdate);
		for (key in data) {
			if (f.include(key)) {
				console.log('data[key]' + data[key]);
				for (var l in data[key]) {
					console.log('keyL: ' + l + ' valL: ' + data[key][l]);
				}
				d[key] = data[key];
			}			
		}
		console.log('set: ' + d);
		return this.update({$set: d});
	},

	merge: function (data) {
		var current = this.get();
		for (var key in current) {
			console.log('keyP: ' + key + ' valP: ' + current[key]);			
		}
		for (var k in data) {
			console.log('keyD: ' + k + ' valD: ' + data[k]);
			for (var l in data[k]) {
				console.log('keyL: ' + l + ' valL: ' + data[k][l]);
			}
		}		
		console.log('current: ' + current.profile.subscribers);
		return this.set(_.deepExtend(current, data));
	},

	get: function () {
		var key, r = {};
		var ref = _(this).keys();
		for (key in ref) {
			console.log('keyG: ' + key + ' valG: ' + ref[key]);
			r[key] = ref[key];
		}
		return r;
	},

	subscribeUser: function (userId) {
    	if (!this.profile || !this.profile.subscribers) {
      		return;
    	}
    	console.log('subscribePush');
    	this.update({$addToSet: {"profile.subscribers": userId}})
    	return;
	},

	alreadySubscribe: function () {
		console.log('MeteorId: ' + Meteor.userId() + ' userId: ' + this._id);
    	var acc = Users.findOneUser(Meteor.userId());
    	if (!acc.profile || !acc.profile.subscribers) {
      		return;
    	}
		return Meteor.userId() == this._id || _.contains(acc.profile.subscribers, this._id);
	},

	getEmails: function () {		
		var p = this.profile ? [this.profile.email] : [];
		var s = _(this.services).map(function (value, key) {
			return value != null ? value.email : void 0;
		});
		var e = _(this.emails).map(function (value, key) {
			return value != null ? value.address : void 0;
		});
		return _.compact(p.concat(e, s));
	},

	getEmail: function () {
		return this.getEmails()[0];
	},

	getUsername : function () {
		return this.username || this._id;
	},

	getName : function () {
		return this.profile ? this.profile.name : "Anonymous";
	},

	getPublicEmail : function () {
		return this.profile ? this.profile.email : void 0;
	},

	urlData : function () {
		return { id: this.getUsername() };
	},

	getAvatar: function(size) {
    	var email, hash, options, ref;
    	size = Number(size) || 200;
    	options = {
      		s: size,
      		d: 'identicon',
      		r: 'g'
    	};
    	hash = "00000000000000000000000000000000";
    	if (email = this.getPublicEmail()) {
      		hash = Gravatar.hash(email);
    	} else {
      		hash = ((ref = this.profile) != null ? ref.emailHash : void 0) || hash;
    	}
    	return Gravatar.imageUrl(hash, options);
  	},

	isFromGithub : function () {
		return this.service == 'github';
	},

	isFromGoogle : function () {
		return this.service == 'google';
	},

	isFromPassword : function () {
		return this.service == 'password';
	},

	isEditable: function () {
		return this._id == Meteor.userId();
	}
});

Users.allow({
	update: function (userId, doc) {
		console.log("insert DB!");
		return doc.owner == userId;
	}
});

this.UsersCollection = Users; 