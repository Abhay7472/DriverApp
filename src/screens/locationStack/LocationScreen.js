import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import PolylineDirection from '@react-native-maps/polyline-direction';

import {useFocusEffect} from '@react-navigation/native';
import images from '../../images';
import {mapTab} from '../../services/maps';
const {width, height} = Dimensions.get('window');
const CARD_HEIGHT = 200;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const LocationScreen = (props, {navigation}) => {
  const GOOGLE_API_KEY = 'AIzaSyDZeeqeNG3RzOI9fF7DnHUbxDvAqeLKYWM';
  const [state, setState] = React.useState({
    markers: [],
  });
  const [region, setRegion] = React.useState(initialMapState);
  const [isLoading, setLoading] = useState(true);
  const initialMapState = {
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  useFocusEffect(
    React.useCallback(() => {
      const intervalId = setInterval(() => loadScreen(), 20000);

      return () => {
        clearInterval(intervalId);
      };
    }, []),
  );

  const loadScreen = () => {
    mapTab().then(res => {
      if (res.code == 200) {
        if (res.success == 'false') {
          alert(res.message);
        } else {
          if (res.start_day_key == 'false') {
            alert(res.message);
            props.navigation.navigate('HomeScreen');
          } else {
            setState({markers: res.list});
            setLoading(false);
          }
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

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    loadScreen();
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.markers.length) {
        index = state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {order_coordinate} = state.markers[index];
          _map.current.animateToRegion(
            {
              ...order_coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  }, []);

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });

    return {scale};
  });

  const MapMarkerComponent = ({marker, index, scaleStyle}) => {
    return (
      <MapView.Marker
        key={index.toString()}
        coordinate={marker.order_coordinate}
        onPress={e => onMarkerPress(e)}>
        <Animated.View style={[styles.markerWrap]}>
          <Animated.Image
            source={images.mapMarker}
            style={[styles.marker, scaleStyle]}
            resizeMode="cover"
          />
        </Animated.View>
      </MapView.Marker>
    );
  };

  const onMarkerPress = mapEventData => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  if (isLoading) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: '#000'}}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <MapView
          ref={_map}
          initialRegion={region}
          onLayout={() => {
            _map.current.fitToCoordinates(
              state.markers.map((marker, index) => {
                return marker.order_coordinate;
              }),
              {
                edgePadding: {
                  top: 80,
                  right: 80,
                  bottom: 80,
                  left: 80,
                },
                animated: false,
              },
            );
          }}
          style={styles.container}
          provider={PROVIDER_GOOGLE}>
          {state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            return (
              <MapMarkerComponent
                marker={marker}
                index={index}
                scaleStyle={scaleStyle}
              />
            );
          })}
          {/* polyline */}

          <PolylineDirection
            // origin will be always drivers coordintae
            origin={state.markers[0].order_coordinate}
            // condittional drop stops
            destination={
              state.markers[state.markers.length - 1].order_coordinate
            }
            waypoints={state.markers
              .filter((e, i) => i !== 0 || i !== state.markers.length - 1)
              .map(e => {
                return e.order_coordinate;
              })}
            resetOnChange={false}
            apiKey={GOOGLE_API_KEY}
            strokeWidth={2.5}
            strokeColor="#000"
            // onReady={({ distance, duration, coordinates, fare }) => {
            //    console.log({ distance });

            //   route_distance = distance;
            // }}
          />
        </MapView>

        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={styles.scrollView}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal:
              Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}>
          {state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {' '}
                  Order Id:
                </Text>
                <Text style={styles.cardDescription}>{marker.orderID}</Text>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  Address:
                </Text>
                <Text style={styles.cardDescription}>{marker.street_addr}</Text>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  Contact No. :
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.primary_phone}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 5,
    elevation: 2,
    backgroundColor: 'grey',
    borderRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 14,
    // marginTop: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  cardDescription: {
    fontSize: 13,
    color: '#fff',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
});
