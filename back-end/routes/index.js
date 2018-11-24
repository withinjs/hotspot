

const express = require('express');
const router = express.Router();
const NewsModel = require("../model/news");

const handler = (req, res, conditions) => {
    return NewsModel.find(conditions, (err, docs) => {
        if(err){
            console.error(err);
            return res.json({code: 200, data: []})
        }
        res.json({code: 200, data: docs})
    });
}

router.get("/hupu", (req, res) => handler(req, res, {source: "hupu"}));
router.get("/wangyi", (req, res) => handler(req, res, {source: "wangyi"}));
router.get("/zhihu", (req, res) => handler(req, res, {source: "zhihu"}));
router.get("/", (req, res) => handler(req, res, {}));


module.exports = router;


