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