import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QrScanPickup from './QrScanPickup';
import QrScanDelivery from './QrScanDelivery';
import OrderImageUpload from './OrderImageUpload';
import DigitalSignature from './DigitalSignature';
import AdditionalInfo from './AdditionalInfo';
import OrderDetailsScreen from './OrderDetailsScreen';
import DeliveryConfirmation from './DeliveryConfirmation';``
import Tracking from './Tracking';


const HomeStack = createStackNavigator();

const HomeStackScreen = (props,{route,navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#000'},
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        },
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#000" onPress={() => props.navigation.openDrawer()}></Icon.Button> 
        ),

        headerRight: () => (
            <FontAwesome.Button name="bell" size={20} backgroundColor="#000" onPress={() => props.navigation.navigate('NotifiStackScreen', { screen: 'Notifications'})}></FontAwesome.Button>
        )
    }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{title:'Home',}} />
        <HomeStack.Screen name="AdditionalInfo" component={AdditionalInfo} options={{title:'Additional Information',}} />
        <HomeStack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} options={{title:'Order Details',}} />
        <HomeStack.Screen name="QrScanPickup" component={QrScanPickup} options={{headerShown: false}}/>
        <HomeStack.Screen name="QrScanDelivery" component={QrScanDelivery} options={{headerShown: false}}/>
        <HomeStack.Screen name="OrderImageUpload" component={OrderImageUpload} options={{headerShown: false}}/>
        <HomeStack.Screen name="DigitalSignature" component={DigitalSignature} options={{headerShown: false}}/>        
        <HomeStack.Screen name="DeliveryConfirmation" component={DeliveryConfirmation} options={{title:'Delivery Confirmation',}}/>
         <HomeStack.Screen name="Tracking" component={Tracking} options={{title:'Tracking',}}/>

</HomeStack.Navigator>
);

export default HomeStackScreen; 