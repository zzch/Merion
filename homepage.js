'use strict';
import React, { Component } from 'react';
import Storage from 'react-native-storage';
import Dimensions from 'Dimensions';
import {IndicatorViewPager,PagerDotIndicator} from 'rn-viewpager';
import {
  Text,
  View,
  Image,
  StyleSheet,
  BackAndroid,
  ToastAndroid,
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
var lastBackPressed = Date.now();
// var userUuid,userName,userPortrait,userToken,userBirthday,clubUuid;
var HomepageComponent = React.createClass({
  getInitialState(){
      return {
        data:[],
        clubLogo:'',
        cardType:'',
        cardBalance:'',
        cardNumber:'',
        cardExpiredAt:'',
        weather:'',
        announcement:'',
        announcementDate:'',
        page: 0,
        animationsAreEnabled: true,
        progress: {
          position: 0,
          offset: 0,
        },
      }
  },
    
  functionback(){
      if(this.props.navigator.getCurrentRoutes().length > 1) {
           this.props.navigator.pop();
           return true;
          }else if (this.props.navigator.getCurrentRoutes().length == 1 && lastBackPressed && lastBackPressed + 2000 >= Date.now()){
          //最近2秒内按过back键，可以退出应用。
           return false;
          }
          lastBackPressed = Date.now();
          ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
          return true;
  },
  componentDidMount(){
      BackAndroid.addEventListener('hardwareBackPress',this.functionback);
      storage.load({
          key:'loginState',
          autoSync:true,
          syncInBackground: true
        }).then(ret => {
          // found data goes to then()
          global.userUuid = ret.user_uuid;
          global.userName = ret.user_name;
          global.userPortrait = ret.user_portrait;
          global.userToken = ret.user_token;
          global.userBirthday = ret.user_birthday;
          global.clubUuid = ret.club_uuid;
          global.userGender1 = ret.user_gender;

          if(userGender1 == 'male'){
            global.userGender = '男';
          }else if (userGender1 == 'female') {
            global.userGender = '女';
          }else{
            global.userGender = '';
          }
          var REQUEST_URL = 'http://lianqiubao.com/api/v1/clubs/home.json' + '?token=' + ret.user_token + '&club_uuid=' + ret.club_uuid;
          fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
              // ToastAndroid.show((responseData.error_code).toString(),ToastAndroid.SHORT)
               this.setState({
                data:responseData.members,
                clubLogo:responseData.club.logo,
                cardType:responseData.members[0].card.name,
                cardBalance:responseData.members[0].balance,
                cardNumber:responseData.members[0].number,
                cardExpiredAt:responseData.members[0].expired_at,
                weather:responseData.weather.maximum_temperature,
                announcement:responseData.announcements[0].title,
                announcementDate:responseData.announcements[0].published_at
               })
              }).catch((error) => {
                if (error.toString().contains('failed')) {
                  ToastAndroid.show('请检查网络连接',ToastAndroid.SHORT)
                }
              })
              .done();
        }).catch(err => {
            // any exception including data not found 
            // goes to catch()
            console.warn(err);
        });
  },
  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress',this.functionback)
    },
  navigate(routeName){
   this.props.navigator.push({
        name: routeName
      });
  },
  navigate1(routeName){
   this.props.navigator.resetTo({
        name: routeName
      });
  },
  handleDate(timestamp){
       var date = new Date(timestamp  * 1000);
       var year = parseInt(date.getFullYear()).toString();
       var month = parseInt(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1).toString();
       var day = parseInt(date.getDate()).toString(); 
       return (year + '年' + month + '月' + day + '日')
  },
  clickHomePageToolbarLeft(){
       // var date = new Date();
       // var year = parseInt(new Date((this.state.announcementDate) * 1000).getFullYear()).toString();
       // var month = parseInt(new Date().getMonth()).toString();
       // var day = parseInt(new Date((this.state.announcementDate) * 1000).getDate()).toString();
       // var a = parseInt(month).toString();
       this.navigate('personalcenter');
  },
  clickHomePageToolbarRight(){
    this.navigate1('cardbag')
  },
  clickReservation(){
      this.navigate('reservation')
  },
  clickHomePageFeedback(){
      this.navigate('feedback')
  },
  clickCoaches(){
      this.navigate('coaches')
  },
  clickAnnouncementList(){
      this.navigate('reservationlist')
  },
  clickPromotions(){
      this.navigate('promotions')
  },
  clickTabs(){
      this.navigate('tabs')
  },
  clickProvisions(){
      this.navigate('provisions')
  },
  _renderDotIndicator() {
        return (
            <PagerDotIndicator
            style = {styles.indicatorImg}
                pageCount={this.state.data.length}
            />
        );
  },
  render(){
    var pages = [];
     for (var i = 0; i < this.state.data.length; i++) {
      var pageStyle = {
        width:Dimensions.get('window').width,
        height:210,
        alignItems: 'stretch'
      };
      pages.push(
        <View key={i} style={pageStyle} collapsable={false}>
          <View style={styles.homePageCardContainer}>
            
              <View style={styles.homePageCardImageContainer}>
             
                <Image
                  style={styles.homePageCardImageBackgroundBall}
                  source={require('./img/backgroudball.png')}>
                    <Image
                      style={styles.homePageCardImageLogo}
                      source={{uri: this.state.clubLogo}} />
                  </Image>
                <Text style={styles.homePageCardInfoCardNumber}>
                  卡号:{this.state.data[i].number}
                </Text>
              </View>
              <View style={styles.homePageCardInfoContainer}>
                <Text style={styles.homePageCardInfoType}>{this.state.data[i].card.name}</Text>
                <Text style={styles.homePageCardInfoYue}>储值余额</Text>
                <Text style={styles.homePageCardInfoBalance}>{this.state.data[i].balance}</Text>
                <Text style={styles.homePageCardInfoCardExpire}>
                  有效期至:{this.handleDate(this.state.data[i].expired_at)}
                </Text>
             </View>
         </View>
       </View>
      );
    }
    var { page, animationsAreEnabled } = this.state;
    return (
        <View style={styles.homePageContainer}>
         <View style={styles.homePageTitleContainer}>
          <TouchableWithoutFeedback onPressOut={this.clickHomePageToolbarLeft}>
            <Image
              style={styles.homePageToolbarLeft}
              source={require( './img/userprofile.png')} />
          </TouchableWithoutFeedback>
            <Text style={styles.homePageToolbarText}>
              首页
            </Text>
            <TouchableWithoutFeedback onPressOut={this.clickHomePageToolbarRight}>
             <Image
              style={styles.homePageToolbarRight}
              source={require( './img/window.png')} />
            </TouchableWithoutFeedback>
         </View>

        <View style={styles.container}>
        <Image
             style={styles.homePageCardContainer}
             source={require('./img/sy_kamian_bj.png')}>
         <IndicatorViewPager
           indicator={this._renderDotIndicator()}
           style={styles.viewPager}
           initialPage={0}
           ref={viewPager => { this.viewPager = viewPager;}}>
           {pages}
          </IndicatorViewPager>
          </Image>
       </View>

         <View style={styles.homePageHr}/>   
         <View style={styles.homePageTempratureAndAnnounceContainer}>
            <View style={styles.homePageTempratureContainer}>
              <Text style={styles.homePageTemprature}>今天:{this.state.weather}℃</Text>
            </View>
            <View style={styles.homePageTempratureVr}/>
            <TouchableWithoutFeedback onPressOut={this.clickAnnouncementList}>
            <View style={styles.homePageAnnounceContainer}>
              <Text style={styles.homePageAnnouncement}>{this.state.announcement}</Text>
              <Text style={styles.homePageAnnouncement}>{this.handleDate(this.state.announcementDate)}</Text>
            </View>
            </TouchableWithoutFeedback>
            <Image
              style={styles.rightArrow}
              source={require('./img/shouye_arrow_icon.png')} />
         </View>
         <View style={styles.homePageFirstThreeBtnContainer}>
          <TouchableWithoutFeedback onPressOut={this.clickReservation}>
            <View style={styles.homePageBtnContainer}>
              <Image
                style={styles.homePageBtnImg}
                source={require('./img/shouye_yuyue_icon.png')} />
                <Text style={styles.homePageBtnText}>打位预约</Text>
            </View>
          </TouchableWithoutFeedback>
            <View style={styles.homePageBtnVr}/>
          <TouchableWithoutFeedback onPressOut={this.clickCoaches}>
            <View style={styles.homePageBtnContainer}>
              <Image
                style={styles.homePageBtnImg}
                source={require('./img/shouye_jiaolian_icon.png')} />
                <Text style={styles.homePageBtnText}>教练教学</Text>
            </View>
            </TouchableWithoutFeedback>
            <View style={styles.homePageBtnVr}/>
            <TouchableWithoutFeedback onPressOut={this.clickPromotions}>
            <View style={styles.homePageBtnContainer}>
              <Image
                style={styles.homePageBtnImg}
                source={require('./img/shouye_shangcheng_icon.png')} />
                <Text style={styles.homePageBtnText}>会员商城</Text>
            </View>
         </TouchableWithoutFeedback>
         </View>
         <View style={styles.homePageHr}/>
         <View style={styles.homePageLastThreeBtnContainer}>
         <TouchableWithoutFeedback onPressOut={this.clickTabs}>
            <View style={styles.homePageBtnContainer}>
              <Image
                style={styles.homePageBtnImg}
                source={require('./img/shouye_xiaofei_icon.png')} />
                <Text style={styles.homePageBtnText}>消费记录</Text>
            </View>
            </TouchableWithoutFeedback>
            <View style={styles.homePageBtnVr}/>
            <TouchableWithoutFeedback onPressOut={this.clickProvisions}>
            <View style={styles.homePageBtnContainer}>
              <Image
                style={styles.homePageBtnImg}
                source={require('./img/shouye_canyin_icon.png')} />
                <Text style={styles.homePageBtnText}>餐饮服务</Text>
            </View>
            </TouchableWithoutFeedback>
            <View style={styles.homePageBtnVr}/>
            <TouchableWithoutFeedback onPressOut={this.clickHomePageFeedback}>
            <View style={styles.homePageBtnContainer}>
              <Image
                style={styles.homePageBtnImg}
                source={require('./img/shouye_yijian_icon.png')} />
                <Text style={styles.homePageBtnText}>意见反馈</Text>
            </View>
            </TouchableWithoutFeedback>
         </View>
          <View style={styles.homePageHr}/>
        </View>
      )
  }
});
const styles = StyleSheet.create({
  container: {
    width:Dimensions.get('window').width,
    height:210,
  },
  viewPager: {
    flex: 1,
  },
  indicatorImg:{
    alignItems:'center',
  },
  homePageBtnText:{
    marginTop:15
  },
  homePageBtnImg:{
    marginTop:17,
    width:70,
    height:70,
  },
  homePageBtnContainer:{
    width:(Dimensions.get('window').width)/3,
    height:(Dimensions.get('window').height - 340)/2,
    alignItems:'center'
  },
  homePageBtnVr:{
    width:0.5,
    height:(Dimensions.get('window').height - 340)/2,
    backgroundColor:'#636363'
  },
  homePageLastThreeBtnContainer:{
    width:Dimensions.get('window').width,
    height:(Dimensions.get('window').height - 340)/2,
    flexDirection:'row'
  },
  homePageFirstThreeBtnContainer:{
    width:Dimensions.get('window').width,
    height:(Dimensions.get('window').height - 340)/2,
    flexDirection:'row'
  },
  rightArrow:{
    marginLeft:5,
    width:12,
    height:12
  },
  homePageAnnouncement:{
    width:Dimensions.get('window').width - 110,
    height:18,
    color:'#b5b5b5',
  },
  homePageAnnounceContainer:{
    width:Dimensions.get('window').width - 110,
    marginLeft:5,
    height:36,
  },
  homePageTempratureVr:{
    marginLeft:5,
    width:0.5,
    height:49,
    backgroundColor:'#636363'
  },
  homePageTemprature:{
    marginLeft:5,
    color:'#b5b5b5',
  },
  homePageHr:{
    width:Dimensions.get('window').width,
    height:0.5,
    backgroundColor:'#636363'
  },
  homePageTempratureContainer:{
    justifyContent:'center',
    width:73,
  },
  homePageTempratureAndAnnounceContainer:{
    width:Dimensions.get('window').width,
    height:55,
    backgroundColor:'#2b2d2e',
    flexDirection:'row',
    alignItems:'center',
  },
  homePageContainer:{
    alignItems:'center',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  homePageTitleContainer:{
    flexDirection:'row',
    width:Dimensions.get('window').width,
    height:50,
    backgroundColor:'#f94805',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  homePageToolbarText:{
    textAlign:'center',
    width:Dimensions.get('window').width - 77,
    fontSize: 25,
    color:'#ffffff'
  },
  homePageToolbarLeft:{
    width:27,
    height:24
  },
  homePageToolbarRight:{
    width:30,
    height:24
  },
  homePageCardContainer:{
    width:Dimensions.get('window').width,
    height:220,
    flexDirection:'row',
  },
  homePageCardImageContainer:{
    alignItems: 'center', 
    width:(Dimensions.get('window').width)/2,
    height:200,
  },
  homePageCardInfoContainer:{
    width:(Dimensions.get('window').width)/2,
    height:200,
  },
  homePageCardImageBackgroundBall:{
    width:105,
    height:100,
    marginTop:45
  },
  homePageCardImageLogo:{
    borderRadius: 50,
    width:60,
    height:60,
    marginLeft:14,
    marginTop:13
  },
  homePageCardInfoCardNumber:{
    marginLeft:4,
    position:'absolute',
    bottom:1,
    color:'#b5b5b5'
  },
  homePageCardInfoType:{
    fontSize:18,
    color:'#b5b5b5',
    marginTop:35
  },
  homePageCardInfoYue:{
    fontSize:18,
    color:'#a29d9d',
    marginTop:40
  },
  homePageCardInfoBalance:{
    fontSize:22,
    color:'#b5b5b5',
    marginTop:10
  },
  homePageCardInfoCardExpire:{
    width:(Dimensions.get('window').width)/2,
    textAlign:'right',
    position:'absolute',
    bottom:1,
    color:'#b5b5b5'
  },
});
class Homepage extends Component {
  render() {
    return (
     <HomepageComponent navigator={this.props.navigator}/>
    );
  }
}

export default Homepage;