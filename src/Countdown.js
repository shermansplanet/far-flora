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
    const secondsPerInterval = 60 * 60 * 4;
    let next = Math.ceil(seconds / secondsPerInterval) * secondsPerInterval;
    seconds = next - 60 * 60 - seconds;

    let shouldBeProcessing = seconds <= 0;
    if (shouldBeProcessing) {
      seconds -= 60 * 60 * 2;
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
