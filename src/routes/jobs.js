const express = require('express');
const router = express.Router();
const {getProfile} = require('../middleware/getProfile');
const { Op } = require("sequelize");

/**
 * @descriptionGet all unpaid jobs for a user (***either*** a client or contractor), 
 *  for ***active contracts only***.
 */
router.get('/jobs/unpaid', getProfile, async (req,res) => {
    const {Contract, Job, Profile} = req.app.get('models');
    const contractIDs = await Contract.findAll({
        attributes: ['id'],
        where: {
            status: 'in_progress',
            [Op.or]: {
                ClientId: req.profile.id,
                ContractorId: req.profile.id
            }
        },
    })
   
    const jobs = await Job.findAll({
        where: {
            ContractId: contractIDs.map(i => i.id),
            paid: null
        }
    });
    if(!jobs) return res.status(404).end();
    res.json(jobs);
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

 