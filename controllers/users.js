const { Request, Response } = require('express');
const { db } = require('./db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');


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

            console.log("Token: " + token);

            await db.none('UPDATE users SET token=$2 WHERE id=$1', [user.id, token]);
            res.status(200).json({ id: user.id, username, token });
        } else {
            res.status(400).json({ msg: "Username or password incorrect" });
        }
    } catch (error) {
        console.error("Error en la autenticación:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const signUp = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await db.oneOrNone('SELECT * FROM users WHERE username = $1', username);
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists.' });
        }

        // Hashear la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

        res.status(201).json({ msg: 'Signup successful. Now you can log in.' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { logIn, signUp };
