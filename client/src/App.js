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
      currentUserTodayActivities: []
    }
  }


  showModal = (currUser) => {
    this.setState({ showModal: true });
    // console.log(currUser);
    this.setUpModal(currUser);
    
  };

  //Function to set up the selected user's activity data for the modal
  setUpModal(currUser){
    this.setState({currentUser: currUser});
    var todayDate = new Date();
    var todayActivities = [];
    var activity_periods = currUser.activity_periods;
    var timeZone = currUser.tz;
    for(let i=0; i<activity_periods.length; i++){
      let activity = activity_periods[i];
      let start_time = activity.start_time;
      let startTimeDate = this.convertToDate(start_time,timeZone);
      if(startTimeDate.getFullYear() === todayDate.getFullYear()
        && startTimeDate.getMonth() === todayDate.getMonth() 
        && startTimeDate.getDate() === todayDate.getDate()){
          todayActivities.push(activity);
        }
    }
    this.setState({currentUserTodayActivities : todayActivities});
    
  }

  //Function to convert the given string to date object in local time
  convertToDate(dateString, timeZone){
    var splits = dateString.split(" ");
    console.log("splits-->"+splits);
    splits[1] = splits[1]+",";
    var givenTime = splits[3];
    if(givenTime.substr(-2)==="AM"){
     givenTime = givenTime.replace("AM",":00");
    }
    else if(givenTime.substr(-2)==="PM"){
       console.log("klk");
      var hoursInTwentyFourFormat = parseInt(givenTime.substr(0,2)) + 12;
      var hours = givenTime.split(":")[0];
      givenTime = givenTime.replace(hours,hoursInTwentyFourFormat.toString());
      givenTime = givenTime.replace("PM",":00");
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
  changeTimezone(date, givenTZ) {

    var invdate = new Date(date.toLocaleString('en-US', {
      timeZone: givenTZ
    }));
  
    var diff = date.getTime() - invdate.getTime();
  
    return new Date(date.getTime() + diff);
  }
  
  hideModal = () => {
    this.setState({ showModal: false });
  };
  componentDidMount(){
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
    var todayActivities = this.state.currentUserTodayActivities;
    console.log("From listOfActivities function , todayActivities");
    for(let p =0; p<todayActivities.length; p++){
      console.log(Object.values(todayActivities[p]));
    }
    var showTodayActivities = [];
    for(let j=0; j<todayActivities.length; j++){
      var listItem = (
        <li key={j}> 
          Start time : {todayActivities.start_time}
          End time : {todayActivities.end_time}
        </li>
      );
      showTodayActivities.push(listItem);
    }
    return showTodayActivities;
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  render(){
    return (
      <div className="App">
        <h4>Activity Viewer</h4>
        {this.displayActivities()}
      </div>
    );
  }
}

export default App;
