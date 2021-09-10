import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ToastAndroid,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {emailCheck} from '../../services/auth';
import images from '../../images';
import Button from '../../components/button';
import loginStyles from './loginComponentsStyles';
import Toaster from '../../services/toasterService';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    fullName: '',
    contactNo: '',
    emailId: '',
    passwordCheck: '',
    confirm_password: '',
    check_textInputChange: false,
    isValidUser: true,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const [response, setResponse] = React.useState('');
  const [check, setCheck] = React.useState(false);

  function onSubmit() {
    if (validate(data.emailId)) {
      if (checkEmail(data.emailId)) {
        if (data.fullName.length != 0) {
          if (data.contactNo.length == 10) {
            if (
              data.passwordCheck == data.confirm_password &&
              data.passwordCheck.length > 7
            ) {
              navigation.navigate('DetailsScreen', {
                emailId: data.emailId,
                fullName: data.fullName,
                contactNo: data.contactNo,
                passwordCheck: data.passwordCheck,
              });
            } else {
               Toaster.show( 'Please enter correct password',3000);
             
            }
          } else {
            Toaster.show('Please enter correct Contact Number',3000);
           
          }
        } else {
          Toaster.show('Please enter correct Full Name',3000);
          
        }
      }
    } else {
      Toaster.show(   'Please enter correct Email ',3000);
    
    }
  }

  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const fullNameInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        fullName: val,
        check_fullNameInputChange: true,
      });
    } else {
      setData({
        ...data,
        fullName: val,
        check_fullNameInputChange: false,
      });
    }
  };

  const emailIdInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        emailId: val,
        check_emailIdInputChange: true,
      });
    } else {
      setData({
        ...data,
        emailId: val,
        check_emailIdInputChange: false,
      });
    }
  };

  const contactNoInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        contactNo: val,
        check_contactNoInputChange: true,
      });
    } else {
      setData({
        ...data,
        contactNo: val,
        check_contactNoInputChange: false,
      });
    }
  };

  const handlepasswordCheckChange = val => {
    setData({
      ...data,
      passwordCheck: val,
    });
  };

  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  function checkEmail(text) {
    emailCheck(text).then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          Toaster.show(res.message, 3000);
          setCheck(false);
        } else {
          setCheck(true);
          return check;
        }
      } else {
        Toaster.show(res.message, 3000);
      }
    });
    return check;
  }

  return (
    <View style={loginStyles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={loginStyles.header}>
        <Animatable.Image
          animation="fadeInUpBig"
          duraton="2000"
          source={images.logo}
          style={loginStyles.logo}
          resizeMode="stretch"
        />
      </View>

      <Animatable.View animation="fadeInUpBig" style={[styles.footer]}>
        <Text style={loginStyles.text_header}>Register Now!</Text>

        <View style={loginStyles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#fff"
            style={loginStyles.textInput}
            autoCapitalize="none"
            onChangeText={val => fullNameInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <View style={loginStyles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />

          <TextInput
            placeholder="Contact Number"
            placeholderTextColor="#fff"
            style={loginStyles.textInput}
            autoCapitalize="none"
            keyboardType="number-pad"
            onChangeText={val => contactNoInputChange(val)}
          />
        </View>

        <View style={loginStyles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#fff"
            style={loginStyles.textInput}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={val => emailIdInputChange(val)}
          />
        </View>

        <View style={loginStyles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#fff"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={loginStyles.textInput}
            autoCapitalize="none"
            onChangeText={val => handlepasswordCheckChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={loginStyles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Confirm Your Password"
            placeholderTextColor="#fff"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={loginStyles.textInput}
            autoCapitalize="none"
            onChangeText={val => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.buttonSection}>
          <Button style={styles.submit} onPress={() => onSubmit()}>
            <Text style={{color: '#fff', fontSize: 17}}>Submit</Text>
          </Button>

          <View style={styles.textPrivate}>
            <Text style={[styles.textPrivate, {color: '#fff'}]}>
              Already have a account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}>
              <Text
                style={[styles.textPrivate, {fontSize: 15}, {color: '#fff'}]}>
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  footer: {
    flex: 2,
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  buttonSection: {
    alignItems: 'center',
    marginTop: 50,
  },

  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 7,
    color: '#fff',
  },
  submit: {
    alignItems: 'center',
    marginVertical: -10,
    width: '100%',
    backgroundColor: '#000',
  },
});
