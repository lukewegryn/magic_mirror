//drivetime.js

Module.register("MMM-DriveTime",{
	// Default module config.
	result: [],
	defaults: {
		home: '1431 Lillington Drive, Raleigh, NC 27607',
		destinations: 'IBM:4205 S Miami Blvd Durham NC 27703;Cisco: 7025-2 Kit Creek Rd Durham NC 27709;',
		apiKey: 'AIzaSyASXRGNndi7hRMOxiMrT1PdGbQ8NtLfydE',
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		var self = this;

		var home = this.config.home;
		var destinations = this.config.destinations;
		var apiKey = this.config.apiKey;

		var payload = home + "\n" + destinations + "\n" + apiKey;

		//Do this once first
		self.sendSocketNotification('BEGIN', payload);
		
		//Then every 5 minutes
		setInterval(function() {
		        self.sendSocketNotification('BEGIN', payload);
    		}, 20000); //perform every 5 min (10,000 milliseconds)
	},
	
	// Override dom generator.
	getDom: function() {
		console.log("Updating MMM-DriveTime DOM.");

		var wrapper = document.createElement("div");
		wrapper.className = "bright small";
		if(this.json !==null){	
//			var title = document.createElement("span");
//			title.className = "xsmall dimmed"
//			title.innerHTML = "DRIVE TIME";
//
//			var line = document.createElement("hr");
//			line.className = "dimmed"

//			wrapper.appendChild(title);
//			wrapper.appendChild(line);

			var tableWrapper = document.createElement("table");
			tableWrapper.className = "small";
			for (var i=0; i < this.json.length; i++){
				var eventWrapper = document.createElement("tr");
				eventWrapper.className = "normal";
				
				var addressNameWrapper = document.createElement("td");
				addressNameWrapper.className = "bright small";
				
				var addressName = document.createElement("span");
				addressName.innerHTML = this.json[i].name;
				
				addressNameWrapper.appendChild(addressName);
				
				var timeWrapper = document.createElement("td");
				timeWrapper.className = "bright small";
				
				var time = document.createElement("span");
				time.innerHTML = this.json[i].rows[0].elements[0].duration_in_traffic.text;
				
				timeWrapper.appendChild(time);

				eventWrapper.appendChild(addressNameWrapper);
				eventWrapper.appendChild(timeWrapper);

				tableWrapper.appendChild(eventWrapper);
			}
			
			wrapper.appendChild(tableWrapper);
		} else {
			wrapper.innerHTML = "Oops... Something went wrong";
		}
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
			console.log("Payload back in MMM-DriveTime:");
			console.log(payload);
			this.json = payload;
			this.updateDom();
		}
	}
});
