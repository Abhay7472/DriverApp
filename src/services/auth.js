import * as Constants from "../constants/urls";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getuser} from '../constants/tokenHandler';


export const emailCheck = (emailId) => {
    
   const URL = Constants.BASE_URL+Constants.BASIC_LIST+Constants.EMAIL_EXIST;
    let formdata = new FormData();
    formdata.append("email", emailId)
    console.log("check email",formdata)
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
          },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        console.log("res",json)
        return json
    }).catch((error) => {
        console.error("email",error);
    });
}


export const signup = (fullName, contactNo, emailId, passwordCheck, driversLicense, backgroundCheck, registration, licensePlateNo,
                        insurance, socialSecurityNo, driversLicensePhoto, backgroundCheckPhoto,registrationPhoto, licensePlateNoPhoto, insurancePhoto,
                        socialSecurityNoPhoto,driverPhoto,facebook, linkedin, twitter, instagram ) => {
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.SIGN_UP;
    
    let formdata = new FormData();
    formdata.append("full_name", fullName)
    formdata.append("contact_no",contactNo)
    formdata.append("email",emailId)
    formdata.append("password",passwordCheck)
    formdata.append("mer_facebook",facebook)
    formdata.append("mer_linkedin",linkedin)
    formdata.append("mer_twitter",twitter)
    formdata.append("mer_instagram",instagram)
    formdata.append("licence_text",driversLicense)
    formdata.append("background_check_text",backgroundCheck)
    formdata.append("registration_text",registration)
    formdata.append("licence_plate_text",licensePlateNo)
    formdata.append("insurance_text",insurance)
    formdata.append("ssn_text",socialSecurityNo)
    // formdata.append("profile_image",driverPhoto)
    if(driverPhoto != "") {
        formdata.append("profile_image", {
            uri: driverPhoto.path,
            type: "image/jpeg",
            name: driverPhoto.filename || `filename${1}.jpg`,
        });
   
    }
    if(driversLicensePhoto != "") {
    driversLicensePhoto.forEach((item, i) => {
        formdata.append("licence_image[]", {
            uri: item.path,
            type: "image/jpeg",
            name: item.filename || `filename${i}.jpg`,
        });
    });
    }
    if(backgroundCheckPhoto != ""){
    backgroundCheckPhoto.forEach((item, i) => {
        formdata.append("background_check_image[]", {
            uri: item.path,
            type: "image/jpeg",
            name: item.filename || `filename${i}.jpg`,
        });
    });
    }
    if(registrationPhoto != ""){
    registrationPhoto.forEach((item, i) => {
        formdata.append("registration_image[]", {
            uri: item.path,
            type: "image/jpeg",
            name: item.filename || `filename${i}.jpg`,
        });
    });
    }
    if(licensePlateNoPhoto != ""){
    licensePlateNoPhoto.forEach((item, i) => {
        formdata.append("licence_plate_image[]", {
            uri: item.path,
            type: "image/jpeg",
            name: item.filename || `filename${i}.jpg`,
        });
    });
    }
    if(insurancePhoto != ""){
    insurancePhoto.forEach((item, i) => {
        formdata.append("insurance_image[]", {
            uri: item.path,
            type: "image/jpeg",
            name: item.filename || `filename${i}.jpg`,
        });
    });
    }
    if(socialSecurityNoPhoto != ""){
    socialSecurityNoPhoto.forEach((item, i) => {
        formdata.append("ssn_image[]", {
            uri: item.path,
            type: "image/jpeg",
            name: item.filename || `filename${i}.jpg`,
        });
    });
    }

    
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
          },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        return json
    }).catch((error) => {
        console.error(error);
    });
}


export const signin = (emailId, passwordCheck,appToken) => {
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.SIGN_IN;

    let formdata = new FormData();
    formdata.append("email", emailId)
    formdata.append("password",passwordCheck)
    formdata.append("app_reg_token",appToken)
    
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
          },
        body: formdata
        
    })
    .then((response) => response.json()).then((json) => {
        return json
    }).catch((error) => {
        console.error('signIn api',error);
    });
}

export const resetPassword = (emailId) => {
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.FORGET_PASSWORD;

    let formdata = new FormData();
    formdata.append("email", emailId)
    return fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
          },
        body: formdata
    })
    .then((response) => response.json()).then((json) => {
        return json
    }).catch((error) => {
        console.error(error);
    });
}

export const communitySecurity = () => {
  const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.COMMUNITY_SECURITY;  
  return fetch(URL,{
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
    })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getStateList =() => {
    
   const URL = Constants.BASE_URL+Constants.BASIC_LIST+Constants.STATE_LIST;
    return fetch(URL,{
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
    })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const logout = () => {
    token = null;
    token = getuser()
  const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.LOGOUT;
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
