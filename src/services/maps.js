import * as Constants from "../constants/urls";
import {getuser} from '../constants/tokenHandler';


export const mapTab = () => {
    token = null;
    token = getuser() 
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.DASHBOARD_MAP;
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
          },
    })
    .then((response) => response.json()).then((json) => {
        return json
    }).catch((error) => {
        console.error("Map Tab error", error);
    });
};

export const locationUpdate =(lat,long)=>{
  
  const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.LOCATION_UPDATE;
    token = null;
    token = getuser()
    let formdata = new FormData();
    formdata.append("driver_lat", lat)
    formdata.append("driver_long", long)
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
          },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        return json
    }).catch((error) => {
        console.error("location update error", error);
    });
}