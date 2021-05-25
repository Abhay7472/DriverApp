import React from 'react';
import { View, 
    Alert,
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    ToastAndroid, 
    Image,} from 'react-native';
    
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { signin } from "../services/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/context';

const SignInScreen = ({ navigation }) => {

    
   const [data, setData] = React.useState({
        emailId: '',
        passwordCheck: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidpasswordCheck: true,
    });

    const { signIn } = React.useContext(AuthContext);

    const onSignIn =() => {
       console.log("In SignIn Function")
       if(validate(data.emailId)){
           if(data.passwordCheck.length == 8){
                    signin( data.emailId, data.passwordCheck )

                    .then((res) => {
                    console.log(res); 
                    console.log('in main tab');
                    
                    if (res.code == 200){
                    if (res.success == "false"){
                        alert(res.message)
                        navigation.navigate('SignInScreen')
                        } 
                     else {
                        console.log(res["driver_details"]["access_token_db"]);
                        const foundUser = async () => {
                            console.log("Inside setData function")
                        try {
                            await AsyncStorage.setItem(
                            'userToken',
                            res["driver_details"]["access_token_db"]
                            );
                        } catch (error) {
                            console.log("setData error", e)
                            // Error saving data
                        }
                        
                        };
                        foundUser();
                         signIn(res["driver_details"]["access_token_db"])
                        //navigation.navigate('MainTabScreen')
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
           else {
                    ToastAndroid.showWithGravityAndOffset(
                        'Please enter correct passwordCheck',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      ); 
                } 
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
    }
    
    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                emailId: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                emailId: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlepasswordCheckChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                passwordCheck: val,
                isValidpasswordCheck: true
            });
        } else {
            setData({
                ...data,
                passwordCheck: val,
                isValidpasswordCheck: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            
            
            return false;
        }
        else {
            
            return true;
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
            />
        </View>
        
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <Text style={styles.text_header}>Log In</Text>
            
            <View style={styles.action}>
                
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />

                <TextInput 
                    placeholder="Email Address" 
                    placeholderTextColor = "#fff"
                    style={styles.textInput}
                    keyboardtype = 'email-address'
                    autoCapitalize="none"
                    onChangeText={(val) =>textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
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
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email Id must be 4 characters long.</Text>
            </Animatable.View>
            }
            
            <View style={styles.action}>
                
                 <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="password"
                    placeholderTextColor = "#fff"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlepasswordCheckChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
              
            </View>
            { data.isValidpasswordCheck ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            
            <TouchableOpacity 
                        onPress = {()=> navigation.navigate('ForgotPasswordScreen')}>
                        <Text style={{color: '#fff', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity> 

            <View style={styles.button}>
  
                <TouchableOpacity
                    onPress={() => onSignIn()}
                    
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
      paddingBottom: 20,
      paddingTop: 10,
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
        marginTop: 50,
        
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

    },
     errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
  });

  export default SignInScreen;