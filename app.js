// npm install 
// npm install nodemon express pdf-lib

// npm start para iniciar 
const express = require('express');
const fs = require('fs');

const app = express()

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

const pdf = require('./pdf');

var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

var main = function () {
    rl.question('Nombre del archivo JSON de parámetros: ', function(res){
        //console.log(`Se llenará un PDF con los parámetros de ${res}` )
        const jsonString = fs.readFileSync(`./${res}`);
        const parameterData = JSON.parse(jsonString);
        pdf(parameterData);
        main()
    })
}

main()