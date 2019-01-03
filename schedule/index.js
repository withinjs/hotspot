const moment = require("moment");
const platforms = require("../platforms");
const schedule = require('node-schedule');
const NewsModel = require("../model/news");
const rule = new schedule.RecurrenceRule();
rule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

schedule.scheduleJob(rule, () => {
    console.log('开始爬取，现在时间：', moment(new Date).format("YYYY-MM-DD HH:mm:ss"));
    Object.keys(platforms).forEach(name => platforms[name](data => {
        NewsModel.remove({ source: name }, function (err) {
            if (err) {
                console.log(err);
            }
            NewsModel.insertMany(data, (error, docs) => {
                if (error) {
                    return console.error(error);
                }
            })
        })

    }))
});
