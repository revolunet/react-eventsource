# react-eventsource

> Connect your react components to any [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)

## Usage

```js
const renderEvent = event => <div>{ event }</div>

<EventSource
	url="https://proxy.streamdata.io/https://api.bitcoinaverage.com/ticker/global/EUR/"
	onEventSourceError={console.log}
>
    { events => events.map(renderEvent) }
</EventSource>
```

By default, EventSource will listen to `message` events.

If you use custom message types, you can specify them using `types={['data', 'patch']}`

You can pass your own `EventSource` using source prop `source={new EventSource(url)}`, 
If using your own EventSource you can import module as EventSourceReactComponent instead of EventSource
```
import EventSourceReactComponent from 'react-eventsource'; // ES6
const EventSourceReactComponent = require('react-eventsource');	// ES5 with npm
```

See working demo with Live Bitcoin value update : http://revolunet.github.io/react-eventsource/#/demo

## Dev

This project use [react-component-boilerplate](http://github.com/survivejs/react-component-boilerplate)


## License

*react-eventsource* is available under MIT. See LICENSE for more details.

