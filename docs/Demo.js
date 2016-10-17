import React from 'react';

import EventSource from '../src';


const Entry = ({ title = 'BTC value', value }) => <div>{ title } : { value }</div>;

const BTCVolume = () => {
  return (<EventSource types={ ['data', 'patch'] } url="https://proxy.streamdata.io/https://api.bitcoinaverage.com/ticker/global/EUR/">
    { events => {
      if (!events.length) {
        return <div />
      }
      // due to the streamdata.io API, we need to display differently based on received events (patch structure !== data structure)
      return (<div>
        { events.map((event, i) => {
          const data = JSON.parse(event);
          if (data.last) {
            return <Entry key={ i } value={ data.last } />;
          } else if (Array.isArray(data)) {
            return data.map((last, j) => {
              if (last.path === '/last') {
                return <Entry key={ i + ' ' + j } value={ last.value } />;
              } else if (last.path === '/bid') {
                return <Entry title="Last Bid" key={ i + ' ' + j } value={ last.value } />;
              } else if (last.path === '/ask') {
                return <Entry title="Last Ask" key={ i + ' ' + j } value={ last.value } />;
              }
            })
          } else {
            return null;
          }
        }) }
      </div>);
    } }
  </EventSource>);
};

const Demo = () => {
  const style = {
    padding: 20
  }
  return (<div style={ style }>
            <h3>Real-time BTC value</h3>
            <p>This example use <a href="https://api.bitcoinaverage.com/ticker/global/EUR">api.bitcoinaverage.com</a> with <a href="http://streamdata.io">streamdata.io</a> for proxying</p>
            <p>You could use any ServerEvent source in this component. Wait a while to see the updates</p>
            <p>See this example code on <a href="https://github.com/revolunet/react-eventsource/tree/docs/Demo.js">github</a></p>
            <BTCVolume />
          </div>)
}
export default Demo;
