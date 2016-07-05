'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Image,
  ListView,
  View,
  Picker,
  ToastAndroid,
  Dimensions,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
var AnnouncementListComponent = React.createClass({
	getInitialState(){
		return {
			dataSource: new ListView.DataSource({
	        rowHasChanged: (row1, row2) => row1 !== row2,
	      	}),
	      	data:[],
	      	page:1
		}
	},
	componentDidMount(){
		var URL = 'http://lianqiubao.com/api/v1/announcements.json' + '?token=' + userToken + '&club_uuid=' + clubUuid + '&page=' + this.state.page;
		fetch(URL)
      	.then((response) => response.json())
      	.then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          data:responseData,
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          page:(this.state.page) + 1
        });
        // ToastAndroid.show('success',ToastAndroid.SHORT);
      }).catch((error) => {
	        if (error.toString().contains('failed')) {
	          ToastAndroid.show('请检查网络连接',ToastAndroid.SHORT)
	        }
	      })
      .done();
	},
	clickAnnouncementListTitleLeft(){
		this.props.navigator.pop()
	},
	handleDate(timestamp){
       var date = new Date(timestamp  * 1000);
       var year = parseInt(date.getFullYear()).toString();
       var month = parseInt(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1).toString();
       var day = parseInt(date.getDate()).toString(); 
       return (year + '年' + month + '月' + day + '日')
  	},
  	navigate(routeName){
   	this.props.navigator.push({
        name: routeName
      });
  	},
  	clickAnnouncement(val){
  		global.announcementUuid = val;
  		this.navigate('announcementdetail')
  	},
  	loadMore(){
		var URL = 'http://lianqiubao.com/api/v1/announcements.json' + '?token=' + userToken + '&club_uuid=' + clubUuid + '&page=' + this.state.page;
		fetch(URL)
      	.then((response) => response.json())
      	.then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        if (responseData.length != 0) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.data.concat(responseData)),
          data:this.state.data.concat(responseData),
          page:this.state.page + 1
        });
        }
        
        // ToastAndroid.show('success',ToastAndroid.SHORT);
      })
      .done();
	},
	renderAnnouncementList(data){
		return (
		<TouchableHighlight onPress={() => this.clickAnnouncement(data.uuid)}>
			<View style={styles.announcementItemContainer}>
				<View style={styles.announcementTitleAndDateContainer}>
				<View style={styles.announcementTitleContainer}>
					<Text style={styles.announcementTitle}>
					  {data.title}
					</Text>
				</View>
					<Text style={styles.announcementDate}>
					  {this.handleDate(data.published_at)}
					</Text>
				</View>
				<View style={styles.announcementDetailContainer}>
					<Text style={styles.announcementDetail}>{data.summary}</Text>
				</View>
			</View>
		</TouchableHighlight>
			)
	},
	render(){
		return (
			<View style={styles.announcementListConatainer}>
			<View style={styles.announcementListTitleContainer}>
			 <TouchableWithoutFeedback onPressOut={this.clickAnnouncementListTitleLeft}>
	            <Image
	              style={styles.announcementListTitleLeft}
	              source={require( './img/icon_back_arrow.png')} />
	          </TouchableWithoutFeedback>
	            <Text style={styles.announcementListTitleText}>
	              球场公告
	            </Text>
			</View>
			<ListView
				style={styles.announcementListView}
				onEndReachedThreshold={300}
				onEndReached={this.loadMore}
				dataSource={this.state.dataSource}
				renderRow={this.renderAnnouncementList}/>
			</View>
			)
	}
});
const styles = StyleSheet.create({
	announcementListView:{
		marginBottom:20
	},
	announcementDetail:{
		marginRight:5,
		marginLeft:5,
	},
	announcementDetailContainer:{
 		width:Dimensions.get('window').width,
 		height:55,
 		alignItems:'center',
 	},
	announcementDate:{
		marginRight:5,
		textAlign:'right'
	},
	announcementTitle:{
		fontSize:17,
		width:140,
		height:25
	},
	announcementTitleContainer:{
		height:45,
		justifyContent:'center',
		marginLeft:5,
		flex:1,

	},
 	announcementTitleAndDateContainer:{
 		width:Dimensions.get('window').width,
 		height:45,
 		flexDirection:'row',
 		alignItems:'center',
 	},
	announcementItemContainer:{
		marginTop:0.5,
		width:Dimensions.get('window').width,
		height:100,
		backgroundColor:'#ffffff',
	},
	announcementListTitleText:{
    textAlign:'center',
    marginLeft:-10,
    width:Dimensions.get('window').width - 77,
    fontSize: 25,
    color:'#ffffff'
  	},
	announcementListTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	announcementListTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
	announcementListConatainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
		backgroundColor:'#e7e7e7'
	},
});

class AnnouncementList extends Component {
  render() {
    return (
      <AnnouncementListComponent navigator={this.props.navigator}/>
    );
  }
}



export default AnnouncementList;