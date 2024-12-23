const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "WAD",
    database: "HW4", 
    host: "localhost",
    port: "5432"
});

const execute = async (query) => {
    try {
        await pool.connect();
        await pool.query(query);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
`;

const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        body TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
`;

execute(createUsersTable).then(result => {
    if (result) {
        console.log('Table "users" is created');
    }
});

execute(createPostsTable).then(result => {
    if (result) {
        console.log('Table "posts" is created');
    }
});

module.exports = pool;