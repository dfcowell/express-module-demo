var application = {
    users: {
        demo: { name: 'Demo user', id: 1, age: 25, company: 'Acme Inc' }
    },
    discussions: []
};

var fs = require('fs');
var express = require('express');
var app = express();

new Promise((resolve, reject) => {
    fs.readdir('modules', (err, files) => {
        if(err) return reject(err);

        resolve(files);
    })
})
.then(fileList => {
    fileList.map(filename => {
        var mountPoint = filename.split('.').shift();
        var imported = require(`./modules/${mountPoint}`)(application);
        app.use(`/${mountPoint}/`, imported.routes);
    });
})
.then(() => {
    app.listen(3000);
});