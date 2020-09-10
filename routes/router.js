//Imports
var express = require('express');

//Creating an instance of Router
var router = express.Router();

//Dummy activities 
var activities = {
	"ok": true,
	"members": [{
			"id": "W012A3CDE",
			"real_name": "Egon Spengler",
			"tz": "America/Los_Angeles",
			"activity_periods": [{
					"start_time": "Feb 1 2020 1:33PM",
					"end_time": "Feb 1 2020 1:54PM"
				},
				{
					"start_time": "Mar 1 2020 11:11AM",
					"end_time": "Mar 1 2020 2:00PM"
				},
				{
					"start_time": "Mar 16 2020 5:33PM",
					"end_time": "Mar 16 2020 8:02PM"
				}
			]
		},
		{
			"id": "W07QCRPA4",
			"real_name": "Glinda Southgood",
			"tz": "Asia/Kolkata",
			"activity_periods": [{
					"start_time": "Feb 1 2020 1:33PM",
					"end_time": "Feb 1 2020 1:54PM"
				},
				{
					"start_time": "Mar 1 2020 11:11AM",
					"end_time": "Mar 1 2020 2:00PM"
				},
				{
					"start_time": "Mar 16 2020 5:33PM",
					"end_time": "Mar 16 2020 8:02PM"
				}
			]
    },
    {
			"id": "W07QCRPA5",
			"real_name": "Paulo Lindon",
			"tz": "America/New_York",
			"activity_periods": [{
					"start_time": "Apr 30 2020 8:33AM",
					"end_time": "Apr 30 2020 9:40AM"
				},
				{
					"start_time": "Jun 1 2020 12:20PM",
					"end_time": "Jun 1 2020 2:37PM"
				},
				{
					"start_time": "Aug 21 2020 7:33PM",
					"end_time": "Aug 21 2020 8:52PM"
				}
			]
		},
		{
			"id": "W07QCRPA7",
			"real_name": "Ching Wui",
			"tz": "Asia/Shanghai",
			"activity_periods": [{
					"start_time": "Apr 30 2020 8:33AM",
					"end_time": "Apr 30 2020 9:40AM"
				},
				{
					"start_time": "Jun 1 2020 12:20PM",
					"end_time": "Jun 1 2020 2:37PM"
				},
				{
					"start_time": "Sep 10 2020 7:33PM",
					"end_time": "Sep 10 2020 8:52PM"
				}
			]
		}
	]
};

//Sending activities as json object for a particular GET request
router.get('/getActivities', function(req, res, next) {
  res.json(activities);
});

//Configuring generic route
router.all('/',function(req,res,next){
  res.send("Welcome to home page");
})

module.exports = router;
