import React from "react";
import { render } from "react-dom";
import GithubCorner from "react-github-corner";

import ReactEventSource from "../../src";

const Entry = ({ title = "BTC value", value }) => (
  <div>
    {title} : {value}
  </div>
);

const BTCVolume = () => {
  return (
    <ReactEventSource url="https://stream.wikimedia.org/v2/stream/recentchange">
      {events => {
        events.reverse();
        return (
          <div>
            <p>
              <b>{events.length} events</b>
            </p>
            {events.map((e, i) => {
              const data = JSON.parse(e);
              return <div key={i}>{data.user}</div>;
            })}
          </div>
        );
      }}
    </ReactEventSource>
  );
};

const Demo = () => {
  const style = {
    padding: 20
  };
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
      <div style={style}>
        <h3>Real-time wikipedia changes</h3>
        <p>This example use https://wikitech.wikimedia.org/wiki/EventStreams</p>
        <p>What a while...</p>
        <p>
          See this example code on{" "}
          <a href="https://github.com/revolunet/react-eventsource/blob/master/demo/src/index.js">
            github
          </a>
        </p>
        <BTCVolume />
      </div>
    </div>
  );
};

render(<Demo />, document.getElementById("demo"));
