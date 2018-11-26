

const express = require('express');
const router = express.Router();
const NewsModel = require("../model/news");

const html = `
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<style type="text/css">

		.content{
			margin: 0 auto;
			width: 80%;
			background-color: #fff;
		}
		.content a{
			display: inline-block;
			margin: 15px 0;
			color: #000;
			font-size: 2rem;
			text-decoration: none
		}
	</style>
</head>
<body>
<div class="content">
{CONTENT}
</div>

</body>
</html>
`
const handler = (req, res, conditions) => {
    return NewsModel.find(conditions, (err, docs) => {
        res.setRe
        if(err){
            console.error(err);
            return res.type('.html').send(html.replace(/{CONTENT}/, "无数据"))
        }
        return res.type('.html').send(html.replace(/{CONTENT}/, docs.map(item=>{
            return `<a href="${item.url}" target="_blank">${item.title}</a><br />`
        }).join("")))
    });
}

router.get("/hupu", (req, res) => handler(req, res, {source: "hupu"}));
router.get("/wangyi", (req, res) => handler(req, res, {source: "wangyi"}));
router.get("/zhihu", (req, res) => handler(req, res, {source: "zhihu"}));
router.get("/", (req, res) => handler(req, res, {}));


module.exports = router;


