import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './App.css';
import { fetchActivities } from './service';

class App extends Component{
  constructor(){
    super();
    this.state = {
      activityData: [],
      showModal : false,
      currentUser : {},
      // currentUserTodayActivities: [],
      currentUserSelectedDateActivities: [],
      selectedDate: this.today()
    }
  }


  showModal = (currUser) => {
    this.setState({ showModal: true });
    this.setState({ selectedDate: this.today()})
    this.setUpModal(currUser);
    
  };

  //Function to set up the selected user's activity data for the modal
  setUpModal = (currUser)=>{
    this.setState({currentUser: currUser});
    // console.log(todayDate);
    // console.log(typeof(todayDate));
    var selectedDateByUser = this.state.selectedDate;
    this.setUpSelectedActivities(currUser, selectedDateByUser);
  }

  setUpSelectedActivities = (currUser, selectedDateByUser)=>{
    // var selectedDateByUser = this.state.selectedDate;
    var selectedDate = new Date(selectedDateByUser);
    var selectedDateActivities = [];
    var activity_periods = currUser.activity_periods;
    var timeZone = currUser.tz;
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
    console.log("splits-->"+splits);
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
    console.log("givenTIme-->"+givenTime);
    splits[3] = givenTime;
    dateString = splits.join(" ");
    // console.log(dateString);
 
   var thereDate = new Date(dateString);
   var hereDate = this.changeTimezone(thereDate, timeZone);
   console.log("thereDate-->"+thereDate);
   console.log("type of thereDate-->",typeof(thereDate));
   console.log("hereDate"+hereDate);
   console.log("type of hereDate"+typeof(hereDate));
 
    
    return hereDate;
 }
 




  //Function to change date given in a particular time zone to local time
  changeTimezone = (date, givenTZ)=> {

    var invdate = new Date(date.toLocaleString('en-US', {
      timeZone: givenTZ
    }));
  
    var diff = date.getTime() - invdate.getTime();
  
    return new Date(date.getTime() + diff);
  }
  
  hideModal = () => {
    this.setState({ showModal: false });
  };
  componentDidMount = ()=>{
    this.fetchAllActivities();
  }
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

  listOfActivities = ()=>{
    var selectedDateActivities = this.state.currentUserSelectedDateActivities;
    var selectedDate = this.state.selectedDate;
    var currUser = this.state.currentUser;
    console.log("currUser-->"+currUser);
    console.log("type of currUser-->"+typeof(currUser));

    if(selectedDateActivities.length === 0){
      return "No activities on "+selectedDate;
    }
    else{
      // console.log("From listOfActivities function , selectedDateActivities");
      // for(let p =0; p<selectedDateActivities.length; p++){
      //   console.log(Object.values(selectedDateActivities[p]));
      // }
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

  dateValueCalendarChanged = (e)=>{
    var changedDate = e.target.value;
    this.setState({selectedDate: changedDate});
    var currUser = this.state.currentUser;
    this.setUpSelectedActivities(currUser, changedDate);
    
  }  

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
