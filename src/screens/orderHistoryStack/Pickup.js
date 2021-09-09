import React,{useState,useEffect} from 'react';
import { Text, View,ActivityIndicator,FlatList, SafeAreaView,Image,StatusBar } from 'react-native';
import {orderPickup} from '../../services/History';
import Card from '../../components/card'
import Toaster from '../../services/toasterService';

const Pickup = () => {

  const[pickupList, setPickupList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    orderPickup()  
    .then((res) => {
      if (res.code == 200){
          if (res.success == "false"){
            alert(res.message)
          }
        else {
          setPickupList(res.order_history_pickup);
          };   
          setLoading(false);   
      }
      else {
        Toaster.show(res.message,3000)
      }
    })
      
  }, [])  
    
   const Item = ({ orderId,pickedupAt,categoryIcon}) => (
  
      <Card style= {{backgroundColor:'#333', marginVertical:10,flexDirection:'row'}}>
      
        <View style={{ flexDirection: 'column',flex:3 }}>
          <Text style={{color:'grey', fontSize:13,}}>ORDER ID</Text>
          <Text style={{color:'#fff',marginTop:5}}>{orderId}</Text>
          <Text style={{color:'grey',marginTop:5}}>Pickup Date & Time</Text>
          <Text style={{color:'#fff',marginTop:5}}>{pickedupAt}</Text>          

          </View>  
        
        <View style={{ flexDirection: 'column' , flex:1}}>
        <Image
          source= {{uri:categoryIcon}}
          style={{height:70, width:70}}
        />
      </View>      
    </Card>
 
  );


    const renderItem = ({ item }) => (
        <Item 
          orderId={item.orderID}
          pickedupAt={item.order_pickedup_at}
          categoryIcon={item.category_icon}
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
    
    <SafeAreaView style={{flex:1,backgroundColor:'#000'}}>
    <StatusBar backgroundColor='#000' barStyle="light-content"/>
    <View style= {{marginTop:60, flex:4,marginHorizontal:17,}}> 
     <FlatList
        data={pickupList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent ={<View style={{height:70}}></View>}
      />
    </View>  
    
    </SafeAreaView>
  )
  }

  
}

export default Pickup;