import React, { Component } from 'react';

import {
  AppRegistry,
  View,
  Text,
  StatusBar
} from 'react-native';

import {
  Input,
  Icon,
  Button,
} from 'react-native-elements';

import Swiper from 'react-native-swiper';

import firebaseApp from './firebase_config';
import Create from './create';
import PasswordReset from './reset';

import * as styles from './styles.js';

export default class Login extends Component{

  render(){
    return(
      <Swiper
        loop = {false}
        showsPagination = {true}
        index = {1}
      >
        <View style={styles.viewStyle}>
          <Create/>
        </View>
        <View style={styles.viewStyle}>
          <Auth/>
        </View>
        <View style={styles.viewStyle}>
          <PasswordReset/>
        </View>
      </Swiper>
    );
  }
}

class Auth extends Component{

  handleLogin(){
    var email = this.state.email;
    var password = this.state.password;
    alert('asgasg');
    firebaseApp.auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);
      });
  }

  render(){
    return(
      <View style = {styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style = {styles.title}>Login</Text>

        <Input
          onChangeText= {(email) => {this.setState({email})}}
          autoCapitalize = 'none'
          returnKeyType = 'next'
          autoFocus = {true}
          onSubmitEditing = {(event) => {this.refs.passwordInput.focus()}}
          style = {styles.input}
          keyboardType= {'email-address'}
          placeholder = "Enter your email"
          placeholderTextColor = "#D6D5C9"
          leftIcon = {
            {type: 'material-community', name: 'email', color: "#D6D5C9"}
          }
        />

        <Input
          ref = 'passwordInput'
          autoCapitalize = 'none'
          onChangeText={(password) => {this.setState({password})}}
          style= {styles.input}
          placeholder = 'Enter your password'
          placeholderTextColor = "#D6D5C9"
          leftIcon = {
            {type: 'material-community',name: 'lock-open',color: "#D6D5C9"}
          }
          secureTextEntry = {true}
          returnKeyType = "go"
          onSubmitEditing = {() => {this.handleLogin()}}
        />

        <Button
          onPress = {() => this.handleLogin()}
          title="Login"
          buttonStyle ={styles.mainButtons}
        />

        <Text style = {styles.instructions}>
          swipe left to create an account{"\n"}swipe right if you forgot password
        </Text>

      </View>
    );
  }
}
