What if we could write all our application code as synchronous, static functions? What would that look like? What would tests look like? Before we think about this, what is the *easiest* possible way we could make an http request?

something like

```js
var state = {
    err: null,
    data: null
    resolving: false,
}

xhr('example.com', { json: true }, function (err, response, body) {
    state.resolving = true

    if (err) {
        state.err = err
    } else if (response.statusCode !== 200) {
        state.err = body
    } else {
        state.data = body
    }

    state.resolving = false

    render(domElement, state)
})
```





