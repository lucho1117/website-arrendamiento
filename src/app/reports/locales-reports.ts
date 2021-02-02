import { Injectable } from '@angular/core';
import { Columns, Img, PdfMakeWrapper, Table } from 'pdfmake-wrapper';

@Injectable({
    providedIn: 'root'
  })

export class LocalesReport {

    locales: any = [];

    constructor() {}

    async localDocument( locales: any ) {

        this.locales = locales;

        const pdf = new PdfMakeWrapper();

        pdf.pageSize('A4');
        pdf.pageOrientation('portrait');
        pdf.pageMargins([50, 5, 50, 50]);
        pdf.add(
            pdf.ln(2)
        );


        pdf.add(
            await new Img( 'https://thumbs.dreamstime.com/b/edificio-comercial-local-80770105.jpg' )
            .width(70)
            .margin([-25,-20,-10,-10])
            .build()
        );


        pdf.add(
            new Columns([
                {
                    text: 'Reporte',
                    width: 320
                },
                {
                    text: 'Cantidad de locales: ' + this.locales.length,
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
                    text:  'Lista de locales del establecimiento de comercio',
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

        var localHeader = [
            { text: 'Id', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Nombre', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Descripción', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Inquilino', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Propietario', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Sector', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' }

        ];
    
        body.push( localHeader );
          
            for(var i = 0; i < this.locales.length; i++ ) {
                let local = this.locales[i];

                let item = [
                  { text: local.local_id, style: 'detalle', alignment: 'left' },
                    { text: local.name, style: 'detalle', alignment: 'left' },
                    { text: local.description, style: 'detalle', alignment: 'left' },
                    { text: local.inquilino, style: 'detalle', alignment: 'left' },
                    { text: local.propietario, style: 'detalle', alignment: 'left' },
                    { text: local.sector, style: 'detalle', alignment: 'left' }
                ];
    
                body.push( item );
            }
    
            let empty = [
              {},{},{},{},{},{}
          ];
    
          body.push( empty );
    
     
    
          pdf.add(
            new Table( body )
            .style('estiloTabla')
            .color('#444')
            .widths( [ 10, 90, 130, 80, 60, 60, 70 ] )
            .end
        )
    
        
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
                bold:true,
                fontSize: 14,
                color: 'red'
            }
        });
        pdf.create().download('Lista_Locales.pdf');
    }
}