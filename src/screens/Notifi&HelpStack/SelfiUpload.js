// import React,{useState,useEffect} from 'react';
// import { View, 
// StyleSheet,
// SafeAreaView,
// Image,
// TouchableOpacity, 
// StatusBar,
// ActivityIndicator} from 'react-native';
// import {useFocusEffect} from '@react-navigation/native';
// import {uploadDriverSelfi} from '../../services/breakTime&faq';
// import ImagePicker from 'react-native-image-crop-picker';

// const SelfiUpload = ({route,navigation}) => {

//   console.log("route",route)
//   console.log("navigation",navigation)
  
//   // const [isLoading, setLoading] = useState(false);

//     // useFocusEffect(
//     //   React.useCallback(() => {

//     //      ImagePicker.openCamera({
//     //         mediaType: 'photo',
//     //         width: 300,
//     //         height: 400,
//     //         cropping: false
//     //         }).then(val => {onSuccess(val)})
//     //         .catch(e => {alert(e)
//     //             props.navigation.navigate('HomeScreen')});
//     //     // Do something when the screen is focused
//     //     return () => {
//     //     };
//     //   }, [])
//     // );


//   //   const onSuccess = (val) => {
//   //  setLoading(true)
//   //     uploadDriverSelfi(val,route.params.notificationId)  
//   //       .then((res) => {
//   //           if (res.code == 200){
//   //             if (res.success == "false"){
//   //                 alert(res.message)
//   //             }
//   //           else {
//   //              alert(res.message)
//   //              setLoading(false) 
//   //              props.navigation.navigate("HomeScreen")
//   //            }
//   //           }
//   //           else {
//   //               ToastAndroid.showWithGravityAndOffset(
//   //               res.message,
//   //               ToastAndroid.LONG,
//   //               ToastAndroid.BOTTOM,
//   //               25,
//   //               50
//   //               );
//   //           }
          
//   //       })

//   //   console.log("image", val)
//   // }
//   //  if (isLoading){
//   //       return (
//   //       <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
//   //       <ActivityIndicator size="large" color="#fff" />
//   //       </View>
//   //       )
//   //   }

//     return(
//         <View style={{backgroundColor:'#fff', flex:1}}>
//         <Text>in selfi upload</Text>
//         </View>
//     )
// }

// export default SelfiUpload;

// const styles = StyleSheet.create({
  
  
// });


import React from 'react';
import { Text, View } from 'react-native';

const SelfiUpload = ({route,navigation}) => {
  console.log("route",route)
   console.log("navigation",navigation)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
    </View>
  )
}
export default SelfiUpload;