import React, { Fragment,useEffect,useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {
  Text,
  StatusBar,
  View,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';

import {orderImageUpload} from '../../services/orderCreate';
import ImagePicker from 'react-native-image-crop-picker';

const OrderImageUpload = ({route,navigation}) => {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({
        scan: true,
        ScanResult: false,
        result: '',
    });
  const [picture,setPicture] =useState([])


    useEffect(() => {
        ImagePicker.openCamera({
            mediaType: 'photo',
            width: 300,
            height: 400,
            cropping: true
            }).then(val => {onSuccess(val)})
        .catch(e => alert(e));
        
    }, [])

    const onSuccess = (val) => {
            console.log(val)
            orderImageUpload(val,route.params.id,route.params.delivery)
                .then((res) => {            
                    if (res.code == 200){
                        if (res.success == "false"){
                            alert(res.message)
                        } 
                        else {
                        alert(res.message)
                        // console.log('res..',res)
                        navigation.navigate('HomeScreen')
                        }
                    }
                    else {
                    alert(res.message)
                    setData({
                    scan: true,
                    ScanResult: false
                    }) 
                    }
                                                
                })
        }


    return (      
      <View style={styles.scrollViewStyle}>
          <Fragment>
              <StatusBar barStyle="dark-content" /> 
          </Fragment>
      </View>
        
    );

}
export default OrderImageUpload;

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000'
  },

  centerText: {
    fontSize: 18,
    color: '#777',
    textAlign:'center'
  },
  textBold: {
    fontWeight: '500',
    color: '#fff',
    fontSize:20
  },
});
