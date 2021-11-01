import React from 'react';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default class FirebaseImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      magnified: false,
    };
    getDownloadURL(ref(getStorage(), props.src)).then((url) =>
      this.setState({ src: url })
    );
  }

  render() {
    let src = this.state.src;
    let content = (
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
    if (this.props.magnified == undefined) return content;
    return (
      <button
        className="imageButton"
        style={{
          cursor: this.state.magnified ? 'zoom-out' : 'zoom-in',
        }}
        onClick={() => this.setState({ magnified: !this.state.magnified })}
      >
        {content}
        {this.state.magnified ? (
          <div className="magnifiedImage">
            <FirebaseImage
              src={this.props.magnified}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        ) : null}
      </button>
    );
  }
}
