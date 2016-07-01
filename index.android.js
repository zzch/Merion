'use strict';

import React, { Component } from 'react';

import {
	BackAndroid,
	AppRegistry,
  	Navigator,
	StyleSheet,
	View,
} from 'react-native';
import Login from './login';
import Homepage from './homepage';
import PersonalCenter from './personalcenter';
import Feedback from './feedback';
import SendFeedback from './sendfeedback';
import UserProfile from './userprofile';
import Reservation from './reservation';
import Test from './test';
import CardBag from './cardbag';
import Coaches from './coaches';
import AnnouncementList from './announcementlist';
import ReservationList from './reservationlist';
import AnnouncementDetail from './announcementdetail';
import CoachDetail from './coachdetail';
import Promotions from './promotions';
import Tabs from './tabs';
import TabsAll from './tabsall';
import Provisions from './provisions';
import FirstScreen from './firstscreen';
var ToastAndroid = require('ToastAndroid');
class Root extends Component {
	configureScene(){
		return Navigator.SceneConfigs.FadeAndroid;
	}
	renderScene(route, navigator){
		var count = 2;
		  BackAndroid.addEventListener('hardwareBackPress',function(){
        if (navigator.getCurrentRoutes().length > 1) {
           navigator.pop();
           return true;
         }
         return false;
    	  });

		var Component = null;
		switch(route.name){
        case "login":
          Component = Login;
          break;
        case "homepage":
          Component = Homepage;
          break;
        case "personalcenter":
          Component = PersonalCenter;
          break;
        case "feedback":
          Component = Feedback;
          break;
        case "sendfeedback":
          Component = SendFeedback;
          break;
        case "userprofile":
          Component = UserProfile;
          break;
        case "reservation":
          Component = Reservation;
          break;
        case "test":
          Component = Test;
          break;
        case "cardbag":
          Component = CardBag;
          break;
        case "coaches":
          Component = Coaches;
          break;
        case "announcementlist":
          Component = AnnouncementList;
          break;
        case "reservationlist":
          Component = ReservationList;
          break;
        case "announcementdetail":
          Component = AnnouncementDetail;
          break;
        case "coachdetail":
          Component = CoachDetail;
          break;
        case "promotions":
          Component = Promotions;
          break;
        case "tabs":
          Component = Tabs;
          break;
        case "tabsall":
          Component = TabsAll;
          break;
        case "provisions":
          Component = Provisions;
          break;
        case "firstscreen":
          Component = FirstScreen;
          break;

      }
      return (<Component navigator = {navigator}/>)
	}
  render() {
    return (
      	<Navigator
      		initialRoute={{name:'firstscreen'}}
      		configureScene={this.configureScene}
      		renderScene={this.renderScene}
      	/>
    );
  }
}

AppRegistry.registerComponent('Merion', () => Root);