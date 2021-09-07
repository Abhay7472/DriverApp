// import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native';
let notificationStatus = false;
class FCMService {

  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister)
    this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
  }

  registerAppWithFCM = async () => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true)
    }
  }

  checkPermission = (onRegister) => {
    messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          // User has permissions
          this.getToken(onRegister)
        } else {
          // User doesn't have permission
          this.requestPermission(onRegister)
        }
      }).catch(error => {
        console.log("[FCMService] Permission rejected ", error)
      })
  }
  getToken = (onRegister) => {
    messaging().getToken()
      .then(async fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
           console.log("[FCMService] User does not have a device token")
        }
      }).catch(error => {
        console.log("[FCMService] getToken rejected ", error)
      })
  }

  requestPermission = (onRegister) => {
    messaging().requestPermission()
      .then(() => {
        this.getToken(onRegister)
      }).catch(error => {
        console.log("[FCMService] Request Permission rejected ", error)
      })
  }

  deleteToken = () => {
    // console.log("[FCMService] deleteToken ")
    messaging().deleteToken()
      .catch(error => {
        console.log("[FCMService] Delete token error ", error)
      })
  }

  createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {

    // When the application is running, but in the background
    messaging()
      .onNotificationOpenedApp(remoteMessage => {
        // console.log("remote message onNotificationOpenedApp",remoteMessage)
        if (remoteMessage) {
          const notification = remoteMessage?.notification
          onOpenNotification(notification)
          // this.removeDeliveredNotification(notification.notificationId)

        }
        // console.log("onNotificationOpenedApp")
      });

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        // console.log("remote message getInitialNotification",remoteMessage)
        if (remoteMessage) {
          const notification = remoteMessage?.notification
          notification.data = remoteMessage?.data
        }
        // console.log("getInitialNotification")
      });

    this.messageListener = messaging().onMessage(async remoteMessage => {
    });

    messaging().onTokenRefresh(fcmToken => {
      // console.log("[FCMService] New token refresh: ", fcmToken)
      onRegister(fcmToken)
    })

  }

  unRegister = () => {
    this.messageListener()
  }
}

export const fcmService = new FCMService()