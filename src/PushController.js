import React,{Component} from 'react';
import { View, Dimensions,LogBox} from 'react-native';
import Firebase from '@react-native-firebase/app';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import App from './App'
import {setnotifiToken} from './constants/tokenHandler'

export default class PushController extends Component{
    componentDidMount(){
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(notifiToken) {
              setnotifiToken(notifiToken.token);
              console.log("TOKEN:", notifiToken);
            },
          
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
              console.log("NOTIFICATION:", notification);
          
              // process the notification here
          
              // required on iOS only 
              notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // Android only
            senderID: "682823174743",
            // iOS only
            permissions: {
              alert: true,
              badge: true,
              sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
          });
    }
    
      render(){
        return (
          <App />
        );
    }
}