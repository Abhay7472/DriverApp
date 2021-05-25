import React from 'react';
import { View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar, 
    Alert,
    ToastAndroid,
    Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { resetPassword } from "../services/auth";
import Feather from 'react-native-vector-icons/Feather';

const ForgotPasswordScreeen = ({ navigation }) => {

  const [data, setData] = React.useState({
        emailId: '',
    });


  const onSubmit =() => {

      if(validate(data.emailId)){
        resetPassword(data.emailId)

        .then((res) => {
           console.log(res);
           console.log('password reset');
                     
          if (res.code == 200){
          if (res.success == "false"){
              alert(res.message)
              navigation.navigate('ForgotPasswordScreen')
          } 
          else {
          Alert.alert('Password Reset!', 'The link to reset password is sent on the email', [
                {text: 'Okay'}
            ]);
          navigation.navigate('SignInScreen')
          }
          }

          else {
          ToastAndroid.showWithGravityAndOffset(
          res.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
          );
        }
                                      
        })
        
      }
      
      else{
    ToastAndroid.showWithGravityAndOffset(
      'Please enter correct Email',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    }
  };
  const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            
            
            return false;
        }
        else {
            
            return true;
        }
    }
    const resetemailIdInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                emailId: val,
                check_resetemailIdInputChange: true
            });
        } else {
            setData({
                ...data,
                emailId: val,
                check_resetemailIdInputChange: false
            });
        }
    }

  return (
     <View style={styles.container}>
          <StatusBar backgroundColor='#000' barStyle="light-content"/>

         
        <View style={styles.header}>
            <Animatable.Image 
              animation="fadeInUpBig"
              duraton="2000"
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="stretch"
            >
            </Animatable.Image>
        </View >

        <Animatable.View 
          animation="fadeInUpBig"
          style={styles.footer}
        >
            <Text style={styles.text_header}>Forgot Password</Text>
            
          <View style={styles.picture}>  
            <Image 
              source={require('../assets/forward.png')}
              style={styles.emailImage}         
            >
            </Image>
          </View>
            
            <View style={styles.action}>
                
              <TextInput 
                placeholder="Email Address" 
                placeholderTextColor = "#fff"
                style={styles.textInput}
                autoCapitalize="none"
                 onChangeText={(val) => resetemailIdInputChange(val)}
              />
              {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}  
            </View>

            <View style={styles.button}>
  
                <TouchableOpacity
                    onPress={() => onSubmit()}
                    style={[styles.submit, {
                      borderColor: '#fff',
                      borderWidth: 1,                        
                    }]}
                >
                    <Text style={[styles.buttontext, {
                      color: '#fff'
                    }]}>Submit</Text>
                </TouchableOpacity>             
                
               
            </View>     
        </Animatable.View>    
        
                
    </View>
  );
}



const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#000'
    },
    header: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
         logo: {
      width: height_logo,
      height: height_logo, 
     
    },
    text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30,
      paddingBottom: 15,
    },
    footer: {
        flex:1,
        backgroundColor: '#333',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30, 
        
    },
    emailImage:{
      
      width: 100,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode:'center',
      tintColor: '#fff'

    },
    picture:{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#fff',
    },
    button: {
        alignItems: 'center',
        marginVertical: 30,
        
    },
    submit: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttontext: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    normalText:{
        color: '#fff', 
        marginTop:15,

    }
  });

  export default ForgotPasswordScreeen;