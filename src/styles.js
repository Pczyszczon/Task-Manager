import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center'
  },

  instructions: {
    textAlign: 'center',
    marginTop: 10,
  },

  input: {
    height: 40,
    paddingLeft: 10,
    marginBottom: 10,
  },

  container: {
    paddingLeft: 20,
    paddingTop: 30,
    paddingRight: 20,
    backgroundColor: "#fff",
    flex: 1
  },

  rowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },

  viewStyle: {
    flex: 1,
  },

});

module.exports = styles;
