import React, { Component } from 'react';
import{
    StatusBar,
    Text,
    View,
} from 'react-native';
import {
  Input,
  Icon,
  Button,
} from 'react-native-elements';

import firebaseApp from './firebase_config';
import * as styles from './styles.js';

export default class PasswordReset extends Component{

    constructor(){
        super();
        this.tasksRef = firebaseApp.database().ref("DoIT/"+'users');

    };

    handleReset(){
        var email = this.state.email;
        firebaseApp.auth().sendPasswordResetEmail(email);
          alert('reset email send to your email address');
        }

    render(){
        return(
            <View style = {styles.container}>
                <StatusBar barStyle="light-content" />

                <Text style = {styles.title}>Reset</Text>

                <Input onChangeText={(email) => {this.setState({email})}}
                           autoCapitalize = 'none'
                           returnKeyType = {'next'}
                           autoFocus = {true}
                           onSubmitEditing = {(event) => {
                               this.refs.passwordInput.focus();
                           }}
                           style = {styles.input}
                           keyboardType={'email-address'}
                           placeholder = "Just remind us your email"
                           placeholderTextColor = "#D6D5C9"/>
                <Button
                    onPress = {() => this.handleReset()}
                    title="Reset"
                    buttonStyle ={styles.mainButtons}
                />
            </View>
        );
    }
}
