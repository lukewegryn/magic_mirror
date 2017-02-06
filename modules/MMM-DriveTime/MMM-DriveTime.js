//drivetime.js

Module.register("MMM-DriveTime",{
	// Default module config.
	result: [],
	defaults: {
		home: '1431 Lillington Drive, Raleigh, NC 27607',
		destination: '4205 S Miami Blvd Durham NC 27703',
		apiKey: 'AIzaSyASXRGNndi7hRMOxiMrT1PdGbQ8NtLfydE',
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;

		var home = this.config.home;
		var destination = this.config.destination;
		var apiKey = this.config.apiKey;

		var payload = home + "\n" + destination + "\n" + apiKey;

		//Do this once first
		self.sendSocketNotification('BEGIN', payload);
		
		//Then every 5 minutes
		setInterval(function() {
		        self.sendSocketNotification('BEGIN', payload);
    		}, 300000); //perform every 5 min (10,000 milliseconds)
	},
	
	// Override dom generator.
	getDom: function() {
		console.log("Updating MMM-DriveTime DOM.");
		
		var destination = "Cisco";
		var driveTime = "10 minutes";

		if(this.driveTime !== null && this.destination !== null){
			driveTime = this.driveTime;
			destination = this.destination;
		}

		var wrapper = document.createElement("div");
		wrapper.className = "bright";
		wrapper.innerHTML = destination + ": " + driveTime;
		return wrapper;
    	},
 	getScripts: function() {
		return [
			this.file('jquery-3.1.1.min.js'), // this file will be loade    d straight from the module folder.
 		];
	},
	socketNotificationReceived: function(notification, payload) {
		console.log("MMM-Drive socket received from Node Helper");
		if(notification === "DRIVE_TIME_DESTINATION_RESULT"){
			var json = payload;
			console.log(payload);
			//console.log(json.rows[0].elements[0].duration_in_traffic.text);
			//this.driveTime = json.rows.elements.duration.text;
			//this.destination = json.destination_addresses;
			this.driveTime = "Drive Time";
			this.destination = "Destination";
			this.updateDom();
		}
	}
});
