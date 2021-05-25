import React from 'react';
import { View, StyleSheet } from 'react-native';
const Button = props => {
  return (
    <View style={{ ...styles.button, ...props.style }}>{props.children}</View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
});
export default Button;