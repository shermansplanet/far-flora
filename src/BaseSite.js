import React from 'react';
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
      content = <Archive currentData={this.state.currentData} />;
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
            className="tabButton"
            style={{
              paddingLeft: '8px',
              paddingRight: '5px',
              paddingBottom: '0px',
              paddingTop: '33px',
            }}
            onClick={() => window.open('https://twitter.com/FarFloraBot')}
          >
            <svg
              version="1.1"
              baseProfile="full"
              width="39"
              height="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="white"
                transform="translate(-35,-52), scale(0.15)"
                id="path5"
                d="m 453.82593,412.80619 c -6.3097,2.79897 -13.09189,4.68982 -20.20852,5.54049 7.26413,-4.35454 12.84406,-11.24992 15.47067,-19.46675 -6.79934,4.03295 -14.3293,6.96055 -22.34461,8.53841 -6.41775,-6.83879 -15.56243,-11.111 -25.68298,-11.111 -19.43159,0 -35.18696,15.75365 -35.18696,35.18525 0,2.75781 0.31128,5.44359 0.91155,8.01875 -29.24344,-1.46723 -55.16995,-15.47582 -72.52461,-36.76396 -3.02879,5.19662 -4.76443,11.24048 -4.76443,17.6891 0,12.20777 6.21194,22.97747 15.65332,29.28716 -5.76773,-0.18265 -11.19331,-1.76565 -15.93716,-4.40083 -0.004,0.14663 -0.004,0.29412 -0.004,0.44248 0,17.04767 12.12889,31.26806 28.22555,34.50266 -2.95247,0.80436 -6.06101,1.23398 -9.26989,1.23398 -2.2673,0 -4.47114,-0.22124 -6.62011,-0.63114 4.47801,13.97857 17.47214,24.15143 32.86992,24.43441 -12.04227,9.43796 -27.21366,15.06335 -43.69965,15.06335 -2.84014,0 -5.64082,-0.16722 -8.39349,-0.49223 15.57186,9.98421 34.06703,15.8094 53.93768,15.8094 64.72024,0 100.11301,-53.61524 100.11301,-100.11387 0,-1.52554 -0.0343,-3.04251 -0.10204,-4.55261 6.87394,-4.95995 12.83891,-11.15646 17.55618,-18.21305 z"
              />
            </svg>
          </button>
          <button
            className={'tabButton ' + (tab == 'ARCHIVE' ? 'extended' : '')}
            onClick={() => this.setState({ tab: 'ARCHIVE', showLogin: false })}
          >
            Archive
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
