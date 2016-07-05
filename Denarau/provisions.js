'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Image,
  View,
  WebView,
  ListView,
  ScrollView,
  Dimensions,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
var ProvisionsComponent = React.createClass({
	getInitialState(){
		return {
			provisionsData:[],
			dataSource: new ListView.DataSource({
	        rowHasChanged: (row1, row2) => row1 !== row2,
	      	}),
		}
	},
	componentDidMount(){
		var URL = 'http://123.57.210.52:80/api/v1/provisions.json' + '?token=' + userToken + '&club_uuid=' + clubUuid;
		fetch(URL)
      	.then((response) => response.json())
      	.then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          provisionsData: responseData,
          dataSource:this.state.dataSource.cloneWithRows(responseData[0].provisions),
        });
        // ToastAndroid.show('success',ToastAndroid.SHORT);
      })
      .done();
	},
	clickProvisionType(name){
		ToastAndroid.show(name,ToastAndroid.SHORT)
		var position = '';
		for(var i = 0; i < this.state.provisionsData.length; i++)
			{
				if(this.state.provisionsData[i].name == name)
				{
					position = i;
				}
			}
		this.setState({
          	dataSource:this.state.dataSource.cloneWithRows(this.state.provisionsData[position].provisions),
		})
		this.style = {fontColor: 'red'}
	},
	clickProvisionsTitleLeft(){
		this.props.navigator.pop()
	},
	setProvisionsImg(img){
		if(img == null)
		{
			return (
				<Image
				  style={styles.provisionsImg}
				  source={require('./img/cyfw_mr.png')}/>
				)
		}else{
			return (
				<Image
				  style={styles.provisionsImg}
				  source={{uri: img}}/>
				)
		}
	},
	renderProvisions(data){
		return (
				<View style={styles.provisionsListContainer}>
					{this.setProvisionsImg(data.image)}
					
					<Text style={styles.provisionsNameAndPrice}>
					  {data.name}
					</Text>
					<Text style={styles.provisionsNameAndPrice}>
					  ￥{data.price}
					</Text>
				</View>
			)
	},
	render(){
		return (
			<View style={styles.provisionsBodyContainer}>
					<View style={styles.provisionsTitleContainer}>
					 <TouchableWithoutFeedback onPressOut={this.clickProvisionsTitleLeft}>
			            <Image
			              style={styles.provisionsTitleLeft}
			              source={require( './img/icon_back_arrow.png')} />
			          </TouchableWithoutFeedback>
			            <Text style={styles.provisionsTitleText}>
			              消费记录
			            </Text>
					</View>
					<View style={styles.provisionsTypeConainer}>
						<ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
						{this.state.provisionsData.map(function(prv){
						return (
							<TouchableWithoutFeedback onPressOut={() => this.clickProvisionType(prv.name)}>
							<Text style={styles.provisionsTypeText}>
							  	{prv.name}
							</Text>
							</TouchableWithoutFeedback>
							)
						}.bind(this))}
						</ScrollView>
					</View>
					<ListView
					contentContainerStyle={styles.list}
					dataSource={this.state.dataSource}
					renderRow={this.renderProvisions}/>
			</View>
			)
	}
});
const styles = StyleSheet.create({
	list: {
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	    alignItems: 'flex-start'
  	},
	provisionsNameAndPrice:{
		fontSize:20,
		width:Dimensions.get('window').width/2 - 20,
		height:25,
		textAlign:'right',
		textAlignVertical:'center'
	},
	provisionsImg:{
		width:Dimensions.get('window').width/2 - 9,
		height:Dimensions.get('window').width/2 - 60,
	},
	provisionsListContainer:{
		width:Dimensions.get('window').width/2 - 9,
		height:Dimensions.get('window').width/2 - 9,
		borderBottomLeftRadius:15,
		borderBottomRightRadius:15,
		marginLeft:6,
		marginTop:10,
		backgroundColor:'#ffffff'
	},
	provisionsTypeText:{
		height:40,
		width:70,
		fontSize:20,
		color:'#ffffff',
		textAlign:'center',
		textAlignVertical:'center'
	},
	provisionsBodyContainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
		backgroundColor:'#dcdcdc'
	},
	provisionsTypeConainer:{
		width:Dimensions.get('window').width,
		height:40,
		backgroundColor:'#292d2f',
		flexDirection:'row'
	},
	provisionsTitleText:{
	    textAlign:'center',
	    marginLeft:-10,
	    width:Dimensions.get('window').width - 77,
	    fontSize: 25,
	    color:'#ffffff'
  	},
	provisionsTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	provisionsTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
});
class Provisions extends Component {
  render() {
    return (
      <ProvisionsComponent navigator={this.props.navigator}/>
    );
  }
}



export default Provisions;





	