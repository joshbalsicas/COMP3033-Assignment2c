// router that handles requests to /api/faqs
const express = require('express');
const router = express.Router();

// configure your router by adding handlers
// GET handler for /api/faqs

router.get('/', (req, res, next) => {
    res.json('success');
});

// export this router so we can configure it in app.js
module.exports = router;