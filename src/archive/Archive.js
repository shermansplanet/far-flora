import React from 'react';
import FirebaseImage from '../FirebaseImage';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';

export default class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.db = getFirestore();
    this.state = {};
  }

  render() {
    return null;
  }
}
