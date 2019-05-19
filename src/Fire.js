import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
// Set the configuration for your app
const config = {
    apiKey: "AIzaSyCPexi8M8FFjmqjtoBTp3HJJiHwyk03S5M",
    authDomain: "report-manager-e3067.firebaseapp.com",
    databaseURL: "https://report-manager-e3067.firebaseio.com",
    projectId: "report-manager-e3067",
    storageBucket: "report-manager-e3067.appspot.com",
    messagingSenderId: "957180191625"
};
firebase.initializeApp(config);
export default firebase;