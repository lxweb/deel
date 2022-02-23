const express = require('express');
const router = express.Router();
const {balanceDeposit} = require('../controllers/profile');
const {getProfile} = require('../middleware/getProfile')

/**
 * @description Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)
 */
router.post('/balances/deposit/:userId', getProfile, async(req,res)=>{
    if(req.profile.id == req.params.userId) return res.status(404).end('Deposit to your own account are not allowed');
    const deposit = await balanceDeposit(req.app, req.profile.id, req.params.userId, 100);
    res.json(deposit)
})

module.exports = router;
