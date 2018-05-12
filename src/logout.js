import React, { Component } from 'react';
import{
    View,
    Button,
    StyleSheet,
} from 'react-native';
import firebaseApp from './firebase_config';
import * as styles from './styles.js';
import { Icon } from 'react-native-elements';


import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';

export default class Logout extends Component{

  handleLogOut() {
    firebaseApp.auth().signOut();
  }

  static navigationOptions = function(props) {
    return {
      title: 'Logout',
      headerStyle: {backgroundColor: '#4C3E54'},
      headerTintColor: 'white',
      headerLeft:
      <Icon
        onPress={() => props.navigation.navigate('DrawerOpen')}
        size={35}
        name='menu'
        color='#fff'
      />
    }
  }

    render(){
        return(
            <View>
                <Button onPress={this.handleLogOut} title = 'logout'/>
            </View>

        );
      }
}
