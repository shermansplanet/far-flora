import React from 'react';
import FirebaseImage from '../FirebaseImage';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';

export default class GroundLayout extends React.Component {
  constructor(props) {
    super(props);
    this.db = getFirestore();
    this.state = {};
  }

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

    return (
      <div className="centered">
        <div className="bigText">
          {processing
            ? choice == 0
              ? "I'm heading back to orbit, thank you for helping me decide!"
              : "I'm exploring this area further, thank you for helping me decide!"
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
        <div style={{ position: 'relative' }}>
          <FirebaseImage
            src={
              'locations/' + this.props.currentData.currentLocation + '/0.png'
            }
            height={h}
            width={w}
            style={{ borderRadius: '10px' }}
          />
          {locationPoints}
        </div>
        {processing ? null : (
          <div style={{ alignItems: 'center', margin: '8px' }}>
            <button
              disabled={!hasUser}
              onClick={() => this.selectLocation(0)}
              className="locationPicker"
              style={{ position: 'static', margin: '4px' }}
            >
              {choice == 0 ? (
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
            <div className="buttonLabel">Leave Planet</div>
          </div>
        )}
      </div>
    );
  }
}
