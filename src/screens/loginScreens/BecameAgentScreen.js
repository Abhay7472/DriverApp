import React from 'react';
import { Text, 
    View, 
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    ScrollView } 
    from 'react-native';

import Card from '../../components/card';
import Button from '../../components/button';
import images from '../../images';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import loginStyles from './loginComponentsStyles';


const BecameAgentScreen = ({navigation}) => {

  const renderInner =() =>(
      
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Smart Box</Text>
        <Text style={styles.panelSubtitle}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
             Cum </Text>
      </View>
        
      <Button style={styles.submit} onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={{color: '#fff', fontSize:17}}>Sign Up</Text>     
      </Button>

            <TouchableOpacity style={loginStyles.greyButton}
                onPress={() => navigation.navigate('SignInScreen')}>
                <Text style={{color: '#fff', fontSize:17}}>Sign In</Text>
            </TouchableOpacity>
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

  return (
   <View style={styles.container}>
        <StatusBar backgroundColor='#000' barStyle="light-content"/>
        <BottomSheet
          ref={bs}
          snapPoints={[310, 0]}
          renderContent ={renderInner}
          renderHeader ={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enableGestureInteraction={true}
        />

      <ScrollView>
      <Animated.View style={{
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}>
      <Card style={styles.card}>
           
            <View style={styles.imageView}>
                <Image
                    source={images.deliveryMan}
                    resizeMode="stretch"
                    style={styles.image}
                />
            </View>
            <View style = {{flex: 1, justifyContent: 'flex-end',}} >
                <Text style={{fontSize:30, color:'#fff', fontWeight: 'bold',}}>Become a delivery agent</Text>
                <Text style={{color:'#fff'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
          
            </View>
            
              <Button style={styles.submit} onPress={() => {bs.current.snapTo(0)}}>
                  <Text style={{color: '#fff', fontSize:17}}>Became an agent</Text>
              </Button>
            
        </Card>

        <Text style={{fontSize:28, color:'#fff',  marginHorizontal: '8%',}}>Features</Text>

        <Card style={styles.cardlist}>
            <View style={{ flexDirection: 'row',marginTop:-10}}>  
                
              <View style={[styles.cardSection,{flex: 1,}]}>               
                <Text style={{fontSize: 22,fontWeight: 'bold',color:'#fff'}}>
                  Flexible timings</Text>
                <Text style={{fontSize: 14,color:'#fff' }}>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
              </View>
            </View>
        </Card>
       
       <Card style={styles.cardlist}>
            <View style={{ flexDirection: 'row',marginTop:-10}}>  
                
              <View style={[styles.cardSection,{flex: 1,}]}>               
                <Text style={{fontSize: 22,fontWeight: 'bold',color:'#fff'}}>
                  Flexible timings</Text>
                <Text style={{fontSize: 14,color:'#fff' }}>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
              </View>
            </View>
        </Card>
       <Card style={styles.cardlist}>
            <View style={{ flexDirection: 'row',marginTop:-10}}>  
                
              <View style={[styles.cardSection,{flex: 1,}]}>               
                <Text style={{fontSize: 22,fontWeight: 'bold',color:'#fff'}}>
                  hiii timings</Text>
                <Text style={{fontSize: 14,color:'#fff' }}>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
              </View>
            </View>
        </Card>
       <Card style={styles.cardlist}>
            <View style={{ flexDirection: 'row',marginTop:-10}}>  
                
              <View style={[styles.cardSection,{flex: 1,}]}>               
                <Text style={{fontSize: 22,fontWeight: 'bold',color:'#fff'}}>
                  hello timings</Text>
                <Text style={{fontSize: 14,color:'#fff' }}>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
              </View>
            </View>
        </Card>

        
      </Animated.View>
      </ScrollView> 

    </View>
  );
};
export default BecameAgentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#000',
    width:'100%',
    height:'100%',
  },
   card: {
    height: 380,
    backgroundColor: '#333',
    alignItems: 'center',
    margin:18,

  },
  imageView:{
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    flexDirection:'row',
    marginTop: 20,
  },
  image:{
    height:160,
    width:'100%',
    borderRadius: 15,
  },
  submit: { 
    width:'100%',
    backgroundColor:'#000'
  },
  cardlist:{
    backgroundColor: '#333',
    alignItems: 'center',
    marginHorizontal:18,
    marginVertical:10,
    padding:12,
  },

  panel: {
    padding: 20,
    backgroundColor: '#000',
    paddingTop: -10,
    alignItems:'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 30,
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
  panelTitle: {
    color: '#fff',
    fontSize: 30,
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
  
});
