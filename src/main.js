import React, { Component } from 'react';
import{
    Alert,
    StatusBar,
    Text,
    TextInput,
    View,
    Button,
    StyleSheet,
    FlatList
} from 'react-native';
import firebaseApp from './firebase_config';
import _ from  'lodash';

import ProjectListRow from './projectListRow';
import Row from './tasksRow';

import * as styles from './styles.js';

import { Icon } from 'react-native-elements';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';

export default class Main extends Component{

  constructor(props) {
        super(props);
        this.tasksRef = firebaseApp.database().ref("TaskManager/" + firebaseApp.auth().currentUser.uid);
        this.projectsRef = firebaseApp.database().ref("TaskManager/Projects/");
        this.userRef = firebaseApp.database().ref("TaskManager/Users/" + firebaseApp.auth().currentUser.uid);
        this.state = {
            email: firebaseApp.auth().currentUser.email,
            dataSource: [],
        };
    }

    static navigationOptions = function(props) {
      return {
        title: 'Your tasks',
        headerLeft:
        <Icon
          onPress={() => props.navigation.navigate('DrawerOpen')}
          size={50}
          name='menu'
        />
      }
    }

  componentDidMount(){
      var user_project = null;
      this.userRef.once("value", function(snapshot) {
      if(snapshot.val().project == null){
          this._listenProjects();
          alert('no project found');
      }
      else{
          this._listenTasks();
          alert('project found');
      }
       });
  }

  _listenTasks(){
    var test = []
    this.tasksRef.on('value', snapshot => {
    snapshot.forEach((child) => {
      test.push({
        key: child.key,
        title: child.val().title,
        description: child.val().description,
        bug: child.val().bug,
        improvment: child.val().improvment,
        task: child.val().task,
      })
    });
    this.setState({dataSource: test})
    });
  }

   _listenProjects(){
    var test = []
    this.projectsRef.on('value', snapshot => {
    snapshot.forEach((child) => {
      test.push({
        project_name: child.key,
      })
    });
    this.setState({dataSource: test})
    });
  }


  // PRZESZUKIWANIE PROJEKTÓW - DO CZASU AŻ LENIWY CHUJEK ZROBI NODA Z USERAMI XDXDXXDXDXDDXDXXDdXDXD
  // _listenTasks(){
  //   var test = []
  //   this.tasksRef.on('value', snapshot => {
  //   snapshot.forEach((child) => {
  //     test.push({
  //       project_name: child.key,
  //       project_content: child.val(),
  //     })
  //   });
  //   console.log(test)
  //   this.setState({dataSource: test})
  //   });
  // }

  // tak jak z adminami w create project


  _renderItem(item){
    let rowType = null;
    this.userRef.once("value", function(snapshot) {
        if(snapshot.val().project == null){
            rowType = <ProjectListRow item = {item}/>

        }
    else{
        rowType = <Row item = {item}/>
    }
     });
    return (
        {rowType}
    )
  }

    render(){
        return(
            <View style = {styles.container}>
              <FlatList
               data={this.state.dataSource}
               renderItem={({item}) => this._renderItem(item)}
               />
            </View>
        );
      }
}
