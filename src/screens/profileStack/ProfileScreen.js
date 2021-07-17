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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/button';
import { getProfile,editProfile } from "../../services/profileUpdate";
import {getStateList} from '../../services/auth';


const ProfileScreen = (props) => {
  const [isLoading, setLoading] = useState(true);
 const [data, setData] = React.useState([]);
 const [image,setImage] = React.useState([]);
  const [contactNo, setContactNo] = useState('')
  const [address ,setAddress] = useState('')
  const [areaCode, setAreaCode] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [bankName, setBankName] = useState('')
  const [benificiaryName, setBenificiaryName] = useState('')
  const [routingNo, setRoutingNo] = useState('')
  const [accountNo,setAccountNo] = useState('')
  const [accountType, setAccountType] = useState('')
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [areaCodeList, setAreaCodeList] = useState([]);


  useEffect(() =>{
    ProfileGet()
    StateList()
  }, []);

    function ProfileGet(){
          getProfile()  
        .then((res) => {
        
          if (res.code == 200){
              if (res.success == "false"){
                  alert(res.message)
              }
            else {
              {
              setData(res)
              setImage(res.driver_details.profile_image)
              setContactNo(res.driver_details.contact_no)
              setAddress(res.driver_details.address)
              setAreaCode(res.driver_details.pin_code)
              setCity(res.driver_details.city)
              setState(res.driver_details.state)
              setBankName(res.driver_details.bank_name)
              setBenificiaryName(res.driver_details.bank_beneficiary)
              setRoutingNo(res.driver_details.bank_routing_no)
              setAccountNo(res.driver_details.bank_acc_key )
              setAccountType(res.driver_details.bank_acc_type)
              }
              setLoading(false); 
              };   
                
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

    function StateList(){
     getStateList()  
      .then((res) => {
        if (res.code == 200){
            if (res.success == "false"){
                alert(res.message)
            }
          else {
            setStateList(res.state_list);
            setCityList(res.city_list)
            setAreaCodeList(res.area_code_list);
            setLoading(false);
            };  
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
 
    const saveBankKey = async () => {
        try {
            await AsyncStorage.setItem('bank_Key',accountNo);
        } catch (e) {
            console.log("error", e)
        } 
        };


    
    function onEditProfile(){

           editProfile(contactNo,address,areaCode,city,state,
                      bankName,benificiaryName,routingNo,accountNo,accountType)

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

  
  
  if (isLoading){
    return (
      <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
     <ActivityIndicator size="large" color="#fff" />
     </View>
    )
  }
  else{
   
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#000' barStyle="light-content"/>  
       <ScrollView style ={{marginBottom:80}}>  
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image 
              source={{
                  uri: image
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
              placeholder={contactNo != "" ? contactNo : "Enter Contact Number"}
              placeholderTextColor = "#fff"
              value={contactNo}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => setContactNo(val)}
            />
          </View>
        </View>
        
        <View style={{paddingHorizontal: 30,}}>
          <Text style={styles.text_footer}>Address</Text>
          <View style={styles.action}>
            <TextInput 
                placeholder={address != "" ? address : "Enter Address"}
                placeholderTextColor = "#fff"
                value={address}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => setAddress(val)}
            />
          </View>
        </View>

          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>State</Text>
            <View style={styles.action}>
              <Picker
              style={styles.picker} itemStyle={styles.pickerItem}
              selectedValue={state}
              onValueChange={(itemValue, itemIndex) => setState(itemValue)}>
              {stateList.map((item, key)=>
              <Picker.Item label={item.state_name} value={item.id} key={item.id} />)}
            </Picker>
            </View>
          </View>
          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>City</Text>
            <View style={styles.action}>
                <Picker
                    style={styles.picker} itemStyle={styles.pickerItem}
                    selectedValue={city}
                    onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
                    {cityList.map((item, key)=>
                    <Picker.Item label={item.city_name} value={item.id} key={item.id} />)}
              </Picker>
            </View>
          </View>
          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>Area Code</Text>
            <View style={styles.action}>
               <Picker
                  style={styles.picker} itemStyle={styles.pickerItem}
                  selectedValue={areaCode}
                  onValueChange={(itemValue, itemIndex) => setAreaCode(itemValue)}>
                  {areaCodeList.map((item, key)=>
                  <Picker.Item label={item.areacode} value={item.id} key={item.id} />)}
                </Picker>
            </View>
          </View>
        <View  style={{paddingHorizontal: 40, paddingBottom:5,paddingTop:20}}>
          <Text style ={{color :'#fff', fontSize:25, fontWeight:'bold'}}>Bank Details</Text>
        </View>
          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>Bank Name</Text>
            <View style={styles.action}>
              <TextInput 
                placeholder={bankName !=""? bankName :"Enter Bank Name"}
                placeholderTextColor = "#fff"
                value={bankName}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => setBankName(val)}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>Benificiary Name</Text>
            <View style={styles.action}>
              <TextInput 
                placeholder={benificiaryName !=""? benificiaryName :"Enter Benificiary Name"}
                placeholderTextColor = "#fff"
                value={benificiaryName}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => setBenificiaryName(val)}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>Routing Number</Text>
            <View style={styles.action}>
              <TextInput 
                placeholder={routingNo !=""? routingNo :"Enter Routing Number"}
                placeholderTextColor = "#fff"
                value={routingNo}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => setRoutingNo(val)}
              />
            </View>
          </View>

          <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>Account Number</Text>
            <View style={styles.action}>
              <TextInput 
                placeholder={accountNo !=""? accountNo :"Enter Account Number"}
                placeholderTextColor = "#fff"
                value={accountNo}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => setAccountNo(val)}
              />
            </View>
          </View>

        <View style={{paddingHorizontal: 30,}}>
            <Text style={styles.text_footer}>Account Type</Text>
          <View style={styles.action}>
            <Picker
              style={styles.picker} itemStyle={styles.pickerItem}
              selectedValue={accountType}
              onValueChange={(val) => setAccountType(val)}>
            <Picker.Item label="Savings Account" value="1" />
            <Picker.Item label="Current Account" value="2" />
          </Picker>
          <View style={styles.arrowWrapper}>
            <Text style={styles.arrow}>&#9660;</Text>
          </View> 
        </View>
      </View>

       <View style={{ marginTop:13,alignItems:'center'}}>
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