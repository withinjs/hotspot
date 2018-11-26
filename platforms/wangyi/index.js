const Crawler = require("crawler");
const chalk = require("chalk");

module.exports = function (callback) {
    const data = [];
    const crawler = new Crawler({
        maxConnections: 10,
        callback: function (err, res, done) {
            if (err) {
                console.log(chalk.red(err));
            } else {
                const $ = res.$;
                const list = data.slice.call($($(`.tabContents.active`)[1]).find("tr"));
                list.unshift();
                list.forEach(item => {
                    const $element = $(item).find("a")
                    if ($element.length) {
                        data.push({
                            source: "wangyi",
                            title: $($element[0]).text(),
                            url: $($element[0]).attr("href")
                        });
                    }
                })
            }

            done();
        }
    })
    crawler.queue(`http://news.163.com/rank`);
    crawler.on('drain', function () {
        callback(data);
    });
}

