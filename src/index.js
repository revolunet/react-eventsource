import React from 'react';
import PropTypes from 'prop-types';
import propIsRequiredIf from 'react-proptype-conditional-require';

class EventSourceHOC extends React.Component {

  state = {
    events: []
  }

  componentDidMount() {
    // connect to the EventSource
    this.source = this.props.source ? this.props.source : new EventSource(this.props.url);
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
    if (this.props.onEventSourceError) {
      this.source.onerror = this.props.onEventSourceError;
    }
  }
  componentWillUnmount() {
    this.source.close();
  }
  render() {
    return <div>{ this.props.children(this.state.events) }</div>
  }
}

EventSourceHOC.propTypes = {
  url: propIsRequiredIf(PropTypes.string, props => !props.hasOwnProperty('source')),
  source: propIsRequiredIf(PropTypes.object, props => !props.hasOwnProperty('url')),
  onEventSourceError: PropTypes.func,
  types: PropTypes.array,
  children: PropTypes.func.isRequired
};

EventSourceHOC.defaultProps = {
  types: ['message']
};

export default EventSourceHOC;
