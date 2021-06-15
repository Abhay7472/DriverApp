import React,{useEffect} from 'react';
import { View, Text, Button, StyleSheet,StatusBar,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {

  
  useEffect(() => {
    setTimeout(async() => {
      try {
        bank_Key = await AsyncStorage.getItem('bank_Key');
        console.log('Check///', bank_Key)
        if(bank_Key === null)
        {
          Alert.alert(
            'Welcome','Enter bank details for payments',
            [{
                text: 'Skip',
                onPress: () =>{ console.log('Skiped')}
              },
              {
                text: 'Proceed',
                onPress: ()=> {navigation.navigate('HomeDrawer', { screen: 'Profile' })}
              },
            ])}
      } catch(e) {
        console.log(e);
      }
    }, 1000);
  }, []);

    return (
      <View style={styles.container}>
       <StatusBar backgroundColor='#000' barStyle="light-content"/> 
        <Text style ={{ color:'#fff'}}> Home Screen</Text>
      
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
