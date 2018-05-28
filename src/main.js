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
        this.projectsRef = firebaseApp.database().ref("TaskManager/Projects/");
        this.userRef = firebaseApp.database().ref("TaskManager/Users/" + firebaseApp.auth().currentUser.uid);
        this.state = {
            tmp_hnadler: true,
            project: null,
            email: firebaseApp.auth().currentUser.email,
            dataSource: [],
        };
    }

    static navigationOptions = function(props) {
      return {
        title: 'Project Tasks',
        headerLeft:
        <Icon
          onPress={() => props.navigation.navigate('DrawerOpen')}
          size={50}
          name='menu'
        />
      }
    }

  componentDidMount(){
      this.userRef.once("value", snapshot => {
        if(snapshot.val() !== null){
          this.setState({project: snapshot.val().project})
        this.state.project !== null ? this._listenTasks() : this._listenProjects();
     }
    });
    this.state.project !== null ? this._listenTasks() : this._listenProjects();
  }


  _listenTasks(){
    var tasksRef = firebaseApp.database().ref("TaskManager/Projects/" + this.state.project);
    var test = [];
    tasksRef.on('value', snapshot => {
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

  _renderItem(item){
    return (
        this.state.project !== null ? <Row item = {item}/> : <ProjectListRow item = {item}/>
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
