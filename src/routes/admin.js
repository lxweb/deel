const express = require('express');
const router = express.Router();

/**
 * @description   Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
 * @param start Start date used for the search
 * @param end End Date used for the search
 */
router.get('/admin/best-profession', async(req,res)=>{
    const {start, end} = req.query;
    const sequelize = req.app.get('sequelize');
    const startingDate = new Date(start).toISOString(); //"2020-01-01 01:00:35"
    const endDate = new Date(end).toISOString();
    const query = `SELECT 
            Profiles.profession, 
            Jobs.paymentDate, 
            SUM(Jobs.price) AS TotalPrice
        FROM 
            Profiles 
        LEFT JOIN 
            Contracts, 
            Jobs ON Profiles.id = Contracts.ContractorId AND Contracts.id = Jobs.ContractId 
        WHERE 
            Jobs.paid = 1 AND
            Jobs.paymentDate BETWEEN datetime("${startingDate}") AND datetime("${endDate}")
        GROUP BY Profiles.profession
        ORDER BY TotalPrice DESC;`
    const [result, metadata] = await sequelize.query(query);
    if(!result.length) return res.status(404).end('No info');
    res.json({
        profession: result[0].profession,
        amount: result[0].TotalPrice
    })
})

 /**
  * @description returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
  * @param start Start date used for the search
  * @param end End Date used for the search
  * @param limit A limit of clients this request can return
  */
router.get('/admin/best-clients', async(req,res)=>{
    const { start, end, limit } = req.query;
    res.json({
        start,
        end,
        limit
    })
})

module.exports = router;
