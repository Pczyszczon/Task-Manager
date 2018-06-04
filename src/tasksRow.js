import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {
  Icon,
  Button,
} from 'react-native-elements';
import * as styles from './styles.js';
import firebaseApp from './firebase_config';

export default class Row extends Component {
    constructor(props) {
          super(props);
          this.userRef = firebaseApp.database().ref("TaskManager/Users/" + firebaseApp.auth().currentUser.uid);
          this.state = {
              modalVisible: false,
              scrollEnabled: true,
              project: null,
          }
    };

    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }

    removeTask() {
        if (firebaseApp.auth().currentUser.email == this.props.item.email){
            this.userRef.once("value", snapshot => {
              if(snapshot.val() !== null){
                this.setState({project: snapshot.val().project})
                tasksRef = firebaseApp.database().ref("TaskManager/Projects/" + this.state.project + "/" + this.props.item.key);
                tasksRef.remove();
                alert(tasksRef);
                this.closeModal();
           }
          });
        }
        else {
            alert('You are not author of a task!')
        }
    }


    render() {
            var bug = (
                <Button
                icon={
                    <Icon
                    type='material-community'
                    name='wrench'
                    color='white'
                />
                }
                iconRight
                onPress={() => {
                  this.openModal();
                }}
                buttonStyle={styles.bugContainer}
                 title = {this.props.item.title}
                 />
            )
            var task = (
                <Button
                icon={
                    <Icon
                    type='material-community'
                    name='auto-fix'
                    color='white'
                />
            }
            iconRight
                onPress={() => {
                  this.openModal();
                }}
                buttonStyle={styles.taskContainer}
                title = {this.props.item.title}
                 />
            )
            var improvment = (
                <Button
                icon={
                    <Icon
                    type='material-community'
                    name='lightbulb-on'
                    color='white'
                />
            }
            iconRight
                onPress={() => {
                  this.openModal();
                }}
                buttonStyle={styles.improvmentContainer}
                title = {this.props.item.title}
                 />
            )
            var message;
            if(this.props.item.bug){
                message = bug;
            }
            else if(this.props.item.task){
                message = task;
            }
            else if(this.props.item.improvment){
                message = improvment;
            }
            else {
                message = <Text>{this.props.item.title}</Text>
            }
            var modalText = <Text style = {styles.modalText}>{this.props.item.description}</Text>
            return (
                <View>
                   <Modal
                     transparent={true}
                     visible={this.state.modalVisible}
                    >
                    <View style={styles.modal}>
                <View>
                    {modalText}
                <Button
               onPress={() => {
                 this.closeModal();
               }}
               buttonStyle={styles.modalButtons}
               title = "close"
               />
               <Button
              onPress={() => {
                this.removeTask();
              }}
              buttonStyle={styles.modalButtons}
              title = "delete"
              />
           </View>
         </View>
       </Modal>
       {message}
     </View>
            );
        }
    }
