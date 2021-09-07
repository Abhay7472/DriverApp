import React, { Component, Fragment,useEffect,useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {
  TouchableOpacity,
  Text,
  StatusBar,
  Linking,
  View,
  Dimensions,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {onQRScanPickup} from '../../services/orderCreate';
import {getuser} from '../../constants/tokenHandler'

const QrScanPickup = ({navigation}) => {
  
  const [data, setData] = useState({
    scan: true,
    ScanResult: false,
    orderId:'',
  });
 
  const onSuccess = (e) => {
    const check = String(e.data);
    setData({
      scan: false,
      ScanResult: true,  
      })

    onQRScanPickup(check)
      .then((res) => {            
        if (res.code == 200){
        
          if (res.success == "false"){
              alert(res.message)
            navigation.navigate('HomeScreen')
          } 
          else {
            alert(res.message)
            navigation.navigate('AdditionalInfo', {orderId: res.order_id})
              setData({
              scan: true,
              ScanResult: false
              }) 
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
              
              {data.scan &&
                  <QRCodeScanner
                    reactivate={true}
                    showMarker={true}
                    // ref={(node) => { scanner = node }}
                    onRead={(e) => onSuccess(e)}
                    topContent={
                      <View style={{alignItems:'center',flex:1,paddingVertical:25,paddingHorizontal:20}}>
                        <Text style={styles.textBold}>Scan QR Code</Text> 
                        <Text style={styles.centerText}>Scan the QR code on the package and start the ride.</Text>
                      </View>  
                    }
                  />
              }
          </Fragment>
      </View>

    );
  }


export default QrScanPickup;

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
