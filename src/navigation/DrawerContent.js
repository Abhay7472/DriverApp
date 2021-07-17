import React,{useState,useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,ActivityIndicator
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import{ AuthContext } from '../components/context';
import { getProfile } from "../services/profileUpdate";


export function DrawerContent(props) {
    const { signOut } = React.useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = React.useState([]);

    useEffect(() =>{
    getProfile()  
    .then((res) => {
      if (res.code == 200){
          if (res.success == "false"){
              alert(res.message)
              console.log(res.message)
          }
        else {
          setData(res);
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
  }, []);


    if (isLoading){
    return (
      <View style = {{flex: 1,justifyContent: "center", backgroundColor:'#000'}}>
     <ActivityIndicator size="large" color="#fff" />
     </View>
    )
  }
  else{
    const imageUrl = data.driver_details.profile_image
    return(
        <View style={{flex:1,}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                            <Avatar.Image 
                                source={{
                                    uri: imageUrl
                                }}
                                size={120}
                            />
                        
                        <View style={styles.row}>
                            <Paragraph style={styles.userName}>{data.driver_details["full_name"]}</Paragraph>
                        </View>
                    </View>

                   
                    <Drawer.Section >
                        <TouchableRipple onPress={() =>{props.navigation.navigate('Home')}}>
                            <View style={styles.preference}>
                                <Text>Home</Text>
                                <Icon 
                                    name="chevron-right"  
                                    color={'#000'}
                                    size={22}
                                />
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                     <Drawer.Section >
                        <TouchableRipple onPress={() =>{props.navigation.navigate('Profile')}}>
                            <View style={styles.preference}>
                                <Text>Your Profile</Text>
                                <Icon 
                                    name="chevron-right"  
                                    color={'#000'}
                                    size={22}
                                />
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                     <Drawer.Section >
                        <TouchableRipple onPress={() =>{}}>
                            <View style={styles.preference}>
                                <Text>Help Center</Text>
                                <Icon 
                                    name="chevron-right"  
                                    color={'#000'}
                                    size={22}
                                />
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                     <Drawer.Section >
                        <TouchableRipple onPress={() =>{}}>
                            <View style={styles.preference}>
                                <Text>FAQs</Text>
                                <Icon 
                                    name="chevron-right"  
                                    color={'#000'}
                                    size={22}
                                />
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                     <Drawer.Section >
                        <TouchableRipple onPress={() =>{}}>
                            <View style={styles.preference}>
                                <Text>Vehicle</Text>
                                <Icon 
                                    name="chevron-right"  
                                    color={'#000'}
                                    size={22}
                                />
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                     <Drawer.Section >
                        <TouchableRipple onPress={() =>{}}>
                            <View style={styles.preference}>
                                <Text>Select Time Slot</Text>
                                <Icon 
                                    name="chevron-right"  
                                    color={'#000'}
                                    size={22}
                                />
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                     <Drawer.Section >
                        <TouchableRipple onPress={() =>{props.navigation.navigate('QRScanPickup')}}>
                            <View style={styles.preference}>
                                <Text>Scan QR code</Text>
                                <Icon 
                                    name="chevron-right"  
                                    color={'#000'}
                                    size={22}
                                />
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                    <Drawer.Section >
                        <TouchableRipple onPress={() =>{props.navigation.navigate('Profile')}}>
                            <View style={styles.preference}>
                                <Text>Add Bank Details</Text>
                                <Icon 
                                    name="chevron-right"  
                                    color={'#000'}
                                    size={22}
                                />
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    
    },
    userInfoSection: {  
      paddingLeft: 20,
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    userName: {  
      fontSize: 17,
      lineHeight: 20,
      fontWeight: 'bold',
      marginBottom:15,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });