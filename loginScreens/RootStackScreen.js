import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import BecameAgentScreen from './BecameAgentScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import DetailsScreen from './DetailsScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
       
        <RootStack.Screen name="BecameAgentScreen" component={BecameAgentScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
        <RootStack.Screen name="DetailsScreen" component={DetailsScreen}/>
        
    </RootStack.Navigator>
);

export default RootStackScreen; 