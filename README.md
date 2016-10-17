# react-eventsource

> Connect your react components to any [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)

## Usage

```js
const renderEvent = event => <div>{ event }</div>

<EventSource url="https://proxy.streamdata.io/https://api.bitcoinaverage.com/ticker/global/EUR/">
    { events => events.map(renderEvent) }
</EventSource>
```

By default, EventSource will listen to `message` events.

If you use custom message types, you can specify them using `types={['data', 'patch']}`

See working demo with Live Bitcoin value update : http://revolunet.github.io/react-eventsource/#/demo

## Dev

This project use [react-component-boilerplate](http://github.com/survivejs/react-component-boilerplate)


## License

*react-eventsource* is available under MIT. See LICENSE for more details.

