import * as Constants from '../constants/urls';
import {getuser} from '../constants/tokenHandler';

export const checkBreakTime = () => {
  const URL =
    Constants.BASE_URL + Constants.SUB_URL + Constants.CHECK_BREAK_TIME;
  token = null;
  token = getuser();
  return fetch(URL, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

export const startBreakTime = (timeSlot, driverRow) => {
  const URL =
    Constants.BASE_URL + Constants.SUB_URL + Constants.START_BREAK_TIME;
  token = null;
  token = getuser();
  let formdata = new FormData();
  formdata.append('current_time_slot_id', timeSlot);
  formdata.append('driver_break_row_id', driverRow);
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
    body: formdata,
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

export const endBreakTime = (timeSlot, driverRow) => {
  const URL = Constants.BASE_URL + Constants.SUB_URL + Constants.END_BREAK_TIME;
  token = null;
  token = getuser();
  let formdata = new FormData();
  formdata.append('current_time_slot_id', timeSlot);
  formdata.append('driver_break_row_id', driverRow);
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
    body: formdata,
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

export const getDeliverySLot = date => {
  const URL = Constants.BASE_URL + Constants.SUB_URL + Constants.GET_TIME_SLOT;
  token = null;
  token = getuser();
  let formdata = new FormData();
  formdata.append('slot_date', date);
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
    body: formdata,
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error('error', error);
    });
};

export const setDeliverySLot = (
  date,
  working,
  prefValue,
  timeSlot1,
  timeSlot2,
  timeSlot3,
  timeSlot4,
) => {
  const URL = Constants.BASE_URL + Constants.SUB_URL + Constants.SET_TIME_SLOT;
  token = null;
  token = getuser();
  let formdata = new FormData();
  formdata.append('slot_date', date);
  formdata.append('delivery_preference_id', prefValue);
  formdata.append('time_slot0', working);
  formdata.append('time_slot1', timeSlot1);
  formdata.append('time_slot2', timeSlot2);
  formdata.append('time_slot3', timeSlot3);
  formdata.append('time_slot4', timeSlot4);
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
    body: formdata,
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

export const faqs = () => {
  const URL = Constants.BASE_URL + Constants.SUB_URL + Constants.FAQ;
  token = null;
  token = getuser();
  return fetch(URL, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

export const uploadDriverSelfi = (selfi, id) => {
  const URL = Constants.BASE_URL + Constants.SUB_URL + Constants.SELFI_UPLOAD;
  token = null;
  token = getuser();
  let formdata = new FormData();
  if (selfi != '') {
    formdata.append('selfie_image', {
      uri: selfi.path,
      type: 'image/jpeg',
      name: selfi.filename || `filename${1}.jpg`,
    });
  }
  formdata.append('id', id);
  return fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
    body: formdata,
  })
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error('selfi error', error);
    });
};
