const { Request, Response } = require('express');
const { db } = require('./db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const logIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.one('SELECT * FROM users WHERE username=$1', username);

        if (user && user.password === password) {
            const payload = {
                id: user.id,
                username
            };

            const { SECRET } = process.env;
            const token = jwt.sign(payload, SECRET);

            console.log(token);

            await db.none('UPDATE users SET token=$2 WHERE id=$1', [user.id, token]);
            res.status(200).json({ id: user.id, username, token });
        } else {
            console.log(username, user.password, password);
            res.status(400).json({ msg: "Username or password incorrect" });
        }
    } catch (error) {
        console.error("Error en la autenticación:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { logIn };
