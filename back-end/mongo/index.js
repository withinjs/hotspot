const mongoose = require("mongoose");
const chalk = require("chalk");
const { mongodbUrl } = require("../config")

mongoose.connect(mongodbUrl);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
    console.log(chalk.green('连接数据库成功'));
})

db.on('error', error => {
    console.error(chalk.red('数据库异常' + error));
});

db.on('close', () => {
    console.log(chalk.red('数据库断开，重新连接数据库'));
    mongoose.connect(mongodbUrl, { server: { auto_reconnect: true } });
});

module.exports = db;