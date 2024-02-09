import jsPDF from 'jspdf';
import 'jspdf-autotable';


const exportPDF = (element) => {
  let pdfName = 'export' + (Date.now() / 1000);
  let doc = new jsPDF('l', 'mm', 'a4');
  doc.setFontSize(18);

  if (!element.classList.contains('natcol-table')) {

    let canvasChart = element.querySelector('canvas');
    let chartImage = canvasChart.toDataURL("image/png");
    doc.text("Chart", 10, 10);
    doc.addImage(chartImage, 'JPEG', 15, 40);

  } else {

     let elementHandler = {
      '#ignorePDF': function (element, renderer) {
        return true;
      }
    };

    let source = element.querySelector('.card-body');
    console.log(source);

    doc.autoTable({html: '#mytable', margin: [5, 5, 5, 5]});

    doc.save(pdfName + '.pdf');
          
  }
}

export { exportPDF };
