import React from 'react'
import {render} from 'react-dom'
import GithubCorner from 'react-github-corner';

import ReactEventSource from '../../src';

const Entry = ({ title = 'BTC value', value }) => <div>{ title } : { value }</div>;

const BTCVolume = () => {
  return (
    <ReactEventSource types={ ['data', 'patch'] } url="https://proxy.streamdata.io/https://api.bitcoinaverage.com/ticker/global/EUR/">
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
  </ReactEventSource>
  );
};

const Demo = () => {
  const style = {
    padding: 20
  }
  return (
    <div>
      <GithubCorner
        href={`https://github.com/revolunet/react-eventsource`}
        bannerColor="#000"
        octoColor="#fff"
        width={80}
        height={80}
        direction="right"
      />
      <div style={ style }>
        <h3>Real-time BTC value using an EventSource</h3>
        <p>This example use <a href="https://api.bitcoinaverage.com/ticker/global/EUR">api.bitcoinaverage.com</a> with <a href="http://streamdata.io">streamdata.io</a> for proxying</p>
        <p>Wait a while to see the updates</p>
        <p>See this example code on <a href="https://github.com/revolunet/react-eventsource/blob/master/demo/src/index.js">github</a></p>
        <BTCVolume />
      </div>
    </div>
  )
}


render(<Demo/>, document.getElementById('demo'));
