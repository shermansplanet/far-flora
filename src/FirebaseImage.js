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
      <img src={src} height={this.props.height} style={this.props.style} />
    );
  }
}
