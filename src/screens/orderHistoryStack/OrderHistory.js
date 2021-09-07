import React from 'react';
import {View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OrderTabNav from './OrderTabNav';


const OrderHistory = createStackNavigator();

const OrderHistoryScreen = (props,{navigation}) => (

<OrderHistory.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#000'},
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        },
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#000" onPress={() => navigation.openDrawer()}></Icon.Button> ),
        headerRight: () => (
             <FontAwesome.Button name="bell" size={20} backgroundColor="#000" onPress={() => props.navigation.navigate('NotifiStackScreen', { screen: 'Notifications'})}></FontAwesome.Button>
            )
    }}>

        <OrderHistory.Screen name="OrderTabNav" component={OrderTabNav} options={{title:'Order History',}}/>
        
</OrderHistory.Navigator>
);

export default OrderHistoryScreen; 
