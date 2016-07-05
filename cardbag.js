'use strict';

import React, { Component } from 'react';
import Storage from 'react-native-storage';
import {
  View,
  Text,
  Image,
  ListView,
  BackAndroid,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  TouchableHighlight,
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
var CardBagComponent = React.createClass({

	getInitialState(){
		return {
			dataSource: new ListView.DataSource({
	        rowHasChanged: (row1, row2) => row1 !== row2,
	      	}),
		}
	},
	backfunction(){
        this.navigate('homepage');
        return true;
        },
	componentDidMount(){
		this.functionback = this.backfunction.bind(this);
      	BackAndroid.addEventListener('hardwareBackPress',this.backfunction);
		var URL = 'http://lianqiubao.com/api/v1/clubs/membership.json' + '?token=' + userToken;
		fetch(URL)
      	.then((response) => response.json())
      	.then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
        });
        // ToastAndroid.show('success',ToastAndroid.SHORT);
      }).catch((error) => {
            if (error.toString().contains('failed')) {
              ToastAndroid.show('请检查网络连接',ToastAndroid.SHORT)
            }
          })
      .done();
	},
	componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress',this.backfunction)
  	},
	clickCardbagTitleLeft(){
		this.navigate('homepage');
	},
	navigate(routeName) {
    this.props.navigator.resetTo({
      name: routeName
    });
	},
	clickCard(val){
		// ToastAndroid.show(val,ToastAndroid.SHORT)
		storage.save({
					key:'loginState',
					rawData:{
						user_uuid: userUuid,
				        user_name: userName,
						user_portrait: userPortrait,
						user_birthday: userBirthday,
						user_token: userToken,
						user_gender:userGender1,
						club_uuid: val
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

	},
	renderCard(data){
		return (
			<TouchableOpacity onPressOut={() => this.clickCard(data.uuid)}>
			<View style={styles.cardbagItemContainer}>
				<View style={styles.cardLogoAndName}>
					<Image
					  style={styles.cardbagLogo}
					  source={{uri: data.logo}} />
					<Text style={styles.cardbagName}>
					  {data.name}
					</Text>
				</View>
				<View style={styles.cardbagAddrAndTel}>
					<View style={styles.cardbagTel}>
						<Image
						  style={styles.cardbagTelImg}
						  source={require('./img/phone.png')} />
						<Text style={styles.cardbagName}>
					  		{data.phone_number}
						</Text>
					</View>
					<View style={styles.cardbagTel}>
						<Image
						  style={styles.cardbagTelImg}
						  source={require('./img/location.png')} />
						<Text style={styles.cardbagName}>
					  		{data.address}
						</Text>
					</View>
				</View>
			</View>
			</TouchableOpacity>
			)
	},

	render(){
		return (
			<View style={styles.cardbagConatainer}>
				<View style={styles.cardbagTitleContainer}>
				 <TouchableWithoutFeedback onPressOut={this.clickCardbagTitleLeft}>
		            <Image
		              style={styles.cardbagTitleLeft}
		              source={require( './img/icon_back_arrow.png')} />
		          </TouchableWithoutFeedback>
		            <Text style={styles.cardbagTitleText}>
		              卡包
		            </Text>
				</View>
				<ListView
					style={styles.cardbagListView}
					dataSource={this.state.dataSource}
					renderRow={this.renderCard}/>
			</View>

			)
	}
});
const styles = StyleSheet.create({
	cardbagListView:{
		marginBottom:20
	},
	cardbagTelImg:{
		marginLeft:9,
		width:15,
		height:15
	},
	cardbagTel:{
		width:Dimensions.get('window').width - 10,
		height:65,
		flexDirection:'row',
		alignItems:'center',
	},
	cardbagAddrAndTel:{
		borderBottomLeftRadius:12,
		borderBottomRightRadius:12,
		width:Dimensions.get('window').width - 10,
		height:140,
	},
	cardbagName:{
		fontSize:20,
		marginLeft:9
	},
	cardbagLogo:{
		marginLeft:9,
		borderRadius:12,
		width:60,
		height:60,
	},
	cardLogoAndName:{
		width:Dimensions.get('window').width - 10,
		alignItems: 'center', 
		flexDirection:'row',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		height:80,
		backgroundColor:"#e54a4b"

	},
	cardbagItemContainer:{
		marginTop:10,
		borderRadius:12,
		marginLeft:5,
		width:Dimensions.get('window').width - 10,
		height:220,
		backgroundColor:'#f2f2f2'
	},

	cardbagTitleText:{
    textAlign:'center',
    marginLeft:-10,
    width:Dimensions.get('window').width - 77,
    fontSize: 25,
    color:'#ffffff'
  	},
	cardbagTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	cardbagTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
	cardbagConatainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
		backgroundColor:'#e7e7e7'
	},
});
class CardBag extends Component {
  render() {
    return (
      <CardBagComponent navigator={this.props.navigator}/>
    );
  }
}
export default CardBag;