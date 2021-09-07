import React,{useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet,ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import BackgroundTimer from "react-native-background-timer";
import {checkBreakTime,startBreakTime,endBreakTime} from "../../services/breakTime&faq";
import Button from '../../components/button';
import {useFocusEffect} from '@react-navigation/native';


const BreakTime =({navigation})=>{

    const [secondsLeft, setSecondsLeft] = useState(600);
    const [timerOn, setTimerOn] = useState(false);
    const [data,setData] =useState([]);
    const [isLoading, setLoading] = useState(true);
    const [show, hide] =useState(true);

    useFocusEffect(
      React.useCallback(() => {
        check()
      }, [])
    );
        useEffect(() => { 
            check()
        }, [])

        const check =()=>{
            checkBreakTime()  
        .then((res) => {
          if (res.code == 200){
              if (res.success == "false"){
                  alert(res.message)
              }
            else {
                setData(res)
              };   
               setLoading(false);   
            }
            else{
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


        useEffect(() => {
            if (timerOn) startTimer();
            else BackgroundTimer.stopBackgroundTimer();
            return () => {
            BackgroundTimer.stopBackgroundTimer();
            };
        }, [timerOn]);

        const startTimer = () => {
            BackgroundTimer.runBackgroundTimer(() => {
                setSecondsLeft(secs => {
                if (secs > 0) return secs - 1
                else return 0
                })
            }, 1000)
        }

        useEffect(() => {
            if (secondsLeft === 0) {BackgroundTimer.stopBackgroundTimer()
           end()}
        }, [secondsLeft])

        const clockify = () => {
            let hours = Math.floor(secondsLeft / 60 / 60)
            let mins = Math.floor((secondsLeft / 60) % 60)
            let seconds = Math.floor(secondsLeft % 60)
            let displayHours = hours < 10 ? `0${hours}` : hours
            let displayMins = mins < 10 ? `0${mins}` : mins
            let displaySecs = seconds < 10 ? `0${seconds}` : seconds
            return {
                displayHours,
                displayMins,
                displaySecs,
            }
        }

        const start =() =>{
            setTimerOn(timerOn => !timerOn)
            hide(false)

            startBreakTime(data.current_time_slot_id, data.driver_break_row_id)  
            .then((res) => {
            if (res.code == 200){
                if (res.success == "false"){
                    alert(res.message)
                } 
                else{
                    console.log("end")
                }
                    setLoading(false);   
                }
                else{
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
    
    const end =() =>{
        setTimerOn(timerOn => !timerOn)
        hide(false)

        endBreakTime(data.current_time_slot_id, data.driver_break_row_id)  
        .then((res) => {
        if (res.code == 200){
            if (res.success == "false"){
                alert(res.message)
            } 
            else{
                navigation.navigate('Home')
            }
            setLoading(false);   
            }
            else{
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
        <View style={{backgroundColor: 'black', flex: 1,}}>
            <View style={styles.clock}>
                 <Icon name="stopwatch" color='#ddd' size={206} />
            </View>

            {data.show_start_btn == "0"&& data.show_end_btn == "0" ?
            <Text style={{color:'#fff', alignSelf:'center', justifyContent:'center', marginTop:20,fontSize:17}}>
            {data.message}</Text>
            :
            <>
                <View style={{flexDirection: 'row', marginVertical: 40, justifyContent: 'space-between', marginHorizontal: 80,alignItems: 'center', }}>
                    <Text style={styles.text}>{clockify().displayMins}</Text>
                    <Text style={{color: 'grey', fontSize: 40}}>:</Text>
                    <Text style={styles.text}>{clockify().displaySecs}</Text>
                </View>
                {show ?
                    <Button style={styles.button} onPress={() => start()}>
                        <Text style={{color: '#fff', fontSize:16}}>Start</Text>     
                    </Button> 
                :
                    <Button style={styles.button} onPress={() => end()}>
                        <Text style={{color: '#fff', fontSize:16}}>End</Text>     
                    </Button> 
                }
            </>
            }
        </View>
    );
    }
}
const styles= StyleSheet.create({
    clock:{
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        alignSelf: 'center',
        width:'80%',
    },
    time: {
        fontSize: 30,
        color: "#fff",
        marginBottom: 30,
        textAlign: "center",
    },
    text:{
        color: 'black',
        backgroundColor: 'grey',
        fontSize: 30,
        justifyContent: 'center',
        padding: 12,
        alignItems: 'center'
    }
})
export default BreakTime;