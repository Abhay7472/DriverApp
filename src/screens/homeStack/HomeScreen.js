import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet,StatusBar,Alert,ActivityIndicator, Image,TouchableOpacity ,Fragment,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Card from '../../components/card';
import images from '../../images';
import Button from '../../components/button';
import { startDay, orderDetail, dashBoard} from '../../services/orderCreate';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';


const HomeScreen = ({navigation}) => {
 const [isLoading, setLoading] = useState(true);
 const [data, setData] = useState([]);
 const[result, setResult]=useState({
   orderList:false,
   openDetail:false,
 });
 const [list, setList] = useState([]);
 const [orderValue, setOrderValue] =useState([])


  useEffect(() => {
    loadScreen()
    checkBankKey()
    
  }, []);

    useFocusEffect(
      React.useCallback(() => {
        const intervalId= setInterval(()=> loadScreen(), 15000)

        console.log('dropoff was focused');
        // Do something when the screen is focused
        return () => {
          clearInterval(intervalId)
          console.log('dropoff was unfocused');
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };
      }, [])
    );
  

  const checkBankKey=async()=>{
      try {
        bankKey = await AsyncStorage.getItem('bank_Key');

        if(bankKey === null)
        {
          Alert.alert(
            'Welcome','Enter bank details for payments',
            [{
                text: 'Skip',
                onPress: () =>{ console.log('Skiped')}
              },
              {
                text: 'Proceed',
                onPress: ()=> {navigation.navigate('HomeDrawer', { screen: 'Profile' })}
              },
            ])}
      } catch(e) {
        console.log(e);
      }
  }
  function loadScreen() {
    dashBoard()  
        .then((res) => {
          if (res.code == 200){
              if (res.success == "false"){
                  alert(res.message)
              }
            else {
              setData(res)
              if(res.start_day_key == "true"){
                setResult({
                  orderList:true,
                })
                setList(res.list)
                }
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
    
  }

    const onLoad= () =>{
      console.log("in onload")
      
      startDay()  
        .then((res) => {
          setLoading(true);
          if (res.code == 200){
              if (res.success == "false"){
                  alert(res.message)
              }
            else {
              if(res.start_day_key == "true"){
                setResult({
                  orderList:true,
                })
                setList(res.list)
                loadScreen()
                }
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
    }

  const checkScanType=()=>{
    if (data.scan_type==1){
        navigation.navigate('QrScanPickup')
    }
    else{
     navigation.navigate('QrScanDelivery')
    }
  }
   
    

const Item = ({ orderId,orderName,orderAddress,locationImage }) => (
  
      <Card style= {{height:190,backgroundColor:'#333', marginVertical:10,}}>
        <TouchableOpacity onPress={()=>navigation.navigate('AdditionalInfo', {orderId})}>
      <Text style ={{textAlign:'left', color:'#fff', fontSize:15, fontWeight:'bold',marginVertical:5}}>{orderName}</Text>
      <Text style ={{textAlign:'left', color:'#fff'}}>{orderAddress}</Text>

      <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
      
        <Image 
          source= {{uri:locationImage}}
          style={{height:90, width:180, borderRadius:10}}
        />
         <Button style={styles.scanButton} onPress={()=>navigation.navigate('AdditionalInfo', {orderId})}>
                <Text style={{color: '#fff', fontSize:16}}>Start Now</Text>     
          </Button>
      </View>
      </TouchableOpacity>
    </Card>
 
  );
  
  // const selectionHandler= (orderId) =>{
      
  //     orderDetail(orderId)  
  //       .then((res) => {
  //         if (res.code == 200){
  //             if (res.success == "false"){
  //                 alert(res.message)
  //             }
  //           else {
  //              setOrderValue(res)
  //               setResult({
  //                 orderDetail:true,
  //               })
  //             };  
  //         }
  //         else {
  //             ToastAndroid.showWithGravityAndOffset(
  //             res.message,
  //             ToastAndroid.LONG,
  //             ToastAndroid.BOTTOM,
  //             25,
  //             50
  //             );
  //         }
  //       })
  //   }


      const renderItem = ({ item }) => (
        <Item 
          orderId={item.id}
          orderName={item.bussiness_name}
          orderAddress={item.merchant_business_address}
          locationImage={item.location}
          />  
      );
  
    

  if (isLoading){
    return (
      <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
     <ActivityIndicator size="large" color="#fff" />
     </View>
    )
  }


  else{
    
    return (
      <View style={[styles.container,{paddingHorizontal:20}]}>
       <StatusBar backgroundColor='#000' barStyle="light-content"/> 
      { !result.orderDetail && 
      <View style={styles.container}>
      

          <Text style = {styles.title}>Upcoming Pickups </Text>

          <Card style={styles.cardView}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'column',flex:0.8}}>  
                <Text style={{color:'#fff', fontSize:15}}>{data.list_type}</Text>
                <Text style={{color:'grey', fontSize:14, marginVertical:5}}>{data.today_date}</Text>
              </View>
        
              <View style={{flexDirection:'column',alignItems:'flex-end',flex:0.2}}>
                <Image 
                  source={images.flowers}
                  style={{width:60, height:60, }}
                  resizeMode="stretch"
                />
              </View> 
          </View>

          {data.start_day_key == "true" ?
              <View/>
              : 
            <View style= {{flexDirection:'row', justifyContent:'space-between',paddingRight:10}}>
                <Button style={styles.redButton} onPress={() => onLoad()} >
                  <Text style={{color: '#fff', fontSize:16}}>Start</Text>     
                </Button>

                <Button style={styles.button} onPress={() => {}}>
                    <Text style={{color: '#fff', fontSize:16}}>Reject</Text>     
                </Button> 
          </View>
          }
        </Card>
        

      { result.orderList &&
          <>
            <Text style = {styles.title}>List of {data.list_type} </Text> 
              <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListFooterComponent ={<View style={{height:30}}></View>}
              />
          </>     
          }
        </View>
      }

        { result.orderDetail &&
          <>
          <View style={styles.container}>
            <Text style = {styles.infoTitle}>Additional Information</Text> 
            <Image
              source={{uri:orderValue.delivery_details.location}}
              style={{width:'100%', height:'32%', }}
              resizeMode="stretch"
             />
            <View style={{flexDirection:'row', marginVertical:20}}> 
              <FontAwesome name="map-marked-alt" color='#fff' size={26}/>  
              <Text style = {styles.info}>{orderValue.delivery_details.address}</Text>
            </View>
            <View style={{flexDirection:'row',marginVertical:20}}> 
              <Icon name="ios-home" color='#fff' size={26}/>
               <Text style = {styles.info}>{orderValue.delivery_details.full_name}</Text>
            </View> 
            <View style= {{alignItems:'center',justifyContent:'center'}}>
              <Button style={styles.proceedButton} onPress={() => navigation.navigate(HomeScreen)} >
                <Text style={{color: '#fff', fontSize:16}}>Proceed</Text>     
              </Button> 
            </View>  
          </View>  
          </>     
        }
    </View>
      
    );
  }  
};


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex: 1, 
  },
  title:{
    fontSize: 17,
    color:'#fff',
    textAlign:'left',
    paddingVertical: 15,
  },
  cardView:{
    backgroundColor: '#333333',
    padding: 10,
  },
  redButton:{
    borderColor: '#A30000', //redColor code
    backgroundColor:'#A30000',
    width:'45%',
  },
  button:{
    borderColor: '#D1D1D1',
    backgroundColor:'#000',
    width:'45%',
  },
  scanButton:{
    borderColor: '#A30000', //redColor code
    backgroundColor:'#A30000',
    width:'35%',
    marginTop:20,
  },
  infoTitle:{
    fontSize: 20,
    color:'#fff',
    textAlign:'left',
    paddingVertical: 15,
    fontWeight:'bold'
  },
  info:{
    fontSize: 15,
    color:'#fff',
    textAlign:'left',
    marginHorizontal: 24,
  },
  proceedButton:{
    marginTop:30,
    borderColor: '#A30000', //redColor code
    backgroundColor:'#A30000',
    width:'55%',
  }
});
