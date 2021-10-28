import React from 'react';
import './style.css';
import PlanetButton from './space/PlanetButton';
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
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
      }}
    >
      <div style={{ flexDirection: 'column' }}>
        <div>
          <PlanetButton index={0} />
          <PlanetButton index={1} />
          <PlanetButton index={2} />
        </div>
        <div>
          <PlanetButton index={3} />
          <PlanetButton index={4} />
          <PlanetButton index={5} />
        </div>
      </div>
    </div>
  );
}
