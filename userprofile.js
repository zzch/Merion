'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
var UserProfileComponent = React.createClass({
	getInitialState(){
		return {
			birthday:userBirthday
		}
	},
	componentDidMount(){
		if(userBirthday == null){
			// ToastAndroid.show('null',ToastAndroid.SHORT)
			this.setState({
				birthday:'未设置'
			})
		}else if (userBirthday != null) {
				var birth = this.handleDate(userBirthday);
				this.setState({
				birthday:birth
			})
		}
	},
	handleDate(timestamp){
       var date = new Date(timestamp  * 1000);
       var year = parseInt(date.getFullYear()).toString();
       var month = parseInt(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1).toString();
       var day = parseInt(date.getDate()).toString(); 
       return (year + '年' + month + '月' + day + '日')
  },
  clickuserProfileToolbarLeft(){
  		this.props.navigator.pop();
  },
  setUserProfilePortrait(userPortrait){
		if(userPortrait != null){
			return (
					<Image
		         	  style={styles.userProfilePortrait}
		         	  source={{uri:userPortrait}}/>
				)
		}else if(userPortrait == null && userGender == '男'){
			return (
					<Image
		         	  style={styles.userProfilePortrait}
		         	  source={require('./img/nan.png')}/>
				)
		}else if(userPortrait == null && userGender == '女'){
			return (
					<Image
		         	  style={styles.userProfilePortrait}
		         	  source={require('./img/nv.png')}/>
				)
		}
	},
	render(){
		return (
			<View style={styles.userProfileContainer}>
				<View style={styles.userProfileTitleContainer}>
		          <TouchableWithoutFeedback onPressOut={this.clickuserProfileToolbarLeft}>
		            <Image
		              style={styles.userProfileToolbarLeft}
		              source={require( './img/icon_back_arrow.png')} />
		          </TouchableWithoutFeedback>
		            <Text style={styles.userProfileToolbarText}>
		              个人信息
		            </Text>
		         </View>

		         <View style={styles.userProfile1Container}>
		         	<Text style={styles.userProfilePortraitText}>
		         	  头像
		         	</Text>
		         	{this.setUserProfilePortrait(userPortrait)}
		         </View>

				 <View style={styles.userProfile2Container}>
		         	<Text style={styles.userProfileText}>
		         	  名字
		         	</Text>
		         	<Text style={styles.userProfileName}>
		         	  {userName}	
		         	</Text>
		         </View>
				
				 <View style={styles.userProfile2Container}>
		         	<Text style={styles.userProfileText}>
		         	  性别
		         	</Text>
		         	<Text style={styles.userProfileName}>
		         	  {userGender}
		         	</Text>
		         </View>
				<View style={styles.userProfileHr}/>
		          <View style={styles.userProfile3Container}>
		         	<Text style={styles.userProfileText}>
		         	  生日
		         	</Text>
		         	<Text style={styles.userProfileName}>
		         	  {this.state.birthday}	
		         	</Text>
		         	 {/*<Image
 	 		              style={styles.rightArrow}
 	 		              source={require('./img/shouye_arrow_icon.png')}/>*/}
		         </View>


			</View>
			)
	}
});
const styles = StyleSheet.create({
	userProfileHr:{
		width:Dimensions.get('window').width - 10,
		height:0.5,
		backgroundColor:'#e7e7e7'
	},
	userProfileName:{
		fontSize:18,
		marginRight:10
	},
	userProfileText:{
	flex:1,
	fontSize: 20,
	marginLeft:10,
	},
	userProfile3Container:{
		width:Dimensions.get('window').width - 10,
		height:63,
		backgroundColor:'#ffffff',
		flexDirection:'row',
		alignItems:'center'
	},
	userProfile2Container:{
		marginTop:30,
		width:Dimensions.get('window').width - 10,
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
	userProfilePortraitText:{
		flex:1,
		fontSize: 20,
		marginLeft:10,

	},
	userProfilePortrait:{
		borderRadius:5,
		width:53,
		height:53,
		marginRight:8,

	},
	userProfile1Container:{
		width:Dimensions.get('window').width - 10,
		height:80,
		marginTop:15,
		backgroundColor:'#ffffff',
		flexDirection:'row',
		alignItems:'center'
	},
	userProfileToolbarText:{
	    textAlign:'center',
	    marginLeft:-10,
	    width:Dimensions.get('window').width - 77,
	    fontSize: 25,
	    color:'#ffffff'
  	},
	userProfileToolbarLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
  	},
	userProfileTitleContainer:{
	    flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
 	},
	userProfileContainer:{
		backgroundColor:'#e7e7e7',
	    alignItems:'center',
	    width:Dimensions.get('window').width,
	    height:Dimensions.get('window').height,
	}
});
class UserProfile extends Component {
  render() {
    return (
      <UserProfileComponent navigator={this.props.navigator}/>
    );
  }
}



export default UserProfile;