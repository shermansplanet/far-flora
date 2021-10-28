import React from 'react';
import Login from './account/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default class BaseSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uid: null };

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ uid: user.uid });
      } else {
      }
    });
  }

  render() {
    return <Login />;
  }
}
