const express = require('express');
const router = express.Router();
const {getProfile} = require('../middleware/getProfile');
const { Op } = require("sequelize");
const {getMyContractsByID} = require('../controllers/contract');
// router.get('/', (req,res)=>{
//     res.json({
//         "status": 1
//     })
// })

/**
 * FIXED!
 * @description it returns THe contract if the profile match with the contract owner
 * @returns contract by id
 */
 router.get('/contracts/:id', getProfile ,async (req, res) =>{
    const contract = await getMyContractsByID(req.app, req.profile.id, req.params.id);
    if(!contract) return res.status(404).end();
    res.json(contract);
})

/**
 * @description Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.
 */
router.get('/contracts', getProfile, async(req,res)=>{
    const {Contract} = req.app.get('models');
    const contracts = await Contract.findAll({where: {
        [Op.and]: {
            status:{
                [Op.ne]: 'terminated'
            },
            [Op.or]: {
                ClientId: req.profile.id,
                ContractorId: req.profile.id
            }
        }
    }});
    if(!contracts) return res.status(404).end();
    res.json(contracts);
})

module.exports = router;