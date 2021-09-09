import React,{useEffect, useState}  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView,SafeAreaView,StatusBar,ActivityIndicator} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {orderDetail,startRide} from '../../services/orderCreate';
import Button from '../../components/button';
import Toaster from '../../services/toasterService';
 

const OrderDetailsScreen =({route, navigation})=>{

    const [isLoading, setLoading] = useState(true);
    const[data,setData]=useState([]);
    const[orderId, setOrderId] =useState("");

    useEffect(() => {
        orderDetail(route.params.id)  
        .then((res) => {
            if (res.code == 200){
                if (res.success == "false"){
                    alert(res.message)
                }
                else {
                    setData(res)
                    setOrderId(res.delivery_details.order_id)
                    console.log("hcdbkhc",res.delivery_details.order_id)
                    setLoading(false)
                }
            }
            else {
                Toaster.show(res.message,3000)
            }
        })
       
    }, [])

    const rideStart=()=>{
        startRide(route.params.id)  
        .then((res) => {
            if (res.code == 200){
                if (res.success == "false"){
                    alert(res.message)
                }
                else {
                    console.log('bhdsbjkdjsl')
                    navigation.navigate('Tracking',{id:orderId})
                    
                    setLoading(false)
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
    
        return(
        <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor='#000' barStyle="light-content"/>   
            <ScrollView style ={{marginBottom:80}}>           
                <View style={styles.head}><Text style={{color: '#fff', fontSize: 15}}>{data.merchant_detail.full_name}</Text></View>
                <View style={styles.rowSection}>
                    <View style={{flexDirection:'column',backgroundColor: "#333", borderRadius: 15,height: 130,width: 130,}}>
                        <Image style={styles.img} source={{uri: data.merchant_detail.category_icon}}/>
                    </View>
                    <View style={styles.columnSection}>
                        <Text style={styles.heading1}>{data.merchant_detail.category_name}</Text>
                        {/* <Text style={{color: 'grey', fontSize: 12, marginTop: 5,}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit etc.</Text> */}
                        <View style={{flexDirection: 'row', marginTop: 5,}}>
                           <MaterialIcons name="location-on" color="#fff" size={21} style={{marginTop: 7}}/>
                            <Text style={{color: '#fff', fontSize: 12, marginTop: 7, marginLeft:5,flex:1}}>{data.merchant_detail.adr_state_id}</Text>
                        </View>
                        <Text style={{color: '#fff', fontSize: 13, marginTop: 5}}>Delivery by: {data.merchant_detail.delivery_date} </Text>
                    </View>
                </View>
                    <Text style={{color: '#fff' ,fontSize: 15, marginTop: 7}}>Warehouse Address</Text>
                    <Text style={{fontSize: 14, color: 'grey', marginTop: 7}}>{data.warehouse_detail.address}</Text>
                    <View style={{ marginVertical:20, backgroundColor: '#333', borderRadius: 30,height: 25 ,width: '35%',justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#fff'}}>View directions</Text>
                    </View>
            
                <View style={styles.box}>
                    <View style={styles.rowSection}>
                        <View style={{flexDirection:'column',}}>
                            <Text style={styles.heading1}>Delivery Details</Text>
                        </View>
                        <View style={[styles.columnSection,{marginLeft:40}]}>
                            <Text style={styles.timeSection}>Estimated time {data.delivery_details.estimate_time}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.greytext}>CUSTOMER NAME</Text>
                        <Text style={styles.whitetext}>{data.delivery_details.full_name}</Text>
                        <Text style={styles.greytext}>ADDRESS</Text>
                        <Text style={styles.whitetext}>{data.delivery_details.address}</Text>
                        <Text style={styles.greytext}>CONTACT NUMBER</Text>
                        <Text style={styles.whitetext}>{data.delivery_details.contact_no}</Text>
                        <Text style={styles.greytext}>LOCATION</Text>
                        <Image style={styles.map} source={{uri:data.delivery_details.location }}/>
                        
                    </View>
                    <Button style={styles.submit} onPress={() =>rideStart()}>
                            <Text style={{color: '#fff', fontSize:17}}>Start Ride</Text>     
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
        );
    }    
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 20,
       
    },
    head:{
        width: '100%',
        marginTop:15,
        height: 40,
        backgroundColor: '#333',
        borderRadius: 7,
        color: '#fff',
        paddingLeft: 15,
        justifyContent: 'center',
    },
    whitetext:{
        color: '#fff',
        fontSize: 13,
        marginVertical: 10
    },
    rowSection:{
        marginVertical: 12,
        flexDirection: 'row',
        justifyContent:'space-between',
        flex:1,
    },
    columnSection:{
        flex:1,
        flexDirection:'column',
        marginLeft: 12,
    },
    img:{
        margin: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 100,
        width: 100,
    },
    greytext:{
        color: 'grey',
        fontSize: 12,
    },
    heading1:{
        color: '#fff',
        fontSize: 21
    },
    box:{
        backgroundColor: '#333',
        borderRadius: 15,
        paddingHorizontal: 15,

    },
    timeSection:{
        color: '#fff', 
        textAlign: 'center', 
        fontSize:14,
        backgroundColor: '#000',
        borderRadius: 10,
        padding:5
    },
    map:{
        marginTop: 20,
        height: 150,
        width: '100%',
        borderRadius: 15,
    },
    submit: {
        width:'100%',
        backgroundColor:'#000',
        marginVertical: '10%',
        alignSelf: 'center',
    },

})
export default OrderDetailsScreen;