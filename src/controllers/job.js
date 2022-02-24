const { getMyContractsIDs } = require('./contract');

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
const getMyUnpaidJobs = async ( app, profileId, roleFilter=false) => {
    const {Job} = app.get('models');
    const contractIDs = await getMyContractsIDs(app, profileId, roleFilter);
   
    const jobs = await Job.findAll({
        where: {
            ContractId: contractIDs,
            paid: null
        }
    });
    return jobs;
}

/**
 * 
 * @param {*} app 
 * @param {*} profileId 
 * @param {*} jobId 
 * @returns 
 */
const getMyUnpaidJobsById = async ( app, profileId, jobId, roleFilter=false) => {
    const {Job} = app.get('models');
    const contractIDs = await getMyContractsIDs(app, profileId, roleFilter);
   
    const jobs = await Job.findOne({
        where: {
            ContractId: contractIDs,
            paid: null,
            id: jobId
        }
    });
    return jobs;
}


const payJob = async (app, profileId, jobId, contractorId) => {
    try{
        const {Job, Profile} = app.get('models');
        const job = await Job.findOne({where: { id: jobId}})
        const clientProfile = await Profile.findOne({where: {id: profileId}});
        const contractorProfile = await Profile.findOne({where: {id: contractorId}});
        const newClientBalance = clientProfile.balance - job.price;
        const newContractorBalance = contractorProfile.balance + job.price;
        const clientUpdate = await clientProfile.update({balance: newClientBalance});
        const contractorUpdate = await contractorProfile.update({balance: newContractorBalance}, {where: {id: contractorId}});
        const jobPaiment = await Job.update({paid: 1}, { where:{ id: jobId}});
    }catch(error){
        return {
            status: 2,
            error
        };
    }
    return { status: 1 };
}


module.exports = {
    getMyJobs,
    getMyUnpaidJobs,
    getMyUnpaidJobsById,
    payJob
}