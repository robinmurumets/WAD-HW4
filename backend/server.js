const express = require('express');
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./auth');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const secret = "3f9e6b12fedacbd173ab6b875dca0c884b3e9f7bb291593d88af3d93f4e3898e";
const maxAge = 60 * 60;

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge });
}

app.listen(port, () => {
    console.log("Server is listening to port " + port);
});

app.get('/auth/authenticate', async (req, res) => {
    console.log('authentication request has been arrived');
    const token = req.cookies.jwt;
    let authenticated = false;
    try {
        if (token) {
            await jwt.verify(token, secret, (err) => {
                if (err) {
                    console.log('token is not verified');
                    return res.send({ "authenticated": authenticated });
                } else {
                    console.log('user is authenticated');
                    authenticated = true;
                    return res.send({ "authenticated": authenticated });
                }
            })
        } else {
            console.log('user is not authenticated');
            res.send({ "authenticated": authenticated });
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/signup', async (req, res) => {
    try {
        console.log("a signup request has arrived");
        const { email, password } = req.body;
        console.log(`Email: ${email}, Password: ${password}`);
        const salt = await bcrypt.genSalt(); 
        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log(`Hashed Password: ${bcryptPassword}`);
        const authUser = await pool.query(
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*",
            [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id });
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" });
});

app.get('/api/posts', authMiddleware, async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                id,
                user_id,
                body,
                created_at as post_date
            FROM posts 
            ORDER BY post_date DESC
        `);
        console.log('Fetched posts:', result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: "Could not fetch posts" });
    }
});

app.get('/api/posts/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT
                 id,
                 user_id,
                 body,
                 created_at as post_date
            FROM posts 
            WHERE id = $1`,
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/posts', authMiddleware, async (req, res) => {
    try {
        const { user_id, body } = req.body; // Accept only user_id and body
        const result = await pool.query(
            'INSERT INTO posts (user_id, body, created_at) VALUES ($1, $2, NOW()) RETURNING *',
            [user_id, body] // Provide the required values
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Could not create post" });
    }
});



app.put('/api/posts/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        const result = await pool.query(
            'UPDATE posts SET body = $1 WHERE id = $2 RETURNING *',
            [body, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/posts/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/posts', authMiddleware, async (req, res) => {
    try {
        await pool.query('DELETE FROM posts');
        res.json({ message: "All posts deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});