const express = require("express");
const cookieParser = require("cookie-parser");
const history = require("connect-history-api-fallback");
const chalk = require("chalk");
const bodyParser = require('body-parser');
const path = require("path");
const config = require("./config")
const router = require("./routes");
require("./schedule")
require("./mongo")

const app = express();
const staticDir = path.join(__dirname, 'public');

app.use("/public", express.static(staticDir))
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