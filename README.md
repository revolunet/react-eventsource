# react-eventsource

> Connect your react components to any [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)

## Usage

```js
import ReactEventSource from 'react-eventsource'

const renderEvent = event => <div>{ event }</div>

<ReactEventSource
  url="https://proxy.streamdata.io/https://api.bitcoinaverage.com/ticker/global/EUR/"
  onEventSourceError={console.log}
>
    { events => events.map(renderEvent) }
</ReactEventSource>
```

By default, `ReactEventSource` will listen to `message` events.

If you use custom message types, you can specify them using `types={['data', 'patch']}`

You can pass your own `EventSource` using source prop `source={new EventSource(url)}`,

See working demo with Live Bitcoin value update : http://revolunet.github.io/react-eventsource/#/demo

## Dev

This project use [nwb](https://github.com/insin/nwb)


## License

*react-eventsource* is available under MIT. See LICENSE for more details.

