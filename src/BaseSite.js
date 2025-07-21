import React from 'react';
import FirebaseImage from './FirebaseImage';
import Login from './account/Login';
import SpaceLayout from './space/SpaceLayout';
import OrbitLayout from './orbit/OrbitLayout';
import GroundLayout from './ground/GroundLayout';
import Archive from './archive/Archive';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { initializeApp, getApps, getApp } from 'firebase/app';

import './style.css';

export default class BaseSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      loading: true,
      showLogin: false,
      currentData: null,
      tab: 'FEED',
    };

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

    this.db = getFirestore();
    this.lastChoice = null;
    this.voteUpdated = false;

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userUnsub = onSnapshot(doc(this.db, 'users', user.uid), (doc) => {
          let userData = doc.data();
          let thisChoice = userData.choice;
          this.voteUpdated =
            thisChoice != this.lastChoice && this.lastChoice != null;
          this.lastChoice = thisChoice;
          this.setState({
            user: { ...userData, uid: user.uid },
            loading: false,
            showLogin: false,
          });
        });
      } else {
        this.setState({ user: null, loading: false, showLogin: false });
      }
    });

    this.dataUnsub = onSnapshot(
      doc(this.db, 'currentData', 'currentData'),
      (doc) => {
        this.setState({
          currentData: doc.data(),
        });
      }
    );
  }

  render() {
    if (this.state.loading || this.state.currentData == null) {
      return null;
    }
    let user = this.state.user;
    if (
      user != null &&
      user.updateTime != this.state.currentData.lastUpdateTime
    ) {
      user.choice = -1;
    }

    let content = null;
    let voteUpdated = this.voteUpdated;
    this.voteUpdated = false;
    let tab = this.state.tab;

    if (this.state.showLogin) {
      content = <Login />;
    } else if (tab == 'ARCHIVE') {
      content = (
        <Archive
          currentData={this.state.currentData}
          userId={this.state.user == null ? '' : this.state.user.uid}
        />
      );
    } else if (tab == 'ABOUT') {
      content = (
        <div className="centered" style={{ top: '80px' }}>
          <div style={{ display: 'block', color: 'white', width: '420px' }}>
            Far Flora is a project by{' '}
            <a
              style={{ color: 'var(--light)' }}
              href="https://www.shermansplanet.com"
            >
              Loren Sherman
            </a>
            . It's a server that procedurally generates alien planets and
            plants, then renders them using open source rendering engine{' '}
            <a
              style={{ color: 'var(--light)' }}
              href="https://www.blender.org/"
            >
              Blender 3D
            </a>{' '}
            . Users can vote to decide what area gets explored next. The current
            cycle is three hours of voting, then one hour of "travel time" while
            the result is being generated and rendered (which actually only
            takes a few minutes).
            <br />
            <br />
            The planet map holds data such as humidity, temperature, altitude,
            and density of various plant types, which are then taken into
            account while rendering scenes in a specific location.
            <div style={{ margin: '10px -70px' }}>
              <FirebaseImage
                src={'media/composite.jpg'}
                height={510}
                width={570}
              />
            </div>
          </div>
        </div>
      );
    } else if (this.state.currentData.locationType == 'GROUND') {
      content = (
        <GroundLayout
          logincb={() => this.setState({ showLogin: true })}
          user={user}
          currentData={this.state.currentData}
        />
      );
    } else if (this.state.currentData.locationType == 'ORBIT') {
      content = (
        <OrbitLayout
          logincb={() => this.setState({ showLogin: true })}
          user={user}
          currentData={this.state.currentData}
        />
      );
    } else {
      content = (
        <SpaceLayout
          logincb={() => this.setState({ showLogin: true })}
          user={user}
          currentData={this.state.currentData}
        />
      );
    }

    return (
      <div>
        <div className="navbar">
          <button
            className={'tabButton ' + (tab == 'FEED' ? 'extended' : '')}
            onClick={() => this.setState({ tab: 'FEED', showLogin: false })}
          >
            Live Feed
          </button>
          <button
            className={'tabButton ' + (tab == 'ARCHIVE' ? 'extended' : '')}
            onClick={() => this.setState({ tab: 'ARCHIVE', showLogin: false })}
          >
            Archive
          </button>
          <button
            className={'tabButton ' + (tab == 'ABOUT' ? 'extended' : '')}
            onClick={() => this.setState({ tab: 'ABOUT', showLogin: false })}
          >
            About
          </button>
        </div>
        {voteUpdated ? (
          <div key={this.state.user.choice} className="announcement">
            {this.state.user.choice == -1 ? 'VOTE CANCELED' : 'VOTE REGISTERED'}
          </div>
        ) : null}
        {content}
      </div>
    );
  }
}
