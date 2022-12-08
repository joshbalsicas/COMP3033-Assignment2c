// router that handles requests to /api/syncs
const e = require('express');
const express = require('express');
const { update } = require('../../models/sync');
const router = express.Router();
// import the model
const Sync = require('../../models/sync');

// GET handler for /api/syncs/ > returns a list of sync profiles in the database
router.get('/', (req, res, next) => {
    Sync.find((err, syncs) => {
        if (err) {
            console.log(err);
            res.json('ERROR').status(500);
        } else {
            res.json(syncs).status(200);
        }
    })
});

// POST handler for /api/syncs/ > adds the provided object in the request body to the database
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
        });
    }
});

// PUT handler for /api/syncs/:_id
router.put('/:_id', (req, res, next) => {
    if (!req.body.firstName) {
        res.status(400).json({'ValidationError': 'First name is required!'});
    } else if (!req.body.email) {
        res.status(400).json({'ValidationError': 'Email is required!'});
    } else if (!req.body.age) {
        res.status(400).json({'ValidationError': 'Age is required!'});
    } else if (!req.body.oneLiner) {
        res.status(400).json({'ValidationError': 'Message is required!'});
    } else {
        Sync.findOneAndUpdate({ // filter to find sync profile to update
            _id: req.params._id
        }, { // updated information
            firstName: req.body.firstName,
            email: req.body.email,
            age: req.body.age,
            oneLiner: req.body.oneLiner,
            seeking: req.body.seeking
        }, (err, updatedSync) => { // callback function
            if (err) {
                console.log(err);
                res.status(500).json({'ErrorMessage': 'Server threw an exception!'});
            } else {
                res.status(200).json(updatedSync);
            }
        });
    }
});

// DELETE handler for /api/syncs/:_id
router.delete('/:_id', (req, res, next) => {
    Sync.remove({
        _id: req.params._id
    }, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({'ErrorMessage': 'Server threw an exception!'});
        } else {
            res.status(200).json({'success': 'true'});
        }
    })
});
// export this router so we can configure it in app.js
module.exports = router;