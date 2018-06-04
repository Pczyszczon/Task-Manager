import React, { Component } from 'react';

import{
    StatusBar,
    Text,
    View,
    ScrollView,
    StyleSheet,
    Alert,
    FlatList,
} from 'react-native';

import firebaseApp from './firebase_config';
import _ from  'lodash';

import * as styles from './styles.js';
import PendingListRow from './pendingListRow';

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
    this.pendingRef = firebaseApp.database().ref("TaskManager/Pending/");
    this.state = {
      project_name: "",
      admin: null,
      dataSource: [],
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
    this._listenPending()
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

  _listenPending(){
   var test = []
   this.pendingRef.on('value', snapshot => {
   snapshot.forEach((child) => {
     test.push({
         key: child.key,
         email: child.val().email,
         project_name: child.val().project,
         uid: child.val().uid,
     })
   });
   this.setState({dataSource: test})
   });
 }

 _renderItem(item){
   return (
       <PendingListRow item = {item}/>
   )
 }

  // Here we need users that added themselfs to Pending List
  // Pending:
  //    uid:
  //        email: project_name
  // after tap it will add user to
  // Project:
  //    uid: (...)

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
          <Text style = {styles.instructions}>
          Pending Users
          </Text>
          <FlatList
           data={this.state.dataSource}
           renderItem={({item}) => this._renderItem(item)}
           />
        </View>

         :
         <View style = {styles.container}>
         <Text style ={styles.instructions}> Sorry, you are not admin </Text>
         </View>
    );
  }
}
