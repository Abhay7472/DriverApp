import * as Constants from "../constants/urls";
import {getuser} from '../constants/tokenHandler';

export const helpCenterList = () => {
    token = null;
    token = getuser()
  const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.HELP_CENTER_LIST; 
  return fetch(URL,{
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
          },
    })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error("error here", error );
    });
};

export const newEnquiry = (orderId,enquiry) => {
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.NEW_ENQUIRY;
      token = null;
      token = getuser()
    let formdata = new FormData();
    formdata.append("orderID", orderId)
    formdata.append("query_msg",enquiry)
    console.log(formdata)
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
        console.error('error',error);
    });
}

export const getOrderList =() => {
    token = null;
    token = getuser()
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.HELP_CENTER_ORDER_LIST;
    return fetch(URL,{
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
          },
    })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error("error...",error);
    });
};

export const getChat= (ticketId) =>{
    token = null;
    token = getuser() 
    const URL =Constants.BASE_URL+Constants.SUB_URL+Constants.HELP_CENTER_CHAT_LIST;
    let formdata = new FormData();
    formdata.append("ticket_id", ticketId)
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
        console.error(error);
    });
}

export const onMessageSend= (ticketId,message) =>{
    token = null;
    token = getuser() 
    const URL =Constants.BASE_URL+Constants.SUB_URL+Constants.SEND_MESSAGE_ADMIN;
    let formdata = new FormData();
    formdata.append("ticket_id", ticketId)
    formdata.append("message", message)
    console.log("formdata",formdata)
    
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
        console.error(error);
    });
}
