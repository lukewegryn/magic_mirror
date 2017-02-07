/* Magic Mirror
 * Node Helper: MMM-DailyBibleVerse
 *
 * By Arthur Garza
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');
var async = require('async');

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
		var dest_names = [];
		var dest_addresses = [];
		for (var i=0; i < destination_list.length; i++){
			if(destination_list[i] !== ""){
				dest_names.push(destination_list[i].split(':')[0]);
				var dest_address = destination_list[i].split(':')[1];
				dest_addresses.push("https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + escape(home) + "&destinations="+ escape(dest_address) + "&language=en-US&key=" + apikey + "&departure_time=now");
			}
		}
		var fetch = function(url,cb){
			request.get(url, function(err,response,body){
				if ( err){
					cb(err);
				} else {
					cb(null, body); // First param indicates error, null=> no error
				}
			});
		};
		async.map(dest_addresses, fetch, function(err, results){
			if ( err){
				// either file1, file2 or file3 has raised an error, so you should not use results and handle the error
			} else {
				var result_array = [];
				for (var i = 0; i < results.length; i++){
					var curr_result = JSON.parse(results[i]);
					curr_result.name = dest_names[i];
					result_array.push(curr_result);
				}
				self.sendSocketNotification("DRIVE_TIME_DESTINATION_RESULT", result_array);
			}
		});
	}
});
