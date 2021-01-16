const router = require('express').Router();
const jwt = require('jsonwebtoken');
const client = require('../client');
const { SECRET } = require('../config');
const getTokenFrom = require('../helpers/getTokenFrom');

router.get('/', async (req, res, next) => {
  res.send('wadap');
});

// create expense
router.post('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);

    const decodedUser = jwt.verify(token, SECRET);
    const { amount } = req.body;

    const response = await client.query(
      `
      INSERT INTO expenses (creator, amount)
      VALUES ($1, $2);
      `,
      [decodedUser.id, amount]
    );

    res.status(201).send({ amount });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
