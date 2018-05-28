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
export default class Row extends Component {
    constructor(props) {
          super(props);
          this.state = {
              modalVisible: false,
              scrollEnabled: true,
          }
    };

    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
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
            var modalText = <Text>{this.props.item.description}</Text>
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
               title = "close"
               />
           </View>
         </View>
       </Modal>
       {message}
     </View>
            );
        }
    }
