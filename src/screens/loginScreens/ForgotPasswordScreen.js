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
  Alert,
  ToastAndroid,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {resetPassword} from '../../services/auth';
import Feather from 'react-native-vector-icons/Feather';
import images from '../../images';
import Button from '../../components/button';
import loginStyles from './loginComponentsStyles';
import Toaster from '../../services/toasterService';

const ForgotPasswordScreeen = ({navigation}) => {
  const [data, setData] = React.useState({
    emailId: '',
  });

  const onSubmit = () => {
    if (validate(data.emailId)) {
      resetPassword(data.emailId).then(res => {
        if (res.code == 200) {
          if (res.success == 'false') {
            alert(res.message);
            navigation.navigate('ForgotPasswordScreen');
          } else {
            Alert.alert(
              'Password Reset!',
              'The link to reset password is sent on the email',
              [{text: 'Okay'}],
            );
            navigation.navigate('SignInScreen');
          }
        } else {
          Toaster.show(res.message, 3000);
        }
      });
    } else {
      Toaster.show('Please enter correct Email', 3000);
    }
  };
  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };
  const resetemailIdInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        emailId: val,
        check_resetemailIdInputChange: true,
      });
    } else {
      setData({
        ...data,
        emailId: val,
        check_resetemailIdInputChange: false,
      });
    }
  };

  return (
    <View style={loginStyles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      <View style={loginStyles.header}>
        <Animatable.Image
          animation="fadeInUpBig"
          duraton="2000"
          source={images.logo}
          style={loginStyles.logo}
          resizeMode="stretch"></Animatable.Image>
      </View>

      <Animatable.View animation="fadeInUpBig" style={loginStyles.footer}>
        <Text style={loginStyles.text_header}>Forgot Password</Text>

        <View style={styles.picture}>
          <Image source={images.emailSent} style={styles.emailImage}></Image>
        </View>

        <View style={loginStyles.action}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#fff"
            style={loginStyles.textInput}
            autoCapitalize="none"
            onChangeText={val => resetemailIdInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <Button style={styles.submit} onPress={() => onSubmit()}>
          <Text style={{color: '#fff', fontSize: 17}}>Submit</Text>
        </Button>
      </Animatable.View>
    </View>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  emailImage: {
    width: 100,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'center',
    tintColor: '#fff',
  },
  picture: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
    backgroundColor: '#000',
  },
});

export default ForgotPasswordScreeen;
