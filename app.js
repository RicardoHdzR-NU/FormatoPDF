// npm install 
// npm install nodemon express pdf-lib

// npm start para iniciar 
const express = require('express');
const fs = require('fs');
//Iniciamos express
const app = express()
app.use(express.json())
//levantamos el servidor
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//en browser accedemos a http://localhost:8080

const pdf = require('./pdf');

app.post("/pdf", async (req, res) => {
    //console.log(req)
    const parameterData = req.body
    //console.log(parameterData)
    //leemos el archivo JSON de parametros
    //const jsonString = fs.readFileSync('./parameters.json');
    //const jsonString = fs.readFileSync(req.body.parameters);
    //parseamos el JSON
    //const parameterData = JSON.parse(jsonString);
    //mandamos llamar a la función para llenar el PDF
    await pdf(parameterData);
    //buscamos el archivo de salida y lo abrimos en el browser
    var data = fs.readFileSync('./test/output.pdf');
    res.contentType('application/pdf');
    res.send(data);

    //esta es otra forma de enviar el archivo, funciona casi igual
    /*
    var data = fs.createReadStream('./test/output.pdf');
    var stat = fs.statSync('./test/output.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
    data.pipe(res); 
    */
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
})