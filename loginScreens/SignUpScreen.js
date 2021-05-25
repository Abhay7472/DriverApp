import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    ToastAndroid
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        fullName: '',
        contactNo:'',
        emailId: '',
        passwordCheck: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    function onSubmit() {
    console.log("inside on submit")
    console.log(data)
    
    if(validate(data.emailId)){
        if(data.fullName.length != 0) {
            if(data.contactNo.length == 10) {
                if (data.passwordCheck == data.confirm_password && data.passwordCheck.length > 7 ){
                    navigation.navigate('DetailsScreen', {emailId: data.emailId, fullName: data.fullName, contactNo: data.contactNo, passwordCheck: data.passwordCheck})
                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        'Please enter correct password',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                      ); 
                } 
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    'Please enter correct contact number',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                  );
            }
        } else {
            ToastAndroid.showWithGravityAndOffset(
                'Please enter correct fullName',
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
    
    const fullNameInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                fullName: val,
                check_fullNameInputChange: true
            });
        } else {
            setData({
                ...data,
                fullName: val,
                check_fullNameInputChange: false
            });
        }
    }

    const emailIdInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                emailId: val,
                check_emailIdInputChange: true
            });
        } else {
            setData({
                ...data,
                emailId: val,
                check_emailIdInputChange: false
            });
        }
    }

    const contactNoInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                contactNo: val,
                check_contactNoInputChange: true
            });
        } else {
            setData({
                ...data,
                contactNo: val,
                check_contactNoInputChange: false
            });
        }
    }

    const handlepasswordCheckChange = (val) => {
        setData({
            ...data,
            passwordCheck: val
        });
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
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
            <Text style={styles.text_header}>Register Now!</Text>

            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Full Name"
                    placeholderTextColor = "#fff"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => fullNameInputChange(val)}
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

            <View style={styles.action}>
               <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                   
                <TextInput 
                    placeholder="Contact Number"
                    placeholderTextColor = "#fff"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType= "number-pad"
                    onChangeText={(val) => contactNoInputChange(val)}
                />
                
            </View>

            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />   
                <TextInput 
                    placeholder="Your Email"
                    placeholderTextColor = "#fff"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType= "email-address"
                    onChangeText={(val) => emailIdInputChange(val)}
                />
                
            </View>

          
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
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

            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput
                    placeholder="Confirm Your Password"
                    placeholderTextColor = "#fff"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
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
            
            <View style={styles.buttonSection}>
  
                <TouchableOpacity
                        onPress={() => onSubmit() }
                        style={styles.signIn}

                >
                    <Text style={[styles.textButton, {
                        color: '#fff'
                    }]}>Continue</Text>
                </TouchableOpacity>   
                         
                <View style= {styles.textPrivate}>
                    <Text style = {[styles.textPrivate,
                    {color: '#fff'}]}>
                    Already have a account? </Text>
                
                    <TouchableOpacity 
                        onPress = {()=> navigation.navigate('SignInScreen')}>
                        <Text style = {[styles.textPrivate, {fontSize: 15},
                        {color: '#fff'}]}>Log In</Text>
                    </TouchableOpacity>  
                </View> 
                
            </View> 

               
            
             
        </Animatable.View>
      </View>
      
    );
};



export default SignInScreen;
const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#000'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        
    },
    footer: {
        flex: 2,
        backgroundColor: '#000',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    logo: {
      width: height_logo,
      height: height_logo
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        paddingBottom: 15,
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
    buttonSection: {
        alignItems: 'center',
        marginTop: 50,          
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor:'#333',
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 7,
        color: '#fff',

    },

    
  }); 