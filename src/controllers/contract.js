const { Op } = require("sequelize");

/**
 * 
 * @param {*} app 
 * @param {*} profileId 
 * @param {*} contractId 
 * @returns 
 */
const getMyContractsByID =  async (app, profileId, contractId) => {
    const {Contract} = app.get('models');
    const contract = await Contract.findOne({where: {
        [Op.and]:{
            id: contractId,
            [Op.or]: {
                ClientId: profileId,
                ContractorId: profileId
            }
        }
    }});
    return contract;
}

/**
 * 
 * @param {*} app 
 * @param {*} profileId 
 * @returns 
 */
const getMyContractsIDs = async ( app, profileId ) => {
    const {Contract} = app.get('models');
    const contractIDs = await Contract.findAll({
        attributes: ['id'],
        where: {
            status: 'in_progress',
            [Op.or]: {
                ClientId: profileId,
                ContractorId: profileId
            }
        },
    })
    return contractIDs.map(c => c.id);
}

module.exports = {
    getMyContractsIDs,
    getMyContractsByID
}