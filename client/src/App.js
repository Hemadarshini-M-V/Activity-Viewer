//Imports 
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

//Imports from different files
import './App.css';
import { fetchActivities } from './service';

class App extends Component{
  constructor(){
    super();
    this.state = {
      activityData: [],    //To store activity data
      showModal : false,   //Boolean to hide & show modal
      currentUser : {},    //To store selected user
      currentUserSelectedDateActivities: [],       
      //To store activities of current user on selected date
      selectedDate: this.today()   //Initialising selected date to today 
    }
  }

  //Function to show modal when the user clicks on a particular user name
  showModal = (currUser) => {
    this.setState({ showModal: true });    //Showing the modal
    this.setState({ selectedDate: this.today()});     
    this.setUpModal(currUser);     //Setting up data for selected user
  };

  //Function to set up the selected user's activity data for the modal
  setUpModal = (currUser)=>{
    this.setState({currentUser: currUser});  
    var selectedDateByUser = this.state.selectedDate;
    this.setUpSelectedActivities(currUser, selectedDateByUser);
  }

  //Function to set up activities for the selected date 
  setUpSelectedActivities = (currUser, selectedDateByUser)=>{
    var selectedDate = new Date(selectedDateByUser);
    var selectedDateActivities = [];
    var activity_periods = currUser.activity_periods;
    var timeZone = currUser.tz;

    //Checking for each activity listed for a match with selected date 
    for(let i=0; i<activity_periods.length; i++){
      let activity = activity_periods[i];
      let start_time = activity.start_time;
      let end_time = activity.end_time;
      let startTimeDate = this.convertToDate(start_time,timeZone);
      if(startTimeDate.getFullYear() === selectedDate.getFullYear()
        && startTimeDate.getMonth() === selectedDate.getMonth() 
        && startTimeDate.getDate() === selectedDate.getDate()){
          var endTimeDate = this.convertToDate(end_time,timeZone);
          var convertedActivity = {
            start_time : startTimeDate.toDateString() + 
                         " " + startTimeDate.toLocaleTimeString(),
            end_time : endTimeDate.toDateString() +
                        " " + endTimeDate.toLocaleTimeString()
          };
          selectedDateActivities.push(convertedActivity);
        }
    }
    this.setState({currentUserSelectedDateActivities : selectedDateActivities});
  }

  //Function to convert the given string to date object in local time
  convertToDate = (dateString, timeZone)=>{
    var splits = dateString.split(" ");
    splits[1] = splits[1]+",";
    var givenTime = splits[3];
    if(givenTime.substr(-2)==="AM"){
     givenTime = givenTime.replace("AM",":00");
    }
    else if(givenTime.substr(-2)==="PM"){
      var hours = givenTime.split(":")[0];
      if(hours === "12"){
        givenTime = givenTime.replace("PM",":00");
      }
      else{
        var hoursInTwentyFourFormat = parseInt(givenTime.substr(0,2)) + 12;
        givenTime = givenTime.replace(hours,hoursInTwentyFourFormat.toString());
        givenTime = givenTime.replace("PM",":00");
      }
    }
    splits[3] = givenTime;
    dateString = splits.join(" ");
 
    var thereDate = new Date(dateString);
    var hereDate = this.changeTimezone(thereDate, timeZone);  //Changing time zone
    return hereDate;
 }
 
 
  //Function to change date given in a particular time zone to local ti
  changeTimezone = (date, givenTZ)=> {
    var invdate = new Date(date.toLocaleString('en-US', {
      timeZone: givenTZ
    }));

    //Getting differnce in time zones
    var diff = date.getTime() - invdate.getTime();
    
    //Using the difference obtained to convert to local time
    return new Date(date.getTime() + diff);
  }
  
  //Function to hide modal when close is clicked
  hideModal = () => {
    this.setState({ showModal: false });
  };

  //Processing once component mounts
  componentDidMount = ()=>{
    this.fetchAllActivities();
  }

  //Function to fetch all the activities from back-end using service
  fetchAllActivities = ()=>{
    fetchActivities().then(suc=>{
      if(suc.data.ok === true){
        this.setState({activityData: suc.data.members});
        console.log(this.state.activityData);
      }
    })
    .catch(err=>{
      this.errMsg = "No data found";
    })
  }

  //Function to render the activites of the user on selected date
  listOfActivities = ()=>{
    var selectedDateActivities = this.state.currentUserSelectedDateActivities;
    var selectedDate = this.state.selectedDate;
    
    //Checking whether there are actvities on selected date
    if(selectedDateActivities.length === 0){
      return "No activities on "+selectedDate;
    }
    else{
      var showselectedDateActivities = [];
      for(let j=0; j<selectedDateActivities.length; j++){
        var listItem = (
          <li key={j}> 
            Start time : {selectedDateActivities[j]['start_time']}
            <br/>
            End time : {selectedDateActivities[j]['end_time']}
          </li>
        );
        showselectedDateActivities.push(listItem);
      }
      return showselectedDateActivities;
    }
  }

  //Function to convert today's date to string
  today = ()=>{
    let d = new Date();
    let currDate = d.getDate();
    let currMonth = d.getMonth()+1;
    let currYear = d.getFullYear();
    return currYear + "-" + ((currMonth<10) ? '0'+currMonth : currMonth )+ "-" + ((currDate<10) ? '0'+currDate : currDate );
  }

  //Function to change activity details when date is changed in the calendar
  dateValueCalendarChanged = (e)=>{
    var changedDate = e.target.value;
    this.setState({selectedDate: changedDate});
    var currUser = this.state.currentUser;
    this.setUpSelectedActivities(currUser, changedDate);
  }  

  //Function to render all activities and the modal
  displayActivities = ()=>{
    var activityData = this.state.activityData;
    var currUser = this.state.currentUser;
    var activities = [];
    for(let i=0; i<activityData.length; i++){
      var actRow = (
        <tr key = {activityData[i].id}>
          <td><Button variant="link" onClick={()=>this.showModal(activityData[i])}> 
            {activityData[i].real_name}
            </Button></td>
          <td>{activityData[i].tz}</td>
        </tr>
      );
      activities.push(actRow);
    }

    var dateValueCalendar = this.state.selectedDate;
    return (
      <>
      <Table striped bordered hover>
        <tbody>
          {activities}
        </tbody>
      </Table>

      <Modal show={this.state.showModal} onHide={this.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Activities of {currUser.real_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {this.listOfActivities()}
          </ul>
          <input type="date" defaultValue = {dateValueCalendar} 
            onChange={(e)=>{this.dateValueCalendarChanged(e)}}/>
        </Modal.Body>
        <Modal.Footer>
          <p>
            Note: All times have been converted to local time (Indian time).
            For example, if activity time for a user from Kathmandu was 
            5:15 PM, it'll be shown as 5:00 PM in corresponding local time.
          </p>
          <Button variant="danger" onClick={this.hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  //Function to render the component
  render= ()=>{
    return (
      <div className="App">
        <h4>Activity Viewer</h4>
        {this.displayActivities()}
      </div>
    );
  }
}

export default App;
