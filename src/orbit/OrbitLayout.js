import React from 'react';
import FirebaseImage from '../FirebaseImage';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';

export default class OrbitLayout extends React.Component {
  constructor(props) {
    super(props);
    this.db = getFirestore();
    this.state = {};
  }

  selectLocation = (i) => {
    updateDoc(doc(this.db, 'users', this.props.user.uid), {
      choice: this.props.user?.choice == i ? -1 : i,
      updateTime: this.props.currentData.lastUpdateTime,
    });
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
    let w = h * 2;

    for (let i = 0; i < 5; i++) {
      const ci = i + 1;
      let selected = choice == ci;
      if (processing && !selected) {
        continue;
      }
      let x = this.props.currentData.locations['point_' + i + '_x'];
      let y = this.props.currentData.locations['point_' + i + '_y'];
      locationPoints.push(
        <button
          disabled={!hasUser}
          onClick={() => this.selectLocation(ci)}
          key={'point_' + i}
          className="locationPicker"
          style={{
            left: w * x + 'px',
            bottom: h * y + 'px',
          }}
        >
          {selected ? (
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
      );
    }

    return (
      <div className="centered">
        <div className="bigText">
          {processing
            ? choice == 0
              ? "I'm heading to another planet, thank you for helping me decide!"
              : "I'm on my way, thank you for helping me decide!"
            : 'Sensors indicate these currently viable locations. Where should I land?'}
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
            src={'planets/' + this.props.currentData.currentPlanet + '/map.png'}
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