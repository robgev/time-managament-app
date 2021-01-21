const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const users = [];

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/login', async (req, res) => {
  // Authenticate the user
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    res.status(400).send({ response: 'Invalid username' });
  } else {
    try {
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        res.send('Successfully logged in');
      } else {
        res.status(400).send({ response: 'Invalid password' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ response: 'Something went wrong when trying to log in', err });
    }
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 10 is the number of rounds for salt;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = { username, password: passwordHash };
    users.push(user);
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ response: 'Something went wrong when trying to sign up' });
  }
});

module.exports = router;
