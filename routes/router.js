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
					"start_time": "Sep 11 2020 7:33AM",
					"end_time": "Sep 11 2020 8:52AM"
				}
			]
		},
		{
			"id": "W07QHNJA9",
			"real_name": "Priya Swamy",
			"tz": "Asia/Singapore",
			"activity_periods": [{
					"start_time": "Dec 30 2019 5:30AM",
					"end_time": "Dec 30 2020 7:40AM"
				},
				{
					"start_time": "Sep 11 2020 8:30AM",
					"end_time": "Sep 11 2020 10:12AM"
				},
				{
					"start_time": "Jul 11 2020 7:22PM",
					"end_time": "Jul 11 2020 9:37PM"
				},
				{
					"start_time": "Sep 11 2020 7:33AM",
					"end_time": "Sep 11 2020 8:12AM"
				}
			]
		},
		{
			"id": "W17QHNSA9",
			"real_name": "Dan Brown",
			"tz": "America/Toronto",
			"activity_periods": [{
					"start_time": "Nov 23 2019 9:30PM",
					"end_time": "Nov 23 2020 11:42PM"
				},
				{
					"start_time": "Sep 10 2020 9:50PM",
					"end_time": "Sep 10 2020 11:12PM"
				},
				{
					"start_time": "May 17 2020 4:22PM",
					"end_time": "May 17 2020 5:12PM"
				},
				{
					"start_time": "Sep 11 2020 7:33AM",
					"end_time": "Sep 11 2020 8:12AM"
				}
			]
		},
		{
			"id": "W17GANSA3",
			"real_name": "Amahle Nkosi",
			"tz": "Africa/Johannesburg",
			"activity_periods": [{
					"start_time": "Aug 20 2020 4:20PM",
					"end_time": "Aug 20 2020 6:10PM"
				},
				{
					"start_time": "Apr 17 2020 7:30AM",
					"end_time": "Apr 17 2020 11:42AM"
				},
				{
					"start_time": "Sep 11 2020 11:00PM",
					"end_time": "Sep 12 2020 02:00AM"
				}
				
			]
		},
		{
			"id": "W17HDDSA7",
			"real_name": "Hugo Bless",
			"tz": "Europe/Paris",
			"activity_periods": [{
					"start_time": "Jul 14 2020 3:40PM",
					"end_time": "Jul 14 2020 7:21PM"
				},
				{
					"start_time": "Oct 2 2019 2:45AM",
					"end_time": "Oct 2 2019 05:12AM"
				},
				{
					"start_time": "Sep 5 2020 10:20AM",
					"end_time": "Sep 5 2020 02:15PM"
				}
				
			]
		},
		{
			"id": "W23HDESX1",
			"real_name": "Hermione Granger",
			"tz": "Australia/Sydney",
			"activity_periods": [{
					"start_time": "Jul 31 2020 8:45AM",
					"end_time": "Jul 31 2020 2:46PM"
				},
				{
					"start_time": "Jun 1 2020 2:40PM",
					"end_time": "Jun 1 2020 04:36PM"
				},
				{
					"start_time": "Aug 26 2020 10:28AM",
					"end_time": "Aug 26 2020 11:59AM"
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
