var cookie = require("./cookie");
var session = require("./session");

var sessions = module.exports = function(cerus) {
	this._sessions = {};
	this._uuids = cerus.uuid();
};

sessions.prototype.get = function(response, request) {
	var key = request.cookie("_session");

	if(key === undefined) {
		key = this._uuids.generate();
	}
	else if(!this._uuids.check(key)) {
		key = this._uuids.generate();
	}

	var session_ = this._sessions[key];

	if(session_ === undefined) {
		session_ = new session(key);
	}

	this._sessions[key] = session_;

	response.cookies().add(create_cookie(response, new cookie("_session", key)));

	this.update();

	return this._sessions[key].data();
};

sessions.prototype.update = function() {
	var now = Date.now();

	for(var key in sessions) {
		if((now - this._sessions.date) > 2635200000) {
			this._sessions.destroy();
			delete this._sessions[key];
		}
	}
};

sessions.prototype.all = function() {
	return this._uuids.uuids();
};

sessions.prototype.destroy = function(uuid) {
	if(typeof uuid !== "string") {
		throw new TypeError("the argument uuid must be a string");
	}

	if(!this._uuids.uuids().includes(uuid)) {
		throw new Error("the specified uuid doesn't exist");
	}

	this._uuids.remove(uuid);
};

sessions.prototype.clear = function() {
	this._uuid.clear();
};

sessions.prototype.length = function() {
	return this._uuids.uuids().length;
};

sessions.prototype.set = function(uuid, value) {
	if(typeof uuid !== "string") {
		throw new TypeError("the argument uuid must be a string");
	}

	if(typeof value !== "object") {
		throw new TypeError("the argument value must be an object");
	}

	if(!this._uuids.uuids().includes(uuid) || this._sessions[uuid] === undefined) {
		throw new Error("the specified uuid doesn't exist");
	}

	this._sessions[uuid].data(value);
};

sessions.prototype.touch = function(uuid) {
	if(typeof uuid !== "string") {
		throw new TypeError("the argument uuid must be a string");
	}

	if(typeof value !== "object") {
		throw new TypeError("the argument value must be an object");
	}

	if(!this._uuids.uuids().includes(uuid) || this._sessions[uuid] === undefined) {
		throw new Error("the specified uuid doesn't exist");
	}

	this._sessions[uuid].touch();
};

sessions.prototype.secret = function() {
	// Empty
};

sessions.prototype.resave = function() {
	// Empty
};

sessions.prototype.rolling = function() {
	// Empty
};

sessions.prototype.safe = function() {
	// Empty
};

sessions.prototype.unset = function() {
	// Empty
};

var create_cookie = function(response, cookie) {
	return response.cookies.create(cookie._key, cookie._value, cookie._options);
};

/*
module.exports = function(cerus) {
	var self = {};

	var sessions = {};
	var uuids = cerus.uuid();

	self.get = function(response, request) {
		var key = request.cookie(cerus.settings().sessions().cookie().name());

		if(key == null) {
			key = uuids.generate();
		}
		else if(!uuids.check(key)) {
			key = uuids.generate();
		}

		var session = sessions[key];

		if(session == null) {
			session = {};
			session.data = {};
		}

		session.date = Date.now();
		sessions[key] = session;

		response.cookies().set(
			cerus.settings().sessions().cookie().name(),
			key,
			{
				age: cerus.settings().sessions().cookie().age(),
				path: cerus.settings().sessions().cookie().path(),
				same: cerus.settings().sessions().cookie().same(),
				secure: cerus.settings().sessions().cookie().secure(),
				http: cerus.settings().sessions().cookie().http()
			});

		self.update();

		return sessions[key].data;
	}

	self.update = function() {
		var now = Date.now();

		for(var key in sessions) {
			if((now - sessions.date) > 2635200000) {
				delete sessions[key];
			}
		}
	}
	
	return self;
}
*/