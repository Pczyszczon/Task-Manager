import React, { Component } from 'react';
import{
    StatusBar,
    Text,
    View,
    StyleSheet,
    Alert,
} from 'react-native';

import {
  Input,
  Icon,
  Button,
} from 'react-native-elements';
import firebaseApp from './firebase_config';
import * as styles from './styles.js';

export default class Create extends Component{
    handleCreate(){
        var email = this.state.email;
        var password = this.state.password;
        var confirmPassword = this.state.confirmPassword;

        if(password === confirmPassword){
            firebaseApp.auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(error => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/weak-password') {
                        alert('The password is too weak.');
                    }else if(errorCode === 'auth/email-already-in-use'){
                        alert('The email is already used');
                    }else if(errorCode === 'auth/invalid-email'){
                        alert('The email is invalid');
                    }else if(errorCode === 'auth/operation-not-allowed'){
                        alert('auth/operation-not-allowed');
                    }
                });
        }
        else{
            alert("Password does not match");
        }
    }

    render(){
        return(
            <View style = {styles.container}>
                <StatusBar barStyle="light-content" />

                <Text style = {styles.title}>Create</Text>
                <Input onChangeText={(email) => {this.setState({email})}}
                           autoCapitalize = 'none'
                           returnKeyType = {'next'}
                           autoFocus = {true}
                           onSubmitEditing = {(event) => {
                               this.refs.passwordInput.focus();
                           }}
                           style = {styles.input}
                           keyboardType={'email-address'}
                           placeholder = "Enter email"
                           placeholderTextColor = "#D6D5C9"
                            />

                <Input ref = 'passwordInput' onChangeText={(password) => {this.setState({password})}}
                           style= {styles.input}
                           placeholder = 'Password'
                           placeholderTextColor = "#D6D5C9"
                           secureTextEntry = {true}
                           returnKeyType = {"next"}
                           onSubmitEditing = {(event) => {
                               this.refs.ConfirmPassword.focus();
                           }}/>

                <Input ref = 'ConfirmPassword' onChangeText={(confirmPassword) => {this.setState({confirmPassword})}}
                           style = {styles.input}
                           placeholder = 'Please confirm your password'
                           placeholderTextColor = "#D6D5C9"
                           secureTextEntry = {true}
                           returnKeyType = "go"
                           onSubmitEditing = {() => this.handleCreate()}/>

                <Button
                    onPress = {() => this.handleCreate()}
                    title="Create"
                    buttonStyle ={styles.mainButtons}
                />
            </View>
        );
    }
}
