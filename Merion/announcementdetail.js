'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  WebView,
  Image,
  View,
  Picker,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
var AnnouncementDetailComponent = React.createClass({
	getInitialState(){
		return {
			announcementDetail:''
		}
	},
	componentDidMount(){
		var URL = 'http://lianqiubao.com/api/v1/announcements/detail.json' + '?token=' + userToken + '&club_uuid=' + clubUuid  + '&uuid=' + announcementUuid;
		fetch(URL)
      	.then((response) => response.json())
      	.then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
         	announcementDetail:responseData
        });
        // ToastAndroid.show('success',ToastAndroid.SHORT);
      })
      .done();
	},
	clickAnnouncementDetailTitleLeft(){
		this.props.navigator.pop()
	},
	render(){
		return (
			<View style={styles.announcementDetailConatainer}>
			<View style={styles.announcementDetailTitleContainer}>
			 <TouchableWithoutFeedback onPressOut={this.clickAnnouncementDetailTitleLeft}>
	            <Image
	              style={styles.announcementDetailTitleLeft}
	              source={require( './img/icon_back_arrow.png')} />
	          </TouchableWithoutFeedback>
	            <Text style={styles.announcementDetailTitleText}>
	              公告详情
	            </Text>
			</View>
			<View style={styles.announcementDetailContainer}>
				{/*<View style={styles.announcementDetailTitleTextContainer1}>
				  	<Text style={styles.announcementDetailTitleText1}>
				  	  {this.state.announcementDetail.title}
				  	</Text>
				</View>*/}
				<View style={styles.announcementDetailContentTextContainer}>
				<ScrollView>
					<Text style={styles.announcementDetailTitleText1}>
				  	  {this.state.announcementDetail.title}
				  	</Text>
            <WebView 
              style={{padding: 20}}
              automaticallyAdjustContentInsets={false}
              scrollEnabled={false}
              source={{html: this.state.announcementDetail.content}} />
				 </ScrollView>
				</View>
			</View>
		</View>
			)
	}
});
const styles = StyleSheet.create({
	announcementDetailContentText:{
	fontSize:15,
	marginLeft:10,
	width:Dimensions.get('window').width-20,
	},
	announcementDetailContentTextContainer:{
		alignItems:'center',
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height-70,
	},
	announcementDetailTitleText1:{
		textAlign:'center',
		fontSize:20,
		width:Dimensions.get('window').width,
		marginTop:20,
		marginBottom:20,
	},
	announcementDetailTitleTextContainer1:{
		alignItems:'center',
		justifyContent:'center',
		width:Dimensions.get('window').width,
		height:70,
	},
	announcementDetailContainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
		alignItems:'center',
		backgroundColor:'#ffffff',
	},
	announcementDetailTitleText:{
    textAlign:'center',
    marginLeft:-10,
    width:Dimensions.get('window').width - 77,
    fontSize: 25,
    color:'#ffffff'
  	},
	announcementDetailTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	announcementDetailTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
	announcementDetailConatainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
		backgroundColor:'#e7e7e7'
	},
});
class AnnouncementDetail extends Component {
  render() {
    return (
      <AnnouncementDetailComponent navigator={this.props.navigator}/>
    );
  }
}



export default AnnouncementDetail;