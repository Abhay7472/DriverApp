import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import Button from '../../components/button';
import profileStyles from '../profileStack/profileStyle';
import {newEnquiry, getOrderList} from '../../services/helpCenter&Enquiry';
import Toaster from '../../services/toasterService';
import DropdownComponent from '../../components/dropdown'
const NewEnquiry = (props, {navigation}) => {
  const [data, setData] = useState({
    orderId: '',
    enquiry: '',
  });
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    OrderIdList();
  }, []);

  const orderIdInputChange = val => {
    setData({
      ...data,
      orderId: val,
    });
  };

  const enquiryInputChange = val => {
    setData({
      ...data,
      enquiry: val,
    });
  };

  const onSubmit = () => {
    setLoading(true);

    newEnquiry(data.orderId, data.enquiry).then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          props.navigation.navigate('HelpCenterChat', {
            ticketId: res.ticket_id,
            orderID: res.orderID,
          });
        }
        setLoading(false);
      } else {
        Toaster.show(res.message, 3000);
      }
    });
  };

  function OrderIdList() {
    getOrderList().then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          setOrderList(res.orders_list);
          setLoading(false);
        }
      } else {
        Toaster.show(res.message, 3000);
      }
    });
  } 

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
      <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
        <ScrollView style={{marginBottom: 70, paddingHorizontal: 20}}>
          <Text style={profileStyles.text_footer}>Order Id</Text>
          {/* <View style={profileStyles.action}>
          <Picker
            style={{ color:'#fff',width: '100%',marginTop:-5}}
            selectedValue={data.orderID}
            onValueChange={(itemValue, itemIndex) =>
              orderIdInputChange(itemValue)
            }>
            {orderList.map((item, key) => (
              <Picker.Item
                label={item.orderID}
                value={item.id}
                key={item.id}
              />
            ))}
          </Picker>
        
        </View> */}
          <View>
            <DropdownComponent
              title={data.orderID}
              dropdownData={orderList}
              onPress={data => {
                console.log(data)
                orderIdInputChange(data.id);
              }}
              type="orderId"
            />
          </View>
          <Text style={profileStyles.text_footer}>Enquiry Details</Text>
          <View style={{marginTop: 25}}>
            <TextInput
              placeholder="Enter Enquiry here "
              multiline={true}
              numberOfLines={8}
              style={[profileStyles.textInput, {backgroundColor: 'grey'}]}
              onChangeText={val => enquiryInputChange(val)}
              textAlignVertical="top"
            />
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 30,
            }}>
            <Button onPress={() => onSubmit()}>
              <Text style={{color: '#fff', fontSize: 17}}>Submit</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default NewEnquiry;
