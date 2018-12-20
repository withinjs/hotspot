const express = require('express');
const router = express.Router();
const NewsModel = require("../model/news");
const fs = require("fs");
const html = fs.readFileSync(require.resolve('../public/home.html'), { encoding: "UTF-8" });

const handler = (req, res, conditions) => {
	return NewsModel.find(conditions, (err, docs) => {
		if (err) {
			console.error(err);
			return res.json({ code: 200, data: [] })
		}
		return res.json({ code: 200, data: docs })
	});
}

router.get("/hupu", (req, res) => handler(req, res, { source: "hupu" }));
router.get("/wangyi", (req, res) => handler(req, res, { source: "wangyi" }));
router.get("/zhihu", (req, res) => handler(req, res, { source: "zhihu" }));
router.get("/bilibili", (req, res) => handler(req, res, { source: "bilibili" }));
router.get("/xueqiu", (req, res) => handler(req, res, { source: "xueqiu" }));
router.get("/all", (req, res) => handler(req, res, {}));
router.get("/", (req, res) => {
	return NewsModel.find({}, (err, docs) => {
		if (err) {
			console.error(err);
			return res.type('.html').send(html.replace(/{\w+}/g, "无数据"))
		}
		const content = {
			hupu: "",
			hupuOrder: 0,
			wangyi: "",
			wangyiOrder: 0,
			zhihu: "",
			zhihuOrder: 0,
			bilibili: "",
			bilibiliOrder: 0,
			xueqiu: "",
			xueqiuOrder: 0
		};

		docs.forEach(item => {
			content[`${item.source}Order`] += 1;
			content[item.source] += `<a href="${item.url}" title="${item.title}"target="_blank"><span class="order">${content[`${item.source}Order`]}、</span>${item.title}</a>`
		});

		return res.type('.html').send(
			html.replace(/{HUPU}/, content.hupu)
				.replace(/{WANGYI}/, content.wangyi)
				.replace(/{ZHIHU}/, content.zhihu)
				.replace(/{BILIBILI}/, content.bilibili)
				.replace(/{XUEQIU}/, content.xueqiu)
		)
	});
});


module.exports = router;


