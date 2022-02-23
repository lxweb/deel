const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model')
const {getProfile} = require('./middleware/getProfile')
const app = express();
const routes = require('./routes');
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)
app.use(routes);

/**
 * FIX ME!
 * @returns contract by id
 */
app.get('/contracts/:id',getProfile ,async (req, res) =>{
    const {Contract} = req.app.get('models')
    const {id} = req.params
    const contract = await Contract.findOne({where: {id}})
    if(!contract) return res.status(404).end()
    res.json(contract)
})

/**
 * @description Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.
 */
app.get('/contracts')

/**
 * @descriptionGet all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.
 */
app.get('/jobs/unpaid')

/**
 * @description Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.
 */
app.post('/jobs/:job_id/pay')

/**
 * @description Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)
 */
app.post('/balances/deposit/:userId')

/**
 * @description   Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
 */
app.get('/admin/best-profession?start=<date>&end=<date>')

/**
 * @description returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
 */
app.get('/admin/best-clients?start=<date>&end=<date>&limit=<integer>')



module.exports = app;
