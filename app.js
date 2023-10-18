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
//var bodyParser = require('body-parser')
//en browser accedemos a http://localhost:8080

//bodyParser.json()
//const pdf = require('./pdf');

const { PDFDocument } = require('pdf-lib');
//const fs = require('fs');

//Función para llenar el PDF
/*async function fillPdfForm(input, fillData) {
	try {
        // Cargamos el PDF
        const pdfDoc = await PDFDocument.load(input)
        // Cargamos la imagen (elegimos la que sea necesaria segun si es jpg o png)
        //const qrImage = await pdfDoc.embedJpg(image)
        //const qrImage = await pdfDoc.embedPng(image)

        //Obtenemos la información del formulario
        const form = pdfDoc.getForm()
        //Definimos los campos como constantes
        const numPolizaField = form.getTextField('NumPoliza')
        const nombreAseguradoField = form.getTextField('NombreAsegurado')
        const telAseguradoField = form.getTextField('TelAsegurado')
        const correoAseguradoField = form.getTextField('CorreoAsegurado')
        const direccionAseguradoField = form.getTextField('DireccionAsegurado')
        const agenteField = form.getTextField('Agente')
        const telAgenteField = form.getTextField('TelAgente')
        const correoAgenteField = form.getTextField('CorreoAgente')
        const termField = form.getTextField('Term')
        const mMFromField = form.getTextField('MMFrom')
        const dDFromField = form.getTextField('DDFrom')
        const yRFromField = form.getTextField('YRFrom')
        const mMToField = form.getTextField('MMTo')
        const dDToField = form.getTextField('DDTo')
        const yRToField = form.getTextField('YRTo')
        const hRField = form.getTextField('HR')
        const aMPMField = form.getTextField('AM/PM')
        const añoVehField = form.getTextField('AñoVeh')
        const marcaVehField = form.getTextField('MarcaVeh')
        const modeloVehField = form.getTextField('ModeloVeh')
        const vINField = form.getTextField('VIN')
        const placaEstadoField = form.getTextField('PlacaEstado')
        const towedField = form.getTextField('Towed')
        const premiumField = form.getTextField('Premium')
        const roadAssistField = form.getTextField('RoadAssist')
        const policyFeeField = form.getTextField('PolicyFee')
        const assistPlusField = form.getTextField('AssistPlus')
        const miscField = form.getTextField('Misc')
        const totalField = form.getTextField('Total')
        const applicantField = form.getTextField('Applicant')
        const driver2Field = form.getTextField('Driver2')
        const elderUnderageField = form.getTextField('Elder/Underage')
        const applicantBirthField = form.getTextField('ApplicantBirth')
        const driver2BirthField = form.getTextField('Driver2Birth')
        const eldUndBirthField = form.getTextField('Eld/UndBirth')
        const applicantLicenseField = form.getTextField('ApplicantLicense')
        const driver2LicenseField = form.getTextField('Driver2License')
        const eldUndLicenseField = form.getTextField('Eld/UndLicense')
        const initialField = form.getTextField('Initial')
        const qrImageField = form.getButton('QR')

        //Llenamos los campos
        numPolizaField.setText(fillData.numPoliza)
        nombreAseguradoField.setText(fillData.nombreAsegurado)
        telAseguradoField.setText(fillData.telAsegurado)
        correoAseguradoField.setText(fillData.correoAsegurado)
        direccionAseguradoField.setText(fillData.direccionAsegurado)
        agenteField.setText(fillData.agente)
        telAgenteField.setText(fillData.telAgente)
        correoAgenteField.setText(fillData.correoAgente)
        termField.setText(fillData.term)
        mMFromField.setText(fillData.mMFrom)
        dDFromField.setText(fillData.dDFrom)
        yRFromField.setText(fillData.yRFrom)
        mMToField.setText(fillData.mMTo)
        dDToField.setText(fillData.dDTo)
        yRToField.setText(fillData.yRTo)
        hRField.setText(fillData.hR)
        aMPMField.setText(fillData.aMPM)
        añoVehField.setText(fillData.añoVeh)
        marcaVehField.setText(fillData.marcaVeh)
        modeloVehField.setText(fillData.modeloVeh)
        vINField.setText(fillData.vIN)
        placaEstadoField.setText(fillData.placaEstado)
        towedField.setText(fillData.towed)
        premiumField.setText(fillData.premium)
        roadAssistField.setText(fillData.roadAssist)
        policyFeeField.setText(fillData.policyFee)
        assistPlusField.setText(fillData.assistPlus)
        miscField.setText(fillData.misc)
        totalField.setText(fillData.total)
        applicantField.setText(fillData.applicant)
        driver2Field.setText(fillData.driver2)
        elderUnderageField.setText(fillData.elderUnderage)
        applicantBirthField.setText(fillData.applicantBirth)
        driver2BirthField.setText(fillData.driver2Birth)
        eldUndBirthField.setText(fillData.eldUndBirth)
        applicantLicenseField.setText(fillData.applicantLicense)
        driver2LicenseField.setText(fillData.driver2License)
        eldUndLicenseField.setText(fillData.eldUndLicense)
        initialField.setText(fillData.initial)
        //qrImageField.setImage(qrImage)

        form.flatten();

        //Regresamos el formulario lleno
        return pdfDoc;
	} catch (err) {
		console.error('Error:', err);
	}
}*/
// Función para guardar el PDF
async function saveFilledForm(pdfDoc, output) {
	try {

		const filledFormBytes = await pdfDoc.save();
		fs.writeFileSync(output, filledFormBytes);
		console.log('Filled form saved successfully!');
	} catch (err) {
		console.error('Error saving filled form:', err);
	}
}

//Función principal
async function pdf(parameterData) {
    // Convertimos en buffers al PDF e Imagen
    //const inputFile = fs.readFileSync(parameterData.input)
    //const inputImage = fs.readFileSync(parameterData.image)
    //Llenamos el documento y lo guardamos
    
	const pdfDoc = await fillPdfForm(inputFile, inputImage, parameterData.fillData);
	await saveFilledForm(pdfDoc, parameterData.output);
}

const pdf1 = {
    "numPoliza": "1",
    "nombreAsegurado": "Ricardo Hernandez",
    "telAsegurado": "8116610129",
}

const pdf2 = {
    "numPoliza": "2",
    "nombreAsegurado": "Ricardo Hernandez",
    "telAsegurado": "8116610129",
}

async function pdfForm(parameters){
    if(parameters.prefijo == "AXW" && parameters.folio == "353579629"){
    //if(nombrePDF == 'pdf-formulario'){
        console.log('haciendo poliza de carro')
        const nombreDoc = 'pdf-formulario';

        //los datos a rellenar se obtendrían de la consulta
        const datosPDF = pdf1;
        // Cargar el PDF existente (reemplaza 'ruta-al-pdf.pdf' con la URL o la ruta local de tu PDF)
        //const existingPdfBytes = await fetch(`test/${nombreDoc}.pdf`).then((res) => res.arrayBuffer());
        //console.log('bytes obtenidos: ' , existingPdfBytes)
        const existingPdfBytes = fs.readFileSync(`test/${nombreDoc}.pdf`)

        // Crear un documento PDF desde el PDF existente
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();
        //console.log('cargamos el formulario')

        // Rellenar los campos de formulario en el PDF
        form.getTextField('NombreAsegurado').setText(datosPDF.nombreAsegurado);
        form.getTextField('NumPoliza').setText(datosPDF.numPoliza);
        form.getTextField('TelAsegurado').setText(datosPDF.telAsegurado);
        form.getTextField('CorreoAsegurado').setText(datosPDF.correoAsegurado);
        form.getTextField('DireccionAsegurado').setText(datosPDF.direccionAsegurado)
        form.getTextField('Agente').setText(datosPDF.agente)
        form.getTextField('TelAgente').setText(datosPDF.telAgente)
        form.getTextField('CorreoAgente').setText(datosPDF.correoAgente)
        form.getTextField('Term').setText(datosPDF.term)
        form.getTextField('MMFrom').setText(datosPDF.mMFrom)
        form.getTextField('DDFrom').setText(datosPDF.dDFrom)
        form.getTextField('YRFrom').setText(datosPDF.yRFrom)
        form.getTextField('MMTo').setText(datosPDF.mMTo)
        form.getTextField('DDTo').setText(datosPDF.dDTo)
        form.getTextField('YRTo').setText(datosPDF.yRTo)
        form.getTextField('HR').setText(datosPDF.hR)
        form.getTextField('AM/PM').setText(datosPDF.aMPM)
        form.getTextField('AñoVeh').setText(datosPDF.añoVeh)
        form.getTextField('MarcaVeh').setText(datosPDF.marcaVeh)
        form.getTextField('ModeloVeh').setText(datosPDF.modeloVeh)
        form.getTextField('VIN').setText(datosPDF.vIN)
        form.getTextField('PlacaEstado').setText(datosPDF.placaEstado)
        form.getTextField('Towed').setText(datosPDF.towed)
        form.getTextField('Premium').setText(datosPDF.premium)
        form.getTextField('RoadAssist').setText(datosPDF.roadAssist)
        form.getTextField('PolicyFee').setText(datosPDF.policyFee)
        form.getTextField('AssistPlus').setText(datosPDF.assistPlus)
        form.getTextField('Misc').setText(datosPDF.misc)
        form.getTextField('Total').setText(datosPDF.total)
        form.getTextField('Applicant').setText(datosPDF.applicant)
        form.getTextField('Driver2').setText(datosPDF.driver2)
        form.getTextField('Elder/Underage').setText(datosPDF.elderUnderage)
        form.getTextField('ApplicantBirth').setText(datosPDF.applicantBirth)
        form.getTextField('Driver2Birth').setText(datosPDF.driver2Birth)
        form.getTextField('Eld/UndBirth').setText(datosPDF.eldUndBirth)
        form.getTextField('ApplicantLicense').setText(datosPDF.applicantLicense)
        form.getTextField('Driver2License').setText(datosPDF.driver2License)
        form.getTextField('Eld/UndLicense').setText(datosPDF.eldUndLicense)
        form.getTextField('Initial').setText(datosPDF.initial)
        form.flatten()

        // Generar un nuevo PDF con los campos de formulario llenados
        //const pdfBytes = await pdfDoc.save();
        return pdfDoc;

        /*const pickerOpts = {
            types: [
            {
                description: "PDF Document (.pdf)",
                accept: {
                "application/*": [".pdf"],
                },
            },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        };*/

        /*const fileHandle = await window.showSaveFilePicker(pickerOpts);
        const fileStream = await fileHandle.createWritable();*/
        
        // Descargar el PDF resultante
        //var blob = new Blob([pdfBytes], { type: 'application/pdf' });

        /*await fileStream.write(blob);
        await fileStream.close();*/

        /*var blobUrl = URL.createObjectURL(blob);
        var link = document.createElement("a"); // Or maybe get it from the current document
        const br = document.createElement("br");
        link.href = blobUrl;
        link.download = "polizaCarro.pdf";
        link.innerHTML = "Descarga Poliza de Carro";
        document.body.appendChild(link); // Or append it whereever you want
        document.body.appendChild(br)*/

    }
    else if(parameters.prefijo == "AXW" && parameters.folio == "353579570"){
    //else if(nombrePDF == 'Motorcycle_2023-formulario'){
        console.log('haciendo poliza de moto')
        const nombreDoc = 'Motorcycle_2023-formulario';

        //los datos a rellenar se obtendrían de la consulta
        const datosPDF = pdf2;

        // Cargar el PDF existente (reemplaza 'ruta-al-pdf.pdf' con la URL o la ruta local de tu PDF)
        //const existingPdfBytes = await fetch(`test/${nombreDoc}.pdf`).then((res) => res.arrayBuffer());
        //console.log('bytes obtenidos: ' , existingPdfBytes)
        const existingPdfBytes = fs.readFileSync(`test/${nombreDoc}.pdf`)

        // Crear un documento PDF desde el PDF existente
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();
        //console.log('cargamos el formulario')

        // Rellenar los campos de formulario en el PDF
        form.getTextField('NombreAsegurado').setText(datosPDF.nombreAsegurado);
        form.getTextField('NumPoliza').setText(datosPDF.numPoliza);
        form.getTextField('TelAsegurado').setText(datosPDF.telAsegurado);
        
        form.flatten()

        return pdfDoc;

        // Generar un nuevo PDF con los campos de formulario llenados
        //const pdfBytes = await pdfDoc.save();

        /*const pickerOpts = {
            types: [
            {
                description: "PDF Document (.pdf)",
                accept: {
                "application/*": [".pdf"],
                },
            },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        };*/

        /*const fileHandle = await window.showSaveFilePicker(pickerOpts);
        const fileStream = await fileHandle.createWritable();*/
        
        // Descargar el PDF resultante
        //var blob = new Blob([pdfBytes], { type: 'application/pdf' });

        /*await fileStream.write(blob);
        await fileStream.close();*/

        /*var blobUrl = URL.createObjectURL(blob);
        var link = document.createElement("a"); // Or maybe get it from the current document
        const br = document.createElement("br");
        link.href = blobUrl;
        link.download = "polizaMoto.pdf";
        link.innerHTML = "Descarga Poliza de Moto";
        document.body.appendChild(link); // Or append it whereever you want
        document.body.appendChild(br)*/
    }
}

app.post("/pdf", async (req, res) => {
    //console.log(req)
    const parameterData = req.body
    var output;
    //console.log(parameterData)
    //leemos el archivo JSON de parametros
    //const jsonString = fs.readFileSync('./parameters.json');
    //const jsonString = fs.readFileSync(req.body.parameters);
    //parseamos el JSON
    //const parameterData = JSON.parse(jsonString);
    //mandamos llamar a la función para llenar el PDF
    if(parameterData.folio == "353579629"){
        output = "test/polizaCarro.pdf"
    }else{
        output = "test/polizaMoto.pdf"
    }
    const pdfDoc = await pdfForm(parameterData);
    await saveFilledForm(pdfDoc, output);
    //buscamos el archivo de salida y lo abrimos en el browser
    var data = fs.readFileSync(`./${output}`);
    res.contentType('application/pdf');
    res.send(data);
    

    //esta es otra forma de enviar el archivo, funciona casi igual
    
    /*var data = fs.createReadStream('./test/output.pdf');
    var stat = fs.statSync('./test/output.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
    data.pipe(res); */
    
})

/*app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
})*/

/*app.get("/", async (req, res) => {
    //console.log(req)
    //const parameterData = req.body
    //console.log(parameterData)
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

    //esta es otra forma de enviar el archivo, funciona casi igual
    
    var data = fs.createReadStream('./test/output.pdf');
    var stat = fs.statSync('./test/output.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
    data.pipe(res); 
    
})*/