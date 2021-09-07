import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import {getChat, onMessageSend} from '../../services/helpCenter&Enquiry';
import Toaster from '../../services/toasterService';

const HelpCenterChat = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sendMessage, setSendMessage] = useState('');

  useEffect(() => {
    updateList();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => updateList(), 6000);

      return () => {
        clearInterval(intervalId);
      };
    }, []),
  );

  const updateList = () => {
    getChat(route.params.ticketId).then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          setMessages(res.help_center_msg_list);
        }
        setLoading(false);
      } else {
        Toaster.show(res.message, 3000);
      }
    });
  };

  const onSend = () => {
    if (sendMessage.length > 0) {
      onMessageSend(route.params.ticketId, sendMessage).then(res => {
        if (res.code == 200) {
          if (res.success == 'false') {
            alert(res.message);
          } else {
            setSendMessage('');
          }
          setLoading(false);
        } else {
          Toaster.show(res.message, 3000);
        }
      });
    }
  };

  const Item = ({message, sendBy}) => {
    if (sendBy == 'admin') {
      return (
        <View
          style={{
            backgroundColor: 'grey',
            padding: 10,
            borderRadius: 5,
            marginTop: 5,
            marginRight: '5%',
            maxWidth: '85%',
            alignSelf: 'flex-start',
            borderRadius: 20,
            borderRadius: 20,
            borderTopLeftRadius: 0,
            display: 'flex',
            paddingLeft: 15,
            minWidth: 50,
          }}>
          <Text style={{fontSize: 16, color: '#fff'}}>{message}</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: '#333',
            padding: 10,
            borderRadius: 5,
            marginTop: 5,
            marginRight: '5%',
            maxWidth: '85%',
            alignSelf: 'flex-end',
            borderRadius: 20,
            borderRadius: 15,
            borderBottomRightRadius: 0,
            display: 'flex',
            paddingRight: 20,
            minWidth: 50,
          }}>
          <Text style={{fontSize: 16, color: '#fff'}}>{message}</Text>
        </View>
      );
    }
  };

  const renderItem = ({item}) => (
    <Item message={item.message} sendBy={item.send_by} />
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
        <View style={{marginTop: 10, marginHorizontal: 15}}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListFooterComponent={<View style={{height: 70}}></View>}
          />
        </View>
        <View style={styles.bottomView}>
          <TextInput
            placeholder={sendMessage != '' ? sendMessage : 'Type message here'}
            placeholderTextColor="grey"
            defaultValue={sendMessage}
            style={styles.textInput}
            autoCapitalize="none"
            multiline={true}
            numberOfLines={4}
            onChangeText={val => setSendMessage(val)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'grey',
              height: 60,
              width: 55,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => onSend()}>
            <MaterialIcons name="send" color={'white'} size={32} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

export default HelpCenterChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomView: {
    backgroundColor: '#000',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#333',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textInput: {
    paddingLeft: 13,
    flexDirection: 'column',
    color: '#fff',
    fontSize: 18,
    flex: 0.97,
  },
});
