import React from 'react';
import './style.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBtJKxBqyLefYsVKIqOb-ln96cNQXW00vA',
  authDomain: 'star-yonder.firebaseapp.com',
  projectId: 'star-yonder',
});

const db = getFirestore();

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
