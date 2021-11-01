import React from 'react';
import FirebaseImage from '../FirebaseImage';

export default class PlanetButton extends React.Component {
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
          width={h}
        />
        {(this.props.hasUser && !this.props.processing) ||
        (this.props.selected && this.props.processing) ? (
          <button
            onClick={
              !this.props.processing && this.props.hasUser
                ? this.props.onClick
                : () => {}
            }
            onMouseEnter={() => this.setState({ hover: true })}
            onMouseLeave={() => this.setState({ hover: false })}
            className="planetButton"
            style={{
              width: h,
              height: h,
              marginLeft: '-' + h,
              opacity: this.state.hover || this.props.selected ? 1 : 0,
              boxShadow: this.props.selected
                ? '0 0 10px white, 0 0 80px #fff4'
                : 'none',
              cursor: this.props.processing ? 'inherit' : 'pointer',
            }}
          >
            <div
              style={{
                backgroundColor: 'black',
                display: 'inline',
                padding: '8px 12px',
                fontSize: '14pt',
                fontFamily: "'Share Tech Mono', monospace",
              }}
            >
              {this.props.processing
                ? 'DESTINATION'
                : this.props.selected
                ? this.state.hover
                  ? 'CANCEL'
                  : 'CURRENT VOTE'
                : 'VOTE'}
            </div>
          </button>
        ) : null}
      </div>
    );
  }
}
