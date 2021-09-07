import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HelpCenterListScreen from './HelpCenterListScreen';
import NewEnquiry from './NewEnquiry';
import Notifications from './Notifications';
import BreakTime from './BreakTime';
import DeliveryPreference from './DeliveryPreference';
import FAQScreen from './FAQScreen';
import SelfiUpload from './SelfiUpload';
import HelpCenterChat from './HelpCenterChat';


const NotifiStack = createStackNavigator();

const NotifiStackScreen = (props,{route,navigation}) => (
<NotifiStack.Navigator 
    screenOptions={{
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
            <FontAwesome.Button name="bell" size={20} backgroundColor="#000" onPress={() =>props.navigation.navigate('Notifications')}></FontAwesome.Button>
        )
    }}>
        <NotifiStack.Screen name="Notifications" component={Notifications} options={{title:'Notifications',}} />
        <NotifiStack.Screen name="HelpCenterListScreen" component={HelpCenterListScreen} options={{title:'Help Center',}} />
        <NotifiStack.Screen name="NewEnquiry" component={NewEnquiry} options={{title:'New Enquiry',}} />
        <NotifiStack.Screen name="HelpCenterChat" component={HelpCenterChat} options={({route}) => ({
                title:route.params.orderID,
                headerBackTitleVisible: false,
        })}/>
        <NotifiStack.Screen name="BreakTime" component={BreakTime} options={{title:'Break Time',}}/>
        <NotifiStack.Screen name="DeliveryPreference" component={DeliveryPreference} options={{title:'Delivery Preference',}}/>
        <NotifiStack.Screen name="FAQScreen" component={FAQScreen} options={{title:'FAQ',}}/>
        <NotifiStack.Screen name="SelfiUpload" component={SelfiUpload} options={{title:'SelfiUpload',}}/>
</NotifiStack.Navigator>
);

export default NotifiStackScreen; 