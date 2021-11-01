import React from 'react';
import Login from './account/Login';
import SpaceLayout from './space/SpaceLayout';
import OrbitLayout from './orbit/OrbitLayout';
import GroundLayout from './ground/GroundLayout';
import Archive from './archive/Archive';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';

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
    this.db = getFirestore();

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userUnsub = onSnapshot(doc(this.db, 'users', user.uid), (doc) => {
          this.setState({
            user: { ...doc.data(), uid: user.uid },
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

    let tab = this.state.tab;

    if (this.state.showLogin) {
      content = <Login />;
    } else if (tab == 'ARCHIVE') {
      content = <Archive />;
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
        </div>
        {content}
      </div>
    );
  }
}
