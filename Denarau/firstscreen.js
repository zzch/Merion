'use strict';

import React, { Component } from 'react';
import Storage from 'react-native-storage';

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  ToastAndroid
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
var FirstScreenComponent = React.createClass({
	componentDidMount(){
		  storage.load({
          key:'loginState',
          autoSync:true,
          syncInBackground: true
        }).then(ret => {
          // found data goes to then()

          var loginStateToken = ret.user_token;
          var loginStateClubUuid = ret.club_uuid;
          var REQUEST_URL = 'http://123.57.210.52:80/api/v1/clubs/home.json' + '?token=' + ret.user_token + '&club_uuid=' + ret.club_uuid;
          if (loginStateToken != '') {
          fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
              // ToastAndroid.show((responseData.error_code).toString(),ToastAndroid.SHORT)
              if (responseData.error_code != 10002) {
              		this.navigate('homepage')
              }else{
              		this.navigate('login')
              }
              })
              .done();
          }else{
          	this.navigate('login')
          }
        }).catch(err => {
            // any exception including data not found 
            // goes to catch()
            this.navigate('login');
            console.warn(err);
        });
	},
	navigate(routeName){
	   this.props.navigator.resetTo({
	        name: routeName
	      });
	},
	render(){
		return (
				<View style={styles.firstScreenContainer}>
					<Image
					  style={styles.firstScreenImg}
					  source={require('./img/firstscreen.jpg')} />
				</View>
			)
	}
});
const styles = StyleSheet.create({
	firstScreenImg:{
		resizeMode:'stretch',
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
	},
	firstScreenContainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
	},
});
class FirstScreen extends Component {
  render() {
    return (
      <FirstScreenComponent navigator={this.props.navigator}/>
    );
  }
}



export default FirstScreen;