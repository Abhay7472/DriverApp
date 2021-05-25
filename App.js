/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './bottomTabs/DrawerContent';
import MainTabScreen from './bottomTabs/MainTabScreen';
import RootStackScreen from './loginScreens/RootStackScreen';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from './components/context';
const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  //  const [userToken, setUserToken] = React.useState(null); 

  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return { 
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(token) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(token);
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
     
      dispatch({ type: 'LOGIN', token: userToken });
    },
     signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
     signUp:async(token) => {
      // setUserToken('fgkj');
      setIsLoading(false);
      const userToken = String(token);
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      
      dispatch({ type: 'LOGIN', token: userToken });
    },
    
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: '#000'}}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1000"
                source={require('./assets/logo.png')}
                style={{width: height_logo,height: height_logo}}
                resizeMode="stretch"
            />
        
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      { loginState.userToken !== null ? (

     <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          
        </Drawer.Navigator>
      )
    :
    
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;


