import React from 'react';
import { TouchableOpacity, StyleSheet,Text } from 'react-native';
const Button = props => {
  return (
    <TouchableOpacity  onPress= {props.onPress} style={{ ...styles.button, ...props.style }}>
        {props.children}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2, 
    margin: 10,
  },
 
});
export default Button;