import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyATTCFUPPoa-G5sZtQlrn_jN5mu6cRNPwQ",
    authDomain: "excelify-390ab.firebaseapp.com",
    databaseURL: "https://excelify-390ab.firebaseio.com",
    projectId: "excelify-390ab",
    storageBucket: "",
    messagingSenderId: "610784612531"
};
firebase.initializeApp(config);

const database = firebase.database();

export { database, firebase as default };