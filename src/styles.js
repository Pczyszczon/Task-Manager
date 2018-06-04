import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "#D6D5C9",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center'
  },

  instructions: {
    textAlign: 'center',
    marginTop: 10,
    color: "#D6D5C9",
  },

  input: {
    height: 40,
    paddingLeft: 10,
    marginBottom: 10,
    color: "#B9BAA3",
    textAlign: "center",
  },

  container: {
    paddingLeft: 20,
    paddingTop: 30,
    paddingRight: 20,
    backgroundColor: "#902923",
    flex: 1
  },

  rowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
  },

  bugContainer: {
        backgroundColor: "#c43833",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
        marginTop: 5,
  },

  taskContainer: {
        backgroundColor: "#379634",
        borderWidth: 0,
        borderRadius: 5,
        marginTop: 5,
  },

  improvmentContainer: {
        backgroundColor: "#00B9AE",
        borderWidth: 0,
        borderRadius: 5,
        marginTop: 5,
  },

  projectContainer: {
        backgroundColor: "#d67932",
        borderWidth: 0,
        borderRadius: 5,
        marginTop: 5,
  },

  mainButtons: {
      backgroundColor: "#679289",
      marginTop: 5,
  },

  modalButtons: {
      backgroundColor: "#679289",
      marginTop: 10,
      alignItems: 'flex-end',
  },

  viewStyle: {
    flex: 1,
  },

  drawerIcon: {
  color: "#B9BAA3"
    },

modal: {
    flex: 0.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    top: Dimensions.get('window').height * 0.25,
    backgroundColor: '#869799',
    flexDirection: 'column',
    justifyContent: 'space-between',
},

    modalText: {
        fontSize: 30,
    },

});

module.exports = styles;
