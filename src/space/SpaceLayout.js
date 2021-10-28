import React from 'react';
import PlanetButton from './PlanetButton';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';

export default class SpaceLayout extends React.Component {
  constructor(props) {
    super(props);
    this.db = getFirestore();
    this.state = {};
  }

  selectPlanet = (i) => {
    updateDoc(doc(this.db, 'users', this.props.user.uid), {
      choice: this.props.user?.choice == i ? -1 : i,
      updateTime: this.props.currentData.lastUpdateTime,
    });
  };

  render() {
    let hasUser = this.props.user != null;
    let choice = hasUser ? this.props.user.choice : -1;
    return (
      <div className="centered">
        <div className="bigText">Which planet should I visit next?</div>
        {hasUser ? null : (
          <button
            onClick={this.props.logincb}
            className="smallButton"
            style={{ marginBottom: '24px' }}
          >
            Log in or sign up to help me decide!
          </button>
        )}
        <div style={{ flexDirection: 'column' }}>
          <div>
            <PlanetButton
              index={0}
              hasUser={hasUser}
              selected={choice == 0}
              onClick={() => this.selectPlanet(0)}
            />
            <PlanetButton
              index={1}
              hasUser={hasUser}
              selected={choice == 1}
              onClick={() => this.selectPlanet(1)}
            />
            <PlanetButton
              index={2}
              hasUser={hasUser}
              selected={choice == 2}
              onClick={() => this.selectPlanet(2)}
            />
          </div>
          <div>
            <PlanetButton
              index={3}
              hasUser={hasUser}
              selected={choice == 3}
              onClick={() => this.selectPlanet(3)}
            />
            <PlanetButton
              index={4}
              hasUser={hasUser}
              selected={choice == 4}
              onClick={() => this.selectPlanet(4)}
            />
            <PlanetButton
              index={5}
              hasUser={hasUser}
              selected={choice == 5}
              onClick={() => this.selectPlanet(5)}
            />
          </div>
        </div>
      </div>
    );
  }
}
