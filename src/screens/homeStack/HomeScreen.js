import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Fragment,
  FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Card from '../../components/card';
import images from '../../images';
import Button from '../../components/button';
import {startDay, dashBoard, rejectDay} from '../../services/orderCreate';
import {locationUpdate} from '../../services/maps';
import {
  locationPermission,
  getCurrentLocation,
} from '../../helper/helperFunction';
import Toaster from '../../services/toasterService';

const HomeScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [result, setResult] = useState(false);
  const [list, setList] = useState([]);
  const [orderValue, setOrderValue] = useState([]);

  useEffect(() => {
    loadScreen();
    checkBankKey();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => loadScreen(), 10000);
      return () => {
        clearInterval(intervalId);

      };
    }, []),
  );

  const checkBankKey = async () => {
    try {
      bankKey = await AsyncStorage.getItem('bank_Key');

      if (bankKey === null) {
        Alert.alert('Welcome', 'Enter bank details for payments', [
          {
            text: 'Skip',
            onPress: () => {
              console.log('Skiped');
            },
          },
          {
            text: 'Proceed',
            onPress: () => {
              navigation.navigate('HomeDrawer', {screen: 'Profile'});
            },
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  function loadScreen() {
    dashBoard().then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          // console.log("res", res)
          setData(res);
          if (res.start_day_key == 'true') {
            setResult(true);
            setList(res.list);
          }
        }
        setLoading(false);
        getLiveLocation();
      } else {
        Toaster.show(res.message,3000)
      }
    });
  }
  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude} = await getCurrentLocation();
      locationUpdate(latitude, longitude).then(res => {
        if (res.code == 200) {
          if (res.success == 'false') {
            alert(res.message);
          } else {
            //  console.log(res)
          }
        } else {
          Toaster.show(res.message,3000)
        }
      });
    }
  };

  const onLoad = () => {
    startDay().then(res => {
      setLoading(true);
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          if (res.start_day_key == 'true') {
            setResult(true);
            setList(res.list);
            loadScreen();
          }
        }
        setLoading(false);
      } else {
        Toaster.show(res.message,3000)
      }
    });
  };

  const onReject = () => {
    rejectDay().then(res => {
      setLoading(true);
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          // console.log(res)
          alert(res.message);
          if (res.start_day_key == 'true') {
            loadScreen();
          }
        }
        setLoading(false);
      } else {
        Toaster.show(res.message,3000)
      }
    });
  };

  const checkScanType = () => {
    if (data.scan_type == 1) {
      navigation.navigate('QrScanPickup');
    } else {
      navigation.navigate('QrScanDelivery');
    }
  };

  const Item = ({
    id,
    orderId,
    orderName,
    orderAddress,
    locationImage,
    orderStatus,
    orderType,
  }) => (
    <Card style={{backgroundColor: orderType=='Priority'?'#AAAAAA':'#292929', marginVertical: 10}}>
      <TouchableOpacity
        onPress={() => navigation.navigate('AdditionalInfo', {orderId})}>
        <Text
          style={{
            textAlign: 'left',
            color: orderType=='Priority'?'#292929':'#fff',
            fontSize: 15,
            fontWeight: 'bold',
            marginVertical: 5,
          }}>
          {orderName}
        </Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}} >
        <Text style={{textAlign: 'left', color: '#A30000', padding: 2, fontSize:15,fontWeight:'bold'}}>
          {orderType}
        </Text>
        <Text style={{textAlign: 'right', color: orderType=='Priority'?'#292929':'#fff', padding: 2}}>
          {id}
        </Text>
        </View>

        <Text style={{textAlign: 'left', color: orderType=='Priority'?'#292929':'#fff',}}>{orderAddress}</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Image
            source={{uri: locationImage}}
            style={{height: 90, width: 180, borderRadius: 10}}
          />
          <View>
            <Text style={{textAlign: 'center', color: 'green'}}>
              {orderStatus}
            </Text>
            <Button
              style={styles.scanButton}
              onPress={() => navigation.navigate('AdditionalInfo', {orderId})}>
              <Text style={{color: '#fff', fontSize: 16}}>View Details</Text>
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );

  const renderItem = ({item}) => (
    <Item
      id={item.orderID}
      orderId={item.id}
      orderName={item.bussiness_name}
      orderAddress={item.merchant_business_address}
      locationImage={item.location}
      orderStatus={item.order_status}
      orderType={item.order_type}
    />
  );

  if (isLoading) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#000'}}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  } else {
    return (
      <View style={[styles.container, {paddingHorizontal: 20}]}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        {
          <View style={styles.container}>
            {data.start_day_key == 'true' ? (
              <View />
            ) : (
              <Card style={styles.cardView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'column', flex: 0.8}}>
                    <Text style={{color: '#fff', fontSize: 15}}>
                      {data.list_type}
                    </Text>
                    <Text
                      style={{color: 'grey', fontSize: 14, marginVertical: 5}}>
                      {data.today_date}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      flex: 0.2,
                    }}>
                    <Image
                      source={images.flowers}
                      style={{width: 60, height: 60}}
                      resizeMode="stretch"
                    />
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                  }}>
                  <Button style={styles.redButton} onPress={() => onLoad()}>
                    <Text style={{color: '#fff', fontSize: 16}}>Start</Text>
                  </Button>

                  <Button style={styles.button} onPress={() => onReject()}>
                    <Text style={{color: '#fff', fontSize: 16}}>Reject</Text>
                  </Button>
                </View>
              </Card>
            )}

            {result && (
              <>
                <Text style={styles.title}>{data.list_type} </Text>
                <FlatList
                  data={list}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  ListFooterComponent={<View style={{height: 60}}></View>}
                />
              </>
            )}
          </View>
        }
      </View>
    );
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  title: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'left',
    paddingVertical: 15,
  },
  cardView: {
    backgroundColor: '#333333',
    padding: 10,
  },
  redButton: {
    borderColor: '#A30000', //redColor code
    backgroundColor: '#A30000',
    width: '45%',
  },
  button: {
    borderColor: '#D1D1D1',
    backgroundColor: '#000',
    width: '45%',
  },
  scanButton: {
    alignSelf: 'center',
    borderColor: '#666',
    backgroundColor: '#666',
    margin: 5,
  },
  infoTitle: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'left',
    paddingVertical: 15,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'left',
    marginHorizontal: 24,
  },
  proceedButton: {
    marginTop: 30,
    borderColor: '#A30000', //redColor code
    backgroundColor: '#A30000',
    width: '55%',
  },
});
