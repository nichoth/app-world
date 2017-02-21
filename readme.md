## some terminology

A stream contains events. 

Events are objects with a key and a value.

Effects is a map from events to events, and it gets called with the current state of the store.

A store is like a reduce function for a stream. A store operates on a single stream.

A bus is a collection of streams (a hash whos values are streams).


