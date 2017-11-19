const fs = require('fs');
const extras = exports;

let sessionid=0;


extras.getid = function () {
    return Date.now() + sessionid++;
}

extras.save = function (data) {
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

extras.logRequest = function (url, body, time) {
    fs.appendFile("Logs/" + new Date().toISOString().slice(0,10).replace(/-/g,"") + ".txt",
        time + " :\n" + "\turl : " + url + "\n\tbody : " + body + "\r\n", (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.log("log updated");
            }
        });
};