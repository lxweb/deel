const express = require('express');
const router = express.Router();
const {getProfile} = require('../middleware/getProfile');
const { Op } = require("sequelize");

const { getMyJobs, getMyUnpaidJobs } = require('../controllers/job');

/**
 * @descriptionGet all unpaid jobs for a user (***either*** a client or contractor), 
 *  for ***active contracts only***.
 */
router.get('/jobs/unpaid', getProfile, async (req,res) => {
    const unpaidJobs = await getMyUnpaidJobs( req.app, req.profile.id );
    if(!unpaidJobs) return res.status(404).end();
    res.json(unpaidJobs);
})

 /**
  * @description Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.
  */
router.post('/jobs/:job_id/pay',  async(req,res)=>{
    const jobs = getMyJobs(req.app, req.profile.id);
    res.json(jobs)
})

module.exports = router;

 