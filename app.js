// nmp install nodemon express pdffiller
// para que todo funcione bien instalé Herramientas de desarrollo de Escritorio de C++ con Visual Studio Installer
// y PDFtk en https://www.pdflabs.com/tools/pdftk-server/
// npm start para iniciar 
const express = require('express');
var pdfFiller = require('pdffiller');

const app = express()

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// nombre del pdf de entrada
var sourcePDF = "test/Polizas_Turista 16jun_Mesa de trabajo 1.pdf"; 
// nombre del pdf de salida
var destinationPDF =  "test/poliza_completa.pdf";

// datos del formulario
var data = {
    "NumPoliza" : "1",
    "NombreAsegurado" : "Ricardo",
    "TelAsegurado" : "Hernandez",
    "CorreoAsegurado" : "rhernandez@nationalunity.com.mx",
    "DireccionAsegurado" : "Miguel Angel #6420 Portal de CUmbres",
    "Agente" : "Agente",
    "TelAgente" : "Un Numero",
    "CorreoAgente" : "Correo",
    "Term" : "T",
    "MMFrom" : "08",
    "DDFrom" : "23",
    "YRFrom" : "23",
    "MMTo" : "10",
    "DDTo" : "23",
    "YRTo" : "23",
    "AñoVeh" : "2012",
    "MarcaVeh" : "Chevrolet",
    "ModeloVeh" : "Sonic",
    "VIN" : "1518165100",
    "PlacaEstado" : "TEK-142-A N.L.",
    "Towed" : "No",
    "Premium" : "Si",
    "RoadAssist" : "Si",
    "PolicyFee" : "Si",
    "AssistPLus" : "Si",
    "Misc" : "N/A",
    "Total" : "$4,815,198",
    "Applicant" : "Ricardo Hernandez Rincon",
    "Driver2" : "N/A",
    "Elder/Underage" : "N/A",
    "ApplicantBirth" : "23/10/01",
    "Driver2Birth" : "N/A",
    "Eld/UndBirth" : "N/A",
    "ApplicantLicense" : "Licencia",
    "Driver2License" : "N/A",
    "Eld/UndLicense" : "N/A",
    "Initial" : "R"

};
// función de llenado de pdf
pdfFiller.fillForm( sourcePDF, destinationPDF, data, function(err) {
    if (err) throw err;
    console.log("In callback (we're done).");
});