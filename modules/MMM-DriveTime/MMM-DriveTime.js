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
		self.sendSocketNotification('START', payload);
		
		//Then every hour
		setInterval(function() {
		        self.sendSocketNotification('START', payload);
    		}, 10000); //perform every 10 seconds (10,000 milliseconds)
	},
	
	// Override dom generator.
	getDom: function() {
		Log.log("Updating MMM-DriveTime DOM.");
		
		var destination = "";
		var driveTime = "";

		if(this.driveTime !== null && this.destination !== null){
			driveTime = this.driveTime;
			destination = this.destination;
		}

		var wrapper = document.createElement("div");
		wrapper.className = "bright small";
		wrapper.innerHTML = desination + ": " + driveTime;
		return wrapper;
    	},

	getScripts: function() {
	    return [];
	        //this.file('jquery-3.1.1.min.js'), // this file will be loaded straight from the module folder.
	},

	socketNotificationReceived: function(notification, payload) {
		Log.log("socket received from Node Helper");
		if(notification == "DESTINATION"){
			var json = payload;
			Log.log(payload);
			this.driveTime = json.rows.elements.duration.text;
			this.destination = json.destination_addresses;

			this.updateDom();
		}
	}
});
