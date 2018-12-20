const request = require("superagent");

module.exports = function (callback) {
    request.get(`https://xueqiu.com/v4/statuses/public_timeline_by_category.json?since_id=-1&max_id=-1&count=10&category=105`)
        .set("cookie", "aliyungf_tc=AQAAAO2AvgtndQUAkMzUdvCjgHpYM/wK; xq_a_token=a9b845d5970a83e27be65c93bdf924687f8371d2; xq_a_token.sig=CoFzisEpUBVZUXIH80jgYl0aGeY; xq_r_token=5301599ba625f213b3df384282750cb9d40cbe95; xq_r_token.sig=bGXk935CYJh5r9TyOJSQP09JOHU; u=941545314143123; Hm_lvt_1db88642e346389874251b5a1eded6e3=1545314143; device_id=c41c50917b23c1d9391899cb9b65a9b5; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1545314637")
        .end((err, res) => {
            const list = res.body && res.body.list || [];
            callback(list.map(item => {
                const _item = JSON.parse(item.data)
                return {
                    source: "xueqiu",
                    title: _item.title,
                    url: `https://xueqiu.com${_item.target}`
                }
            }));
        })
}



