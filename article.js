const http=require('http');
const fs = require('fs');
let news=require("./articles.json");
let validator=require("./validator.js");
let extras=require("./extras.js");
const articles=exports;

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
	payload.id=extras.getid();
	news.push(payload);
	cb(null, payload);
	extras.save(news);
	}
	else cb({code:405, message:'Article is not valid'});
}	

articles.update = function (req,res,payload,cb) 
{
    if (validator.isValid(payload)) {
        let index = news.findIndex(article => article.id === payload.id);
        if (index !== -1) {
            news[index] = payload;
            cb(null, payload);
            extras.save(news);
        }
        else {
            cb({code: 405, message: 'Article not found'});
        }
    }
    else {
        cb({code: 400, message: 'Request invalid'});
    }
};

articles.delete=function(req,res,payload,cb)
{
	let index=news.findIndex(article=>article.id===payload.id)
	if(index!==-1)
	{
		news.splice(index,1);
		cb(null, news);
		extras.save(news);
	}
	else cb({code: 405, message: 'Article not found'});
}
	