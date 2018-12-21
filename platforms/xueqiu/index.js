const request = require("superagent");
let cookie = "";
function reloadHomePage(){
    request.get(`https://xueqiu.com/`).end((err, res)=>{
        cookie = res.headers["set-cookie"].join(";")
    })
}

module.exports = function (callback) {
    request.get(`https://xueqiu.com/v4/statuses/public_timeline_by_category.json?since_id=-1&max_id=-1&count=10&category=105`)
        .set("cookie", cookie)
        .end((err, res) => {
            if(res.body.error_code){
               return reloadHomePage();
            }
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



