import * as Constants from "../constants/urls";
import {getuser} from '../constants/tokenHandler';

export const orderPickup = () => {
    token = null;
    token = getuser()
  const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.ORDER_PICKUP;
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
};

export const orderDropOff = () => {
    token = null;
    token = getuser()
  const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.ORDER_DROPOFF;
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
};

export const orderRefused = () => {
    token = null;
    token = getuser()
  const URL = Constants.BASE_URL+Constants.SUB_URL+Constants.ORDER_REFUSED;
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
};

