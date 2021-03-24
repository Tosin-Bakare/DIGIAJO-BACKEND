const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Group = require('../models/group');


router.get('/', (req, res, next) => {
    Group.find()
        .select('groupName groupLimit _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                groups: docs.map(doc => {
                    return {
                        groupName: doc.groupName,
                        groupLimit: doc.groupLimit,
                        _id: doc.id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8000/groups/' + doc._id
                        }
                    }
                })
            };
            // if (docs.length >= 0) {
            res.status(200).json(docs);
            // } else {
            //     res.status(404).json({
            //         message: 'No entries found'
            //     });
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.post('/', (req, res, next) => {
    const group = new Group({
        _id: new mongoose.Types.ObjectId(),
        groupName: req.body.groupName,
        groupLimit: req.body.groupLimit
    });
    group
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created groups successfully",
                createdGroup: {
                    groupName: result.groupName,
                    groupLimit: result.groupLimit,
                    id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8000/groups/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })

    router.get('/:groupId', (req, res, next) => {
        const id = req.params.groupId;
        Product.findById(id)
            .select('groupName groupLimit _id')
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json({
                        product: doc,
                        request: {
                            type: 'GET',
                            description: 'Get all Groups',
                            url: 'http://localhost:8000/groups'
                        }
                    });
                } else {
                    res.status(404).json({ message: 'No Valid entry found for provided ID' });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });

        router.patch('/:groupId', (req, res, next) => {
            const id = req.params.groupId;
            const updateOps = {};
            for (const ops of req.body) {
                updateOps[ops.propName] = ops.value;
            }
            Group.update({ _id: id }, { $set: updateOps })
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: 'Group updated',
                        request: {
                            type: 'GET',
                            url: 'http://localhost:8000/groups/' + id
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

        router.delete("/:groupId", (req, res, next) => {
            const id = req.params.groupId;
            Group.remove({ _id: id })
                .exec()
                .then(result => {
                    res.status(200).json({
                        message: 'Group deleted',
                        request: {
                            type: 'POST',
                            url: 'http://localhost:8000/groups',
                            body: { name: 'String', price: 'Number' }
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
    })
})
module.exports = router;