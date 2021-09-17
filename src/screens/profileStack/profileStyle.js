import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex: 1,  
  },
  profileImage:{
    borderRadius:100,
    borderColor: "#fff",
    borderWidth: 2,
    overflow:"hidden",
    marginTop: 15,
  },
  editProfile:{ 
    flex:0.5,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginHorizontal: 20,
    marginVertical: 10,
  },
   text_footer: {
    marginTop: 15,
    color: '#777777',
    fontSize: 15,
    marginLeft: 15,
  },
  action: {
    flexDirection: 'row',
    width:'100%',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    height: Platform.OS === 'ios' ? 120 :0,
    paddingLeft: 10,
    color: '#fff',
    borderRadius:10
  },
  columnSection:{
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    borderBottomWidth: 1,
    borderBottomColor: '#fff', 
  },
  showtext:{
    flex: 1,
    marginLeft: 13,
    color:'#fff',
    fontSize: 15,
    paddingBottom: 7,
  },
  icon:{
    width: 30,
    height: 30,
    borderRadius: 30/2,
    resizeMode:'stretch',
    alignItems: 'center',
    marginBottom: 4,
  },
  changeProfileImage:{
    backgroundColor: '#333',
    position:"absolute",
    top:20,
    right:120,
    width:40,
    height:40,
    borderRadius:20,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  picker:{
    marginTop: -10,
    backgroundColor:'#333333',
    color:'#fff',
    flex: 0.8,
    width: '100%',
  },
  pickerItem: {
    width:'100%',
    color: '#666',
  },
  arrowWrapper: {
    marginRight: -25,
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  arrow: {
    alignItems: 'flex-end',
    color: '#fff',
  },
  pickerAction:{
    flexDirection: 'row',
    width:'100%',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
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
  columnSection:{
    flexDirection: 'column',
    marginTop: 10,
    flex:0.46,   
    alignItems: 'flex-start',
    },
  
});
export default profileStyles;