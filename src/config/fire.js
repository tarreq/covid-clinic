import firebase from "firebase"

const config = {
    apiKey: "AIzaSyCeuNcKxXF0jQUQMF5SmsdfnhCkuTW7024",
    authDomain: "covid-clinic-eea6c.firebaseapp.com",
    databaseURL: "https://covid-clinic-eea6c.firebaseio.com",
    projectId: "covid-clinic-eea6c",
    storageBucket: "covid-clinic-eea6c.appspot.com",
    messagingSenderId: "1026274169202",
    appId: "1:1026274169202:web:0c6863e5792ee823958deb"
  }

  const fire = firebase.initializeApp(config)
  export default fire