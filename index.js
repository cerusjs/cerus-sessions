module.exports = function() {
	var plugin = {};
	var package = require("./package.json");
	
	plugin.name = package["name"];
	plugin.version = package["version"];
	plugin.dependencies = [
		"cerus",
		"cerus-settings",
		"cerus-router",
		"cerus-uuid"
	];

	var sessions;

	plugin.init_ = function(cerus) {
		cerus.settings().setting("sessions.secret", "THIS_IS_A_SECRET");
		cerus.settings().setting("sessions.cookie.http", true);
		cerus.settings().setting("sessions.cookie.age", undefined);
		cerus.settings().setting("sessions.cookie.path", "/");
		cerus.settings().setting("sessions.cookie.same", true);
		cerus.settings().setting("sessions.cookie.secure", false);
		cerus.settings().setting("sessions.cookie.name", "_sessions");
		cerus.settings().setting("sessions.cookie.proxy", false);
		cerus.settings().setting("sessions.resave", false);
		cerus.settings().setting("sessions.rolling", false);
		cerus.settings().setting("sessions.safe", true);
		cerus.settings().setting("sessions.unset", false);

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