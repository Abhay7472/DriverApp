
import { StyleSheet, Dimensions} from 'react-native'

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const loginStyles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#000'
  },
  header: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
      
  },
  logo: {
    width: height_logo,
    height: height_logo, 
    
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 20,
    paddingTop: 10,
    alignSelf: 'flex-start',
  },
  footer: {
      flex:1,
      alignItems: 'center',
      backgroundColor: '#333',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,   
  },
  
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#fff',
  },

  submit: { 
      alignItems: 'center',
      margin: 50,
      width:'100%',
      backgroundColor:'#000'
  },
  greyButton:{
    margin:10,
    borderRadius: 10,
    backgroundColor:'#333', 
    width:'100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default loginStyles;