const PDFDocument = require('pdfkit');

export function makeReceiptPDF(tableNum, date, items, total){
    const doc = new PDFDocument({bufferPages: true, font: 'Courier'});
    doc.fontSize(20).text('RECEIPT table ' + tableNum);
    doc.fontSize(12).text('Date: ' + date);
    doc.fontSize(20).text('--------------------------------------', { align: 'justify'});
    items.forEach((item) => {
        doc.fontSize(12);
        doc.text(' ' + item.name);
        doc.moveUp();
        doc.text('€ ' + item.price + '  ', { align: 'right'});

    })
    doc.fontSize(20).text('--------------------------------------', { align: 'justify'});
    doc.fontSize(15).text('TOTAL:');
    doc.moveUp();
    doc.text('€ ' + total + '  ', { align: 'right' });
    doc.end();
    return doc;
}