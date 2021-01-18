const router = require('express').Router();
const jwt = require('jsonwebtoken');
const client = require('../client');
const { SECRET } = require('../config');
const getTokenFrom = require('../helpers/getTokenFrom');

router.get('/', async (req, res, next) => {
  try {
    const token = getTokenFrom(req);

    const decodedUser = jwt.verify(token, SECRET);
    const response = await client.query(
      `
      SELECT * FROM expenses
      WHERE creator = $1;
      `,
      [decodedUser.id]
    );

    res.send(response.rows || []);
  } catch (error) {
    next(error);
  }
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
      VALUES ($1, $2)
      RETURNING id, amount;
      `,
      [decodedUser.id, amount]
    );

    res.status(201).send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = getTokenFrom(req);
    const decodedUser = jwt.verify(token, SECRET);

    await client.query(
      `
      DELETE FROM expenses
      WHERE id = $1 AND creator = $2;
    `,
      [id, decodedUser.id]
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
