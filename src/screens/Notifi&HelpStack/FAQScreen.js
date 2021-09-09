import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import {faqs} from '../../services/breakTime&faq';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toaster from '../../services/toasterService';

const ExpandableComponent = ({ item, onClickFunction }) => {

  const [layoutHeight, setLayoutHeight] = useState(0);

  
  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  return (
    <View style={{marginBottom:10,}}>
      {/*Header of the Expandable List Item*/}
      <TouchableOpacity activeOpacity={0.8} onPress={onClickFunction}
        style={styles.header}>
        <Text style={styles.headerText}>{item.faq}</Text>
        <AntDesign name="caretdown" color="#fff" size={15}/>
      </TouchableOpacity>
      <View
          style={{
            height: layoutHeight,
            overflow: 'hidden',
            backgroundColor:'#333', 
            
          }}>
          {/*Content under the header of the Expandable List Item*/}
          
              <Text style={styles.text}>{item.answer}</Text>
           
        </View>
    </View>
  );
};

const FAQScreen = (props,{navigation})=> {
  const [listDataSource, setListDataSource] = useState();
  const [multiSelect, setMultiSelect] = useState(true);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    FaqListing()
  }, [])  
    

    function FaqListing(){
      faqs()  
        .then((res) => {
          if (res.code == 200){
              if (res.success == "false"){
                alert(res.message)
              }
            else {
              setListDataSource(res.faq_list);
              };   
              setLoading(false);   
          }
          else {
            Toaster.show(res.message,3000)
          }
        })     
    }


  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource];
    if (multiSelect) {
      // If multiple select is enabled
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      // If single select is enabled
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
          : (array[placeindex]['isExpanded'] = false)
      );
    }
    setListDataSource(array);
  };

    if (isLoading){
      return (
        <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
        <StatusBar backgroundColor='#000' barStyle="light-content"/>
      <ActivityIndicator size="large" color="#fff" />
      </View>
      )
    }
    else{
    return (
      <SafeAreaView style={{ flex: 1 ,backgroundColor:'#000'}}>
        <View style={styles.container}>
          <ScrollView>
            {listDataSource.map((item, key) => (
              <ExpandableComponent
                key={item.faq}
                onClickFunction={() => {
                  updateLayout(key);
                }}
                item={item}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }  
};

export default FAQScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
  },
  header: {
    backgroundColor: '#333',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '400',
    color:'#fff',
    flex:0.9
  },
  text: {
    fontSize: 16,
    color: '#fff',
    padding: 10,
    borderTopWidth:1,
    borderTopColor:'#fff',
  },
});
