import React, { useState , useEffect} from 'react';

import { View, 
  Text,  
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  ToastAndroid,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Button from '../components/button';
import { signup,communitySecurity } from "../services/auth";
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../components/context';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';


const DetailsScreen = ({route, navigation}) => {

    const [isLoading, setLoading] = useState(true);
    const [text, setText] = React.useState([]);

    useEffect(() =>{
    console.log("in profile function")
    communitySecurity()  
    .then((res) => {
    console.log("my response", res)
      if (res.code == 200){
          if (res.success == "false"){
              alert(res.message)
          }
        else {
          setText(res);
          };   
          setLoading(false);   
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
    if (isLoading){
        return (
        <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
        <ActivityIndicator size="large" color="#fff" />
        </View>
        )}

  }, []);

    const renderInner =() =>(
      
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Community Safety Education</Text>
        <Text style={styles.panelSubtitle}>{text.list}</Text>
      </View>
    
    </View>
  );

 const renderHeader =() =>(
    <View style = {styles.header}>
      <View style = {styles.panelHeader}>
        <View style = {styles.panelHandle}/>
      </View>
    </View>
 );
   bs =React.createRef();
  fall = new Animated.Value(1);
  

  const [data, setData] = React.useState({
        driversLicense: '',
        backgroundCheck:'',
        registration: '',
        licensePlateNo: '',
        insurance: '',
        socialSecurityNo: '',
        driversLicensePhoto: '',
        backgroundCheckPhoto:'',
        registrationPhoto: '',
        licensePlateNoPhoto: '',
        insurancePhoto: '',
        socialSecurityNoPhoto: '',
        driverPhoto:'',
        facebook:'',
        linkedin:'',
        twitter:'',
        instagram:'',
        check_driverLicensePhoto: false,
        check_backgroundCheckPhoto:false,
        check_registrationPhoto: false,
        check_licensePlateNoPhoto: false,
        check_insurancePhoto: false,
        check_socialSecurityNoPhoto: false,
        check_driverPhoto:false,

    });

    const { signUp } = React.useContext(AuthContext);

    const permision =()=>{
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)    
    }

    // Driver's License Input
    const driverLicenceInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                driversLicense: val,
                check_driverLicenceInputChange: true
            });
        } else {
            setData({
                ...data,
                driversLicense: val,
                check_driverLicenceInputChange: false
            });
        }
    }
    
    const chooseDriverLicensePhoto =() =>{
        ImagePicker.openPicker({
          multiple: true,
          mediaType: 'photo',
          }).then(val => {
            setData({
            ...data,
            driversLicensePhoto: val,
            check_driverLicensePhoto:true,
            })
        }).catch(e => alert(e));
    }

    // Background Check Input

     const backgroundCheckInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                backgroundCheck: val,
                check_backgroundCheckInputChange: true
            });
        } else {
            setData({
                ...data,
                backgroundCheck: val,
                check_backgroundCheckInputChange: false
            });
        }
    }
    const chooseBackgroundCheckPhoto = async () =>{
    if(permision){
        ImagePicker.openPicker({
          multiple: true,
          mediaType: 'photo',
          }).then(val => {
            setData({
            ...data,
            backgroundCheckPhoto: val,
            check_backgroundCheckPhoto:true,
            })
       }).catch(e => alert(e));
    }else{
        Alert.alert("You need to give permission")
    }
}

    // registration Input change
    const registrationInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                registration: val,
                check_registrationInputChange: true
            });
        } else {
            setData({
                ...data,
                registration: val,
                check_registrationInputChange: false
            });
        }
    }
    const chooseRegistrationPhoto =async() =>{
        if(permision){
        ImagePicker.openPicker({
          multiple: true,
          mediaType: 'photo',
          }).then(val => {
            setData({
            ...data,
            registrationPhoto: val,
            check_registrationPhoto:true,
            })
       }).catch(e => alert(e));
    }else{
        Alert.alert("You need to give permission")
    }
    }

    // License Plate Number Change
    const licencePlateNoInputChange = (val) => {
        console.log("licencePlateNoInputChange", val)
        if( val.length !== 0 ) {
            setData({
                ...data,
                licensePlateNo: val,
                check_licencePlateNoInputChange: true
            });
        } else {
            setData({
                ...data,
                licensePlateNo: val,
                check_licencePlateNoInputChange: false
            });
        }
        console.log("license plate number input",data.licensePlateNo)
    }
    const chooseLicensePlateNoPhoto =async() =>{
        if(permision){
        ImagePicker.openPicker({
          multiple: true,
          mediaType: 'photo',
          }).then(val => {
            setData({
            ...data,
            licensePlateNoPhoto: val,
            check_licensePlateNoPhoto:true,
            })
            }).catch(e => alert(e));
        }else{
        Alert.alert("You need to give permission")
     }
    }

    //Insurance Input Change

    const insuranceInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                insurance: val,
                check_insuranceInputChange: true
            });
        } else {
            setData({
                ...data,
                insurance: val,
                check_insuranceInputChange: false
            });
        }
    }
    const chooseInsurancePhoto =() =>{
        if(permision){
        ImagePicker.openPicker({
          multiple: true,
          mediaType: 'photo',
          }).then(val => {
            setData({
            ...data,
            insurancePhoto: val,
            check_insurancePhoto:true,
            })
       }).catch(e => alert(e));
        }else{
        Alert.alert("You need to give permission")
     }
    }
    
    // Driver's Photo Input
     const chooseDriversPhoto=() =>{
      if(permision){
        ImagePicker.openPicker({
          mediaType: 'photo',
          width: 300,
          height: 400,
          cropping: true
          }).then(val => {
           setData({
            ...data,
            driverPhoto: val,
            check_driverPhoto:true,
            })
       }).catch(e => alert(e));
        }else{
        Alert.alert("You need to give permission")
     }
    }

    //Socail Security Number
    const socailSecurityNoInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                socialSecurityNo: val,
                check_socailSecurityNoInputChange: true
            });
        } else {
            setData({
                ...data,
                socialSecurityNo: val,
                check_socailSecurityNoInputChange: false
            });
        }
    }
    const chooseSocialSecurityNoPhoto =() =>{
         if(permision){
          ImagePicker.openPicker({
          multiple: true,
          mediaType: 'photo',
          }).then(val => {
            setData({
            ...data,
            socialSecurityNoPhoto: val,
            check_socialSecurityNoPhoto:true,
            })
       }).catch(e => alert(e));
        }else{
        Alert.alert("You need to give permission")
     }
    }


    const facebookInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                facebook: val,
                check_facebookInputChange: true
            });
        } else {
            setData({
                ...data,
                facebook: val,
                check_facebookInputChange: false
            });
        }
    }
     const linkedinInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                linkedin: val,
                check_linkedinInputChange: true
            });
        } else {
            setData({
                ...data,
                linkedin: val,
                check_linkedinInputChange: false
            });
        }
    }
 
 const twitterInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                twitter: val,
                check_twitterInputChange: true
            });
        } else {
            setData({
                ...data,
                twitter: val,
                check_twitterInputChange: false
            });
        }
    }
const instagramInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                instagram: val,
                check_instagramInputChange: true
            });
        } else {
            setData({
                ...data,
                instagram: val,
                check_instagramInputChange: false
            });
        }
    }
        function onSignup() {
            
          
        //    if (data.driversLicense.length == 10){
           signup(route.params.fullName, route.params.contactNo, route.params.emailId, route.params.passwordCheck, data.driversLicense, data.backgroundCheck, data.registration, data.licensePlateNo,
                    data.insurance, data.socialSecurityNo, data.driversLicensePhoto, data.backgroundCheckPhoto,data.registrationPhoto, data.licensePlateNoPhoto, data.insurancePhoto, data.socialSecurityNoPhoto, data.driverPhoto,
                    data.facebook,data.linkedin,data.twitter, data.instagracdm )

                .then((res) => {
                    console.log(res);
                    console.log('in main tab');
                    
                    if (res.code == 200){

                    if (res.success == "false"){
                        
                        alert(res.message)
                        navigation.navigate('SignUpScreen')
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
                        }
                        
                        };
                        foundUser();
                        signUp(res["driver_details"]["access_token_db"])
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
        //     else {
        //         ToastAndroid.showWithGravityAndOffset(
        //         'Please enter Correct Contact',
        //         ToastAndroid.LONG,
        //         ToastAndroid.BOTTOM,
        //         25,
        //         50
        //         ); 
        // }

         // }    
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#000' barStyle="light-content"/>  
        <BottomSheet
          ref={bs}
          snapPoints={[210, 0]}
          renderContent ={renderInner}
          renderHeader ={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enableGestureInteraction={true}
        />
        
        
        <ScrollView> 
        <Animated.View style={{
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>  
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
                style={styles.footer}
                animation="fadeInUpBig"
              >
              <Text style={styles.text_header}>Details</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Driver's License"
                    placeholderTextColor = "#fff"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => driverLicenceInputChange(val)}
                />
                <TouchableOpacity onPress = {chooseDriverLicensePhoto}>

                    {data.check_driverLicensePhoto ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : <Icon name="chevron-right" color={'#fff'} size={15}/>}
                   
                </TouchableOpacity>
            </View>
            
            <View style={styles.action}>
                <TextInput 
                    placeholder="Background Check"
                    placeholderTextColor = "#fff"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => backgroundCheckInputChange(val)}
                />
                <TouchableOpacity onPress = {chooseBackgroundCheckPhoto}>
                    {data.check_backgroundCheckPhoto ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : <Icon name="chevron-right" color={'#fff'} size={15}/>}
                   
                </TouchableOpacity>
            </View>

            
            <View style={styles.action}>
                <TextInput 
                    placeholder="Registration"
                    placeholderTextColor = "#fff"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => registrationInputChange(val)}
                />
                <TouchableOpacity onPress = {chooseRegistrationPhoto}>
                    {data.check_registrationPhoto ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : <Icon name="chevron-right" color={'#fff'} size={15}/>}
                   
                </TouchableOpacity>
            </View>

            
            <View style={styles.action}>
                <TextInput 
                    placeholder="License Plate Number"
                    placeholderTextColor = "#fff"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => licencePlateNoInputChange(val)}
                />
                <TouchableOpacity onPress = {chooseLicensePlateNoPhoto}>
                    {data.check_licensePlateNoPhoto ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : <Icon name="chevron-right" color={'#fff'} size={15}/>}
                   
                </TouchableOpacity>
            </View>

            
            <View style={styles.action}>
                <TextInput 
                    placeholder="Insurance"
                    placeholderTextColor = "#fff"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => insuranceInputChange(val)}
                />
                <TouchableOpacity onPress = {chooseInsurancePhoto}>
                    {data.check_insurancePhoto ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : <Icon name="chevron-right" color={'#fff'} size={15}/>}
                   
                </TouchableOpacity>
            </View>

             
            <View style={styles.action}>
                <Text style={{fontSize:15,flex:1, color:'#fff', paddingLeft: 10,paddingBottom: 15,}}>
                    Driver Photo
                </Text>
                <TouchableOpacity onPress = {chooseDriversPhoto}>
                   {data.check_driverPhoto ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : <Icon name="chevron-right" color={'#fff'} size={15}/>}
                   
                </TouchableOpacity>
            </View>

                 
            <View style={styles.action}>
                <TextInput 
                    placeholder="Socail Security Number"
                    placeholderTextColor = "#fff"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => socailSecurityNoInputChange(val)}
                />
                <TouchableOpacity onPress = {chooseSocialSecurityNoPhoto}>
                   {data.check_socialSecurityNoPhoto ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : <Icon name="chevron-right" color={'#fff'} size={15}/>}
                   
                </TouchableOpacity>
            </View>

                 
            <View style={styles.action}>
                <Text style={{fontSize:15,flex:1, color:'#fff', paddingLeft: 10,paddingBottom: 15,}}>
                    Community Safety Education
                </Text>
                <TouchableOpacity onPress = {() => bs.current.snapTo(0)}>
                   <Icon name="chevron-right" color={'#fff'} size={15}/>
                </TouchableOpacity>
            </View>

            <View style ={ styles.inputSection}>
              <TextInput style={{flex:1, color:'#fff'}} 
              placeholder="Enter Facebook Account" 
              placeholderTextColor="grey"
              onChangeText={(val) => facebookInputChange(val)}
               />
              <Image 
              source={require('../assets/socialAccountsLogo/facebook.png')}
              style={styles.icon}         
            />
            </View>
            <View style ={ styles.inputSection}>
              <TextInput style={{flex:1, color:'#fff'}} 
              placeholder="Enter Linkedin Account" 
              placeholderTextColor="grey" 
              onChangeText={(val) => linkedinInputChange(val)}
              />
              <Image 
              source={require('../assets/socialAccountsLogo/linkedin.png')}
              style={styles.icon}         
            />
            </View>
            <View style ={ styles.inputSection}>
              <TextInput style={{flex:1, color:'#fff'}} 
              placeholder="Enter Twitter Account" 
              placeholderTextColor="grey" 
              onChangeText={(val) => twitterInputChange(val)}/>
              <Image 
              source={require('../assets/socialAccountsLogo/twitter.png')}
              style={styles.icon}         
            />
            </View>
            <View style ={ styles.inputSection}>
              <TextInput style={{flex:1, color:'#fff'}} 
              placeholder="Enter Instagram Account" 
              placeholderTextColor="grey"
              onChangeText={(val) => instagramInputChange(val)} />
              <Image 
              source={require('../assets/socialAccountsLogo/instagram.png')}
              style={styles.icon}         
            />
            </View>
              
              <View style={styles.buttonSection}>
    
                    <TouchableOpacity
                        style={styles.submit}
                        onPress={() =>onSignup()}>
                        <Button>
                        <Text style={{color: '#fff', fontSize:17}}>Sign Up</Text> 
                        </Button>  
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
         </Animated.View>  
        </ScrollView>

      </SafeAreaView>      
    );
    
};

export default DetailsScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#000',    
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,    
    },
    logo: {
        width: height_logo,
        height: height_logo
    },

    footer: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 20,
        },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
        },  
    submit: { 
        width:'100%',
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2, 
        backgroundColor:'#000'
    },
    
    action:{
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 7,
        color: '#fff',
    },

    inputSection:{
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: 'blue',
        height: 45,
        borderRadius: 40,
        marginBottom: 10,
        marginHorizontal:10,
        fontSize: 16,
    },
    buttonSection: {
        alignItems: 'center',
        marginTop: 25,          
    },
    icon:{
        padding: 5,
        margin: 5,
        width: 40,
        height: 40,
        borderRadius: 40/2,
        resizeMode:'stretch',
        alignItems: 'center',
  },
   textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#fff',
        fontSize:15,
    },
    panel: {
        padding: 20,
        backgroundColor: '#000',
        paddingTop: -10,
        alignItems:'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    panelTitle: {
      color: '#fff',
      fontSize: 28,
      textAlign:'center',
      fontWeight: 'bold',
      alignItems:'center',
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 60,
        color:'#fff',
        textAlign:'center',
        margin:10,
    },
    header: {
        backgroundColor: '#000',
    // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
        backgroundColor:'#000'
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
});
