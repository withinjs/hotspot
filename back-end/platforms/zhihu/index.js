const request = require("superagent");

module.exports = function (callback) {
    //https://github.com/DIYgod/RSSHub/blob/master/routes/zhihu/hotlist.js#L9
    request.get(`https://www.zhihu.com/api/v3/explore/guest/feeds?limit=10`)
        .end((err, res) => {

            const list = res.body && res.body.data || [];
            callback(list.map(item => ({
                source: "zhihu",
                title: item.target.question.title,
                url: item.target.question.url.replace(/api/, "www")
            })));
        })
}

