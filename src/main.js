import React, { Component } from 'react';
import{
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
import Row from './row';
import * as styles from './styles.js';

import { Icon } from 'react-native-elements';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';

export default class Main extends Component{

  constructor(props) {
        super(props);
        this.tasksRef = firebaseApp.database().ref("TaskManager/" + firebaseApp.auth().currentUser.uid);
        this.state = {
            newTask: "",
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
          size={35}
          name='menu'
        />
      }
    }

  componentDidMount(){
    this._listenTasks()
  }

  _listenTasks(){
    var test = []
    this.tasksRef.on('value', snapshot => {
    snapshot.forEach((child) => {
      test.push({
        key: child.key,
        title: child.val().title,
      })
    });
    this.setState({dataSource: test})
    });
  }


  handleLogOut() {
    firebaseApp.auth().signOut();
}


  _renderItem(item){
    return (
      <Row item = {item}/>
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
