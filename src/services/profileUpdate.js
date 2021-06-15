import * as Constants from "../constants/urls";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getProfile = async () => {
  try {
    const value = await AsyncStorage.getItem('userToken')
        if(value !== null) {
        console.log("check1", value)
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.GET_PROFILE;
    let response = await fetch(URL,{
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': value,
          },
    });
    let json = await response.json();
    return json;
  }
  } catch (error) {
    console.error(error);
  }
};


export const editProfile = (contactNo,address,pinCode,city,state,bankName,benificiaryName,routingNo,accountNo,accountType,token) => {
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.EDIT_PROFILE;
    console.log("token.....",token)
    let formdata = new FormData();
    formdata.append("contact_no", contactNo)
    formdata.append("address", address)
    formdata.append("pin_code", pinCode)
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
        console.error(error);
    });

};
