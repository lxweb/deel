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
const getMyContractsIDs = async ( app, profileId, roleFilter=false) => {
    const {Contract} = app.get('models');

    let filter = {
        status: 'in_progress',
        [Op.or]: {
            ClientId: profileId,
            ContractorId: profileId
        }
    }
    switch(roleFilter){
        case 'client':
            filter = {
                status: 'in_progress',
                ClientId: profileId,
            }
            
            break;
        case 'contractor':
            filter = {
                status: 'in_progress',
                ContractorId: profileId
            }
            break;
    }
    const contractIDs = await Contract.findAll({
        attributes: ['id'],
        where: filter,
    })
    return contractIDs.map(c => c.id);
}


const getMyContractsAsClient = async ( app, profileId ) => {
    const {Contract} = app.get('models');
    const contractIDs = await Contract.findAll({
        attributes: ['id'],
        where: {
            status: 'in_progress',
            [Op.or]: {
                ClientId: profileId
            }
        },
    })
    return contractIDs.map(c => c.id);
}
module.exports = {
    getMyContractsIDs,
    getMyContractsByID,
    getMyContractsAsClient
}