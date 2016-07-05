'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  ListView,
  Text,
  Image,
  View,
  Picker,
  Dimensions,
  ToastAndroid,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
var CoachesComponent = React.createClass({
	getInitialState(){
		return {
			dataSource: new ListView.DataSource({
	        rowHasChanged: (row1, row2) => row1 !== row2,
	      	}),
		}
	},
	componentDidMount(){
		var URL = 'http://123.57.210.52:80/api/v1/coaches.json' + '?token=' + userToken + '&club_uuid=' + clubUuid;
		fetch(URL)
      	.then((response) => response.json())
      	.then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows((responseData.featured).concat(responseData.normal)),
        });
        // ToastAndroid.show('success',ToastAndroid.SHORT);
      })
      .done();
	},
	clickCoachesTitleLeft(){
		this.props.navigator.pop()
	},
	navigate(routeName){
	   this.props.navigator.push({
	        name: routeName
	      });
	},
	clickCoaches(val){
		ToastAndroid.show(val,ToastAndroid.SHORT);
		global.coachUuid = val;
		this.navigate('coachdetail')
	},
	renderCoaches(data){
		return (
			<TouchableHighlight onPress={() => this.clickCoaches(data.uuid)}>
			<View style={styles.coachesItemContainer}>
					<Image
					  style={styles.coachesImg}
					  source={{uri: data.portrait}} />
					 <View style={styles.coachesNameTypePriceDetailContainer}>
					 	<View style={styles.coachesNameTypePriceContainer}>
					 		<View style={styles.coachesNameTypeContainer}>
					 			<Text style={styles.coachesName}>{data.name}</Text>
					 			<Text style={styles.coachesType}>{data.title}</Text>
					 		</View>
					 		<View style={styles.coachesPriceContainer}>
								<Text style={styles.coachesQishoujia}>课程起售价:</Text>
					 			<Text style={styles.coachesPrice}>￥{data.starting_price}</Text>
					 		</View>
					 	</View>
					 	<View style={styles.coachesDetailContainer}>
							<Text>{data.description}</Text>
					 	</View>
					 </View>
				</View>
				</TouchableHighlight>
			)
	},
	render(){
		return (
		<View style={styles.coachesConatainer}>
			<View style={styles.coachesTitleContainer}>
			 <TouchableWithoutFeedback onPressOut={this.clickCoachesTitleLeft}>
	            <Image
	              style={styles.coachesTitleLeft}
	              source={require( './img/icon_back_arrow.png')} />
	          </TouchableWithoutFeedback>
	            <Text style={styles.coachesTitleText}>
	              教练
	            </Text>
			</View>
			<ListView
				style={styles.coachesListView}
				dataSource={this.state.dataSource}
				renderRow={this.renderCoaches}/>
		</View>
		)
	}
});

const styles = StyleSheet.create({
	coachesListView:{
		marginBottom:20
	},
	coachesDetailContainer:{
		width:Dimensions.get('window').width - 90,
		height:35,
	},
	coachesQishoujia:{
		marginLeft:10,
		marginTop:2,
		fontSize:20,
		textAlign:'right'

	},
	coachesPrice:{
		marginTop:8,
		fontSize:25,
		color:'#ff0000',
		textAlign:'right'

	},
	coachesType:{
		marginTop:8,
		fontSize:20,
	},
	coachesName:{
		marginTop:2,
		fontSize:23,
	},
	coachesPriceContainer:{
		height:65,
	},
	coachesNameTypeContainer:{
		flex:1,
		height:65,
	},
	coachesNameTypePriceContainer:{
		width:Dimensions.get('window').width - 90,
		height:65,
		flexDirection:'row',
	},
	coachesNameTypePriceDetailContainer:{
		width:Dimensions.get('window').width - 90,
		marginLeft:5,
		height:100,
		marginTop:10,
	},
	coachesImg:{
		marginLeft:10,
		marginTop:10,
		width:70,
		height:80,
	},
	
	coachesItemContainer:{
		marginTop:0.5,
		width:Dimensions.get('window').width,
		height:110,
		backgroundColor:'#ffffff',
		flexDirection:'row'
	},

	coachesTitleText:{
    textAlign:'center',
    marginLeft:-10,
    width:Dimensions.get('window').width - 77,
    fontSize: 25,
    color:'#ffffff'
  	},
	coachesTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	coachesTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
	coachesConatainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
		backgroundColor:'#e7e7e7'
	},
});

class Coaches extends Component {
  render() {
    return (
      <CoachesComponent navigator={this.props.navigator}/>
    );
  }
}

export default Coaches;