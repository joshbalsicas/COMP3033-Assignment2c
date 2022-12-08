// router that handles requests to /api/faqs
const express = require('express');
const router = express.Router();
// import the model
const Sync = require('../../models/sync');

// configure your router by adding handlers
// GET handler for /api/faqs
router.get('/', (req, res, next) => {
    Sync.find((err, syncs) => {
        if (err) {
            console.log(err);
            res.json('ERROR').status(500);
        } else {
            res.json(syncs).status(200);
        }
    });
});

// export this router so we can configure it in app.js
module.exports = router;