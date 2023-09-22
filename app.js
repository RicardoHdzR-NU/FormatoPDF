// npm install 
// npm install nodemon express pdf-lib

// npm start para iniciar 
const express = require('express');
const fs = require('fs');
//Iniciamos express
const app = express()
//levantamos el servidor
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//en browser accedemos a http://localhost:8080

const pdf = require('./pdf');

app.get("/", async (req, res) => {
    //leemos el archivo JSON de parametros
    const jsonString = fs.readFileSync('./parameters.json');
    //const jsonString = fs.readFileSync(req.body.parameters);
    //parseamos el JSON
    const parameterData = JSON.parse(jsonString);
    //mandamos llamar a la función para llenar el PDF
    await pdf(parameterData);
    //buscamos el archivo de salida y lo abrimos en el browser
    var data = fs.readFileSync('./test/output.pdf');
    res.contentType('application/pdf');
    res.send(data);
})