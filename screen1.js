import React, { Component } from 'react';

import{
    StatusBar,
    Text,
    View,
    ScrollView,
    StyleSheet,
    Alert,
} from 'react-native';

import firebaseApp from './src/firebase_config';
import _ from  'lodash';

import * as styles from './src/styles.js';

import{
  Input,
  CheckBox,
  Icon,
  Button,
} from 'react-native-elements';

import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator
} from 'react-navigation';

export default class Screen1 extends Component{
    // TO MA BYĆ SCREEN DO TWORZENIA PROJEKTÓW
    // TYLKO DLA ADMINA - CZYLI MA BYĆ WIDOCZNY GDY: XX.[firebaseApp.auth.currentUser.Admins.uid].admin === (..)uid
    // egg ma dopisywać nas do listy adminów
  constructor(props) {
    super(props);
    // this.tasksRef = firebaseApp.database().ref("TaskManager/Projects/Admins/" + firebaseApp.auth().currentUser.uid);
    this.ref = firebaseApp.database().ref("TaskManager/Users/" + firebaseApp.auth().currentUser.uid);
    this.state = {
      project_name: "",
      peniz: "",
    };
  }

  static navigationOptions = function(props) {
    return {
      title: 'Create Project',
      headerLeft:
      <Icon
        onPress={() => props.navigation.navigate('DrawerOpen')}
        name='menu'
        size={50}
      />
    }
  }

  handleCreate(){
    var tasksRef = firebaseApp.database().ref("TaskManager/Projects/" + this.state.project_name);
    tasksRef.push('Created');
    this.setState({project_name: ""});
  }

  // peniz(){
  //              this.ref.once('value', function(snapshot) {
  //                this.setState({peniz: snapshot.val()})
  //              });
  //            }

  peniz(){
        this.ref.once("value", function(snapshot) {
            alert(snapshot.val().project);
        })
    }


//
// peniz(){
//                  this.ref.once('value', snapshot => {
//                    var test = []
//                    test.push({peniz: snapshot.val().project})
//                    this.setState({peniz: test})
//                  })

               // }
  render(){
    return(
      <View style = {styles.container}>
        <Input
        style= {styles.input}
          onChangeText={(text) => this.setState({project_name: text})}
          placeholder = "Task description"
          placeholderTextColor = "#D6D5C9"
        />
        <Button
          onPress = {this.handleCreate.bind(this)}
          title="Create"
        />

        <Button
        onPress = {this.peniz.bind(this)}
        title = "Pezni"
        />
        <Text> {this.state.peniz} </Text>
      </View>
    );
  }
}
