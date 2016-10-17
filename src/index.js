import React from 'react';


class EventSourceHOC extends React.Component {

  state = {
    events: []
  }

  componentDidMount() {
    // connect to the EventSource
    this.source = new EventSource(this.props.url);
    const cb = message => {
      this.setState(prevState => {
        let newEvents = prevState.events.concat(message.data)
        return {
          events: newEvents
        }
      });
    };
    this.props.types.forEach(type => {
      this.source.addEventListener(type, cb, false);
    });
    this.source.onerror = function (e) {
      console.log('EventSource::onerror: ', e);
    };
  }
  componentWillUnmount() {
    this.source.close();
  }
  render() {
    return <div>{ this.props.children(this.state.events) }</div>
  }
}

EventSource.propTypes = {
  url: React.PropTypes.string.isRequired,
  types: React.PropTypes.array,
  children: React.PropTypes.func.isRequired
};

EventSource.defaultProps = {
  types: ['message']
};

export default EventSourceHOC;
