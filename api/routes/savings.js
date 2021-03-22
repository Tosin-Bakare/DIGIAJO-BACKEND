const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'savings were fetched'
    });
});

router.post('/', (req, res, next) => {
    const savings = {
        groupsId: req.body.groupsId,
        amount: req.body.amount
    };
    res.status(201).json({
        message: 'savings was initiated',
        savings: savings
    });
});

router.get('/:savingsId', (req, res, next) => {
    res.status(200).json({
        message: 'savings details',
        savingsId: req.params.savingsId
    });
});


router.delete('/:savingsId', (req, res, next) => {
    res.status(200).json({
        message: 'savings terminated',
        savingsId: req.params.savingsId
    });
});



module.exports = router;