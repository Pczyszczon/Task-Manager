import React, { Component } from 'react';
import{
    View,
    Text,
    StyleSheet,
} from 'react-native';
import firebaseApp from './firebase_config';
import * as styles from './styles.js';
import { Icon, Button } from 'react-native-elements';

export default class AccDetails extends Component {

  static navigationOptions = function(props) {
    return {
      title: 'Account Details',
      headerLeft:
      <Icon
        onPress={() => props.navigation.navigate('DrawerOpen')}
        size={35}
        name='menu'
      />
    }
  }

  sendResetEmail() {
      firebaseApp.auth().sendPasswordResetEmail(firebaseApp.auth().currentUser.email);
      alert('reset email send to your email address');
    }

    sendVerifyEmail() {
        firebaseApp.auth().currentUser.sendEmailVerification();
        alert('verification email send to your email address');
    }

    handleLogOut() {
        firebaseApp.auth().signOut();
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.instructions}>
                  Logged in as
                  {"\n"}{firebaseApp.auth().currentUser.email}
                </Text>
                {firebaseApp.auth().currentUser.emailVerified
                  ?
                  <Text style={styles.instructions}>Verified: Yes </Text>
                  :
                  <Text style={styles.instructions}>Verified: No </Text>
                }
                {firebaseApp.auth().currentUser.emailVerified
                  ?
                  null
                  :
                  <Button onPress={this.sendVerifyEmail} title = 'did not get an email?'/>
                }
                <Button
                  onPress={() => this.sendResetEmail()}
                  title="reset password"
                />
                <Button
                  onPress={() => this.sendResetEmail()}
                  title="logout"
                />
            </View>
        );
    }
  }
