import React, { Component } from 'react';

import{
    StatusBar,
    Text,
    View,
    ScrollView,
    StyleSheet,
    Alert,
} from 'react-native';

import firebaseApp from './firebase_config';
import _ from  'lodash';

import * as styles from './styles.js';

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
  constructor(props) {
    super(props);
    this.projectsRef = firebaseApp.database().ref("TaskManager/Users/" + firebaseApp.auth().currentUser.uid);
    this.adminRef = firebaseApp.database().ref("TaskManager/Admins/" + firebaseApp.auth().currentUser.uid);
    this.state = {
      project_name: "",
      admin: null,
    };
  }

  static navigationOptions = function(props) {
    return {
      title: 'Admin Panel',
      headerLeft:
      <Icon
        onPress={() => props.navigation.navigate('DrawerOpen')}
        name='menu'
        size={50}
      />
    }
  }

  componentDidMount(){
      this.adminRef.once("value", snapshot => {
        if(snapshot.val() !== null){
          this.setState({admin: snapshot.val().admin})
     }
    });
  }

  handleCreate(){
    var tasksRef = firebaseApp.database().ref("TaskManager/Projects/" + this.state.project_name);
    tasksRef.push('Created');
    this.setState({project_name: ""});
    alert('Project created!');
  }

  swapProject(){
      this.projectsRef.remove();
      alert('You have removed yourself from current project! Go back to main screen to watch another');
  }

  render(){
    return(
        this.state.admin !== null ? <View style = {styles.container}>
          <Input
          style= {styles.input}
            onChangeText={(text) => this.setState({project_name: text})}
            placeholder = "Project name"
            placeholderTextColor = "#D6D5C9"
          />
          <Button
            onPress = {this.handleCreate.bind(this)}
            title="Create"
            buttonStyle ={styles.mainButtons}
          />
          <Button
            onPress = {this.swapProject.bind(this)}
            title="Swap Project"
            buttonStyle ={styles.mainButtons}
          />
        </View>
         :
         <View style = {styles.container}>
         <Text style ={styles.instructions}> Sorry, you are not admin </Text>
         </View>
    );
  }
}
