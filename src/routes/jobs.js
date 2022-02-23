const express = require('express');
const router = express.Router();
const {getProfile} = require('../middleware/getProfile');

const { getMyUnpaidJobs, getMyUnpaidJobsById, payJob } = require('../controllers/job');
const { getMyBalance } = require('../controllers/profile');
const {getMyContractsByID} = require('../controllers/contract');

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
router.post('/jobs/:job_id/pay', getProfile,async(req,res)=>{
    
    const jobToPay = await getMyUnpaidJobsById(req.app, req.profile.id, req.params.job_id, 'client');
    
    if(!jobToPay) return res.status(404).end('Job not found');

    const clientBalance = await getMyBalance(req)

    if(jobToPay.proce > clientBalance) return res.status(404).end('Not enough funds to pay this Job')

    const contract = await getMyContractsByID(req.app, req.profile.id, jobToPay.ContractId);

    const paymentStatus = await payJob(req.app, req.profile.id, req.params.job_id, contract.ContractorId);

    res.json({
        paymentStatus 
    })
})

module.exports = router;

 