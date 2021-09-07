import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {notification} from '../../services/auth';
import Card from '../../components/card';


const Notifications = navigation => {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => OrderListing(), 5000);

      return () => {
        clearInterval(intervalId);
      };
    }, []),
  );

  useEffect(() => {
    OrderListing();
  }, []);

  function OrderListing() {
    notification().then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          setOrderList(res.notifications_list);
          setValue(res);
        }
        setLoading(false);
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
  }

  const Item = ({notificationTitle, notificationBody}) => (
    <View
      style={{
        paddingHorizontal: 10,
        borderBottomColor: '#555',
        borderBottomWidth: 1,
        width: '100%',
        paddingVertical: 15,
      }}>
      <Text style={{color: '#fff'}}>{notificationTitle}</Text>
      <Text style={{color: '#fff'}}>{notificationBody}</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Item
      notificationTitle={item.notification_title}
      notificationBody={item.notification_body}
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <View style={{marginVertical: 10, marginHorizontal: 15}}>
          {value.no_record == '0' ? (
            <FlatList
              data={orderList}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              inverted={true}
              ListHeaderComponent={<View style={{height: 70}}></View>}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: '#fff'}}>No Notifications</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
};

export default Notifications;
