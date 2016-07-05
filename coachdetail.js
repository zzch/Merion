'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Image,
  ListView,
  View,
  WebView,
  Picker,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
var CoachDetailComponent = React.createClass({
	getInitialState(){
		return {
			coachPortrait:'',
			coachName:'',
			coachType:'',
			coachDescription:'',
			dataSource: new ListView.DataSource({
	        rowHasChanged: (row1, row2) => row1 !== row2,
	      	}),
		}
	},
	componentDidMount(){
		var URL = 'http://lianqiubao.com/api/v1/coaches/detail.json' + '?token=' + userToken + '&club_uuid=' + clubUuid + '&uuid=' + coachUuid;;
		fetch(URL)
      	.then((response) => response.json())
      	.then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.courses),
          coachName:responseData.name,
          coachPortrait:responseData.portrait,
          coachType:responseData.title,
          coachDescription:responseData.description,
        });
        // ToastAndroid.show('success',ToastAndroid.SHORT);
      })
      .done();
	},
	navigate(routeName){
	   this.props.navigator.push({
	        name: routeName
	      });
	},
	clickCoachDetailTitleLeft(){
		this.props.navigator.pop()
	},
	renderCoachDetailCourse(data){
		return (
				<View style={styles.coachDetailCourseContainer}>
					<Text style={styles.coachDetailCourseName}>
					   {data.name}
					</Text>
					<Text style={styles.coachDetailCoursePrice}>
					  {data.price}元
					</Text>
					 <Image
		              style={styles.rightArrow}
		              source={require('./img/shouye_arrow_icon.png')} />
				</View>
			)
	},
	render(){
		return (
			<View style={styles.coachDetailContainer}>
			<View style={styles.coachDetailTitleContainer}>
			 <TouchableWithoutFeedback onPressOut={this.clickCoachDetailTitleLeft}>
	            <Image
	              style={styles.coachDetailTitleLeft}
	              source={require( './img/icon_back_arrow.png')} />
	          </TouchableWithoutFeedback>
	            <Text style={styles.coachDetailTitleText}>
	              教练详情
	            </Text>
			</View>
			<View style={styles.coachInfoContainer}>
				<Image
				  style={styles.coachInfoImg}
				  source={{uri: this.state.coachPortrait}} />
				<View style={styles.coachInfoNameAndType}>
					<View style={styles.coachInfoNameContainer}>
						<Text style={styles.coachInfoName}>
						  {this.state.coachName}
						</Text>
					</View>
					<View style={styles.coachInfoTypeContainer}>
						<Text style={styles.coachInfoType}>
						  {this.state.coachType}
						</Text>
					</View>
				</View>
			</View>
			<WebView 
				style={{padding: 20}}
				automaticallyAdjustContentInsets={false}
				scrollEnabled={false}
				source={{html: this.state.coachDescription}} />
      <ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderCoachDetailCourse} />
			</View>
			)
	}
});
const styles = StyleSheet.create({
	rightArrow:{
	    marginLeft:5,
	    marginRight:5,
	    width:14,
	    height:12
  	},
	coachDetailCoursePrice:{
		fontSize:22,
	},
	coachDetailCourseName:{
	  marginLeft:5,
		fontSize:22,
		flex:1
	},
	coachDetailCourseContainer:{
		marginTop:0.5,
		width:Dimensions.get('window').width,
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#ffffff'
	},
	coachDetailDescriptionWebView:{
		width:Dimensions.get('window').width,
	},
	coachInfoTypeContainer:{
		height:45,
		justifyContent:'center'
	},
	coachInfoNameContainer:{
		height:45,
		justifyContent:'center'
	},
	coachInfoName:{
		textAlign:'justify',
		fontSize:22
	},
	coachInfoType:{
		textAlign:'justify',
		fontSize:18
	},
	coachInfoNameAndType:{
		width:Dimensions.get('window').width-90,
		height:100,
		marginLeft:10,
	},
	coachInfoImg:{
		height:90,
		marginTop:5,
		marginLeft:5,
		width:80
	},
	coachInfoContainer:{
		width:Dimensions.get('window').width,
		height:100,
		flexDirection:'row',
	},
	coachDetailTitleText:{
    textAlign:'center',
    marginLeft:-10,
    width:Dimensions.get('window').width - 77,
    fontSize: 25,
    color:'#ffffff'
  	},
	coachDetailTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	coachDetailTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
	coachDetailContainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
		backgroundColor:'#e7e7e7'
	},
});
class CoachDetail extends Component {
  render() {
    return (
      <CoachDetailComponent navigator={this.props.navigator}/>
    );
  }
}



export default CoachDetail;