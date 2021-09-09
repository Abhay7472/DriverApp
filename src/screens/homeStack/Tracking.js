import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {COLORS, SIZES, FONTS} from '../../constants/theme';
import {singleOrderMap} from '../../services/orderCreate';
import {useFocusEffect} from '@react-navigation/native';
import {locationUpdate} from '../../services/maps';
import { locationPermission, getCurrentLocation,} from '../../helper/helperFunction';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Button from '../../components/button';
import Card from '../../components/card';
import Toaster from '../../services/toasterService';

const Tracking = ({route, navigation}) => {
  const GOOGLE_API_KEY = 'AIzaSyDZeeqeNG3RzOI9fF7DnHUbxDvAqeLKYWM';
  const mapView = React.useRef();

  const [fromLocation, setFromLocation] = React.useState('');
  const [toLocation, setToLocation] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [isLoading, setLoading] = React.useState(true);

  const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  const [angle, setAngle] = React.useState(0);
  const[orderId, setOrderId] = React.useState("");
  const [data, setData] =React.useState("")

  React.useEffect(() => {
    selectionHandler();
  }, []);

    useFocusEffect(
        React.useCallback(() => {
        const intervalId= setInterval(()=> {
            getLiveLocation()
            singleOrderMap(route.params.id)
        }, 10000)

        return () => {
            clearInterval(intervalId)
        };
        }, [])
    );


    const getLiveLocation = async () => {
        const locPermissionDenied = await locationPermission()
        if (locPermissionDenied) {
            const { latitude, longitude } = await getCurrentLocation()
            locationUpdate(latitude,longitude)
            .then(res => {
            if (res.code == 200) {
                if (res.success == 'false') {
                alert(res.message);
                } 
                else {
                    setFromLocation(res.new_location);
                }
            }  
            else {
              Toaster.show(res.message,3000)
            }
            });
        }
    }

  const selectionHandler = () => {

    singleOrderMap(route.params.id)
    .then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {

          setFromLocation(res.driver_coordinate);
          setToLocation(res.order_coordinate);
            let mapRegion = {
                latitude: (res.driver_coordinate.latitude + res.order_coordinate.latitude) / 4,
                longitude: (res.driver_coordinate.longitude + res.order_coordinate.longitude) / 4,
                latitudeDelta: Math.abs(res.driver_coordinate.latitude - res.order_coordinate.latitude) * 4,
                longitudeDelta:Math.abs(res.driver_coordinate.longitude - res.order_coordinate.longitude) * 4,
                };
            setRegion(mapRegion);
            setOrderId(res.order_id)
            setData(res)
          setLoading(false);
        }
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
  };

    function calculateAngle(coordinates) {
      let startLat = coordinates[0]['latitude'];
      let startLng = coordinates[0]['longitude'];
      let endLat = coordinates[1]['latitude'];
      let endLng = coordinates[1]['longitude'];
      let dx = endLat - startLat;
      let dy = endLng - startLng;

      return (Math.atan2(dy, dx) * 180) / Math.PI;
    }


  const DestinationMarker = () => {
    return (
      <Marker key={"1"} coordinate={toLocation}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Image
              source={require('../../assets/icons/pin.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.white,
              }}
            />
          </View>
        </View>
      </Marker>
    );
  };

  const CarIcon = () => {
    return (
      <Marker
        coordinate={fromLocation}
        anchor={{x: 0.5, y: 0.5}}
        flat={true}
        rotation={angle}
        key= {"2"}>
        <Image
          source={require('../../assets/icons/car.png')}
          style={{
            width: 40,
            height: 40,
          }}
        />
      </Marker>
    );
  };
    const renderInner =() =>(
        
      <View style={styles.panel}>

        
        <Card style={styles.cardView}>
          <View style={{flexDirection:'column', padding:10}}>
            <Text style={{color: 'grey', fontSize:13,flexDirection:'column',}}>Pickup</Text> 
            <Text style={{color: '#fff', fontSize:13,flexDirection:'column'}}>{data.from_address}</Text>  
          </View>
            <View style={{ borderBottomColor: '#fff',borderBottomWidth: 1, }}/>
           <View style={{flexDirection:'column',padding:10}}>
           <Text style={{color: 'grey', fontSize:13,flexDirection:'column',}}>Drop Off</Text> 
            <Text style={{color: '#fff', fontSize:13,flexDirection:'column'}}>{data.to_address}</Text>  
          </View>


        </Card>

          <View style={{ flexDirection: 'row',justifyContent: 'space-between',margin:10}} >
          <View style={{flexDirection:'column', flex:0.8}}>
            <Text style={{color: '#fff', fontSize:13,flexDirection:'column',}}>Distance</Text> 
            <Text style={{color: '#fff', fontSize:13,flexDirection:'column'}}>{data.estimate_distance}</Text>  
          </View> 
          <View style={{flexDirection:'column', flex:0.8}}> 
            <Text style={{color: '#fff', fontSize:13,flexDirection:'column'}}>Expected Time</Text>  
            <Text style={{color: '#fff', fontSize:13,flexDirection:'column'}}>{data.estimate_time}</Text>  
          </View>   
          </View>
           <Button style={styles.submit} onPress={() => navigation.navigate('DeliveryConfirmation', {id:orderId})}>
              <Text style={{color: '#fff', fontSize:17}}>End Ride</Text>     
            </Button> 
      
      </View>
    );

  const renderHeader =() =>(
      <View style = {styles.header}>
        <View style = {styles.panelHeader}>
          <View style = {styles.panelHandle}/>
        </View>
      </View>
  );
    bs =React.createRef();
    fall = new Animated.Value(1);


  const DetailsButton =()=>{
    return(
       <TouchableOpacity style={{backgroundColor: "#3B3B3B",
            height: 55,
            width: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            bottom: 85,
            right: 20,
            position: 'absolute'}} 
        onPress={()=>bs.current.snapTo(0)}>
        <FontAwesome name="location-arrow" color={'white'} size={40}></FontAwesome>
    </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#000'}}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
      <BottomSheet
          ref={bs}
          snapPoints={[420, 0]}
          renderContent ={renderInner}
          renderHeader ={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enableGestureInteraction={true}
        />
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{flex: 1}}>

          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey={GOOGLE_API_KEY}
            strokeWidth={5}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
            onReady={result => {
                setDuration(result.duration);

                if (!isReady) {
                // Fit route into maps
                mapView.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                    right: SIZES.width / 20,
                    bottom: SIZES.height / 4,
                    left: SIZES.width / 20,
                    top: SIZES.height / 8,
                    },
                });

                // Reposition the car
                let nextLoc = {
                    latitude: result.coordinates[0]['latitude'],
                    longitude: result.coordinates[0]['longitude'],
                };

                if (result.coordinates.length >= 2) {
                    let angle = calculateAngle(result.coordinates);
                    setAngle(angle);
                }

                setFromLocation(nextLoc);
                setIsReady(true);
                }
            }}
          />
          <DestinationMarker />
          <CarIcon />
        </MapView>
        <DetailsButton/>
      </View>
    );
  }
};

export default Tracking;

const styles = StyleSheet.create({
    
    footer: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
    },  
    action:{
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    submit: { 
      alignItems: 'center',
      width:'100%',
      backgroundColor:'#000'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 7,
        color: '#fff',
    },
    socialInput:{
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: 'blue',
        height: 45,
        borderRadius: 40,
        marginBottom: 10,
        marginHorizontal:10,
        fontSize: 16,
    },
    buttonSection: {
        alignItems: 'center',
        marginTop: 20,          
    },
    icon:{
        padding: 5,
        margin: 5,
        width: 40,
        height: 40,
        borderRadius: 40/2,
        resizeMode:'stretch',
        alignItems: 'center',
    },
    cameraIcon:{
        flex: 0.2, 
        alignItems:'center'
    },
    cardView: {
    width:'100%',
    backgroundColor: '#333333',
    padding: 10,
  },
   textInput: {
        flex: 0.8,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#fff',
        fontSize:15,
    },
    panel: {
        padding: 20,
        backgroundColor: '#000',
        paddingTop: -10,
        alignItems:'center',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingHorizontal: 30,
        paddingVertical: 30,
        marginBottom: 60,
    },
    panelTitle: {
      color: '#fff',
      fontSize: 28,
      textAlign:'center',
      fontWeight: 'bold',
      alignItems:'center',
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 60,
        color:'#fff',
        textAlign:'center',
        margin:10,
    },
    header: {
        backgroundColor: '#000',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
        backgroundColor:'#000'
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
});

