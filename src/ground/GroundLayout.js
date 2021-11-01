import React from 'react';
import FirebaseImage from '../FirebaseImage';
import Countdown from '../Countdown';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';

export default class GroundLayout extends React.Component {
  constructor(props) {
    super(props);
    this.db = getFirestore();
    this.state = {};
  }

  selectOption = (i) => {
    updateDoc(doc(this.db, 'users', this.props.user.uid), {
      choice: this.props.user?.choice == i ? -1 : i,
      updateTime: this.props.currentData.lastUpdateTime,
    });
  };

  renderOption = (text, i, hasUser, choice) => {
    return (
      <div style={{ alignItems: 'center', margin: '8px 20px' }}>
        <button
          disabled={!hasUser}
          onClick={() => this.selectOption(i)}
          className="locationPicker"
          style={{ position: 'static', margin: '4px' }}
        >
          {choice == i ? (
            <div
              style={{
                width: '10px',
                height: '10px',
                background: 'white',
                marginLeft: '5px',
                borderRadius: '100%',
              }}
            />
          ) : null}
        </button>
        <div className="buttonLabel">{text}</div>
      </div>
    );
  };

  render() {
    let hasUser = this.props.user != null;
    let processing = this.props.currentData.processing;
    let choice = processing
      ? this.props.currentData.choice
      : hasUser
      ? this.props.user.choice
      : -1;

    let locationPoints = [];

    let h = 600;
    let w = (h * 16) / 9;

    let imIndex = this.props.currentData.currentImageIndex;

    return (
      <div className="centered" key={'image_' + imIndex}>
        <div className="bigText">
          {processing
            ? (choice == 0
                ? "I'm exploring this area further,"
                : choice == 1
                ? "I'm heading back to orbit,"
                : "I'm heading to another planet,") +
              ' thank you for helping me decide!'
            : "Here's what I'm seeing! Should I keep exploring here?"}
        </div>
        {hasUser ? null : (
          <button
            onClick={this.props.logincb}
            className="smallButton"
            style={{ marginBottom: '24px' }}
          >
            {processing
              ? 'Log in or sign up to help guide my journey.'
              : 'Log in or sign up to help me decide!'}
          </button>
        )}
        <FirebaseImage
          src={
            'locations/' +
            this.props.currentData.currentLocation +
            '/' +
            imIndex +
            '.png'
          }
          height={h}
          width={w}
          style={{ borderRadius: '10px' }}
        />
        {processing ? null : (
          <div style={{ flexDirection: 'row' }}>
            {this.renderOption('Keep Exploring', 0, hasUser, choice)}
            {this.renderOption('Return to Orbit', 1, hasUser, choice)}
            {this.renderOption('Leave Planet', 2, hasUser, choice)}
          </div>
        )}
        <Countdown />
      </div>
    );
  }
}
