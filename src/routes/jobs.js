const express = require('express');
const router = express.Router();

/**
 * @descriptionGet all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.
 */
router.get('/jobs/unpaid',  async(req,res)=>{
    res.json({
        url:  req.originalUrl
    })
})

 /**
  * @description Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.
  */
router.post('/jobs/:job_id/pay',  async(req,res)=>{
    res.json({
        url:  req.originalUrl
    })
})

module.exports = router;

 