const getMyBalance = async ( request ) => {
    const balance = request.profile.balance;
    return balance;
}

module.exports = {
    getMyBalance
}