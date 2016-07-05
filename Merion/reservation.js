'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  Picker,
  Dimensions,
  StyleSheet,
  Platform,
  ToastAndroid,
  TouchableWithoutFeedback,
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
var cornerDate,dateToday,dateTomorrow,dateTheDATomorrow
var ReservationComponent = React.createClass({
	getInitialState(){
		return {
			weathers:[],
			weathersToSet:[],
			weathersCode:'',
			dateToday:'',
			dateTomorrow:'',
			dateTAT:'',
			todayColor:'#f94805',
			tomorrowColor:'#ffffff',
			TATColor:'#ffffff',
			pickedDay:'',
			pickTime:'',
			workcode:0


		}
	},
	componentDidMount(){
		  var REQUEST_URL = 'http://lianqiubao.com/api/v1/weathers/recently.json' + '?token=' + userToken + '&club_uuid=' + clubUuid;
          fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
              this.setState({
					weathers:responseData,
					weathersToSet:responseData[0],
					weathersCode:responseData[0].code,
					dateToday:responseData[0].date,
					dateTomorrow:responseData[1].date,
					dateTAT:responseData[2].date,
					pickedDay:responseData[0].date
				})
           
              })
              .done();
	},
  	handleDate1(timestamp){
       var date = new Date(timestamp  * 1000);
       var year = parseInt(date.getFullYear()).toString();
       var month = parseInt(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1).toString();
       var day = parseInt(date.getDate()).toString(); 
       return (year + '-' + month + '-' + day)
  	},
  	handleDate2(timestamp){
       var date = new Date(timestamp  * 1000);
       var year = parseInt(date.getFullYear()).toString();
       var month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
       var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate(); 
       return (month + '-' + day)
 	},
 	handleDate3(timestamp){
       var date = new Date(timestamp  * 1000);
       var year = parseInt(date.getFullYear()).toString();
       var month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
       var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate(); 
       var h = date.getHours()  < 10 ? '0'+date.getHours() : date.getHours();
	   var m = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
       return (year + '-' + month + '-' + day + ' ' + h + ':' + m)
 	},
	clickReservationTitleLeft(){
		this.props.navigator.pop();
		// ToastAndroid.show('clicked',ToastAndroid.SHORT)
 	},
  	clickReservationToday(){
  		this.setState({
			todayColor:'#f94805',
			tomorrowColor:'#ffffff',
			TATColor:'#ffffff',
			weathersToSet:this.state.weathers[0],
			weathersCode:this.state.weathers[0].code,
			pickedDay:this.state.weathers[0].date
  		})
  	},
  	clickReservationTomorrow(){
  		this.setState({
  			todayColor:'#ffffff',
			tomorrowColor:'#f94805',
			TATColor:'#ffffff',
			weathersToSet:this.state.weathers[1],
			weathersCode:this.state.weathers[1].code,
			pickedDay:this.state.weathers[1].date
  		})
  	},
  	clickReservationTAT(){
  		this.setState({
  			todayColor:'#ffffff',
			tomorrowColor:'#ffffff',
			TATColor:'#f94805',
			weathersToSet:this.state.weathers[2],
			weathersCode:this.state.weathers[2].code,
			pickedDay:this.state.weathers[2].date
  		})
  	},
  	clickBtnReservation(){
  		var pickedTime = parseInt(this.state.pickTime.substr(0,2))*3600 + parseInt(this.state.pickTime.substr(3,5)) * 60 + this.state.pickedDay - 28800;
  		var token = userToken;
  		var clubuuid = clubUuid;
  		var reservationsUrl = 'http://lianqiubao.com/api/v1/reservations.json';
  		let data = {'token':token,'club_uuid':clubuuid,'reserve_at':pickedTime};
  		NetUitl.postJson(reservationsUrl,data,function (set){
			if (set.exception_code == 10002) {
		  		ToastAndroid.show('登录失效',ToastAndroid.SHORT)
			}else if (set.exception_code == 10003) {
				ToastAndroid.show('球场未找到',ToastAndroid.SHORT)
			}else if (set.exception_code == 20004) {
				Alert.alert(
					'重复预约',
					'您已预约过当天打位',
					[{text: '确定'}]
					)
			}
			else{
				Alert.alert(
					'预约成功',
					'您已成功预定'+this.handleDate3(pickedTime) +  "的打位，可以在“个人中心”>“打位预约”中查看",
					[{text: '确定'}]
					)
  				// ToastAndroid.show('预订成功',ToastAndroid.SHORT)
			}
 		 }.bind(this));
  	},
  	setWeatherImg(code){
  		if (code == 1) {
  			return (<Image
				style={styles.weatherImg}
				source={require('./img/oneicon.png')}/>)
  		}else if (code == 2) {
			return (<Image
				style={styles.weatherImg}
				source={require('./img/twoicon.png')}/>)
  		}else if (code == 3) {
			return (<Image
				style={styles.weatherImg}
				source={require('./img/threeicon.png')}/>)
  		}else if (code == 4) {
			return (<Image
				style={styles.weatherImg}
				source={require('./img/fouricon.png')}/>)
  		}else if (code == 5) {
			return (<Image
				style={styles.weatherImg}
				source={require('./img/fiveicon.png')}/>)
  		}else if (code == 6) {
			return (<Image
				style={styles.weatherImg}
				source={require('./img/sixicon.png')}/>)
  		}else if (code == 7) {
			return (<Image
				style={styles.weatherImg}
				source={require('./img/sevenicon.png')}/>)
  		}else if (code == 8) {
			return (<Image
				style={styles.weatherImg}
				source={require('./img/eighticon.png')}/>)
  		}
  		
  	},

	render(){
		return (
				<View style={styles.reservationContainer}>
				 <View style={styles.reservationTitleContainer}>
				 <TouchableWithoutFeedback onPressOut={this.clickReservationTitleLeft}>
		            <Image
		              style={styles.reservationTitleLeft}
		              source={require( './img/icon_back_arrow.png')} />
		          </TouchableWithoutFeedback>
		            <Text style={styles.reservationTitleText}>
		              打位预定
		            </Text>
				</View>
				<View style={styles.reservationWeatherContainer}>
					<View style={styles.reservationDateAndTempratureContainer}>
					<Text style={styles.reservationWeatherDate}>
					  {this.handleDate1(this.state.weathersToSet.date)}
					</Text>
					<View style={styles.reservationWeatherDescriptionContainer}>
					{this.setWeatherImg(this.state.weathersCode)}
					
						<Text style={styles.reservationWeatherTxt}>
						  {this.state.weathersToSet.content}
						</Text>
					</View>
					<View style={styles.reservationWeatherTempratureContainer}>
						<Text style={styles.reservationTempratureTxt}>
						  {this.state.weathersToSet.maximum_temperature}°
						</Text>
					</View>
					</View>
				<View style={styles.reservationHr}/>   
				<View style={styles.reservationWinterAndRain}>
				<Text style={styles.reservationWindTxt}>{this.state.weathersToSet.wind},降水概率:{this.state.weathersToSet.probability_of_precipitation}%</Text>
				</View>
				</View>
				<Text style={styles.reservationDaqiushijianTxt}>打球时间</Text>
				<View style={styles.reservation3BtnContainer}>
					<TouchableWithoutFeedback onPressOut={this.clickReservationToday}>
					<View style={[styles.reservationEachBtnContainer,{backgroundColor:this.state.todayColor}]}>
						<Text style={styles.reservationEachBtnTxt}>
						  今天{this.handleDate2(this.state.dateToday)}
						</Text>
					</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPressOut={this.clickReservationTomorrow}>
					<View style={[styles.reservationEachBtnContainer,{backgroundColor:this.state.tomorrowColor}]}>
						<Text style={styles.reservationEachBtnTxt}>
						  明天{this.handleDate2(this.state.dateTomorrow)}
						</Text>
					</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPressOut={this.clickReservationTAT}>
					<View style={[styles.reservationEachBtnContainer,{backgroundColor:this.state.TATColor}]}>
						<Text style={styles.reservationEachBtnTxt}>
						  后天{this.handleDate2(this.state.dateTAT)}
						</Text>
					</View>
					</TouchableWithoutFeedback>
				</View>
				<View style={styles.reservationPickerContainer}>
					<Image 
					style={styles.reservationClockIcon}
					source={require('./img/dqyy_clock.png')}/>
					<Text style={styles.reservationClockTxt}>
					  {this.state.pickTime}
					</Text>
				</View>
				<Picker style = {styles.picker}
				enabled ={true}
				prompt = '选择时间'
				  selectedValue={this.state.pickTime}
				  onValueChange={(val) => this.setState({
											pickTime:val})
				}>

				  <Picker.Item label="09:00" value="09:00" />
				  <Picker.Item label="09:30" value="09:30" />
				  <Picker.Item label="10:00" value="10:00" />
				  <Picker.Item label="10:30" value="10:30" />
				  <Picker.Item label="11:00" value="11:00" />
				  <Picker.Item label="11:30" value="11:30" />
				  <Picker.Item label="12:00" value="12:00" />
				  <Picker.Item label="12:30" value="12:30" />
				  <Picker.Item label="13:00" value="13:00" />
				  <Picker.Item label="13:30" value="13:30" />
				  <Picker.Item label="14:00" value="14:00" />
				  <Picker.Item label="14:30" value="14:30" />
				  <Picker.Item label="15:00" value="15:00" />
				  <Picker.Item label="15:30" value="15:30" />
				  <Picker.Item label="16:00" value="16:00" />
				  <Picker.Item label="16:30" value="16:30" />
				  <Picker.Item label="17:00" value="17:00" />
				  <Picker.Item label="17:30" value="17:30" />
				  <Picker.Item label="18:00" value="18:00" />
				  <Picker.Item label="18:30" value="18:30" />
				  <Picker.Item label="19:00" value="19:00" />
				  <Picker.Item label="19:30" value="19:30" />
				  <Picker.Item label="20:00" value="20:00" />
				  <Picker.Item label="20:30" value="20:30" />
				  <Picker.Item label="21:00" value="21:00" />
				</Picker>
				<TouchableWithoutFeedback onPressOut={this.clickBtnReservation}>
				<View style={styles.reservationReserveContainer}>
					 <Text style={styles.reservationReserveText}>
		              预定
		            </Text>
				</View>
				</TouchableWithoutFeedback>
				</View>
			)
	}
});
const styles = StyleSheet.create({
	picker:{
		position:'absolute',
		backgroundColor:'red',
		width:Dimensions.get('window').width - 20,
		marginLeft:10,
		marginTop:-60,
		opacity:0,
		height:60,
		borderRadius:5,
		
	},
	reservationReserveText:{
		fontSize:23,
		color:'#ffffff'
	},
	reservationReserveContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	    position:'absolute',
	    bottom:23
	},
	reservationClockTxt:{
		fontSize:20,
		color:'#000000',
	},
	reservationClockIcon:{
		width:30,
		height:30,
		marginRight:10
	},
	reservationPickerContainer:{
		width:Dimensions.get('window').width - 20,
		height:60,
		borderRadius:5,
		backgroundColor:'#ffffff',
		marginTop:20,
		alignItems:'center',
		justifyContent:'center',
		flexDirection:'row'
	},
	reservationEachBtnTxt:{
		fontSize:18,
	},
	reservationEachBtnContainer:{
		width:(Dimensions.get('window').width - 40)/3,
		height:70,
		marginLeft:10,
		borderRadius:5,
		alignItems:'center',
		justifyContent:'center'
	},
	reservation3BtnContainer:{
		width:Dimensions.get('window').width,
		height:80,
		flexDirection:'row',
		marginTop:5
	},
	reservationDaqiushijianTxt:{
		fontSize:20,
		color:'#000000',
		marginTop:10
	},
	reservationWindTxt:{
		fontSize:19,
		color:'#a4a4a4',
		marginLeft:5
	},
	reservationWinterAndRain:{
		width:Dimensions.get('window').width,
		height:39.5,
		justifyContent:'center'
	},
	reservationTempratureTxt:{
		fontSize:60,
		color:'#a4a4a4'
	},
	reservationWeatherTempratureContainer:{
		width:Dimensions.get('window').width,
		height:70,
		alignItems:'center',
		justifyContent:'center',
	},
	reservationWeatherTxt:{
		fontSize:20,
		color:'#a4a4a4'
	},
	reservationWeatherDescriptionContainer:{
		width:Dimensions.get('window').width,
		height:50,
		alignItems:'center',
		justifyContent:'center',
		flexDirection:'row'
	},
	weatherImg:{
		width:46,
		height:38,
		marginLeft:-10,
		marginRight:10
	},
	reservationWeatherDate:{
		fontSize:18,
		color:'#5d5e5e',
		marginLeft:5,
		marginTop:5
	},
	reservationHr:{
    width:Dimensions.get('window').width,
    height:0.5,
    backgroundColor:'#5d5e5e'
	},
	reservationDateAndTempratureContainer:{
		width:Dimensions.get('window').width,
		height:160,
	},
	reservationWeatherContainer:{
		width:Dimensions.get('window').width,
		height:200,
		backgroundColor:'#272d2f'
	},
	reservationTitleText:{
    textAlign:'center',
    marginLeft:-10,
    width:Dimensions.get('window').width - 77,
    fontSize: 25,
    color:'#ffffff'
  	},
	reservationTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	reservationTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
	reservationContainer:{
		backgroundColor:'#e7e7e7',
	    alignItems:'center',
	    width:Dimensions.get('window').width,
	    height:Dimensions.get('window').height,
	}
});
class Reservation extends Component {
  render() {
    return (
      <ReservationComponent navigator={this.props.navigator}/>
    );
  }
}

export default Reservation;