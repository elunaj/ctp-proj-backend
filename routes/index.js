var express = require('express');
var router = express.Router();

// root route
router.get('/', (req, res) => {
  res.send("Hello World!")
});

module.exports = router;
