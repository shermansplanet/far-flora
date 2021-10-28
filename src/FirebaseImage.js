import React from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default class FirebaseImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
    };
    getDownloadURL(ref(getStorage(), props.src)).then((url) =>
      this.setState({ src: url })
    );
  }

  render() {
    let src = this.state.src;
    return (
      <div
        style={{
          height: this.props.height + 'px',
          width: this.props.width + 'px',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="loader" />
        <img
          src={src}
          height={this.props.height}
          width={this.props.width}
          style={this.props.style}
        />
      </div>
    );
  }
}
