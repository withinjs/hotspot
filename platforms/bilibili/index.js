const request = require("superagent");

module.exports = function (callback) {
    request.get(`https://api.bilibili.com/x/web-interface/ranking?jsonp=jsonp&rid=0&day=3&type=1&arc_type=0`)
        .end((err, res) => {
            const list = res.body && res.body.data && res.body.data.list || [];
            callback(list.map(item => ({
                source: "bilibili",
                title: item.title,
                url: `https://www.bilibili.com/video/av${item.aid}/`
            })));
        })
}

