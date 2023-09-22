const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

//Función para llenar el PDF
async function fillPdfForm(input, image, fillData) {
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
module.exports = async function (parameterData) {
    // Convertimos en buffers al PDF e Imagen
    const inputFile = fs.readFileSync(parameterData.input)
    const inputImage = fs.readFileSync(parameterData.image)
    //Llneamos el documento y lo guardamos
	const pdfDoc = await fillPdfForm(inputFile, inputImage, parameterData.fillData);
	await saveFilledForm(pdfDoc, parameterData.output);
}