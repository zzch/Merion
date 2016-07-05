'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Image,
  View,
  WebView,
  Picker,
  ListView,
  Dimensions,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
var TabsComponent = React.createClass({
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
		var URL = 'http://lianqiubao.com/api/v1/tabs/all.json' + '?token=' + userToken + '&page=' + this.state.page;
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
      })
      .done();
	},
	clickTabsTitleLeft(){
		this.props.navigator.pop()
	},
	renderTabsConsumeDetail(data){
		return (
				<View style={styles.tabsConsumeContainer}>
					<View style={styles.redHr2}></View>
					<View style={styles.tabsConsumeDetailContainer}>
					<Text style={styles.tabsConsume3Text}>
						消费内容
					</Text>
					<Text style={styles.tabsConsume3Text}>
						小计
					</Text>
					<Text style={styles.tabsConsume3Text}>
						付款方式
					</Text>	
					</View>					
					</View>					
			)
	},
	handleDate1(timestamp){
       var date = new Date(timestamp  * 1000);
       var year = parseInt(date.getFullYear()).toString();
       var month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
       var day = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate(); 
       var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); 
       var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
       return (month + '月' + day + '日')
  	},
  	handleDate2(timestamp){
       var date = new Date(timestamp  * 1000);
       var year = parseInt(date.getFullYear()).toString();
       var month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
       var day = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate(); 
       var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); 
       var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); 
       return (hour + ':' + min)
  	},
  	paymentMethodSet(e){
				
				switch(e)
				{
					case "by_ball_member":
                        return "计球卡";
                        break;
                    case "by_time_member":
                        return "计时卡";
                        break;
                    case "unlimited_member":
                        return "畅打卡";
                        break;
                    case "stored_member":
                        return "储值卡";
                        break;
                    case "credit_card":
                        return "信用卡";
                        break;
                    case "cash":
                        return "现金";
                        break;
                    case "check":
                        return "支票";
                        break;
                    case "on_account":
                        return "挂账";
                        break;
                    case "signing":
                        return "签单";
                        break;
                    case "coupon":
                        return "抵用卷";
                        break;
                    default:
                        break;
				}
			},
			stateSet(e){
				switch(e)
				{
					case "finished":
                        return "已完成";
                        break;
                    case "progressing":
                        return "进行中";
                        break;
                    case "cancelled":
                        return "已取消";
                        break;
                    case "voided":
                        return "已撤销";
                        break;
                    case "confirming":
                        return "确认消费";
                        break;
                    default:
                        break;
				}
			},
	loadMore(){
		var URL = 'http://lianqiubao.com/api/v1/tabs/all.json' + '?token=' + userToken + '&page=' + this.state.page;
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
	renderTabs(data){
		var consumeData = data.items;
		return (
				<View style={styles.tabsBodyContainer}>
					<View style={styles.tabsTextContainer1}>
						<View style={styles.tabsXFDHTextContainer}>
							<Text style={styles.tabsXFDHText}>
							  消费单号
							</Text>
						</View>
						<View style={styles.tabsQTZFTextContainer}>
							<Text style={styles.tabsQTZFText}>
							  前台支付
							</Text>
						</View>
					</View>
					<View style={styles.tabsTextContainer1}>
						<View style={styles.tabsXFDHTextContainer}>
							<Text style={styles.tabsXFDHText}>
							  {data.sequence}
							</Text>
						</View>
						<View style={styles.tabsQTZFTextContainer}>
							<Text style={styles.tabsQTZFText}>
							  {data.reception_payment}
							</Text>
						</View>
					</View>
					<View style={styles.tabsXFSJContainer}>
						<Image
						  style={styles.tabsImg}
						  source={require('./img/xiaofeixinxi_xuanx.png')} />
						<View style={styles.tabsXFDHTextContainer}>
							<Text style={styles.tabsXFSJText}>
							  消费时间
							</Text>
						</View>
					</View>
					<View style={styles.redHr}></View>
					<View style={styles.tabsConsumeAtContainer}>
						<View style={styles.tabsConsumeAtDay}>
							<Text style={styles.tabsConsumeAtDayText}>
							  {this.handleDate1(data.entrance_time)}
							</Text>
						</View>
						<View style={styles.tabsConsumeAtHour}>
							<Text style={styles.tabsConsumeAtDayText}>
							   {this.handleDate2(data.entrance_time)}- {this.handleDate2(data.departure_time)}
							</Text>
						</View>
					</View>
					<View style={styles.tabsXFSJContainer}>
						<Image
						  style={styles.tabsImg}
						  source={require('./img/xiaofeixinxi_xuanx.png')} />
						<View style={styles.tabsXFDHTextContainer}>
							<Text style={styles.tabsXFSJText}>
							  消费球场
							</Text>
						</View>
					</View>
					<View style={styles.redHr}></View>
					<View style={styles.tabsConsumeAtContainer}>
						<View style={styles.tabsConsumeAtDay}>
							<Text style={styles.tabsConsumeAtDayText}>
							  {data.club.name}
							</Text>
						</View>
						
					</View>
					<View style={styles.tabsXFSJContainer}>
						<Image
						  style={styles.tabsImg}
						  source={require('./img/xiaofeixinxi_xuanx.png')} />
						<View style={styles.tabsXFDHTextContainer}>
							<Text style={styles.tabsXFSJText}>
							  消费明细
							</Text>
						</View>
					</View>
					<View style={styles.redHr}></View>
					<View style={styles.tabs3TextContainer}>
					<Text style={styles.tabs3Text}>
						消费内容
					</Text>
					<Text style={styles.tabs3Text}>
						小计
					</Text>
					<Text style={styles.tabs3Text}>
						付款方式
					</Text>	
					</View>
					{data.items.map(function(tbi){
						return(
							<View style={styles.tabsConsumeContainer}>
							<View style={styles.redHr2}></View>
							<View style={styles.tabsConsumeDetailContainer}>
							<Text style={styles.tabsConsume3Text}>
								{tbi.name}
							</Text>
							<Text style={styles.tabsConsume3Text}>
								{tbi.total_price}
							</Text>
							<Text style={styles.tabsConsume3Text}>
								{this.paymentMethodSet(tbi.payment_method)}
							</Text>	
							</View>					
							</View>					
							)
					}.bind(this))}
					<View style={styles.tabsStateContainer}>
						<Text style={styles.tabsStateText}>
						  {this.stateSet(data.state)}
						</Text>
					</View>
				</View>
			)
	},
	render(){
		return (
			<View style={styles.tabsContainer}>
			<View style={styles.tabsTitleContainer}>
			 <TouchableWithoutFeedback onPressOut={this.clickTabsTitleLeft}>
	            <Image
	              style={styles.tabsTitleLeft}
	              source={require( './img/icon_back_arrow.png')} />
	          </TouchableWithoutFeedback>
	            <Text style={styles.tabsTitleText}>
	              消费记录
	            </Text>
			</View>
			<ListView
					initialListSize={5}
					onEndReachedThreshold={300}
					onEndReached={this.loadMore}
					dataSource={this.state.dataSource}
					renderRow={this.renderTabs}/>
			</View>
			)
	}
});
const styles = StyleSheet.create({
	tabsStateText:{
		fontSize:20,
		color:'#ffffff'
	},
	tabsStateContainer:{
		width:Dimensions.get('window').width - 30,
		height:40,
		marginTop:15,
		backgroundColor:'#f94805',
		alignItems:'center',
		justifyContent:'center'
	},
	tabsConsumeListView:{
		marginBottom:100
	},
	tabsConsumeContainer:{
		height:20,
		marginTop:10,
		marginBottom:4
		
	},
	redHr2:{
		width:Dimensions.get('window').width - 54,
		height:0.5,
		backgroundColor:'#e54a4b',
		marginLeft:12,
		marginRight:12,
	},
	tabsConsume3Text:{
		fontSize:15,
		flex:1,
		textAlign:'center',
	},
	tabsConsumeDetailContainer:{
		height:20,
		flexDirection:'row',
		marginTop:8
	},
	tabs3Text:{
		fontSize:19,
		flex:1,
		textAlign:'center',
	},
	tabs3TextContainer:{
		height:22,
		flexDirection:'row',
		marginTop:3
	},
	tabsConsumeAtHour:{
		height:20,
		marginLeft:5
	},
	tabsConsumeAtDayText:{
		fontSize:19,
		marginLeft:23,
	},
	tabsConsumeAtDay:{
		height:20,
	},
	tabsConsumeAtContainer:{
		height:20,
		marginTop:8,
		flexDirection:'row',
	},	
	redHr:{
		width:Dimensions.get('window').width - 44,
		height:1,
		backgroundColor:'#e54a4b',
		marginLeft:7,
		marginRight:7,
		marginTop:3
	},
	tabsXFSJText:{
		fontSize:19,
		marginLeft:7,
		color:'#e54a4b'
	},
	tabsImg:{
		width:12,
		height:14,
		marginLeft:7

	},
	tabsXFSJContainer:{
		marginTop:17,
		height:20,
		flexDirection:'row',
		alignItems:'center'
	},
	tabsQTZFText:{
		flex:1,
		textAlign:'right',
		fontSize:18,
		marginRight:7
	},
	tabsXFDHText:{
		flex:1,
		textAlign:'left',
		fontSize:18,
		marginLeft:7
	},
	tabsQTZFTextContainer:{
		justifyContent:'center',
		flex:1
	},
	tabsXFDHTextContainer:{
		justifyContent:'center',
		flex:1
	},
	tabsTextContainer1:{
		marginTop:5,
		width:Dimensions.get('window').width - 30,
		flexDirection:'row',
		height:20,
	},
	tabsBodyContainer:{
		width:Dimensions.get('window').width - 30,
		marginTop:10,
		marginBottom:25,
		backgroundColor:'#ffffff'
	},
	tabsTitleText:{
	    textAlign:'center',
	    marginLeft:-10,
	    width:Dimensions.get('window').width - 77,
	    fontSize: 25,
	    color:'#ffffff'
  	},
	tabsTitleLeft:{
		marginLeft:-50,
	    width:50,
	    height:40
    },
	tabsTitleContainer:{
		flexDirection:'row',
	    width:Dimensions.get('window').width,
	    height:50,
	    backgroundColor:'#f94805',
	    alignItems: 'center', 
	    justifyContent: 'center',
	},
	tabsContainer:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height,
		alignItems:'center',
		backgroundColor:'#e7e7e7'
	},
});
class TabsAll extends Component {
  render() {
    return (
      <TabsComponent navigator={this.props.navigator}/>
    );
  }
}



export default TabsAll;