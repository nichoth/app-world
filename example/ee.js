function noop () {}

var req = request({})

req.on('start', function () {
})

req.on('resolve', function (data) {
})

req.on('error', function (err) {
})

store.get(req)


