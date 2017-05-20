var S = require('pull-stream')
var r = require('ramda')
var xtend = require('xtend')
var Ev = require('message-util')
S.catch = require('pull-catch')
S.async = require('pull-async')
S.cat = require('pull-cat')
S.either = function (onErr, onData) {
    return S(
        S.catch(onErr),
        S.map(onData)
    )
}

// echo
var asyncCall = r.curry(function asyncCall (data, cb) {
    cb(null, data)
})

var init = {
    data: {},
    request: {
        resolving: []
    },
    errors: []
}

var update = {
    data: {
        add: function (state, ev) {
            var d = {}
            d[ev.id] = ev
            return xtend(state, d)
        }
    },

    request: {
        start: function (state, ev) {
            return state.resolving.concat([ev])
        },
        resolve: function (state, ev) {
            var el = state.resolving.find(r.whereEq(ev))
            return r.dissocPath(state.resolving.indexOf(el), state)
        }
    },

    errors: {
        push: function (state, ev) {
            return state.concat([ev])
        },
        shift: function (state, ev) {
            return state.slice(1)
        }
    }
}

effects: {
    getThings: function (state, ev) {
        return S(
            http(
                r.compose(S.once, Ev('error'), Ev('push')),
                r.compose(S.once, Ev('data'), Ev('add'))
            )
        )
    }
}








// http call
function request (key, onErr, onData, fn) {
    return S(
        S.async(fn),
        S.either(
            function onErr (err) { return S.once(msg.errors.push(err)) },
            function onOk (data) { return S.once(msg.data[key](data) }
        )
    )
}

var onData = compose( S.once, Ev('add') )

S(
    async(continuable),
    either(onErr, onData),
)

S(
    http(
        function (err) { return S.once(msg.errors.push(err)) },
        function (resp) { return S.once(msg.data.add(resp)) },
        function foo (cb) { cb(null, { data: 'data' }) }
    ),
    sandwich(S.once(Ev('start', null)), S.once(Ev('resolve', null))),
    join()
)

function sandwich (pre, post) {
    return S.map(function (stream) {
        return S.cat([
            pre,
            stream,
            post
        ])
    })
}




var update = {
    add: function (state, ev) {},
    request: request.update,
    errors: errors.update
}

var msgs = Msgs(update)

map(function (ev) {
    return msg.request.start({ op: 'add' })
})

msgs.errors.push('myerr')  // => ['errors', ['push', 'myerr']]

var state = State.fromTree(update)

// app
S(
    withLatest(state.listen(), input),
    S.map(effects()),
    join(),
    // state
    scan(function (state, ev) {
        return call(state, ev.data, find(update, ev))
    }, init)
)


app({
    effects: {
        foo: function (state, actions, ev) {
            actions.request.start()
            api.bar({}, function onResp (err, data) {
                if (err) {
                    actions.errors.push(err)
                    return actions.request.resolve()
                }
                actions.bar(data)
                actions.request.resolve()
            })
        }
    },

    update: {
        bar: function (state, ev) {},
        request: Request.update,
        errors: Errors.update
    }
})

// => { actions: {}, onChange: fn }






