"use strict";var _pgPool = require("pg-pool");var _pgPool2 = _interopRequireDefault(_pgPool);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}

// you can pass properties to the pool
// these properties are passed unchanged to both the node-postgres Client constructor
// and the node-pool (https://github.com/coopernurse/node-pool) constructor
// allowing you to fully configure the behavior of both
var pool = new _pgPool2.default({
    host: "40.65.122.82",
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword",
    port: 5432
    // ssl: true,
    // max: 20, // set pool max size to 20
    // min: 4, // set min pool size to 4
    // idleTimeoutMillis: 1000, // close idle clients after 1 second
    // connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
});

////1

pool.connect().then(client => {
    client.query('select * from myTable').then(res => {
        client.release();
        console.log("1:", JSON.stringify(res.rows[0]));
    }).
    catch(e => {
        client.release();
        console.error('query error', e.message, e.stack);
    });
});

////2

(() => {var _ref = _asyncToGenerator(function* () {
        let res = yield pool.query('select * from myTable');
        console.log("2:", JSON.stringify(res.rows[0]));
    });function shlof() {return _ref.apply(this, arguments);}return shlof;})()();

////3

pool.query('select * from myTable',
function (err, res) {
    console.log("3:", JSON.stringify(res.rows[0]));
});


//// Error

pool.query('selec from myTable',
function (err, res) {
    if (err !== undefined) {
        console.log(err); //Error
    } else {
        console.log("3:", JSON.stringify(res.rows[0]));
    }
});


// client.release()
// pool.end()

////

//# sourceMappingURL=build.js.map