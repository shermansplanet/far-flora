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
    let h = '300px';
    return (
      <div>
        <FirebaseImage
          src={'planets/temp/planet_' + this.props.index + '.png'}
          height={h}
        />
        <div
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          style={{
            opacity: this.state.hover ? 1 : 0,
            width: h,
            height: h,
            border: '2px solid white',
            marginLeft: '-' + h,
            borderRadius: '100%',
            transform: 'scale(0.87)',
            cursor: 'pointer',
          }}
        />
      </div>
    );
  }
}
