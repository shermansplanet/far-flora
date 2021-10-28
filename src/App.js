import React from 'react';
import './style.css';
import FirebaseImage from './FirebaseImage';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBtJKxBqyLefYsVKIqOb-ln96cNQXW00vA',
  authDomain: 'star-yonder.firebaseapp.com',
  projectId: 'star-yonder',
  storageBucket: 'star-yonder.appspot.com',
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(config);
} else {
  firebaseApp = getApp();
}

const db = getFirestore();

export default function App() {
  return <FirebaseImage src="planets/temp/planet_0.png" />;
}
