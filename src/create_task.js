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

import Row from './row';

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
    this.tasksRef = firebaseApp.database().ref("TaskManager/" + firebaseApp.auth().currentUser.uid);
    this.state = {
      title: "",
      email: firebaseApp.auth().currentUser.email,
      bug: false,
      improvment: false,
      task: false,
      description: "",
    };
  }

  static navigationOptions = function(props) {
    return {
      title: 'Create Task',
      headerLeft:
      <Icon
        onPress={() => props.navigation.navigate('DrawerOpen')}
        size={35}
        name='menu'
      />
    }
  }

  handleCreate(){
    this.tasksRef.push({
      title: this.state.name.trim(),
      email: this.state.email,
      bug: this.state.bug,
      improvment: this.state.improvment,
      task: this.state.task,
      description: this.state.description.trim(),
    });
    this.setState({title: ""});
    this.setState({description: ""});
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
      <ScrollView>
        <Input
          onChangeText={(text) => this.setState({name: text})}
          placeholder = "Task title"
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
          onChangeText={(text) => this.setState({description: text})}
          placeholder = "Task description"
        />
        <Button
          onPress = {this.handleCreate.bind(this)}
          title="Send"
        />
      </ScrollView>
    );
  }
}
