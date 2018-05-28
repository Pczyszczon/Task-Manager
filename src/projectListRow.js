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

    addUserToSelectedProject(){
        projectRef = firebaseApp.database().ref("TaskManager/Users/" + firebaseApp.auth().currentUser.uid);
        projectRef.set({project: this.props.item.project_name});
        alert('Added to the project! Now restart the app');
    }
    render() {
            let project = (
                <Button
                onPress={() => {
                  this.addUserToSelectedProject();
                }}
                buttonStyle={styles.improvmentContainer}
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
