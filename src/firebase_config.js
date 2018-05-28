import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC84YVjBuQaa_l4ziTcl2AfBqxlTpMC1SY",
  authDomain: "taskmanager-59662.firebaseapp.com",
  databaseURL: "https://taskmanager-59662.firebaseio.com",
  projectId: "taskmanager-59662",
  storageBucket: "taskmanager-59662.appspot.com",
  messagingSenderId: "556683933070"
};
var firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
