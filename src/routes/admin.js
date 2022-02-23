const express = require('express');
const router = express.Router();

router.get('/admin', async(req,res)=>{
    res.json({
        url:  req.originalUrl
    })
})

/**
 * @description   Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.
 * @param start Start date used for the search
 * @param end End Date used for the search
 */
router.get('/admin/best-profession', async(req,res)=>{
    res.json({
        url:  req.originalUrl,
        start: req.query.start,
        end: req.query.end
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
