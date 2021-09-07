import React, {useState, useEffect,createRef} from 'react';
import {Text, View, TouchableOpacity,StyleSheet, Image, 
Dimensions, FlatList, ScrollView,SafeAreaView,StatusBar,TouchableHighlight,ActivityIndicator} from 'react-native';
import Button from '../../components/button';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Card from '../../components/card';
import SignatureCapture from 'react-native-signature-capture';
import ImagePicker from 'react-native-image-crop-picker';
import {rideEnd} from '../../services/orderCreate';

const DeliveryConfirmation =({route, navigation})=>{
    
 const [List, setList] = useState(false);
 const[show,setShow] =useState(false);
 const[data, setData] =useState({
     orderId:route.params.id,
     signature:"",
     houseImage:"",
     packageImage:"",
    
 })
 const[refusedReason,setRefusedReason]= useState('')
 const[deliveryType, setDeliveryType] =useState('')
  const [isLoading, setLoading] = useState(false);

    const Item = ({value,id}) => (
        <TouchableOpacity style={styles.listbtn} onPress={()=>onOrderRefused(value)}>
            <Text style={styles.listText}>
                {value}
            </Text>
        </TouchableOpacity>
        )
    
     const renderItem = ({item}) => (
        <Item
        value={item.key}
        id ={item.id}
        />
    );
    const renderInner =() =>(
        
      <View style={styles.panel}>
         <Button style={styles.submit} onPress={() => ClickImageHouse()}>
              <Text style={{color: '#fff', fontSize:17}}>Upload House Image</Text>     
        </Button>   

         <Button style={styles.submit} onPress={() => ClickImageOrder()}>
              <Text style={{color: '#fff', fontSize:17}}>Upload Order Image</Text>     
            </Button> 
         <Button style={styles.submit} onPress={() =>onOrderDrop()}>
              <Text style={{color: '#fff', fontSize:17}}>Submit</Text>     
        </Button>       

        </View>
    );

    const ClickImageHouse =()=>{
            ImagePicker.openCamera({
            mediaType: 'photo',
            width: 300,
            height: 400,
            cropping: false
            }).then(val => {setData({...data,houseImage:val})})
            .catch(e => {alert(e)});
    }

    const ClickImageOrder =()=>{
            ImagePicker.openCamera({
            mediaType: 'photo',
            width: 300,
            height: 400,
            cropping: false
            }).then(val => {setData({...data,packageImage:val})})
            .catch(e => {alert(e)});
    }

  const renderHeader =() =>(
      <View style = {styles.header}>
        <View style = {styles.panelHeader}>
          <View style = {styles.panelHandle}/>
        </View>
      </View>
  );
    bs =React.createRef();
    fall = new Animated.Value(1);

    const onOrderRefused=(value)=>{
        
        setRefusedReason(value)
        console.log("val",value)
    //    setLoading(true);

        deliverySubmit()       
    }

    const onOrderDrop=()=>{
       setDeliveryType("2")
        deliverySubmit()
    }

    const deliverySubmit =()=>{
        console.log("data",data)
        console.log("reason",refusedReason)
        setLoading(true);
        rideEnd(data.orderId,deliveryType,data.signature,data.houseImage,data.packageImage,refusedReason)
        .then(res => {
        if (res.code == 200) {
            if (res.success == 'false') {
            alert(res.message);
            console.log(res)
            } 
            else {
                 alert(res.message)
                 setLoading(false);
                navigation.navigate('HomeScreen')
                console.log(res)
               
                
            }
        } else {
            ToastAndroid.showWithGravityAndOffset(
            res.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
            );
        }
        });
    };
    
    const sign = createRef();

    const saveSign = () => {
        sign.current.saveImage();
    };

    const resetSign = () => {
        sign.current.resetImage();
    };

    const _onSaveEvent = (result) => {
        setData({
            signature:result,
            })
        deliverySubmit()
    };

    const _onDragEvent = () => {
        // This callback will be called when the user enters signature
        setDeliveryType("1")
    };
    const chnageValue =()=>{
        setList(!List)
        setDeliveryType("3")
    }

     if (isLoading) {
        return (
        <View
            style={{flex: 1, justifyContent: 'center', backgroundColor: '#000'}}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
        );
    } 
    else {

    return(
        <SafeAreaView style={styles.container}>
        {!show &&
            <View style={styles.one}>
            <BottomSheet
            ref={bs}
            snapPoints={[320, 0]}
            renderContent ={renderInner}
            renderHeader ={renderHeader}
            initialSnap={1}
            callbackNode={fall}
            enableGestureInteraction={true}
            />
            <View style={styles.two}>
                <TouchableOpacity
                    onPress={()=>setShow(true)}
                    style={styles.btn}>
                    <Text style={styles.text}>In Hand</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn} onPress={()=>bs.current.snapTo(0)}>
                    <Text style={styles.text}>Drop Box</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> chnageValue()}
                    style={[styles.btn, {backgroundColor: 'red', marginBottom: 0}]} >
                    <Text style={styles.text}>Order refused</Text>
                </TouchableOpacity>
                {List ? 
                <FlatList data={[{key: 'Not available',id:1}, {key: 'Fund not available',id:2}, {key: 'Denied',id:3}]} 
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                /> 
                    : null}
            </View>
        </View>
                }
        { show &&   (
        
            <View style={styles.container}>
                <SignatureCapture
                    style={styles.signature}
                    ref={sign}
                    onSaveEvent={_onSaveEvent}
                    onDragEvent={_onDragEvent}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={'portrait'}
                />
                <View style={{flexDirection: 'row', marginBottom:70}}>
                <TouchableHighlight
                    style={styles.buttonStyle}
                    onPress={() => {
                    saveSign();
                    }}>
                    <Text>Save</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.buttonStyle}
                    onPress={() => {
                    resetSign();
                    }}>
                    <Text>Reset</Text>
                </TouchableHighlight>
                </View>
            </View>
        )            
        }
       </SafeAreaView>  
    )};
};
const styles = StyleSheet.create({
    one:{
        backgroundColor: 'black',
        flex: 1
    },
    two:{
        backgroundColor: '#555',
        margin: 35,
        borderRadius: 7,
        justifyContent: 'space-evenly',
        paddingVertical: 60,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 40
    },
    btn:{
        backgroundColor: '#808080',
        height: 65,
        width: '97%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#808080',
        borderWidth: 1,
        marginVertical: 10
    },
    text:{
        color: 'white',
        fontSize: 14
    },
    listbtn:{
        backgroundColor: '#808080',
        height: 65,
        width: 270,
        justifyContent: 'center',
        borderBottomColor: "#F5F5F5",
        borderBottomWidth: 1,
        paddingHorizontal: 40,
        marginVertical:0,
    },
    listText:{
        color: 'white',
        fontSize: 14
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
    action:{
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    submit: { 
      alignItems: 'center',
      width:'100%',
      backgroundColor:'#000'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 7,
        color: '#fff',
    },
    socialInput:{
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
        marginTop: 20,          
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
    cameraIcon:{
        flex: 0.2, 
        alignItems:'center'
    },
    cardView: {
    width:'100%',
    backgroundColor: '#333333',
    padding: 10,
  },
   textInput: {
        flex: 0.8,
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
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingHorizontal: 30,
        paddingVertical: 30,
        marginBottom: 60,
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
    container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#eeeeee',
    margin: 10,
  },
})
export default DeliveryConfirmation;
