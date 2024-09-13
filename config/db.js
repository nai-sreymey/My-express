const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'express',
    password: '12345678',
    port: '5432',
});
pool.connect();
module.exports=pool;

