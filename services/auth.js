import * as Constants from "../constants/urls";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        console.log(typeof driverPhoto)
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

   console.log("form Data starts", formdata)
    
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


export const signin = (emailId, passwordCheck) => {
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.SIGN_IN;

    let formdata = new FormData();
    formdata.append("email", emailId)
    formdata.append("password",passwordCheck)
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


export const editProfile = (contactNo,address,pinCode,city,state,token) => {
          const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.EDIT_PROFILE;
          console.log("token",token)
            let formdata = new FormData();
            formdata.append("contact_no", contactNo)
            formdata.append("address", address)
            formdata.append("pin_code", pinCode)
            formdata.append("city", city)
            formdata.append("state", state)
            console.log("form data",formdata)
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
        
}
     
            
            


export const communitySecurity = async () => {
  try {
    const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.COMMUNITY_SECURITY;
    let response = await fetch(URL,{
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
    });
    let json = await response.json();
    return json;
  }
  
  catch (error) {
    console.error(error);
  }
};

