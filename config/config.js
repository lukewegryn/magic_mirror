/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
	port: 8080,
	ipWhitelist: ["127.0.0.1","::ffff:127.0.0.1", "::1","::ffff:192.168.0.105","::ffff:192.168.0.108","::ffff:192.168.0.103"],
	zoom: 1.4,
	language: 'en',
	timeFormat: 12,
	units: 'imperial',

	modules: [
		{
			module: 'MMM-Remote-Control'
			// uncomment the following line to show the URL of the remote control on the mirror
			// , position: 'bottom_left'
			// you can hide this module afterwards from the remote control itself
    		},
//		{
//      		module: 'MMM-DailyBibleVerse',
//    		position: 'bottom_bar', // This can be any of the regions. Best result is in the bottom_bar as verses can take multiple lines in a day.
//        		config: {
//            			version: 'RSVCE' // This can be changed to any version you want that is offered by Bible Gateway. For a list, go here: https://www.biblegateway.com/usage/linking/versionslist/
//        			}
//   		},
		{
    			module: 'MMM-MirrorMirrorOnTheWall',
    			position: "middle_center",
    			config: {}
		},
		{
			module: 'alert',
		},
		{
			module: "updatenotification",
			position: "top_bar",
			disabled: "true",
		},
		{
			module: 'clock',
			position: 'top_left'
		},
		{
			module: 'calendar',
			header: 'US Holidays',
			position: 'top_left',
			config: {
				calendars: [
					{
						symbol: 'calendar-check-o ',
						url: 'webcal://www.calendarlabs.com/templates/ical/US-Holidays.ics'
					},
					{
						symbol: 'hashtag',
						url: 'webcal://p46-calendars.icloud.com/published/2/PHoFo5WZ1BBeVBPvF6r3OiHPMFLcBcMB5bKr7IoXt-BuVoaRCMyvUnrRPy-1vIQnDj-D2xYJ0NrXbRV1xzKJvBpvixgkGSIPGmuta3loTyI'
					},
				]
			}
		},
		{
			module: 'currentweather',
			position: 'top_right',
			config: {
				location: 'Raleigh',
				locationID: '',  //ID from http://www.openweathermap.org
				appid: '8830e1ed7648b3c007e3cd051d783ced',
			}
		},
		{
			module: 'weatherforecast',
			position: 'top_right',
			header: 'Weather Forecast',
			config: {
				location: 'Raleigh',
				locationID: '',  //ID from http://www.openweathermap.org
				appid: '8830e1ed7648b3c007e3cd051d783ced',
			}
		},
		{
			module: 'MMM-Wunderlist',
			position: 'top_left',  // This can be any of the regions. Best results in left or right regions.
			header: 'Wunderlist', // This is optional
			config: {
			    // See 'Configuration options' for more information.
				accessToken: '2e76c98ad4d373d1d262e6144768b3ec6bd585a0bc4245b5c025582833bb',
				clientID: 'a2cefd62ba10e0344d42',
				lists: ["Personal"],
				interval: 10,
				fade: true,
				maximumEntries: 20,
			}
		},
		{
            		module: 'twitControl',
            		position: 'bottom_bar',
			header: 'TWITTER FEED',
			config: {
					maxNumTweets: 2,
					streamType: 'followings',
					api_keys: {
						consumer_key: '5YEtoelKcFNjrJ8YlX4KnCE8f',
						consumer_secret: 'egA0Hxim5IyV2yLgO0emTb9h53lMCesyo3TeGJcvblN4pFMNgX',
						access_token_key: '4913394432-2bM8fSGnaathU8llnBrxtWTASsq1hTX0DmqO4tj',
						access_token_secret: '9xX94WQs4np9EBHwBbLWd9u0uwDgUgVwuVb9bqKVkPwkV'
						}
					}
        	},
	/*	{
			module: 'newsfeed',
			position: 'bottom_bar',
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},*/
		{
			module: 'MMM-DriveTime',
			position: 'top_right',
			header: 'DRIVE TIME'
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
