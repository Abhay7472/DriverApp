import React from'react';
import { View, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pickup from './Pickup';
import DropOff from './DropOff';
import Refused from './Refused';

const Tab = createMaterialTopTabNavigator();

const OrderTabNav = ({ navigation }) => (

  <Tab.Navigator
      tabBarOptions={{
      showLabel: true,
      activeTintColor: '#fff',
      inactiveTintColor :'#000',
      labelStyle :{
       fontSize:14,
      },
      style:{
        position:'absolute',
        top: 5,
        left:20,
        right: 20,
        backgroundColor:'#666',
        pressColor :'blue',
        borderRadius: 10,
        height:50,
        borderBottomWidth: 0,
        },
        indicatorStyle: 
        { backgroundColor: '#333', 
        height: '100%' ,
        borderRadius:10, 
        borderWidth:3,borderColor:'#fff' }
        
          // renderIndicator: () => null

      }}>
        <Tab.Screen name="Pickup" component={Pickup} />
        <Tab.Screen name="DropOff" component={DropOff} />
        <Tab.Screen name="Refused" component={Refused} />
    </Tab.Navigator>
    
  );

export default OrderTabNav;


