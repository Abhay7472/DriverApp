import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

    
        <HomeStack.Screen name="Home" component={HomeScreen} options={{title:'Home',}} />
</HomeStack.Navigator>
);

export default HomeStackScreen; 