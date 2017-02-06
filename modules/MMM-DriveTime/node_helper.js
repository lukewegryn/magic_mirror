/* Magic Mirror
 * Node Helper: MMM-DailyBibleVerse
 *
 * By Arthur Garza
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');

module.exports = NodeHelper.create({
	// Subclass start method.
	start: function() {
		console.log("Started node_helper.js for MMM-DriveTime.");
	},

	socketNotificationReceived: function(notification, payload) {
		console.log(this.name + " node helper received a socket notification: " + notification + " - Payload: " + payload);
		var infoArray = payload.split("\n");
		var home = infoArray[0];
		var destination = infoArray[1];
		var apikey = infoArray[2];
		this.destinationRequest(home,destination,apikey);
	},

	destinationRequest: function(home,desination,apikey) {
		var self = this;
		var googleMapsApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+escape(home)+"&destinations="+ escape(desination)+ "&language=en-US&key=" + apikey;

		request({ url: googleMapsApiURL, method: 'GET' }, function(error, response, body) {			
			if(!error && response.statusCode == 200){
				var result = JSON.parse(body);
				self.sendSocketNotification("DRIVE_TIME_DESTINATION_RESULT", result);
				console.log("sent Drive TimeSocket Notification");
			}
		});	
	}
});
