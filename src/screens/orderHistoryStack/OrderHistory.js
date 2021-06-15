import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DeliveryScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text style ={{ color:'#fff'}}> Delivery Screen</Text>
      
      </View>
    );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
