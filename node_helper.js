'use strict';

/* Magic Mirror
 * Module: MMM-backlog
 *
 * By Stefan Krause http://yawns.de
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
		this.config = null;
	},

	getData: function() {
		var self = this;
		
		//var myUrl = this.config.url;
		//var myUrl = "http://" + this.config.ip + ":" + this.config.port + "/JSON?request=getstatus&ref=" + this.config.ref;
		var ip = this.config.ip;
		var port = this.config.port;
		var ref = this.config.ref;
        var myUrl = "http://" + ip + ":" + port + "/JSON?request=getstatus&ref=" + ref;

		request({
			url: myUrl,
			method: 'GET',
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				self.sendSocketNotification("DATA", body);
			}
		});

		setTimeout(function() { self.getData(); }, this.config.refreshInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG' && self.started == false) {
			self.config = payload;
			self.sendSocketNotification("STARTED", true);
			self.getData();
			self.started = true;
		}
	}
});
