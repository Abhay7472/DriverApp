import React,{useState,useEffect} from 'react';
import { Text, View,ActivityIndicator,FlatList, SafeAreaView,Image,StatusBar } from 'react-native';
import {orderDropOff} from '../../services/History';
import Card from '../../components/card'
import Toaster from '../../services/toasterService';

const DropOff = () => {

  const[dropOffList, setDropOffList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    orderDropOff()  
    .then((res) => {
      if (res.code == 200){
          if (res.success == "false"){
            alert(res.message)
          }
        else {
          setDropOffList(res.order_history_dropoff);
          };   
          setLoading(false);   
      }
      else {
        Toaster.show(res.message,3000)
      }
    })
      
  }, [])  
    
  const Item = ({ orderId,pickedupAt,categoryIcon,droppedOffAt,amountReceivedText,amountReceived}) => (
  
      <Card style= {{backgroundColor:'#333', marginVertical:10,flexDirection:'row'}}>
      
        <View style={{ flexDirection: 'column',flex:3 }}>
          <Text style={{color:'grey', fontSize:13,}}>ORDER ID</Text>
          <Text style={{color:'#fff',marginTop:5}}>{orderId}</Text>
          <Text style={{color:'grey',marginTop:5}}>Pickup Date & Time</Text>
          <Text style={{color:'#fff',marginTop:5}}>{pickedupAt}</Text>
           
          <Text style={{color:'grey',marginTop:5}}>DropOff Date & Time</Text>
          <Text style={{color:'#fff',marginTop:5}}>{pickedupAt}</Text>
               
            </View>
        <View style={{ flexDirection: 'column' , flex:1}}>
           
            <Image
            source= {{uri:categoryIcon}}
            style={{height:70, width:70}}
            />
                
            <View style={{marginTop:10,flex:1}}>
                <Text style={{color:'grey',marginTop:5,fontSize:12}}>{amountReceivedText}</Text>   
                <Text style={{color:'#fff',marginTop:5}}>{amountReceived}</Text>  
            </View>
        </View>    
    </Card>
 
  );


    const renderItem = ({ item }) => (
      <Item 
          orderId={item.orderID}
          pickedupAt={item.order_pickedup_at}
          categoryIcon={item.category_icon}          
          droppedOffAt={item.order_dropped_at}
          amountReceivedText={item.amount_received_text}
          amountReceived={item.amount_received}
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
        data={dropOffList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent ={<View style={{height:70}}></View>}
      />
    </View>  
    
    </SafeAreaView>
  )
  }
}

export default DropOff;