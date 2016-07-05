'use strict';

import React, { Component } from 'react';
import Storage from 'react-native-storage';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  TouchableWithoutFeedback,

} from 'react-native';
var storage = new Storage({
    // maximum capacity, default 1000 
    size: 1000,    

    // expire time, default 1 day(1000 * 3600 * 24 secs).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,

    // cache data in the memory. default is true.
    enableCache: true,

    // if data was not found in storage or expired,
    // the corresponding sync method will be invoked and return 
    // the latest data.
    sync : {
        // we'll talk about the details later.
    }
});
var PersonalCenterComponent = React.createClass({
	getInitialState(){
		return {
			
		}
	},
	componentDidMount(){
		ToastAndroid.show(this.props.navigator.getCurrentRoutes().length.toString(),ToastAndroid.SHORT)
			
		
	},
	navigate(routeName){
	   this.props.navigator.push({
	        name: routeName
	      });
	  },
	  navigateReset(routeName){
	   this.props.navigator.resetTo({
	        name: routeName
	      });
	  },
	clickPersonalCenterToolbarLeft(){
		 
		this.props.navigator.pop();
	},
	clickPersonalCenterUserProfile(){
		this.navigate('userprofile')
	},
	clickReservationList(){
		this.navigate('reservationlist')
	},
	clickTabsAll(){
		this.navigate('tabsall')
	},
	setPersonalCenterPortrait(userPortrait){
		if(userPortrait != null){
			return (
					<Image
		         	  style={styles.personalCenterPortrait}
		         	  source={{uri:userPortrait}}/>
				)
		}else if(userPortrait == null && userGender == '男'){
			return (
					<Image
		         	  style={styles.personalCenterPortrait}
		         	  source={require('./img/nan.png')}/>
				)
		}else if(userPortrait == null && userGender == '女'){
			return (
					<Image
		         	  style={styles.personalCenterPortrait}
		         	  source={require('./img/nv.png')}/>
				)
		}
	},
	clickQuitLogin(){
					storage.save({
					key:'loginState',
					rawData:{
						user_uuid: '',
				        user_name: '',
						user_portrait: '',
						user_gender: '',
						user_birthday: '',
						user_token: '',
						club_uuid: ''
						},
				});
				storage.load({
					key:'loginState',
					autoSync:true,
					syncInBackground: true
				}).then(ret => {
    			// found data goes to then()
				}).catch(err => {
				    // any exception including data not found 
				    // goes to catch()
				    console.warn(err);
				})
		this.navigateReset('login')
	},
	render(){
		return (
				<View style = {styles.personalCenterContainer}>
				 <View style={styles.personalCenterTitleContainer}>
		          <TouchableWithoutFeedback onPressOut={this.clickPersonalCenterToolbarLeft}>
		            <Image
		              style={styles.personalCenterToolbarLeft}
		              source={require( './img/icon_back_arrow.png')} />
		          </TouchableWithoutFeedback>
		            <Text style={styles.personalCenterToolbarText}>
		              个人中心
		            </Text>
		         </View>
		         <TouchableWithoutFeedback onPressOut={this.clickPersonalCenterUserProfile}>
		         <View style={styles.personalCenter1Container}>
		         	{this.setPersonalCenterPortrait(userPortrait)}
		         	<Text style={styles.personalCenterName}>
		         	  {userName}
		         	</Text>
		         	 <Image
		              style={styles.rightArrow}
		              source={require('./img/shouye_arrow_icon.png')} />
		         </View>
		         </TouchableWithoutFeedback>
		         <TouchableWithoutFeedback onPressOut={this.clickTabsAll}>
		         <View style={styles.personalCenter2Container}>
		         	<Image
		         	  style={styles.personalCenterImg1}
		         	  source={require('./img/geren_xiaof_icon.png')} />
		         	<Text style={styles.personalCenterText}>
		         	  我的消费
		         	</Text>
		         	 <Image
		              style={styles.rightArrow}
		              source={require('./img/shouye_arrow_icon.png')} />
		         </View>
				  </TouchableWithoutFeedback>
		         <View style={styles.personalCenter3Container}>
		         	<Image
		         	  style={styles.personalCenterImg2}
		         	  source={require('./img/shape13.png')} />
		         	<Text style={styles.personalCenterText}>
		         	  我的课程
		         	</Text>
		         	 <Image
		              style={styles.rightArrow}
		              source={require('./img/shouye_arrow_icon.png')} />
		         </View>
 					<View style={styles.personalCenterHr}/>
 				<TouchableWithoutFeedback onPressOut={this.clickReservationList}>
		         <View style={styles.personalCenter4Container}>
		         	<Image
		         	  style={styles.personalCenterImg3}
		         	  source={require('./img/geren_dawei_icon.png')} />
		         	<Text style={styles.personalCenterText}>
		         	  打位预约
		         	</Text>
		         	 <Image
		              style={styles.rightArrow}
		              source={require('./img/shouye_arrow_icon.png')} />
		         </View>
		         </TouchableWithoutFeedback>
		         <TouchableWithoutFeedback onPressOut={this.clickQuitLogin}>
		         <View style={styles.personalCenter5Container}>
		         	
		         	<Text style={styles.personalCenterExitText}>
		         	  退出登录
		         	</Text>
		         	
		         </View>
		         </TouchableWithoutFeedback>
				</View>
			)
	}
});
const styles = StyleSheet.create({
	personalCenterExitText:{
		fontSize: 20,
		color:'#f94805'
	},
	personalCenter5Container:{
		marginTop:30,
		width:Dimensions.get('window').width,
		height:63,
		backgroundColor:'#ffffff',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	},
	personalCenterHr:{
		width:Dimensions.get('window').width,
		height:0.5,
		backgroundColor:'#e7e7e7'
	},
	personalCenter4Container:{
		width:Dimensions.get('window').width,
		height:63,
		backgroundColor:'#ffffff',
		flexDirection:'row',
		alignItems:'center'
	},
	personalCenter3Container:{
		marginTop:30,
		width:Dimensions.get('window').width,
		height:63,
		backgroundColor:'#ffffff',
		flexDirection:'row',
		alignItems:'center'
	},
	personalCenterText:{
		flex:1,
		fontSize: 18,
		marginLeft:10,
	},
	personalCenterImg1:{
		width:20,
		height:22,
		marginLeft:13,
		marginRight:2
	},
	personalCenterImg2:{
		width:25,
		height:18,
		marginLeft:10,
	},
	personalCenterImg3:{
		width:25,
		height:25,
		marginLeft:10,
	},
	personalCenter2Container:{
		marginTop:30,
		width:Dimensions.get('window').width,
		height:63,
		backgroundColor:'#ffffff',
		flexDirection:'row',
		alignItems:'center'
	},
	rightArrow:{
		marginRight:8,
	    marginLeft:5,
	    width:8,
	    height:15
  	},
	personalCenterName:{
		flex:1,
		fontSize: 23,
		marginLeft:10,

	},
	personalCenterPortrait:{
		borderRadius:5,
		width:63,
		height:63,
		marginLeft:10,

	},
	personalCenter1Container:{
		width:Dimensions.get('window').width,
		height:80,
		backgroundColor:'#ffffff',
		flexDirection:'row',
		alignItems:'center'
	},
	personalCenterToolbarText:{
	    textAlign:'center',
	    marginLeft:-10,
	    width:Dimensions.get('window').width - 77,
	    fontSize: 25,
	    color:'#ffffff'
  },
	personalCenterToolbarLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
  },
	personalCenterTitleContainer:{
	    flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
  },
	personalCenterContainer:{
		backgroundColor:'#e7e7e7',
	    alignItems:'center',
	    width:Dimensions.get('window').width,
	    height:Dimensions.get('window').height,
  },
});
class PersonalCenter extends Component {
  render() {
    return (
      <PersonalCenterComponent navigator={this.props.navigator}/>
    );
  }
}




export default PersonalCenter;