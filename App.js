import firebaseApp from './src/firebase_config';
import Login from './src/login';
import Main from './src/main';
import AccDetails from './src/AccDetails'
import Screen1 from './screen1';
import CreateTask from './src/create_task';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class App extends Component {
   constructor(props){
     super(props);
     this.state={
       user: null
     };
   }

  componentDidMount(){
      firebaseApp.auth().onAuthStateChanged(user => {
          if(user){
              this.setState({user});

          }else{
              this.setState({user: null});
          }
      });
    }

  render(){
    return this.state.user ? <DrawerStack/> : <Login/>;
  }
}

  export const Root = StackNavigator({
    DrawerStackXXX: {screen: Main},
  })

  export const test = StackNavigator({
    screen1: { screen: Screen1 },
  })

  export const test1 = StackNavigator({
    screen2: { screen: CreateTask },
  })

  export const test2 = StackNavigator({
    screen3: { screen: AccDetails },
  })

  export const LoginSreen = StackNavigator({
      LoginSreen: {screen: Login },
  })

  export const DrawerStack = DrawerNavigator({
    root: {screen: Root},
    Screen1: {screen: test},
    Screen2: {screen: test1},
    Screen3: {screen: test2},
  })




import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
