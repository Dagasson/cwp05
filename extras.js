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