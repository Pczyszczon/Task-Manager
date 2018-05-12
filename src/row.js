import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import * as styles from './styles.js';
export default class Row extends Component {

  render() {
    return (
      <View style={styles.rowContainer}>
        <Text>{this.props.item.task}</Text>
      </View>
    );
  }
}
