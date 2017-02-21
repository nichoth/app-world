## some terminology

A stream contains events. 

Events are objects with a key and a value.

Effects is a map from events to events or streams. It gets called with the current state of the store. If an effect does something synchronous an it returns an event, if does something async it returns a stream.

A store is like a reduce function for a stream. A store operates on a single stream.

A bus is a collection of streams (a hash whos values are streams).

A view is a duplux stream/bus that renders to the DOM when it is written to.



