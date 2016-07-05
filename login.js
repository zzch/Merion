'use strict';

import React, { Component } from 'react';
import Storage from 'react-native-storage';
import Dimensions from 'Dimensions';

import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  AppRegistry,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid
} from 'react-native';
var time;
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
var SinginComponent = React.createClass({
	
	getInitialState: function(){
		return {
			phone:'',
			validateCode:'',
			greeting: '',
    		welcome: '',
    		displayGreeting:0,
    		displayOthers:0,
    		disabled:false,
			resendValidateText:'60s',
			timer:60,
		}
	},
	componentDidMount(){


	},
	requestGreeting: function(text){
		var REQUEST_URL = 'http://lianqiubao.com/api/v1/welcome.json' + '?phone=' + text;
		var re = /[1][3578]\d{9}/;
		if(re.test(text)){
		fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
        	if (responseData.exception_code == '20001') {
        		 this.setState({
	         	 greeting: responseData.message,
	    		 displayGreeting:1,
	         });
        	}
        	else{
        		this.setState({
        	 	phone:text,
         		greeting: responseData.sentences[0],
    			welcome: responseData.sentences[1],	
    			displayGreeting:1,
    			displayOthers:1,
    			disabled:true,
				text:'60',
				timer:60
        	 });
    		var a = this;
				time = setInterval(function(){
					var tt = a.state.timer - 1;
					if(tt <= 0){
						a.setState({
							disabled:false,
							resendValidateText:'重新发送',
							timer:60,
						})
						clearInterval(time);
						return;
					}
						
					a.setState({
						resendValidateText:tt + 's',
						timer:tt
					});
				},1000);
        	}
       }).catch((error) => {
       	if (error.toString().contains('failed')) {
  		ToastAndroid.show('请检查网络连接',ToastAndroid.SHORT)
       	}
		})
      .done();
	  }else{
	  	window.clearInterval(time);
	  	this.setState({
	  		greeting: '',
	  		validateCode:'',
    		welcome: '',
    		displayGreeting:0,
    		displayOthers:0,
    		resendValidateText:'60s',
			timer:60,
	  	})
	  }
	},
	clickResend: function(){
		var REQUEST_URL = 'http://lianqiubao.com/api/v1/welcome.json' + '?phone=' + this.state.phone;
		if (this.state.resendValidateText == '重新发送') {
		 fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {

         })
  	    .done();
    		var a = this;
				time = setInterval(function(){
					var tt = a.state.timer - 1;
					if(tt <= 0){
						a.setState({
							disabled:false,
							resendValidateText:'重新发送',
							timer:60,
						})
						clearInterval(time);
						return;
					}
						
					a.setState({
						resendValidateText:tt + 's',
						timer:tt
					});
				},1000);
			}
	},
	setValidateCode: function(code){
		this.setState({
			validateCode:code,
		})
	},
	navigate(routeName) {
    this.props.navigator.resetTo({
      		name: routeName
    	});
 	 },
	clickSignIn(){
		var phoneNum = this.state.phone;
		var verificationcode = this.state.validateCode;
		var sign_inUrl = 'http://lianqiubao.com/api/v1/sign_in.json';
		let data = {'phone':phoneNum,'verification_code':verificationcode};
		if ((this.state.welcome) == '') {

		}
		else if(verificationcode.length < 4){
	  		ToastAndroid.show('请输入验证码',ToastAndroid.SHORT)
  		}else{
		NetUitl.postJson(sign_inUrl,data,function (set){
			if (set.exception_code == 20003) {
		  		ToastAndroid.show('验证码不正确',ToastAndroid.SHORT)
			}else if (set.exception_code == 20001) {
				ToastAndroid.show('用户不存在',ToastAndroid.SHORT)
			}else{
				storage.save({
					key:'loginState',
					rawData:{
						user_uuid: (set.user.uuid),
				        user_name: (set.user.name),
						user_portrait: (set.user.portrait),
						user_gender: (set.user.gender),
						user_birthday: (set.user.birthday),
						user_token: (set.user.token),
						club_uuid: (set.club.uuid)
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
				this.navigate('homepage');

			}
 		 }.bind(this));
  	}
	  

	},
	
	render: function(){
		return (
		 <View style={styles.signinContainer}>

		      <View style={styles.signinToolbar}>
				<Text style={styles.signinToolbarText}>
				  登录
				</Text>

		      </View>

		      <Image
		        style={styles.signinLogo}
		        source={require('./img/signin.png')} />
		      <View style={styles.signinPhoneContainer}>
		      <Image
		        style={styles.signinPhoneImg}
		        source={require('./img/denglu_yonghu_icon.png')} />
		      <TextInput 
		      keyboardType='numeric'
		      underlineColorAndroid="transparent" 
		      maxLength={11} placeholder='请输入您的手机号码' 
		      onChange={(event) => this.requestGreeting(
		            event.nativeEvent.text
		          )} 
		      style={styles.signinPhoneInput}
		      />
		      </View>

		      <View style={[styles.signinPhoneContainer,{opacity:this.state.displayGreeting}]}>
		      <Image
		        style={styles.signinGreetingImg}
		        source={require('./img/denglu_xinxi_icon.png')} />
		      <Text underlineColorAndroid="transparent" style={styles.signinGreetingText}>
		      	{this.state.greeting}
		      </Text>
		      </View>

		      <View style={[styles.signinPhoneContainer,{opacity:this.state.displayOthers}]}>
		      <Image
		        style={styles.signinGreetingImg}
		        source={require('./img/denglu_xinxi_icon.png')} />
		      <Text underlineColorAndroid="transparent" style={styles.signinGreetingText}>
		      	{this.state.welcome}
		      </Text>
		      </View>

		      <View style={[styles.signinValidateAreaContainer,{opacity:this.state.displayOthers}]}>

		      <View style={styles.signinValidateTextContainer}>
		      <Image
		        style={styles.signinValidateImg}
		        source={require('./img/denglu_yanzhen_icon.png')} />
		      <TextInput keyboardType='numeric'  underlineColorAndroid="transparent" maxLength={4} placeholder='验证码' style={styles.signinValidateInput}
		      onChange={(event) => this.setValidateCode(
		            event.nativeEvent.text
		          )} value={this.state.validateCode}/>
		      </View>
		      <TouchableWithoutFeedback onPressOut={this.clickResend}>
		      <View style={styles.signinResendValidateContainer}>
			  <Text>
		        {this.state.resendValidateText}
		      </Text>
		      </View>
		      </TouchableWithoutFeedback>
		      </View>
		       <TouchableOpacity onPress={this.clickSignIn}>
		      <View style={[styles.signinBtn,{opacity:this.state.displayOthers}]}>
		      <Text style={styles.signinBtnText}>
		        登录
		      </Text>
		      </View>
		      </TouchableOpacity>
		 </View>
			)
	}
});
const styles = StyleSheet.create({
	signinValidateAreaContainer:{
		marginLeft:10,
		marginTop:10,
		flexDirection:'row',
		width:Dimensions.get('window').width - 120,
		height:60,
	},
	signinResendValidateContainer:{
		marginTop:30,
		width:65,
		height:30,
		borderRadius:20,
		borderWidth:1,
		borderColor:'#dfdfdf',
		alignItems:'center',
		justifyContent:'center'
	},
	signinBtn:{
		borderRadius:20,
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:'#f94805',
		marginTop:50,
		width:100,
		height:39
	},
	signinBtnText:{
		alignItems:'center',
		justifyContent:'center',
		fontSize:20,
		
		color:'#ffffff'
	},
	signinPhoneInput:{
		marginLeft:5,
		flex:1,
		width:80,
		height:42,
		fontSize: 19,
	},
	signinGreetingText:{
		marginLeft:5,
		marginTop:7,
		flex:1,
		width:80,
		height:42,
		fontSize: 19,
	},
	signinValidateInput:{
		marginTop:3,
		marginLeft:5,
		flex:1,
		width:40,
		height:42,
		fontSize: 19,
	},
	signinPhoneImg:{
		marginLeft:5,
		marginTop:10,
		width:16,
		height:18
	},
	signinGreetingImg:{
		marginLeft:4,
		marginTop:10,
		width:21,
		height:18
	},
	signinValidateImg:{
		marginLeft:4,
		marginTop:10,
		width:22,
		height:23
	},
	signinPhoneContainer:{
		borderBottomColor:'#dfdfdf',
		borderBottomWidth: 1,
		marginLeft:10,
		marginTop:10,
		flexDirection:'row',
		width:Dimensions.get('window').width - 120,
		height:35,
		// backgroundColor:'red'
	},
	signinValidateTextContainer:{
		borderBottomColor:'#dfdfdf',
		borderBottomWidth: 1,
		marginLeft:1,
		marginTop:10,
		flexDirection:'row',
		width:Dimensions.get('window').width - 250,
		height:35,
		// backgroundColor:'red'
	},
	signinContainer:{
		alignItems:'center',
	},
	signinToolbar:{
		width:Dimensions.get('window').width,
		height:50,
		backgroundColor:'#f94805',
		alignItems: 'center', 
		justifyContent: 'center',
	},
	signinToolbarText:{
		fontSize: 25,
		color:'#ffffff'
	},
	signinLogo:{
		width:Dimensions.get('window').width,
		height:200
	}
	
});
class Login extends Component {
  render() {
    return (
      //最外层容器
     <SinginComponent navigator={this.props.navigator}/>

    );
  }
}
export default Login
