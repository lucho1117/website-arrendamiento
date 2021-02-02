import { Injectable } from '@angular/core';
import { Columns, Img, PdfMakeWrapper, Table } from 'pdfmake-wrapper';

@Injectable({
    providedIn: 'root'
  })

export class CardTypesReport {

    cardType: any = [];

    constructor() {}

    async cardDocument( cardType: any ) {

        this.cardType = cardType;

        const pdf = new PdfMakeWrapper();

        pdf.pageSize('A4');
        pdf.pageOrientation('portrait');
        pdf.pageMargins([50, 5, 50, 50]);
        pdf.add(
            pdf.ln(2)
        );


        pdf.add(
            await new Img( 'https://thumbs.dreamstime.com/b/edificio-comercial-sector-80770105.jpg' )
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
                    text: 'Cantidad de tipos de tarjetas: ' + this.cardType.length,
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
                    text:  'Lista de tipos de tarjeta del establecimiento de comercio',
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

        var cardTypeHeader = [
            { text: 'Id', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Nombre', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Descripción', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Estado', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' }

        ];
    
        body.push( cardTypeHeader );
          
            for(var i = 0; i < this.cardType.length; i++ ) {
                let card_type = this.cardType[i];

                let item = [
                  { text: card_type.card_type_id, style: 'detalle', alignment: 'left' },
                    { text: card_type.name, style: 'detalle', alignment: 'left' },
                    { text: card_type.description, style: 'detalle', alignment: 'left' },
                    { text: this.getStatus( card_type.status ), style: 'detalle', alignment: 'left' }
                ];
    
                body.push( item );
            }
    
            let empty = [
              {},{},{},{}
          ];
    
          body.push( empty );
    
     
    
          pdf.add(
            new Table( body )
            .style('estiloTabla')
            .color('#444')
            .widths( [ 10, 180, 200, 50 ] )
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
        pdf.create().download('Lista_Tipos_Tarjetas.pdf');
    }

    getStatus( status ) {
        if ( status === 1 ) {
          return 'Activo';
        } else {
          return 'Inactivo';
        }
      }
}