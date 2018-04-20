module.exports = function() {
	var plugin = {};
	var package = require("./package.json");
	
	plugin.name = package["name"];
	plugin.version = package["version"];
	plugin.dependencies = [
		"cerus",
		"cerus-router",
		"cerus-uuid"
	];

	var sessions;

	plugin._init = function(cerus) {
		sessions = new (require("./lib/sessions"))(cerus);

		// TODO: Needs to be updated
		cerus.router().use()
		.then(function(req, res, next) {
			var sessions_ = sessions.get(res, req);

			res.sessions = function() {
				return sessions_;
			}

			next();
		});
	}

	return plugin;
}