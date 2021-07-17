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

const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#000'},
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        },
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#000" onPress={() => navigation.openDrawer()}></Icon.Button> 
        ),

        headerRight: () => (
            <FontAwesome.Button name="bell" size={20} backgroundColor="#000" onPress={() => {}}></FontAwesome.Button>
        )
    }}>

    
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{title:'',}} />
        <HomeStack.Screen name="AdditionalInfo" component={AdditionalInfo} options={{title:'Additional Information',}} />
        <HomeStack.Screen name="QrScanPickup" component={QrScanPickup} options={{headerShown: false}}/>
        <HomeStack.Screen name="QrScanDelivery" component={QrScanDelivery} options={{headerShown: false}}/>
        <HomeStack.Screen name="OrderImageUpload" component={OrderImageUpload} options={{headerShown: false}}/>
        <HomeStack.Screen name="DigitalSignature" component={DigitalSignature} options={{headerShown: false}}/>

</HomeStack.Navigator>
);

export default HomeStackScreen; 