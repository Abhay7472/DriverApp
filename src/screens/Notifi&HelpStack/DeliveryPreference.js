import React, { useState, useEffect} from 'react';
import { View, TextInput, StyleSheet, Text , TouchableOpacity,ActivityIndicator,FlatList,ScrollView,SafeAreaView,} from 'react-native';
import CalenderIcon from 'react-native-vector-icons/FontAwesome5';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Card from '../../components/card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Button from '../../components/button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getDeliverySLot,setDeliverySLot} from '../../services/breakTime&faq';
import RadioForm from 'react-native-simple-radio-button';

const DeliveryPreference =({navigation})=>{

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [preference, setPreference] = useState(false);
    const [hide, setHide] = useState(true)
    const [showSlot, setShowSlot] = useState(true)

    const [date, setDate] = useState("");
    const [working, setWorking] = useState("")
    const [prefValue, setPrefValue] =useState("");
    const [timeSlot1, setTimeSlot1] = useState(false);
    const [timeSlot2, setTimeSlot2] = useState(false);
    const [timeSlot3, setTimeSlot3] = useState(false);
    const [timeSlot4, setTimeSlot4] = useState(false);

     var radio_props = [
        {label: 'Working', value: 0 },
        {label: 'Not Working', value: 1 },
    ]; 

   const showDatePicker = () => {
      setDatePickerVisibility(!isDatePickerVisible);
    };


    const selectPreference=(value)=>{
        setPrefValue(value)
        setPreference(!preference)
    }

   
    const handleConfirm = (value) => {
        let tempDate = value.toString().split(' ');
        let temp =`${tempDate[0]}, ${tempDate[2]}-${tempDate[1]}-${tempDate[3]}`
        setDate(temp)
        showDatePicker();
        showTimeSlot(temp)
    };

    const onChangeWorking =(value)=>{

        if(value==1){
            setShowSlot(true)
            setWorking(value)
        }
        else{
            setShowSlot(false)
            setWorking(value)
        }
    }

    const showTimeSlot=(temp)=>{
    //   console.log("date", temp)   
       setLoading(true);
        getDeliverySLot(temp)  
            .then((res) => {
            if (res.code == 200){
                if (res.success == "false"){
                    alert(res.message)
                }
                else {
                        setHide(false)
                        setShowSlot(false)
                        setPrefValue(res.delivery_preference_id)
                        setWorking(res.time_slot0)
                        setTimeSlot1(res.time_slot1)
                        setTimeSlot2(res.time_slot2)
                        setTimeSlot3(res.time_slot3)
                        setTimeSlot4(res.time_slot4)
                        
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
    
    const onSubmit=()=>{
        console.log(prefValue)
        setLoading(true);
        setDeliverySLot(date,working,prefValue,timeSlot1,timeSlot2,timeSlot3,timeSlot4)
        .then((res) => {
            if (res.code == 200){
                if (res.success == "false"){
                    alert(res.message)
                }
                else {
                      alert(res.message) 
                    console.log("res", res) 
                      
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
        <ScrollView>
            <TouchableOpacity onPress={()=>showDatePicker()}>
                <View style= {styles.showdate} >
                {(date=='')?
                    <Text style={{flex:1, color:'#fff',}}>Select Date</Text>
                    :
                    <Text style={{flex:1, color:'#fff',}}>{date}</Text>
                }
                    <CalenderIcon name="calendar-alt" color="#fff" size={25}/>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(value) => {handleConfirm(value)}}
                    onCancel={showDatePicker}
                />
                </View>
            </TouchableOpacity>

            {  hide ?
               <View/>
            :
            <>

                <View style={{alignItems:'center', justifyContent:'center', marginVertical:15}}>
                  <RadioForm
                    radio_props={radio_props}
                    intial={working}
                    onPress={(value) => {onChangeWorking(value)}}
                    buttonSize={12}
                    buttonOuterSize={25}
                    buttonColor={'#fff'}
                    formHorizontal={false}
                    labelHorizontal={true}
                    animation={true}
                    labelStyle={{fontSize: 17, color: '#fff', marginLeft:30}}
                    selectedButtonColor= {'#fff'}
                  />
                </View>
                
                { showSlot ?
                    <View/>
                    :
                    <>
                        <Text style={styles.whiteText}>Select time slots</Text>
                        <Text style={styles.grey}>Every four hour ride must a four hour gap</Text>
                        <View style={{alignItems:'center'}}>
                            
                            <TouchableOpacity style={ timeSlot1 ? styles.slotSelected : styles.slotUnSelected} onPress={()=>{setTimeSlot1(!timeSlot1)}}>
                                <Icon name="clock-time-eight-outline" color={'#f0f0f0'} size={20}/>
                                <Text style={{color: '#fff', fontSize:17, }}>  8:00 AM to 12:00 PM </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={ timeSlot2 ? styles.slotSelected : styles.slotUnSelected} onPress={()=>{setTimeSlot2(!timeSlot2)}}>
                                <Icon name="clock-time-eight-outline" color={'#f0f0f0'} size={20}/>
                                <Text style={{color: '#fff', fontSize:17, }}>  12:00 PM to 4:00 PM </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={ timeSlot3 ? styles.slotSelected : styles.slotUnSelected} onPress={()=>{setTimeSlot3(!timeSlot3)}}>
                                <Icon name="clock-time-eight-outline" color={'#f0f0f0'} size={20}/>
                                <Text style={{color: '#fff', fontSize:17, }}>  4:00 PM to 8:00 AM </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={ timeSlot4 ? styles.slotSelected : styles.slotUnSelected} onPress={()=>{setTimeSlot4(!timeSlot4)}}>
                                <Icon name="clock-time-eight-outline" color={'#f0f0f0'} size={20}/>
                                <Text style={{color: '#fff', fontSize:17, }}>  8:00 AM to 12:00 PM </Text>
                            </TouchableOpacity>
                            
                        </View>
                            <Text style={styles.whiteText}>Select Delivery Preference</Text>

                        <View style={styles.row}>
                            <View style={styles.btn}>
                                <TouchableOpacity style={ prefValue==1 ? styles.boxSelected : styles.boxNotSelected} onPress={()=> selectPreference("1") }>
                                    <MaterialCommunityIcons name="pharmacy" size={45} color="white"/>
                                </TouchableOpacity>
                                <Text style={{color: 'white', marginTop: 10,alignSelf:'center'}}>Pharmacy</Text>
                            </View>
                            <View style={styles.btn}>
                                <TouchableOpacity style={ prefValue==2 ? styles.boxSelected : styles.boxNotSelected} onPress={()=>selectPreference("2") } >
                                    <MaterialCommunityIcons name="flower" size={45} color="white"/>
                                </TouchableOpacity>
                                <Text style={{color: 'white', marginTop: 10,alignSelf:'center'}}>Flowers</Text>
                            </View>
                            <View style={styles.btn}>
                                <TouchableOpacity style={ prefValue==3 ? styles.boxSelected : styles.boxNotSelected} onPress={()=>selectPreference("3")}>
                                    <MaterialCommunityIcons name="bee-flower" size={45} color="white"/>
                                </TouchableOpacity>
                                <Text style={{color: 'white', marginTop: 10,alignSelf:'center'}}>General</Text>
                            </View>
                        </View>    
                    </>
                }
                
            </>
            } 
                <Button onPress={()=>onSubmit()} style={{alignSelf:'center', marginVertical:20}}>
                    <Text style={{color: '#fff', fontSize:17}}>Submit</Text>     
                </Button>
                
            </ScrollView>    
        </SafeAreaView>
    );}  

}
export default DeliveryPreference;

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#000',
        flex: 1, 
        paddingHorizontal: 20,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        fontSize:16,
        paddingLeft: 10,
        color: '#fff',
    },
    showdate:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor:'#fff',
        paddingTop: 20,
        marginTop: 10,
    },
    whiteText:{
        color: 'white',
        fontSize: 25,
        marginTop: 15,
        fontWeight:'bold'
    },
    grey:{
        color: 'grey',
        fontSize: 15,
        marginTop: 4,
        marginBottom: 10
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 15,
    },
    boxSelected:{
        backgroundColor: 'grey',
        padding: 13,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10
    },
    boxNotSelected:{
        backgroundColor: '#3B3B3B',
        padding: 13,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 10
    },
    slotSelected:{
        alignSelf: 'center',
        justifyContent: 'center',
        width:'100%',
        backgroundColor: 'grey',
        padding: 13,
        borderRadius: 10,
        flexDirection: 'row',
        marginVertical: 10,
    },
    slotUnSelected:{
        alignSelf: 'center',
        justifyContent: 'center',
        width:'100%',
        backgroundColor: '#3B3B3B',
        padding: 13,
        borderRadius: 10,
        flexDirection: 'row',
        marginVertical: 10,
    },
});