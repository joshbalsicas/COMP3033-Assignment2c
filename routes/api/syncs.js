// router that handles requests to /api/faqs
const e = require('express');
const express = require('express');
const { update } = require('../../models/sync');
const router = express.Router();
// import the model
const Sync = require('../../models/sync');

// GET handler for /api/faqs/ > returns a list of sync profiles in the database
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

// POST handler for /api/faqs/ > adds the provided object in the request body to the database
router.post('/', (req, res, next) => {
    if (!req.body.firstName) {
        res.status(400).json({'ValidationError': 'First name is required!'});
    } else if (!req.body.email) {
        res.status(400).json({'ValidationError': 'Email is required!'});
    } else if (!req.body.age) {
        res.status(400).json({'ValidationError': 'Age is required!'});
    } else if (!req.body.oneLiner) {
        res.status(400).json({'ValidationError': 'Message is required!'});
    } else {
        // valid project
        Sync.create({
            firstName: req.body.firstName,
            email: req.body.email,
            age: req.body.age,
            oneLiner: req.body.oneLiner
        }, (err, newsync) => {
            if (err) {
                console.log(err);
                res.status(500).json({'ErrorMessage': 'Server threw an exception!'});
            } else {
                res.status(200).json(newsync);
            }
        })
    }
});

// export this router so we can configure it in app.js
module.exports = router;