module.exports = function() {
	var self = {};

	var package = require("./package.json");
	
	self.name = package["name"];
	self.version = package["version"];
	self.dependencies = [
		"cerus",
		"cerus-settings",
		"cerus-router",
		"cerus-uuid"
	];

	var sessions;

	self.init_ = function(cerus) {
		sessions = require("./lib/sessions")(cerus);

		cerus.router().use()
		.then(function(req, res) {
			var sessions_ = sessions.get(res, req);

			res.sessions = function() {
				return sessions_;
			}
		});
	}

	return self;
}