import axios from 'axios';

export const fetchActivities = ()=>{
    return axios.get('http://localhost:8081/getActivities');
}