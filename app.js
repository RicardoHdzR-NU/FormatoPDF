// nmp install nodemon express pdf-lib

// npm start para iniciar 
const express = require('express');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

const app = express()

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//Función para llenar el PDF
async function fillPdfForm(input, image,  output) {
	try {
        // Cargamos el PDF
        const pdfDoc = await PDFDocument.load(input)
        // Cargamos la imagen (elegimos la que sea necesaria segun si es jpg o png)
        //const qrImage = await pdfDoc.embedJpg(image)
        const qrImage = await pdfDoc.embedPng(image)

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
        numPolizaField.setText("1")
        nombreAseguradoField.setText("Ricardo Hernandez")
        telAseguradoField.setText("8116610129")
        correoAseguradoField.setText("rhernandez@nationalunity.com.mx")
        direccionAseguradoField.setText("Miguel Angel #6420 Portal de Cumbres")
        agenteField.setText("Agente")
        telAgenteField.setText("Un Numero")
        correoAgenteField.setText("Correo")
        termField.setText("T")
        mMFromField.setText("08")
        dDFromField.setText("23")
        yRFromField.setText("23")
        mMToField.setText("10")
        dDToField.setText("23")
        yRToField.setText("23")
        hRField.setText("05")
        aMPMField.setText("PM")
        añoVehField.setText("2012")
        marcaVehField.setText("Chevrolet")
        modeloVehField.setText("Sonic")
        vINField.setText("1518165100")
        placaEstadoField.setText("TEK-412-A")
        towedField.setText("No")
        premiumField.setText("Si")
        roadAssistField.setText("Si")
        policyFeeField.setText("Si")
        assistPlusField.setText("Si")
        miscField.setText("N/A")
        totalField.setText("$4,815,198")
        applicantField.setText("Ricardo Hernandez Rincon")
        driver2Field.setText("N/A")
        elderUnderageField.setText("N/A")
        applicantBirthField.setText("23/10/01")
        driver2BirthField.setText("N/A")
        eldUndBirthField.setText("N/A")
        applicantLicenseField.setText("Licencia")
        driver2LicenseField.setText("N/A")
        eldUndLicenseField.setText("N/A")
        initialField.setText("R")
        qrImageField.setImage(qrImage)

        form.flatten();

        //Regresamos el formulario lleno
        return pdfDoc;
	} catch (err) {
		console.error('Error:', err);
	}
}
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
async function main() {
    // Definimos la dirección del PDF, de la imagen y la dirección y nombre del archivo de salida
	const input = "test/Polizas_Turista 16jun_Mesa de trabajo 1.pdf";
    const image = "image/Commons_QR_code.png"
	const output = 'test/output.pdf';

    // COnvertimos el buffers al PDF e Imagen
    const inputFile = fs.readFileSync(input)
    const inputImage = fs.readFileSync(image)
    //Llneamos el documento y lo guardamos
	const pdfDoc = await fillPdfForm(inputFile, inputImage, output);
	await saveFilledForm(pdfDoc, output);
}

main().catch((err) => console.error('Error:', err));

// función de llenado de pdf 
/*pdfFiller.fillForm( sourcePDF, destinationPDF, data, function(err) {
    if (err) throw err;
    console.log("In callback (we're done).");
});*/