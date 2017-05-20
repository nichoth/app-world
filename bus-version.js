var Bus = require('nanobus')
var r = require('ramda')

var asyncCall = r.curry(function asyncCall (data, cb) {
    process.nextTick(function () {
        // echo
        cb(null, data)
    })
})

function Request (key, fn) {
    var bus = Bus()

    function request (data) {
        process.nextTick(function () {
            bus.emit('start', { op: key, args: data })
        })

        fn(data, function onResponse (err, res) {
            bus.emit('resolve', { op: key, args: data })
            if (err) return bus.emit('error', err)
            bus.emit(key, res)
            bus.removeAllListeners()
        })
        return request
    }

    request.applyTo = function (obj) {
        bus.on('*', function (evName, data) {
            if (typeof obj[evName] !== 'function') return
            obj[evName].call(obj, data)
        })
        return request
    }

    return request
}

myModel = {
    foo: console.log.bind(console, 'a'),
    request: {
        start: console.log.bind(console, 'b'),
        resolve: console.log.bind(console, 'c')
    }
}

var req = Request('foo', asyncCall)

req({ myArgs: 'test' })
    .applyTo(myModel)
    .applyTo(myModel.request)


