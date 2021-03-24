const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const saving = require('../models/saving');

const Saving = require('../models/saving');
const Group = require('../models/group')

// Handle incoming GET requests to /savings
router.get('/', (req, res, next) => {
    Saving.find()
        .select('group amount _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                savings: docs.map(doc => {
                    return {
                        _id: doc._id,
                        group: doc.group,
                        amount: doc.amount,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8000/savings/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});
router.post('/', (req, res, next) => {
    Group.findById(req.body.groupId)
        .then(group => {
            if (!product) {
                return res.status(404).json({
                    message: "Group not found"
                });
            }
            const saving = new Saving({
                _id: mongoose.Types.ObjectId(),
                amount: req.body.amount,
                group: req.body.groupId
            });
            return saving
                .save()
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Savings successful',
                createdSaving: {
                    _id: result._id,
                    group: result.group,
                    amount: result.amount
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/savings/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
router.get('/:savingsId', (req, res, next) => {
    Saving.findById(req.params.orderId)
        .exec()
        .then(order => {
            if (!saving) {
                return res.status(404), json({
                    message: "Withdrawal made"
                });
            }
            res.status(200).json({
                order: order,
                requests: {
                    type: 'GET',
                    url: 'http://localhost:8000/savings'
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.delete('/:savingId', (req, res, next) => {
    Saving.remove({ _id: req.params.savingId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Savings withdrawn",
                requests: {
                    type: 'POST',
                    url: 'http://localhost:8000/savings',
                    body: { groupId: 'ID', amount: "Number" }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
});
module.exports = router;