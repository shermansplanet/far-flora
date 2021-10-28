import React from 'react';
import Login from './account/Login';
import SpaceLayout from './space/SpaceLayout';
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
    if (this.state.showLogin) {
      return <Login />;
    }
    return (
      <SpaceLayout
        logincb={() => this.setState({ showLogin: true })}
        user={this.state.user}
        currentData={this.state.currentData}
      />
    );
  }
}
