const http=require('http');
const fs = require('fs');
let news=require("./articles.json");
let validator=require("./validator.js");
const articles=exports;
let sessionid=0;


getid = function () {
    return Date.now() + sessionid++;
}

save = function (data) {
   // console.log(data);
    fs.writeFileSync("articles.json", JSON.stringify(data), "utf8", (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("articles updated");
        }
    });
};

articles.readall=function(req,res,payload,cb)
{
	cb(null, news);
}

articles.read=function(req,res,payload,cb)
{
	 let index = news.findIndex(article => article.id === payload.id);
    if(index !== -1)
    {
        cb(null,news[index]);
    }
    else{
        cb({code : 405, message : 'Article not found'});
    }
}

articles.create=function(req, res, payload,cb)
{
	if(validator.isValid(payload)){
	payload.id=getid();
	news.push(payload);
	cb(null, payload);
	save(news);
	}
	else cb({code:405, message:'Article is not valid'});
}	

articles.update = function (req,res,payload,cb) {
    if (validator.isValid(payload)) {
        let index = news.findIndex(article => article.id === payload.id);
        if (index !== -1) {
            news[index] = payload;
            cb(null, payload);
            save(news);
        }
        else {
            cb({code: 405, message: 'Article not found'});
        }
    }
    else {
        cb({code: 400, message: 'Request invalid'});
    }
};
	