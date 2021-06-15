import React, { useState, useEffect }  from 'react';
import {
  View, 
  SafeAreaView, 
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,} from 'react-native';

import {
  Avatar,
  Title,
  Caption, 
} from 'react-native-paper';
import { CommonActions } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import Card from '../../components/card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/button';
import { getProfile,editProfile } from "../../services/profileUpdate";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
 const [data, setData] = React.useState([]);
  // const bankDetails = React.createRef();
  var [text, setText] = useState({
    contactNo:'',
    address: '',
    pinCode: '',
    city: '',
    state: '',
    token: '',
    bankName:'',
    benificiaryName:'',
    routingNo:'',
    accountNo:'',
    accountType:'',
  });

  useEffect(() =>{
    getProfile()  
    .then((res) => {
    
      if (res.code == 200){
          if (res.success == "false"){
              alert(res.message)
          }
        else {
          setData(res);
          console.log("res...", res)
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
      getToken();
    })
   
    
  }, []);

    
  const contactNoInputChange = (val) => {
        if( val.length !== 0 ) {
            setText({
                ...text,
                contactNo: val,
                check_contactNoInputChange: true
            });
        }
        
        else {
            setText({
              
                contactNo:val,
                check_contactNoInputChange: false
            });
        }
    }
    const addressInputChange = (val) => {
        if( val.length !== 0 ) {
            setText({
                ...text,
                address: val,
                check_addressInputChange: true
            });
        } else {
            setText({
                ...text,
                address: val,
                check_addressInputChange: false
            });
        }
    }

    const pinCodeInputChange = (val) => {
        if( val.length !== 0 ) {
            setText({
                ...text,
                pinCode: val,
                check_pinCodeInputChange: true
            });
        } else {
            setText({
                ...text,
                pinCode: val,
                check_pinCodeInputChange: false
            });
        }
    }

    const stateInputChange = (val) => {
        if( val.length !== 0 ) {
            setText({
                ...text,
                state: val,
                check_stateInputChange: true
            });
        } else {
            setText({
                ...text,
                state: val,
                check_stateInputChange: false
            });
        }
    }

    const cityInputChange = (val) => {
        if( val.length !== 0 ) {
            setText({
                ...text,
                city: val,
                check_cityInputChange: true
            });
        } else {
            setText({
                ...text,
                city: val,
                check_cityInputChange: false
            });
        }
    }

    const bankNameInputChange = (val) => {
        if( val.length !== 0 ) {
            setText({
                ...text,
                bankName: val,
                check_bankNameInputChange: true
            });
        } else {
            setText({
                ...text,
                bankName: val,
                check_bankNameInputChange: false
            });
        }
    }
    const benificiaryNameInputChange = (val) => {
        if( val.length !== 0 ) {
            setText({
                ...text,
                benificiaryName: val,
                check_benificiaryNameInputChange: true
            });
        } else {
            setText({
                ...text,
                benificiaryName: val,
                check_benificiaryNameInputChange: false
            });
        }
    }
    const routingNoInputChange = (val) => {
        if( val.length !== 0 ) {
            setText({
                ...text,
                routingNo: val,
                check_routingNoInputChange: true
            });
        } else {
            setText({
                ...text,
                routingNo: val,
                check_routingNoInputChange: false
            });
        }
    }
    const accountNoInputChange = (val) => {
        if( val.length !== 0 ) {
            setText({
                ...text,
                accountNo: val,
                check_accountNoInputChange: true
            });
        } else {
            setText({
                ...text,
                accountNo: val,
                check_accountNoInputChange: false
            });
        }
    }
    const accountTypeInputChange = (val) => {
        if( val.length !== 0 ) {
            setText({
                ...text,
                accountType: val,
                check_accountTypeInputChange: true
            });
        } else {
            setText({
                ...text,
                accountType: val,
                check_accountTypeInputChange: false
            });
        }
    }
      const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken')
        if(value !== null) {
          setText({
                ...text,
                token: value,   
            });
        }
      } catch(e) {

        console.log("token error",e)
      }
    }

    const saveBankKey = async () => {
        try {
            await AsyncStorage.setItem('bank_Key',data.driver_details.bank_acc_key);
        } catch (e) {
            console.log("error", e)
        } 
        console.log('bank key saved', bank_Key)
        };


     function updateData(){
      setText({    
        contactNo:data.driver_details.contact_no,
        address:data.driver_details.address,
        pinCode:data.driver_details.pin_code,
        city:data.driver_details.city,
        state:data.driver_details.state,
        bankName:data.driver_details.bank_name,
        benificiaryName:data.driver_details.bank_beneficiary,
        routingNo:data.driver_details.bank_routing_no,
        accountNo:data.driver_details.bank_acc_key,
        accountType:data.driver_details.bank_acc_type,
      });
       console.log('neww data>>>');
    }
    
    function onEditProfile(){
        updateData(data);
      if(text.token !== null){
           editProfile(text.contactNo,text.address,text.pinCode,text.city,text.state,
                      text.bankName,text.benificiaryName,text.routingNo,text.accountNo,text.accountType,text.token)

          .then((res) => {
           console.log("check__",res);
                     
          if (res.code == 200){
          if (res.success == "false"){
              alert(res.message)
          } 
          else {
          alert('Profile Updated');
           saveBankKey();
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
        return (
        <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
        )
       }  
      
     }

  const { navigation } = props;
  var offset = 0;
  var onScrollHandler = (e) => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    var direction = currentOffset > offset ? "down" : "up";
     
    offset = currentOffset;
    if (direction === "down") {
      navigation.dispatch(
        CommonActions.setParams({
          tabBarVisible: false,

        })
      );
    } else {
      navigation.dispatch(
        CommonActions.setParams({
          tabBarVisible: true,
        })
      );
    }
  };
  
  
  if (isLoading){
    return (
      <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
     <ActivityIndicator size="large" color="#fff" />
     </View>
    )
  }
  else{
    const imageUrl = data.driver_details.profile_image
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#000' barStyle="light-content"/>  
       <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScrollHandler}>  
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image 
              source={{
                  uri: imageUrl
              }}
              size={120}
          />
            <View style={{marginLeft: 20}}>
              <Text style={[styles.title, {
                marginTop:15,
                marginBottom: 5,
              }]}>
                {data.driver_details["full_name"]}
              </Text>
              <Caption style={styles.caption}>Delivery Agent</Caption>
            </View>
          </View>
        </View>
  
        <View style={styles.userInfoSection}>
        <Card style={styles.card}>
          <View style={{ marginVertical:6,flexDirection: 'row'}}>
            <Text style = {[styles.transactionDetails,{color:'#fff'}]}> 
              Money Earned </Text>
            <Text style ={{color:'green',flex :0.5,alignItems:'flex-end',fontSize:16,}}>({data.money_earned_per}%)</Text>
            
            </View>
              <View style={{ marginVertical:6,flexDirection: 'row'}}>
              <Text style = {[styles.transactionDetails,{color:'green'}]}>
                ${data.money_earned_dollar}</Text>
              <Text style ={{flex :1.5,alignItems:'flex-end',fontSize:14,}}>
                View Transactions</Text>
            </View>
          </Card>  
        </View>
  
        <View style={{flexDirection: 'row'}}>
            <View style={[styles.infoBox,]}>
             <Card style={{backgroundColor: '#333',alignItems: 'center',height:100, width:100}}>
              <Text style={[styles.infoBoxWrapper,{fontSize:45,fontWeight: 'bold',marginTop:-5}]}>{data.deliveries}</Text>
              <Text style={[styles.infoBoxWrapper,{fontSize:15,}]}>Deliveries</Text>
             </Card> 
            </View>
            <View style={styles.infoBox}>
              <Card style={{backgroundColor: '#333',alignItems: 'center',height:100, width:100}}>
              <Text style={[styles.infoBoxWrapper,{fontSize:42,fontWeight: 'bold',marginTop:-5}]}>{data.pickups}</Text>
              <Text style={[styles.infoBoxWrapper,{fontSize:15,}]}>Pickups</Text>
             </Card> 
            </View>
        </View>
  
        <View style={{paddingHorizontal: 30,}}>
          <Text style={styles.text_footer}>Phone Number</Text>
          <View style={styles.action}>
         
            <TextInput 
              
                placeholder={data.driver_details.contact_no != "" ? data.driver_details.contact_no : "Contact Number"}
                placeholderTextColor = "#fff"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => contactNoInputChange(val)}
               
            />
          </View>
        </View>
        
        <View style={{paddingHorizontal: 30,}}>
          <Text style={styles.text_footer}>Address</Text>
          <View style={styles.action}>
            <TextInput 
                placeholder={data.driver_details.address != "" ? data.driver_details.address : "Address"}
                placeholderTextColor = "#fff"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => addressInputChange(val)}
            />
          </View>
        </View>
  
       
        <View style={{ flexDirection: 'row'}}>  
            <View style={[styles.columnSection,{paddingLeft: 30, paddingRight:20,}]}>
    
                <Text style={styles.text_footer}>Pin Code</Text>
              <View style={styles.action}>
              <TextInput 
                  placeholder={data.driver_details.pin_code !=""? data.driver_details.pin_code : "Pin Code"}
                  placeholderTextColor = "#fff"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val) => pinCodeInputChange(val)}
              />
        </View>
            </View>  
            <View style={[styles.columnSection,{paddingRight: 30,paddingLeft:20,}]}>
          <Text style={styles.text_footer}>City</Text>
          <View style={styles.action}>
            <TextInput 
                placeholder={data.driver_details.city !=""? data.driver_details.city :"City"}
                placeholderTextColor = "#fff"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => cityInputChange(val)}
            />
        </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>State</Text>
            <View style={styles.action}>
              <TextInput 
                placeholder={data.driver_details.state !=""? data.driver_details.state :"State"}
                placeholderTextColor = "#fff"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => stateInputChange(val)}
              />
            </View>
          </View>
        <View  style={{paddingHorizontal: 40, paddingBottom:5,paddingTop:20}}>
          <Text style ={{color :'#fff', fontSize:25, fontWeight:'bold'}}>Bank Details</Text>
        </View>
          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>Bank Name</Text>
            <View style={styles.action}>
              <TextInput 
                // ref={bankDetails} 
                placeholder={data.driver_details.bank_name !=""? data.driver_details.bank_name :"Bank Name"}
                placeholderTextColor = "#fff"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => bankNameInputChange(val)}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>Benificiary Name</Text>
            <View style={styles.action}>
              <TextInput 
                placeholder={data.driver_details.bank_beneficiary !=""? data.driver_details.bank_beneficiary :"Benificiary Name"}
                placeholderTextColor = "#fff"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => benificiaryNameInputChange(val)}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>Routing Number</Text>
            <View style={styles.action}>
              <TextInput 
                placeholder={data.driver_details.bank_routing_no !=""? data.driver_details.bank_routing_no :"Routing Name"}
                placeholderTextColor = "#fff"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => routingNoInputChange(val)}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>Account Number</Text>
            <View style={styles.action}>
              <TextInput 
                placeholder={data.driver_details.bank_acc_key !=""? data.driver_details.bank_acc_key:"Account Name"}
                placeholderTextColor = "#fff"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => accountNoInputChange(val)}
              />
            </View>
          </View>

        <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>Account Type</Text>
          <View style={styles.action}>
            <Picker
              style={styles.picker} itemStyle={styles.pickerItem}
              selectedValue={text}
              onValueChange={(val) => accountTypeInputChange(val)}
            >
            <Picker.Item label="Savings Account" value="Savings Account" />
            <Picker.Item label="Checking Account" value="Checking Account" />
          </Picker>
          <View style={styles.arrowWrapper}>
            <Text style={styles.arrow}>&#9660;</Text>
          </View> 
        </View>
      </View>

       <View style={{marginBottom:70, marginTop:13,alignItems:'center'}}>
        <Button style={styles.submit} onPress={() => onEditProfile()}>

              <Text style={{color: '#fff', fontSize:17}}>Submit</Text>     
            </Button> 
      </View>
  
      </ScrollView>  
      
      </SafeAreaView>
    );
  } 
  
  
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#000'
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#fff',
  },
  caption: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '500',
    color:'#fff',
  },
  card: {
    backgroundColor: '#333',
    alignItems: 'center',
  },
  transactionDetails:{
    alignItems:'flex-start',
    fontSize:17,
    fontWeight:'bold',
    flex: 2,
  },
  infoBoxWrapper: {
    color:'#fff', 
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_footer: {
    marginTop: 20,
    color: '#777777',
    fontSize: 15,
    marginLeft: 20,
  },
  action: {
    backgroundColor:'#333333',
    borderRadius:8,
    flexDirection: 'row',
    marginTop: 6,
  },
  textInput: {
    flex: 1,
    paddingLeft: 13,
    color: '#fff',
  },
  columnSection:{
    width: '50%',
  },
  picker:{
    backgroundColor:'#333333',
    color:'#fff',
    flex: 0.8,
    width: '100%',
  },
  pickerItem: {
    width:'100%',
    color: '#777777',
  },
  arrowWrapper: {
    flex: 0.2,
    justifyContent: 'center',
  },

  arrow: {
    textAlign: 'center',
    color: '#fff',
  },
  submit: { 
    width:'70%', 
    backgroundColor:'#000',
    
  },
  
});