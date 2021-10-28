import React from 'react';
import './style.css';
import BaseSite from './BaseSite';

import { initializeApp, getApps, getApp } from 'firebase/app';

const config = {
  apiKey: 'AIzaSyBtJKxBqyLefYsVKIqOb-ln96cNQXW00vA',
  authDomain: 'star-yonder.firebaseapp.com',
  projectId: 'star-yonder',
  storageBucket: 'star-yonder.appspot.com',
  appId: '1:49221249776:web:af2643a88fe41335e7f035',
};

let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(config);
} else {
  firebaseApp = getApp();
}

export default function App() {
  return <BaseSite />;
}
