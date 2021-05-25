import React from 'react';
import  { StyleSheet } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import DeliveryScreen from '../deliveryStack/DeliveryScreen';
import ProfileStackScreen from '../profileStack/ProfileStackScreen';
import WalletStackScreen from '../walletStack/WalletScreen';
import HomeStackScreen from '../homeStack/HomeStackScreen';
import { CommonActions } from "@react-navigation/native";


const Tab = createBottomTabNavigator();
const getTabBarVisible = (route) => {
  const params = route.params;
  if (params) {
    if (params.tabBarVisible === false) {
      return false;
    }
  }
  return true;
  };
  

const MainTabScreen = ({ navigation }) => (
    
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      showLabel: false,
      activeTintColor: '#fff',
      style:{
      position:'absolute',
      bottom: 25,
      left:20,
      right: 20,
      backgroundColor:'#333',
      borderRadius: 50,
      height:50,
      keyboardHidesTabBar :true,
      }
    }}
  >
    
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
        name="WalletStack"
        component={WalletStackScreen}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({ color }) => (
            <Icon name="wallet" color={color} size={26} />
          ),
          
        }}
      />
      <Tab.Screen
        name="DeliveryScreen"
        component={DeliveryScreen}
        options={{
          tabBarLabel: 'Delivery',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" color={color} size={26}/>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={({ route }) => ({
            tabBarVisible: getTabBarVisible(route),
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
          })}
          
      />
    </Tab.Navigator>
);

export default MainTabScreen;




  
  