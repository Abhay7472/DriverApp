import React, { memo, useState ,useEffect} from 'react';
import { Platform, StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
let isShown = false;
const DropdownComponent = ({ dropdownData = [], title, onPress, edit, type }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownValue, setDropdownValue] = useState(title);
    const [selectedValue, setSelectedValue] = useState(false);
    const handleValue = (data) => {
        if(type==="bussniessType"){
            setDropdownValue(data.bussiness_type_name);
        }else if(type==="designationType"){
            setDropdownValue(data.designation_name);
        }else if(type==="businessDomainList"){
            setDropdownValue(data.category_name);
        }else if(type==="stateList"){
            setDropdownValue(data.state_name);
        }else if(type==="cityList"){
            setDropdownValue(data.city_name);
        }else if(type ==="areacode"){
            setDropdownValue(data.areacode);
        }else if (type==="clientList"){
            setDropdownValue(data.full_name);
        }else if (type==="accountType"){
            setDropdownValue(data.name);
        }else if (type==="orderId"){
            setDropdownValue(data.orderID);
        }
        setShowDropdown(false);
        setSelectedValue(true);
    }
    const getName = (data) =>{
        let dropdownValue;
        if(type==="bussniessType"){
            dropdownValue=data.bussiness_type_name;
        }else if(type==="designationType"){
            dropdownValue=data.designation_name;
        }else if(type==="businessDomainList"){
            dropdownValue=data.category_name;
        }else if(type==="stateList"){
            dropdownValue=data.state_name;
        }else if(type==="cityList"){
            dropdownValue=data.city_name;
        }else if(type ==="areacode"){
            dropdownValue=data.areacode;
        }else if (type==="clientList"){
            dropdownValue=data.full_name;
        }else if (type==="accountType"){
            dropdownValue=data.name;
        }else if (type==="orderId"){
            dropdownValue=data.orderID;
        }
        return dropdownValue;
    }
    return (
        <>
            <View style={styles.dropdownBox}>
                <View>
                    <TouchableOpacity activeOpacity={1} style={[styles.dropdownFlex, { marginBottom: showDropdown ? 0 : Platform.OS=='android' ? 10 : 0 ,borderBottomLeftRadius:showDropdown?0:10,borderBottomRightRadius:showDropdown?0:10}]} onPress={() => { setShowDropdown(showDropdown ? false : true); isShown = showDropdown ? false : true; }}>
                        <Text style={[styles.title, { color: selectedValue ? 'white' : edit ? 'black' : 'white' }]}>{dropdownValue ? dropdownValue : title}</Text>
                        <Icon name={showDropdown?"chevron-up":"chevron-down"} color="white" size={22} />
                    </TouchableOpacity>
                    <View style={showDropdown&&styles.setHeight}>
                    <ScrollView nestedScrollEnabled = {true} scrollEnabled={true}>
                    {
                        showDropdown && dropdownData ? (
                            dropdownData && dropdownData.length > 0 && (
                                dropdownData && dropdownData.map((item, index) => (
                                    <View key={index} style={[styles.dropdownWrap,{height:50}]}>
                                        <TouchableOpacity onPress={() => { onPress(item); handleValue(item) }} activeOpacity={0.6} style={styles.dropdownInner}>
                                            <Text style={styles.values}>{item? getName(item) : 'Please select'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            )
                        ) : (
                            <View />
                        )
                    }
                    </ScrollView>
                    </View>
                </View>


            </View>
        </>
    )
}

const styles = StyleSheet.create({
    dropdownBox: {},
    dropdownWrap: {
        backgroundColor: '#000',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 10,
        paddingLeft: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: "#a7a7a7",
        width:'100%',
        backgroundColor: '#333333',
    },
    dropdownInner: {},
    dropdownFlex: {
        paddingHorizontal: 5,
        paddingVertical: Platform.OS=='android'?5:10,
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: '#333333',
        borderRadius:10
    },
    title: {
        color: '#A7A7A7',
        paddingLeft:7,
        fontSize:16
    },
    values: {
        color: '#fff',
    },
    setHeight:{
        maxHeight:200,
        overflow:'scroll'
    }
});
export default memo(DropdownComponent);