const express = require("express");
const cookieParser = require("cookie-parser");
const history = require("connect-history-api-fallback");
const chalk = require("chalk");
const bodyParser = require('body-parser');
const config = require("./config")
const router = require("./routes");
require("./schedule")
require("./mongo")

const app = express();
app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, x-access-token, UserId");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Content-Type", "application/json;charset=utf-8");
	if (req.method === 'OPTIONS') {
		res.send(200);
	} else {
		next();
	}
});
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());
app.use(router);
app.use(history());
app.listen(config.port, () => {
	console.log(
		chalk.green(`服务启动成功，端口：${config.port}`)
	)
});