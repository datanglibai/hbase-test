var CryptoJS = require("crypto-js");

var fs = require('fs');
var crypto = require('crypto');
var format = require('util').format;
var gcloud = require('gcloud');
var dataset = gcloud.datastore({
    // This environment variable is set by app.yaml when running on GAE, but will
    // need to be manually set when running locally.
    projectId: 'yourprojectid' //process.env.GCLOUD_PROJECT''
});


var users = JSON.parse(fs.readFileSync('./users.json'), 'utf8').users;


//testEnDecrypt();
saveUsers();
queryUsers();

function testEnDecrypt() {

    for (var i = users.length - 1; i >= 0; i--) {
        var user = users[i];
        console.log(user.password);

        var ciphertext = CryptoJS.AES.encrypt(user.password, user.username);
        console.log(ciphertext.toString());

        var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), user.username);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        console.log("decrypted: " + plaintext);
    }
}


function saveUsers() {
    for (var i = users.length - 1; i >= 0; i--) {
        var user = users[i];
        var ciphertext = CryptoJS.AES.encrypt(user.password, user.username);

        dataset.save({
            key: dataset.key("users"),
            data: {
                username: user.username,
                password: ciphertext.toString()
            }
        }, function (err) {
            if (err) {
                console.log(err);
            }

            console.log('user: ' + user.username + ' saved')
        });
    };
}

function queryUsers() {

    var queryfilekey = dataset.createQuery("users");

    dataset.runQuery(queryfilekey, function (err, entities) {
        if (err) {
            console.log(err);
        }

        for (var i = entities.length - 1; i >= 0; i--) {
            console.log(entities[i].data.username);
            console.log(entities[i].data.password);
            var bytes = CryptoJS.AES.decrypt(entities[i].data.password, entities[i].data.username);
            var plaintext = bytes.toString(CryptoJS.enc.Utf8);
            console.log("decrypted: " + plaintext);
        }
    });

}
