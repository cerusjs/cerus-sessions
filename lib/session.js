var session = module.exports = function(id) {
	this._id = id;
	this._date = Date.now();
	this._data = {};
};

session.prototype.data = function(data) {
	if(typeof data === "object") {
		this._data = data;
	}

	return this._data;
};

session.prototype.regenerate = function() {
	// Empty
};

session.prototype.destroy = function() {
	this._id = undefined;
	this._data = {};
};

session.prototype.reload = function() {
	// Empty
};

session.prototype.save = function() {
	// Empty
};

session.prototype.touch = function() {
	this._date = Date.now();
};

session.prototype.id = function() {
	return this._id;
};