import React from 'react';
import  { StyleSheet, } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderHistory from '../screens/orderHistoryStack/OrderHistory';
import ProfileStackScreen from '../screens/profileStack/ProfileStackScreen';
import LocationScreen from '../screens/locationStack/LocationScreen';
import HomeStackScreen from '../screens/homeStack/HomeStackScreen';


const Tab = createBottomTabNavigator();

const MainTabScreen = ({ navigation }) => (
    
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      showLabel: false,
      activeTintColor: '#fff',
      style:{
      position:'absolute',
      bottom: 8,
      left:20,
      right: 20,
      backgroundColor:'#333',
      borderRadius: 50,
      height:50,
      keyboardHidesTabBar :true,
      borderTopWidth: 0,
      }
    }}>
    
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({  color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="LocationScreen"
        component={LocationScreen}
        options={{
          tabBarLabel: 'LocationScreen',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marked-alt" color={color} size={26} />
          ),
          
        }}
      />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          tabBarLabel: 'OrderHistory',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" color={color} size={26}/>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
          }}
          
      />
    </Tab.Navigator>
);

export default MainTabScreen;
