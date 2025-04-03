const express = require('express');
const router = express.Router();

// Handle GET request for /login route
router.get('/', (req, res) => {
    res.render('login'); // Make sure the 'login' view exists
});

// Export the router to use it in other files
module.exports = router;