'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
var FeedbackComponent = React.createClass({
	clickfeedBackTitleLeft(){
		this.props.navigator.pop()
	},
	navigate(routeName){
	this.props.navigator.push({
	    name: routeName
	    });
	},
	clickManager(){
		global.feedbackType = 'manager';
		this.navigate('sendfeedback');
	},
	clickReception(){
		global.feedbackType = 'reception';
		this.navigate('sendfeedback');
	},
	clickCatering(){
		global.feedbackType = 'restaurant';
		this.navigate('sendfeedback');
	},
	render(){
		return (
		<View style={styles.feedBackContainer}>
			<View style={styles.feedBackTitleContainer}>
			 <TouchableWithoutFeedback onPressOut={this.clickfeedBackTitleLeft}>
	            <Image
	              style={styles.feedBackTitleLeft}
	              source={require( './img/icon_back_arrow.png')} />
	          </TouchableWithoutFeedback>
	            <Text style={styles.feedBackTitleText}>
	              意见反馈
	            </Text>
			</View>

			<View style={styles.feedBackTypeContainer}>
				<Image
				  style={styles.feedBackTypeImgTop}
				  source={require('./img/yjfk_zongjingli.png')} />
				<View style={styles.feedBackTypeTextContainer}>
				<Image
				  style={styles.feedBackTypeImgBottom}
				  source={require('./img/yjfk_zongjingli.png')} />
				  <Text style={styles.feedBackTypeText1}>
					Manager
				  </Text>
				</View>
				<View style={styles.feedbackHr}/>
				<TouchableWithoutFeedback onPressOut={this.clickManager}>
				<View style={styles.feedBackTypeTextContainer}>
				  <Text style={styles.feedBackTypeText2}>
					总经理
				  </Text>
				  <Image
				    style={styles.feedBackArrow}
				    source={require('./img/yjfk_iocn_zuo.png')} />
				</View>
				</TouchableWithoutFeedback>
			</View>

			<View style={styles.feedBackTypeContainer}>
				
				<Image
				  style={styles.feedBackTypeImgTop}
				  source={require('./img/yjfk_qiantai.png')} />
				<View style={styles.feedBackTypeTextContainer}>
				<Image
				  style={styles.feedBackTypeImgBottom}
				  source={require('./img/yjfk_qiantai.png')} />
				  <Text style={styles.feedBackTypeText1}>
					Reception
				  </Text>
				</View>
				<View style={styles.feedbackHr}/>
				<TouchableWithoutFeedback onPressOut={this.clickReception}>
				<View style={styles.feedBackTypeTextContainer}>
				  <Text style={styles.feedBackTypeText2}>
					前台
				  </Text>
				  <Image
				    style={styles.feedBackArrow}
				    source={require('./img/yjfk_iocn_zuo.png')} />
				</View>
				</TouchableWithoutFeedback>
			</View>

			<View style={styles.feedBackTypeContainer}>
				
				<Image
				  style={styles.feedBackTypeImgTop}
				  source={require('./img/yjfk_iocn_canting.png')} />
				<View style={styles.feedBackTypeTextContainer}>
				<Image
				  style={styles.feedBackTypeImgBottom}
				  source={require('./img/yjfk_iocn_canting.png')} />
				  <Text style={styles.feedBackTypeText1}>
					Catering
				  </Text>
				</View>
				<View style={styles.feedbackHr}/>
				<TouchableWithoutFeedback onPressOut={this.clickCatering}>
				<View style={styles.feedBackTypeTextContainer}>
				  <Text style={styles.feedBackTypeText2}>
					餐厅
				  </Text>
				  <Image
				    style={styles.feedBackArrow}
				    source={require('./img/yjfk_iocn_zuo.png')} />
				</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
		)	
	}
});
const styles = StyleSheet.create({
	feedBackArrow:{
		width:9,
		height:16,
		marginTop:-20,
		marginLeft:Dimensions.get('window').width - 40,
	},
	feedbackHr:{
		width:Dimensions.get('window').width - 20,
		height:0.5,
		backgroundColor:'#e7e7e7',
	},
	feedBackTypeText2:{
		fontSize:20,
		marginTop:13,
	},
	feedBackTypeText1:{
		fontSize:20,
	},
	feedBackTypeTextContainer:{
		height:50,
		alignItems:'center',
		backgroundColor:'#ffffff',
		width:Dimensions.get('window').width - 20,
	},
	feedBackTypeImgBottom:{
		width:45,
		height:45,
		marginTop:-22.5
	},
	feedBackTypeImgTop:{
		width:45,
		height:45,
		marginBottom:-22.5
	},
	feedBackTypeContainer:{
		height:130,
		marginTop:30,
		alignItems:'center',
		backgroundColor:'#e7e7e7',
		width:Dimensions.get('window').width - 20,
	},
	feedBackTitleText:{
	    textAlign:'center',
	    marginLeft:-10,
	    width:Dimensions.get('window').width - 77,
	    fontSize: 25,
	    color:'#ffffff'
  	},
	feedBackTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	feedBackTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
	feedBackContainer:{
		alignItems:'center',
		backgroundColor:'#e7e7e7',
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
	},
});
class Feedback extends Component {
  render() {
    return (
      <FeedbackComponent navigator={this.props.navigator}/>
    );
  }
}

export default Feedback;