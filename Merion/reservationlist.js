'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  ListView,
  Text,
  Image,
  ToastAndroid,
  View,
  Picker,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
var ReservationListComponent = React.createClass({
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
		var URL = 'http://lianqiubao.com/api/v1/reservations.json' + '?token=' + userToken + '&page=' + this.state.page;
		fetch(URL)
      	.then((response) => response.json())
      	.then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
        	data:responseData,
          	dataSource: this.state.dataSource.cloneWithRows(responseData),
          	page:(this.state.page) + 1
        });
      })
      .done();
	},
	handleDate(timestamp){
       var date = new Date((timestamp)  * 1000);
       var year = parseInt(date.getFullYear()).toString();
       var month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
       var day = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate(); 
       var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); 
       var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
       return (month + '月' + day + '日' + hour + ':' + min)
  	},
	clickReservationListTitleLeft(){
		this.props.navigator.pop()
	},
	getStatus(state){
		if(state == 'submitted')
		{
			return '已确认'
		}
	},
	loadMore(){
		var URL = 'http://lianqiubao.com/api/v1/reservations.json' + '?token=' + userToken + '&page=' + this.state.page;
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
	renderReservationList(data){
		return (
			<View style={styles.reservationListItemContainer}>
				<View style={styles.reservationListDateAndCourseContainer}>
				<View style={styles.reservationListTextContainer}>
				  	<Text style={styles.reservationListText}>
				  	  {this.handleDate(data.will_playing_at)}
				  	</Text>
				</View>
				<View style={styles.reservationListTextContainer}>
				  	<Text style={styles.reservationListText}>
				  	  {data.club.name}
				  	</Text>
				</View>
				</View>
				<View style={styles.reservationListStateContainer}>
					<Text style={styles.reservationListText}>
					  {this.getStatus(data.state)}
					</Text>
				</View>
			</View>
			)
	},
	render(){
		return (
			<View style={styles.reservationListConatainer}>
				<View style={styles.reservationListTitleContainer}>
				 <TouchableWithoutFeedback onPressOut={this.clickReservationListTitleLeft}>
		            <Image
		              style={styles.reservationListTitleLeft}
		              source={require( './img/icon_back_arrow.png')} />
		          </TouchableWithoutFeedback>
		            <Text style={styles.reservationListTitleText}>
		              打位预约
		            </Text>
				</View>
				<ListView
					style={styles.reservationListView}
					initialListSize={5}
					onEndReachedThreshold={300}
					onEndReached={this.loadMore}
					dataSource={this.state.dataSource}
					renderRow={this.renderReservationList}/>
			</View>

			)
	}
});
const styles = StyleSheet.create({
	reservationListView:{
		marginBottom:20
	},
	reservationListStateContainer:{
		height:70,
		justifyContent:'center'
	},
	reservationListText:{
		fontSize:20,
		marginLeft:5,
		marginRight:5,
	},
	reservationListTextContainer:{
		height:35,
		justifyContent:'center'
	},
	reservationListDateAndCourseContainer:{
		flex:1,
		height:70,
	},
 	
	reservationListItemContainer:{
		marginTop:0.5,
		width:Dimensions.get('window').width,
		height:70,
		flexDirection:'row',
		justifyContent:'center',
		backgroundColor:'#ffffff',
	},
	reservationListTitleText:{
    textAlign:'center',
    marginLeft:-10,
    width:Dimensions.get('window').width - 77,
    fontSize: 25,
    color:'#ffffff'
  	},
	reservationListTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	reservationListTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
	reservationListConatainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
		backgroundColor:'#e7e7e7'
	},
});
class ReservationList extends Component {
  render() {
    return (
      <ReservationListComponent navigator={this.props.navigator}/>
    );
  }
}

export default ReservationList;