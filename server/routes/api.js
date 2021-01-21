const express = require('express');

const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

const mockData = [
  {
    id: 1,
    date: 'some date',
    workedOn: 'Important Thing',
    duration: 1000,
    by_user: 'Rob',
  },
  {
    id: 2,
    date: 'some other date',
    workedOn: 'Something',
    duration: 1500,
    by_user: 'Valod',
  },
];

router.get('/entries', authenticateToken, (req, res) => {
  res.json(mockData.filter((entry) => entry.by_user === req.user.username));
});

module.exports = router;
