'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  TouchableWithoutFeedback
} from 'react-native';
class NetUitl extends React.Component {
	

  //post请求
  /**
  *url :请求地址
  *data:参数
  *callback:回调函数
  */
  static  postFrom(url, data, callback) {
      var fetchOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:'data='+data+''//这里我参数只有一个data,大家可以还有更多的参数
      };

      fetch(url, fetchOptions)
      .then((response) => response.text())
      .then((responseText) => {
        callback(JSON.parse(responseText));
      }).done();
    }
  /**
  *url :请求地址
  *data:参数(Json对象)
  *callback:回调函数
  */
static postJson (url, data, callback) {
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        //json形式
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

  fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      callback(JSON.parse(responseText));
    }).catch((error) => {
	        if (error.toString().contains('failed')) {
	          ToastAndroid.show('请检查网络连接',ToastAndroid.SHORT)
	        }
	      }).done();
  }
  //get请求
  /**
  *url :请求地址
  *callback:回调函数
  */
  static  get(url, callback) {
      fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        callback(JSON.parse(responseText));
      }).done();
    }

}
var SendFeedbackComponent = React.createClass({
	getInitialState(){
		return {
			height:250,
			feedbackContent:'',
		}
	},
	componentDidMount(){
		
	},
	getFeedback(text){
		// var a = parseInt(text.length/44);
		this.setState({
			feedbackContent:text,
		});
		// if(text.length < 44)
		// {
		// 	this.setState({
		// 		height:38,
		// 	})
		// }else if(text.length >= 44 * a && text.length < 44 *(a+1))
		// {	var heigh = 38 + a*19
		// 	this.setState({
		// 		height:heigh,
		// 	})
		// }
		// else if(text.length >= 88 && text.length < 132)
		// {
		// 	this.setState({
		// 		height:74,
		// 	})
		// }
		// else if(text.length >= 132 && text.length < 176)
		// {
		// 	this.setState({
		// 		height:92,
		// 	})
		// }
		// else if(text.length >= 176 && text.length < 220)
		// {
		// 	this.setState({
		// 		height:110,
		// 	})
		// }
		// else if(text.length >= 220 && text.length < 264)
		// {
		// 	this.setState({
		// 		height:138,
		// 	})
		// }
		// else if(text.length >= 88 && text.length < 132)
		// {
		// 	this.setState({
		// 		height:156,
		// 	})
		// }
		// else if(text.length >= 88 && text.length < 132)
		// {
		// 	this.setState({
		// 		height:174,
		// 	})
		// }b
		// var b = "sfhahtg";
		var b = text.length.toString();
		// ToastAndroid.show(b,ToastAndroid.SHORT)
	},
	navigate(routeName){
		this.props.navigator.push({
        name: routeName
      });
	},
	clickfeedBackTitleLeft(){
		this.props.navigator.pop();
	},
	postFeedback(){
		var token = userToken;
		var club_uuid = clubUuid;
		var type = feedbackType;
		var content = this.state.feedbackContent;
		let data = {'token':token,'club_uuid':club_uuid,'type':type,'content':content};
		var feedbackUrl = 'http://lianqiubao.com/api/v1/feedbacks.json';
		if(content == ''){
			Alert.alert(
					'请输入反馈内容',
					'反馈内容不能为空!',
					[{text: '确定'}]
				)
		}else{
		NetUitl.postJson(feedbackUrl,data,function (set){
			if (set.error_code == 10003) {
		  		ToastAndroid.show('登陆失效',ToastAndroid.SHORT);
			}else{
				Alert.alert(
					'发送成功',
					'我们已经收到您的反馈',
					[{text: '确定'}]
				)

			}
 		 }.bind(this));
		}

	},
	render(){
		return (
			<View style={styles.sendfeedbackContainer}>
			<View style={styles.sendFeedBackTitleContainer}>
			 <TouchableWithoutFeedback onPressOut={this.clickfeedBackTitleLeft}>
	            <Image
	              style={styles.sendFeedBackTitleLeft}
	              source={require( './img/icon_back_arrow.png')} />
	          </TouchableWithoutFeedback>
	            <Text style={styles.sendFeedBackTitleText}>
	              意见反馈
	            </Text>
			</View>
			 <View style={styles.sendfeedbackTextContainer}>
			 	<TextInput	
			 		maxLength={513}
			 		style={[styles.sendfeedbackText,{height:250, textAlignVertical: 'top'}]}
			 		multiline={true}
			 		underlineColorAndroid = {'transparent'}
			 		placeholder='请您说出您对球场的意见和建议' 
			 		onChange={(event) => this.getFeedback(
		            event.nativeEvent.text
		          )} 
			 	/>
			 </View>
			 <TouchableWithoutFeedback onPressOut={this.postFeedback}>
			 <View style={styles.sendfeedbackBtn}>
			 	<Text style = {styles.sendfeedbackBtnText}>提交</Text>
			 </View>
			 </TouchableWithoutFeedback>
			</View>
		)
	}
});
const styles = StyleSheet.create({
	sendfeedbackBtnText:{
		fontSize:18,
		color:'#ffffff',
	},
	sendfeedbackBtn:{
		marginTop:30,
		borderRadius:25,
		alignItems:'center',
		justifyContent:'center',
		width:130,
		height:40,
		backgroundColor:'#f94805'
	},
	sendfeedbackText:{
	width:Dimensions.get('window').width - 10,
	},
	sendfeedbackTextContainer:{
	backgroundColor:'#ffffff',	
	width:Dimensions.get('window').width - 10,
    borderWidth:1,
    height: 250,
    marginTop:10,
    borderColor: '#e7e7e7',
	},
	sendFeedBackTitleText:{
    textAlign:'center',
    marginLeft:-10,
    width:Dimensions.get('window').width - 77,
    fontSize: 25,
    color:'#ffffff'
  	},
	sendFeedBackTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	sendFeedBackTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
	sendfeedbackContainer:{
		alignItems:'center',
		backgroundColor:'#e7e7e7',
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
	},
});
class SendFeedback extends Component {
  render() {
    return (
      <SendFeedbackComponent navigator={this.props.navigator}/>
    );
  }
}

export default SendFeedback;