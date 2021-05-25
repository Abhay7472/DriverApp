import React from 'react';
import { View, Text, Button, StyleSheet,StatusBar } from 'react-native';

const HomeScreen = ({navigation}) => {
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
