import React, { Component } from 'react';
import{
    View,
    Text,
    StyleSheet,
    Alert,
} from 'react-native';
import firebaseApp from './firebase_config';
import * as styles from './styles.js';
import { Icon, Button } from 'react-native-elements';
import Egg from 'react-native-egg';


export default class AccDetails extends Component {

  static navigationOptions = function(props) {
    return {
      title: 'Account Details',
      headerLeft:
      <Icon
        onPress={() => props.navigation.navigate('DrawerOpen')}
        size={50}
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

    becomeWizzard(){
        adminsRef = firebaseApp.database().ref("TaskManager/Admins/" + firebaseApp.auth().currentUser.uid);
        adminsRef.set({admin: 'admin'});
        alert('You have become an admin!');
    }

    swapProject(){
        projectsRef = firebaseApp.database().ref("TaskManager/Users/" + firebaseApp.auth().currentUser.uid);
        projectsRef.remove();
        alert('You have removed yourself from current project! Go back to main screen to watch another');
    }

    render(){
        return(
            <View style={styles.container}>
                <Egg
                    setps={'TTTU'}
                    onCatch={() => {
                        this.becomeWizzard();
                }}
                >
                <Text style={styles.instructions}>
                  Logged in as
                  {"\n"}{firebaseApp.auth().currentUser.email}
                </Text>
                </Egg>
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
                  <Button onPress={this.sendVerifyEmail}
                  buttonStyle ={styles.mainButtons}
                  title = 'did not get an email?'/>
                }
                <Button
                  onPress={() => this.sendResetEmail()}
                  title="reset password"
                  buttonStyle ={styles.mainButtons}
                />
                <Button
                  onPress = {this.swapProject.bind(this)}
                  title="Swap Project"
                  buttonStyle ={styles.mainButtons}
                />
                <Button
                  onPress={() => this.handleLogOut()}
                  title="logout"
                  buttonStyle ={styles.mainButtons}
                />
            </View>
        );
    }
  }
