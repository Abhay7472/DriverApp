import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WalletScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text style ={{ color:'#fff'}}> Wallet Screen</Text>
      
      </View>
    );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
