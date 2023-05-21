// Import the necessary modules
var express = require('express');
var router = express.Router();

// Define the route handler for the address data
router.post('/address', function(req, res, next) {
  var walletAddress = req.body.address;
  var countryName = req.body.country;
  console.log('Received address:', walletAddress);
  console.log('Received country:', countryName);

  // Send the address in the response
  res.json({ address: walletAddress, country: countryName });
});

module.exports = router;