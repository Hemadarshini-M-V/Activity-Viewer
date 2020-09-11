//Imports
import axios from 'axios';

//Function to fetch user activity data from backend
export const fetchActivities = ()=>{
    return axios.get('http://localhost:8081/getActivities');
}