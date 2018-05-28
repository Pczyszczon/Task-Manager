import React, { Component } from 'react';

import{
    StatusBar,
    Text,
    View,
    ScrollView,
    StyleSheet,
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

export default class Main extends Component{

  constructor(props) {
    super(props);
    this.userRef = firebaseApp.database().ref("TaskManager/Users/" + firebaseApp.auth().currentUser.uid);
    this.state = {
      title: "",
      email: firebaseApp.auth().currentUser.email,
      bug: false,
      improvment: false,
      task: false,
      description: "",
      project: "",
    };
  }

  static navigationOptions = function(props) {
    return {
      title: 'Create Task',
      headerLeft:
      <Icon
        onPress={() => props.navigation.navigate('DrawerOpen')}
        name='menu'
        size={50}
      />
    }
  }

  setDefault(){
   this.setState({title: "",
                 description: "",
                 bug: false,
                 improvment: false,
                 task: false});
 }

 sendToFireBase(project){
   firebaseApp.database().ref("TaskManager/Projects/" + project).push({
       title: this.state.title.trim(),
       email: this.state.email,
       bug: this.state.bug,
       improvment: this.state.improvment,
       task: this.state.task,
       description: this.state.description.trim(),
     });
 }

 handleCreate(){
   var proj = null
     this.userRef.once("value", function(snapshot) {
       proj = snapshot.val().project
     });
     alert(proj);
   this.sendToFireBase(proj);
   this.setDefault();
 }



  selectBug(){
    this.setState({bug: true});
    this.setState({improvment: false});
    this.setState({task: false});
  }

  selectImprovment(){
    this.setState({bug: false});
    this.setState({improvment: true});
    this.setState({task: false});
  }

  selectTask(){
    this.setState({bug: false});
    this.setState({improvment: false});
    this.setState({task: true});
  }



  render(){
    return(
      <ScrollView style = {styles.container}>
        <Input
          onChangeText={(text) => this.setState({title: text})}
          placeholder = "Task title"
          style= {styles.input}
          placeholderTextColor = "#D6D5C9"
        />
        <CheckBox
          center
          title='Bug'
          iconRight
          iconType='material-community'
          checkedIcon='wrench'
          uncheckedIcon='check-circle-outline'
          checkedColor='red'
          checked={this.state.bug}
          onPress= {this.selectBug.bind(this)}
        />
        <CheckBox
          center
          title='Improvment'
          iconRight
          iconType='material-community'
          checkedIcon='lightbulb-on'
          uncheckedIcon='check-circle-outline'
          checkedColor='blue'
          checked={this.state.improvment}
          onPress= {this.selectImprovment.bind(this)}
        />
        <CheckBox
          center
          title='Task'
          iconRight
          iconType='material-community'
          checkedIcon='auto-fix'
          uncheckedIcon='check-circle-outline'
          checkedColor='green'
          checked={this.state.task}
          onPress= {this.selectTask.bind(this)}
          />
        <Input
        style= {styles.input}
          onChangeText={(text) => this.setState({description: text})}
          placeholder = "Task description"
          placeholderTextColor = "#D6D5C9"
        />
        <Button
          onPress = {this.handleCreate.bind(this)}
          title="Send"
        />
      </ScrollView>
    );
  }
}
