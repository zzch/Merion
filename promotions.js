'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Image,
  View,
  WebView,
  Picker,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
var PromotionsComponent = React.createClass({
	clickPromotionTitleLeft(){
		this.props.navigator.pop()
	},
	render(){
		return (
			<View style={styles.promotionContainer}>
			<View style={styles.promotionTitleContainer}>
			 <TouchableWithoutFeedback onPressOut={this.clickPromotionTitleLeft}>
	            <Image
	              style={styles.promotionTitleLeft}
	              source={require( './img/icon_back_arrow.png')} />
	          </TouchableWithoutFeedback>
	            <Text style={styles.promotionTitleText}>
	              会员商城
	            </Text>
			</View>
			<View style={styles.promotionWebViewContainer}>
				<WebView
				style={styles.promotionWebView}
				source = {{uri:'http://kdt.im/bbXtJr'}}
				/>
			</View>
			</View>
			)
	}
});
const styles = StyleSheet.create({
	promotionWebViewContainer:{
		height:Dimensions.get('window').height - 70,
	},
	promotionTitleText:{
    textAlign:'center',
    marginLeft:-10,
    width:Dimensions.get('window').width - 77,
    fontSize: 25,
    color:'#ffffff'
  	},
	promotionTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	promotionTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
	promotionConatainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
		backgroundColor:'#e7e7e7'
	},
	promotionWebView:{
		width:Dimensions.get('window').width,
	},
	promotionContainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
		alignItems:'center',
		backgroundColor:'#ffffff'
	},
});
class Promotions extends Component {
  render() {
    return (
      <PromotionsComponent navigator={this.props.navigator}/>
    );
  }
}



export default Promotions;