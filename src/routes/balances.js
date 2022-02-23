const express = require('express');
const router = express.Router();

/**
 * @description Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)
 */
router.post('/balances/deposit/:userId',  async(req,res)=>{
    res.json({
        url:  req.originalUrl
    })
})

module.exports = router;
