function PrintLabel(labels) {


//Schema


    var labelXml = '\
<?xml version="1.0" encoding="utf-8"?>\
<DieCutLabel Version="8.0" Units="twips">\
	<PaperOrientation>Landscape</PaperOrientation>\
	<Id>Address</Id>\
	<PaperName>30252 Address</PaperName>\
	<DrawCommands>\
		<RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270" />\
	</DrawCommands>\
	<ObjectInfo>\
		<BarcodeObject>\
			<Name>QR</Name>\
			<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			<BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			<LinkedObjectName></LinkedObjectName>\
			<Rotation>Rotation0</Rotation>\
			<IsMirrored>False</IsMirrored>\
			<IsVariable>False</IsVariable>\
			<Text>12345</Text>\
			<Type>Ean8</Type>\
			<Size>Large</Size>\
			<TextPosition>None</TextPosition>\
			<TextFont Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
			<CheckSumFont Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
			<TextEmbedding>Full</TextEmbedding>\
			<ECLevel>0</ECLevel>\
			<HorizontalAlignment>Center</HorizontalAlignment>\
			<QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" />\
		</BarcodeObject>\
		<Bounds X="541.000000000001" Y="510" Width="1935" Height="525" />\
	</ObjectInfo>\
	<ObjectInfo>\
		<TextObject>\
			<Name>FillingID</Name>\
			<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			<BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			<LinkedObjectName></LinkedObjectName>\
			<Rotation>Rotation0</Rotation>\
			<IsMirrored>False</IsMirrored>\
			<IsVariable>False</IsVariable>\
			<HorizontalAlignment>Left</HorizontalAlignment>\
			<VerticalAlignment>Top</VerticalAlignment>\
			<TextFitMode>ShrinkToFit</TextFitMode>\
			<UseFullFontHeight>True</UseFullFontHeight>\
			<Verticalized>False</Verticalized>\
			<StyledText>\
				<Element>\
					<String>Filling ID</String>\
					<Attributes>\
						<Font Family="Arial" Size="16" Bold="True" Italic="False" Underline="False" Strikeout="False" />\
						<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
					</Attributes>\
				</Element>\
			</StyledText>\
		</TextObject>\
		<Bounds X="541.000000000001" Y="173" Width="1815" Height="285" />\
	</ObjectInfo>\
	<ObjectInfo>\
		<TextObject>\
			<Name>Facevalue</Name>\
			<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			<BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			<LinkedObjectName></LinkedObjectName>\
			<Rotation>Rotation0</Rotation>\
			<IsMirrored>False</IsMirrored>\
			<IsVariable>False</IsVariable>\
			<HorizontalAlignment>Left</HorizontalAlignment>\
			<VerticalAlignment>Top</VerticalAlignment>\
			<TextFitMode>ShrinkToFit</TextFitMode>\
			<UseFullFontHeight>True</UseFullFontHeight>\
			<Verticalized>False</Verticalized>\
			<StyledText>\
				<Element>\
					<String>Facevalue</String>\
					<Attributes>\
						<Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
						<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
					</Attributes>\
				</Element>\
			</StyledText>\
		</TextObject>\
		<Bounds X="541.000000000001" Y="1298" Width="1800" Height="180" />\
	</ObjectInfo>\
	<ObjectInfo>\
		<TextObject>\
			<Name>Merchant</Name>\
			<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
			<BackColor Alpha="0" Red="255" Green="255" Blue="255" />\
			<LinkedObjectName></LinkedObjectName>\
			<Rotation>Rotation0</Rotation>\
			<IsMirrored>False</IsMirrored>\
			<IsVariable>False</IsVariable>\
			<HorizontalAlignment>Left</HorizontalAlignment>\
			<VerticalAlignment>Top</VerticalAlignment>\
			<TextFitMode>ShrinkToFit</TextFitMode>\
			<UseFullFontHeight>True</UseFullFontHeight>\
			<Verticalized>False</Verticalized>\
			<StyledText>\
				<Element>\
					<String>Merchant</String>\
					<Attributes>\
						<Font Family="Arial" Size="12" Bold="False" Italic="False" Underline="False" Strikeout="False" />\
						<ForeColor Alpha="255" Red="0" Green="0" Blue="0" />\
					</Attributes>\
				</Element>\
			</StyledText>\
		</TextObject>\
		<Bounds X="541.000000000001" Y="1080" Width="1785" Height="180" />\
	</ObjectInfo>\
</DieCutLabel>';

    var labelSet = new dymo.label.framework.LabelSetBuilder();

    jQuery.each(labels, function (i, v) {

        var record = labelSet.addRecord();
        record.setText("Facevalue", '$' + v.face_value);
        record.setText("Merchant", v.merchants_name);
        record.setText("FillingID", v.filling_id);
        record.setText("QR", v.card_order_card_id);
    });

    // Load Schema
    var barcodeLabel = dymo.label.framework.openLabelXml(labelXml);

    // Get Printer
    var printers = dymo.label.framework.getLabelWriterPrinters();

    if (printers.length == 0) {
        alert("No DYMO printers are installed. Install DYMO printers.");
        return;
    }

    var printer = printers[0];
    var printerName = printer.name;

    try {
        if (!barcodeLabel)
            throw "Load label before printing";

        if (!printerName)
            throw "Select printer.";


        //Print!
        barcodeLabel.print(printerName, '', labelSet);
    }
    catch (e) {
        alert(e.message || e);
    }


    return;

}