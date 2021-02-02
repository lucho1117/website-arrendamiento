import { Injectable } from '@angular/core';
import { Columns, Img, PdfMakeWrapper, Table } from 'pdfmake-wrapper';


@Injectable({
    providedIn: 'root'
})


export class QuestionReport {

    questions: any = [];

    constructor() { }

    async questionDocument(questions: any) {

        this.questions = questions;

        const pdf = new PdfMakeWrapper();

        pdf.pageSize('A4');
        pdf.pageOrientation('portrait');
        pdf.pageMargins([50, 5, 50, 50]);
        pdf.add(
            pdf.ln(2)
        );


        pdf.add(
            await new Img('https://thumbs.dreamstime.com/b/edificio-comercial-local-80770105.jpg')
                .width(70)
                .margin([-25, -20, -10, -10])
                .build()
        );


        pdf.add(
            new Columns([
                {
                    text: 'Reporte',
                    width: 320
                },
                {
                    text: 'Cantidad de solicitudes: ' + this.questions.length,
                    width: 110
                }
            ])
                .style('header')
                .columnGap(10)
                .end
        );


        pdf.add(
            new Columns([
                {
                    text: 'Lista de solicitudes del establecimiento de comercio',
                    width: 320
                }
            ])
                .style(['header', 'header'])
                .columnGap(10)
                .end
        );

        pdf.add(
            pdf.ln(2)
        );

        var body = [];

        var questionHeader = [
            { text: 'Id', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Asunto', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Email', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Telefono', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Usuario', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Rol', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Estado', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' }
        ];

        body.push(questionHeader);

        for (var i = 0; i < this.questions.length; i++) {
            let question = this.questions[i];

            let item = [
                { text: question.question_id, style: 'detalle', alignment: 'left' },
                { text: question.subject, style: 'detalle', alignment: 'left' },
                { text: question.email, style: 'detalle', alignment: 'left' },
                { text: question.telephone, style: 'detalle', alignment: 'left' },
                { text: question.user, style: 'detalle', alignment: 'left' },
                { text: question.rol, style: 'detalle', alignment: 'left' },
                { text: this.getStatus( question.status ), style: 'detalle', alignment: 'left' }
            ];

            body.push(item);
        }
        let empty = [
            {}, {}, {}, {}, {}, {}, {}
        ];

        body.push(empty);



        pdf.add(
            new Table(body)
                .style('estiloTabla')
                .color('#444')
                .widths([10, 90, 80, 80, 60, 60, 70, 50])
                .end
        );


        pdf.add(
            pdf.ln(2)
        );

        pdf.styles({
            header: {
                fontSize: 14,
                bold: true,
                alignment: 'center'
            },
            centrar: {
                fontSize: 12,
                bold: true,
                alignment: 'center'
            },
            izquierda: {
                fontSize: 12,
                bold: true,
                alignment: 'left'
            },
            derecha: {
                fontSize: 12,
                bold: true,
                alignment: 'right'
            },
            subheader: {
                fontSize: 12,
                bold: true
            },
            estiloTabla: {
                margin: 5
            },
            tableHeader: {
                bold: true,
                fontSize: 10,
                color: 'black'
            },
            tableSubHeader: {
                bold: true,
                fontSize: 9,
                color: 'black'
            },
            detalle: {
                fontSize: 8
            },
            red: {
                bold: true,
                fontSize: 14,
                color: 'red'
            }
        });
        pdf.create().download('Lista_solicitudes.pdf');
    }

    getStatus( status ) {
        if ( status === 1 ) {
          return 'Activo';
        } else if ( status === 2) {
          return 'Pendiente';
        } else if ( status === 3) {
          return 'Cerrada';
        } else if ( status === 0) {
          return 'Inactivo';
        }
      }
}
