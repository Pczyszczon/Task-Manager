import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Icon,
  Button,
} from 'react-native-elements';
import * as styles from './styles.js';
import firebaseApp from './firebase_config';

export default class ProjectListRow extends Component {

    addUserToPending(){
        projectRef = firebaseApp.database().ref("TaskManager/Pending/");
        projectRef.push({project: this.props.item.project_name,
                        email: firebaseApp.auth().currentUser.email,
                        uid: firebaseApp.auth().currentUser.uid,});
        alert('Added to the project! Now wait for admin authorization');
    }
    render() {
            let project = (
                <Button
                onPress={() => {
                  this.addUserToPending();
                }}
                buttonStyle={styles.projectContainer}
                title = {this.props.item.project_name}
                 />
            )
            return (
                <View>
                    {project}
                </View>
            );
        }
    }
