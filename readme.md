# trying things with streams

Let's make applications in javascript with functional patterns


---------------------------------------

Our application has many *domain models* -- state machines that reflect persisted state and are re-used in many views in the app. These are distinct from app state, which is ephemeral and specific to a view.

We want tests that tell us if anything breaks. If someone changes an event that is emitted by a view, does that break the application? What about if someone changes a model's state and breaks the view, will our tests catch that?





## some terminology

A stream contains application events or other streams. 

Events are objects with a key and a value.

Effects are a map from events to streams. They get called with the current state of the store. If an effect does something synchronous it returns an event, if does something async it returns a stream.

A view is a duplux stream that renders to the DOM when it is written to, and emits events from dom interactions.



---------------------------------



Our state is a tree. Nodes become less generic as they get closer to the root of the tree. 

    a
 /     \
b       c

Here a would be the view state specific to our app. `b` and `c` might be domain models -- state that is re-used across the app.

