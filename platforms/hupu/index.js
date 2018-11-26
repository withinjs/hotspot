const Crawler = require("crawler");
const chalk = require("chalk");

module.exports = function (callback) {
    const hupu = `https://bbs.hupu.com`
    const bxj = `https://bbs.hupu.com/bxj`;
    const selfie = `https://bbs.hupu.com/selfie`;
    const task = [bxj, ...new Array(3).fill(1).map((item, index) => `${selfie}-${index + 1}`)]
    const data = []
    const crawler = new Crawler({
        maxConnections: 10,
        callback: function (err, res, done) {
            if (err) {
                console.log(chalk.red(err))
            } else {
                const $ = res.$;
                const list = $(".for-list > li");
                task.slice.call(list).forEach(item => {
                    const $item = $(item);
                    const $element = $item.find(".multipage")
                    if ($element.length && $($element[0]).text().includes("...")) {
                        const $truetit = $($item.find(".truetit")[0]);
                        data.push({
                            source: "hupu",
                            title: $truetit.text(),
                            url: `${hupu}${$truetit.attr("href")}`
                        });
                    }
                })
            }

            done();
        }
    })
    crawler.queue(task);
    crawler.on('drain', function () {
        callback(data);
    });
}

