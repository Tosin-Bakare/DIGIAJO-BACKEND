const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /groups'
    });
});

router.post('/', (req, res, next) => {
    const groups = {
        name: req.body.name,
        groupLimit: req.body.groupLimit

    };
    res.status(201).json({
        message: 'Handling POST requests to /groups',
        createdGroups: groups
    });
});

router.get('/:groupsId', (req, res, next) => {
    const id = req.params.groupsId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID'
            // id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'updated groups!'
    });
});


router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted groups!'
    });
});




module.exports = router;
