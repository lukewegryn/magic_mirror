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
		var destinations = infoArray[1];
		var apikey = infoArray[2];
		console.log("MMM-DriveTime about to call this.destinationRequest");
		this.destinationRequest(home,destinations,apikey);
	},

	destinationRequest: function(home,destinations,apikey) {
		var self = this;
		var destination_list = destinations.split(';');
		console.log("desination_list");
		var google_maps_api_dict = {};
		console.log('Destination Request');
		for (var dest in destination_list){
			var dest_name = dest.split(':')[0];
			var dest_address = dest.split(':')[1];
			google_maps_api_dict[dest_name] = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+escape(home)+"&destinations="+ escape(dest_address) + "&language=en-US&key=" + apikey);
		}
		console.log(google_maps_api_dict);
		console.log("stuffed everything into destination_list");
		var json_dict = {};
		var finished_request = 0;
		for (var key in google_maps_api_dict){
			request
			      .get(google_maps_api_dict[key])
			      .on('response', function(response){
					if(response.statusCode == 200){
						console.log("Got response from Google API");
						var result = JSON.parse(response.body);
						console.log(result);
						json_dict[key] = result;	
						finished_request++;
					}
					finished_request++;
				});
		}
		console.log(json_dict);
		//while(finished_request != google_maps_api_list.length){}
		self.sendSocketNotification("DRIVE_TIME_DESTINATION_RESULT", json_list);
		console.log("Sent Drive TimeSocket Notification");
	}
});
