import * as Constants from "../constants/urls";
import {getuser} from '../constants/tokenHandler';

export const getProfile = () => {
  token = null;
  token = getuser() 
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.GET_PROFILE;
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
      console.error("get profile",error);
    });
};


export const editProfile = (contactNo,address,areaCode,city,state,bankName,benificiaryName,routingNo,accountNo,accountType) => {
    
    token = null;
    token = getuser() 
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.EDIT_PROFILE;
    let formdata = new FormData();
    formdata.append("contact_no", contactNo)
    formdata.append("address", address)
    formdata.append("pin_code", areaCode)
    formdata.append("city", city)
    formdata.append("state", state)
    formdata.append("bank_name", bankName)
    formdata.append("bank_beneficiary", benificiaryName)
    formdata.append("bank_routing_no", routingNo)
    formdata.append("bank_acc_key", accountNo)
    formdata.append("bank_acc_type", accountType)
    console.log("form data......",formdata)
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        return json
        console.log("json value__", json)
    }).catch((error) => {
        console.error('edit profile api',error);
    });

};

