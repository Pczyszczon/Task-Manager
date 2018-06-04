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

export default class PendingListRow extends Component {

    addUser(){
        projectRef = firebaseApp.database().ref("TaskManager/Users/" + this.props.item.uid);
        projectRef.set({project: this.props.item.project_name});
        alert('User request accepted');
        pendingRef = firebaseApp.database().ref("TaskManager/Pending/" + this.props.item.key);
        pendingRef.remove();
    }
    render() {

            var who = this.props.item.email + ": " + this.props.item.project_name
            let project = (
                <Button
                onPress={() => {
                  this.addUser();
                }}
                buttonStyle={styles.projectContainer}
                title = {who}
                 />
            )
            return (
                <View>
                    {project}
                </View>
            );
        }
    }
