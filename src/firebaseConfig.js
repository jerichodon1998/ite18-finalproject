// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBnj3OICs76WiGdsK_HEH3_dy5V5dxOYOE",
	authDomain: "todolistapp-e1511.firebaseapp.com",
	databaseURL: "https://todolistapp-e1511-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "todolistapp-e1511",
	storageBucket: "todolistapp-e1511.appspot.com",
	messagingSenderId: "1019390814893",
	appId: "1:1019390814893:web:b8b99abf037409edf07424",
	measurementId: "G-4NHT8TW3J1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
