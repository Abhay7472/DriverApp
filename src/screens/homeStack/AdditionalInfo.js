import React,{useEffect, useState}  from 'react';
import { Text, View,StyleSheet,Image,ActivityIndicator } from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Card from '../../components/card';
import images from '../../images';
import Button from '../../components/button';
import {additionalDetail} from '../../services/orderCreate';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import Toaster from '../../services/toasterService';


const AdditionalInfo = ({route, navigation}) => {
    
    const [orderValue, setOrderValue] =useState([])
    const [isLoading, setLoading] = useState(true);

    const[value, setValue]= useState({
        pickUp:1,
        delivery:2,
        id:'',
    })

    useEffect(() => {
       selectionHandler(route.params.orderId)
    }, [])

    useFocusEffect(
      React.useCallback(() => {
        const intervalId= setInterval(()=> selectionHandler(route.params.orderId), 2000)
        // console.log('dropoff was focused');
        return () => {
          clearInterval(intervalId)
        //   console.log('dropoff was unfocused');
        };
      }, [])
    );
    
    const selectionHandler= (orderId) =>{
        
        console.log("order", orderId)
        setValue({
            pickUp:1,
            delivery:2,
            id:orderId
        })
      additionalDetail(orderId)  
        .then((res) => {
            if (res.code == 200){
              if (res.success == "false"){
                  alert(res.message)
              }
            else {
                // console.log(res)
               setOrderValue(res)
               setLoading(false)
               
             }
            }
            else {
                Toaster.show(res.message,3000)
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
        <View style={styles.container}>

            <Image
                 source={{uri:orderValue.delivery_details.location}}
                style={{width:'100%', height:'32%', }}
                resizeMode="stretch"
            />

        <View style={{paddingHorizontal:20}}>
        
            <View style={{flexDirection:'row', marginVertical:20,}}> 
                <FontAwesome name="map-marked-alt" color='#fff' size={26}/>  
                 {/* <Text style = {styles.info}>{orderValue.delivery_details.full_name}</Text> */}
                <Text style = {styles.info}>{orderValue.delivery_details.address}</Text>
            </View>
            

            <View style={{flexDirection:'row',marginVertical:20,}}> 
                <Icon name="ios-home" color='#fff' size={26}/>
                {/* <Text style = {styles.info}>{orderValue.merchant_detail.full_name}</Text> */}
                <Text style = {styles.info}>{orderValue.home_details.address}</Text>
            </View> 
             {/* <Text style = {styles.infoDetails}>{orderValue.merchant_detail.adr_state_id}</Text> */}
        </View>    
        <> 
            {orderValue.pickup_scan_btn == "1" ?

                <View style= {{alignItems:'center',justifyContent:'center'}}>
                    <Button style={styles.proceedButton} onPress={() => navigation.navigate('QrScanPickup')} >
                    <Text style={{color: '#fff', fontSize:16}}>Scan</Text>     
                    </Button> 
                </View>  
                : 
                <View/>
            }

            {orderValue.pickup_image_btn == "1" ?

                <View style= {{alignItems:'center',justifyContent:'center'}}>
                    <Button style={styles.proceedButton} onPress={() => 
                        navigation.navigate('OrderImageUpload',{id:value.id,deliveryType:value.pickUp})} >
                    <Text style={{color: '#fff', fontSize:16}}>Image Upload</Text>     
                    </Button> 
                </View>  
                : 
                <View/>
            }

            {orderValue.delivery_scan_btn == "1" ?

                <View style= {{alignItems:'center',justifyContent:'center'}}>
                    <Button style={styles.proceedButton} onPress={() => navigation.navigate('QrScanDelivery')} >
                    <Text style={{color: '#fff', fontSize:16}}>Scan</Text>     
                    </Button> 
                </View>  
                : 
                <View/>
            }
            {orderValue.delivery_image_btn == "1" ?

                <View style= {{alignItems:'center',justifyContent:'center'}}>
                    <Button style={styles.proceedButton} onPress={() =>  
                        navigation.navigate('OrderImageUpload',{id:value.id,deliveryType:value.delivery})} >
                    <Text style={{color: '#fff', fontSize:16}}>Image Upload</Text>     
                    </Button> 
                </View>  
                : 
                <View/>
            }
            {orderValue.delivery_start_ride_btn == "1" ?

                <View style= {{alignItems:'center',justifyContent:'center'}}>
                    <Button style={styles.proceedButton} 
                     onPress={() => navigation.navigate('OrderDetailsScreen',{id:value.id})}>
                    <Text style={{color: '#fff', fontSize:16}}>Proceed</Text>     
                    </Button> 
                </View>  
                : 
                <View/>
            }
            {orderValue.delivery_end_ride_btn == "1" ?

                <View style= {{alignItems:'center',justifyContent:'center'}}>
                    <Button style={styles.proceedButton} 
                     onPress={() => navigation.navigate('Tracking',{id:value.id})}>
                    <Text style={{color: '#fff', fontSize:16}}>End Ride</Text>     
                    </Button> 
                </View>  
                : 
                <View/>
            }
        </>
        
    </View>  
    )} 
}
export default AdditionalInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex: 1, 
  },

  info:{
    fontSize: 17,
    color:'#fff',
    textAlign:'left',
    marginHorizontal: 24,
  },
  infoDetails:{
    fontSize: 14,
    color:'#fff',
    textAlign:'left',
    marginHorizontal: 50,
    marginTop:-10,
  },
  proceedButton:{
    marginTop:30,
    borderColor: '#A30000', //redColor code
    backgroundColor:'#A30000',
    width:'55%',
  }
});