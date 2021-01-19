const router = require('express').Router();
const jwt = require('jsonwebtoken');
const client = require('../client');
const bcrypt = require('bcryptjs');
const { SECRET } = require('../config');
const getTokenFrom = require('../helpers/getTokenFrom');
const { response } = require('express');

router.get('/init', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    const decodedUser = jwt.verify(token, SECRET);
    const newToken = jwt.sign(decodedUser, SECRET);
    res.send({
      id: decodedUser.id,
      username: decodedUser.username,
      token: newToken,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // check if username exists
    const response1 = await client.query(
      `
      SELECT * FROM users_ce
      WHERE username = $1;
    `,
      [username]
    );
    if (response1.rows[0]) {
      throw new Error('Username already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const response2 = await client.query(
      `
        INSERT INTO users_ce (username, "passwordHash")
        VALUES ($1, $2)
        RETURNING id;
      `,
      [username, passwordHash]
    );

    const token = await jwt.sign(
      { id: response2.rows[0].id, username },
      SECRET
    );

    res.status(201).send({ id: response2.rows[0].id, username, token });
  } catch (error) {
    next(error);
  }
});

// login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const response1 = await client.query(
      `
      SELECT "passwordHash" FROM users_ce
      WHERE username = $1;
      `,
      [username]
    );

    if (!response1.rows[0]) {
      return res.status(404).send('Invalid credentials');
    }

    const passwordIsCorrect = await bcrypt.compare(
      password,
      response1.rows[0].passwordHash
    );

    if (!passwordIsCorrect) {
      throw new Error('Invalid credentials');
    }

    const response = await client.query(
      `
      SELECT id, username FROM users_ce
      WHERE username = $1;
    `,
      [username]
    );

    const token = jwt.sign(response.rows[0], SECRET);

    res.send({ ...response.rows[0], token });
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);

    const decodedUser = jwt.verify(token, SECRET);

    const response = await client.query(
      `
      DELETE FROM users_ce
      WHERE id = $1;
      `,
      [decodedUser.id]
    );

    res.send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
