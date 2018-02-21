import Pool from 'pg-pool'

// you can pass properties to the pool
// these properties are passed unchanged to both the node-postgres Client constructor
// and the node-pool (https://github.com/coopernurse/node-pool) constructor
// allowing you to fully configure the behavior of both
var pool = new Pool({
    host: "40.65.122.82",
    database: "postgres",
    user: "postgres",
    password: "mysecretpassword",
    port: 5432,
    // ssl: true,
    // max: 20, // set pool max size to 20
    // min: 4, // set min pool size to 4
    // idleTimeoutMillis: 1000, // close idle clients after 1 second
    // connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
});

////1

pool.connect().then(client => {
    client.query('select * from myTable').then(res => {
        client.release()
        console.log("1:", JSON.stringify(res.rows[0]));
    })
        .catch(e => {
            client.release()
            console.error('query error', e.message, e.stack)
        });
});

////2

(async function shlof() {
    let res = await pool.query('select * from myTable');
    console.log("2:", JSON.stringify(res.rows[0]));
})();

////3

pool.query('select * from myTable',
    function (err, res) {
        console.log("3:", JSON.stringify(res.rows[0]));
    }
);

//// Error

pool.query('selec from myTable',
    function (err, res) {
        if (err !== undefined) {
            console.log(err); //Error
        } else {
            console.log("3:", JSON.stringify(res.rows[0]));
        }
    }
);

// client.release()
// pool.end()

////