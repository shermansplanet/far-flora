import React from 'react';
export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: Date.now() };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    let seconds = Math.round(this.state.time / 1000);
    const secondsPerHour = 60 * 60;
    let hour = Math.floor(seconds / secondsPerHour);
    let last = this.props.currentData.lastUpdateTime;
    let shouldBeProcessing = hour == last;

    if (last > 1000000000) {
      return (
        <div
          className="countdown"
          style={{ flexDirection: 'column', alignItems: 'center' }}
        >
          <div>CURRENTLY IN MANUAL MODE</div>
          <div style={{ fontSize: '14pt' }}>
            (I can't predict when the next update will be)
          </div>
        </div>
      );
    }

    if (shouldBeProcessing != this.props.currentData.processing) {
      return (
        <div className="countdown">
          <div className="loader" />
        </div>
      );
    }

    if (shouldBeProcessing) {
      seconds = (last + 1) * 60 * 60 - seconds;
    } else {
      seconds = (last + 4) * 60 * 60 - seconds;
    }

    let hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);

    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return (
      <div className="countdown">
        {shouldBeProcessing ? 'NEXT UPDATE IN' : 'VOTING ENDS IN'}
        <b
          style={{
            color: 'white',
            marginLeft: '12px',
          }}
        >
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:
          {String(seconds).padStart(2, '0')}
        </b>
      </div>
    );
  }
}
