const { Op } = require("sequelize");

const { getMyContractsIDs } = require('../controllers/contract');

/**
 * 
 * @param {ExpressAppInstance} app 
 * @param {number} profileId 
 * @returns Jobs[]
 */
const getMyJobs = async ( app, profileId ) => {
    const {Job} = app.get('models');
    const contractIDs = await getMyContractsIDs(app, profileId);
    const jobs = await Job.findAll({
        where: {
            ContractId: contractIDs
        }
    });
    return jobs;
}

/**
 * 
 * @param {ExpressAppInstance} app 
 * @param {number} profileId 
 * @returns Jobs[]
 */
const getMyUnpaidJobs = async ( app, profileId ) => {
    const {Job} = app.get('models');
    const contractIDs = await getMyContractsIDs(app, profileId);
   
    const jobs = await Job.findAll({
        where: {
            ContractId: contractIDs,
            paid: null
        }
    });
    return jobs;
}

module.exports = {
    getMyJobs,
    getMyUnpaidJobs
}