const { getMyUnpaidJobs } = require("./job");

/**
 * 
 * @param {*} request 
 * @returns 
 */
const getMyBalance = async ( request ) => {
    const balance = request.profile.balance;
    return balance;
}

const balanceDeposit = async (app, originProfileId, tagetProfileId, amount=0) => {
    const {Profile} = app.get('models');
    const originProfile = await Profile.findOne({where: {id: originProfileId }});
    const targetProfile = await Profile.findOne({where: {id: tagetProfileId }});
    const unpaidJobs =  await getMyUnpaidJobs(app, originProfileId, 'client');
    let maxToDeposit = amount;
    if(unpaidJobs.length){
        const totalDebt = unpaidJobs.map(a => a.price).reduce((z,x) => z+x);
        maxToDeposit = totalDebt*0.25;
    }
    if(originProfile.balance<maxToDeposit){
        return {
            status: 2,
            error: 'Not enough funds'
        } 
    }
    const balanceDecrement = await originProfile.increment({balance: -maxToDeposit}); // 850
    const balanceIncrement = await targetProfile.increment({balance: maxToDeposit}); // 551.3
    return {
        status: 1,
        originProfileBalance: originProfile.balance,
        targetProfileBalance: targetProfile.balance
    }
}

module.exports = {
    getMyBalance,
    balanceDeposit
}