import React from 'react';
import FirebaseImage from '../FirebaseImage';

export default class FirebaseImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  render() {
    return (
      <div
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <FirebaseImage
          src={'planets/temp/planet_' + this.props.index + '.png'}
          height={300}
        />
      </div>
    );
  }
}
