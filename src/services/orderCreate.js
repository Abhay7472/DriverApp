import * as Constants from "../constants/urls";
import {getuser} from '../constants/tokenHandler';


export const startDay= () =>{
    token = null;
    token = getuser() 
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.START_DAY;
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
      console.error(error);
    });
}
export const dashBoard= () =>{
    token = null;
    token = getuser() 
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.DASHBOARD;
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
      console.error(error);
    });
}

export const orderDetail= (orderId) =>{

    token = null;
    token = getuser() 
    const URL =Constants.BASE_URL+Constants.SUB_URL+Constants.ORDER_DETAIL;
    let formdata = new FormData();
    formdata.append("order_id", orderId)

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

export const additionalDetail= (orderId) =>{

    token = null;
    token = getuser() 
    const URL =Constants.BASE_URL+Constants.SUB_URL+Constants.ADDITIONAL_DETAIL;
    let formdata = new FormData();
    formdata.append("order_id", orderId)

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


export const onQRScanPickup = (result) => {
    token = null;
    token = getuser() 
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.SCAN_QR_PICKUP;
    let formdata = new FormData();
    formdata.append("qr_code", result)
    console.log("form data", formdata)
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
};

export const onQRScanDelivery = (result) => {
    token = null;
    token = getuser() 
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.SCAN_QR_DELIVERY;
    let formdata = new FormData();
    formdata.append("qr_code", result)
    console.log("form data", formdata)
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
};

export const orderImageUpload= (image,orderId,scanType) =>{

    token = null;
    token = getuser() 
    console.log("image",image)
   const URL =Constants.BASE_URL+Constants.SUB_URL+Constants.ORDER_PICKUP_IMAGE;
    let formdata = new FormData();
    formdata.append("order_id", orderId)

     if(image!= "") {
        formdata.append("pickup_image", {
            uri: image.path,
            type: "image/jpeg",
            name: image.filename || `filename${1}.jpg`,
        });
    }
    formdata.append("scan_type", scanType)
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
        console.log("json",json)
        return json
    }).catch((error) => {
        console.error(error);
    });
};