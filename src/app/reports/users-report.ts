import { Injectable } from '@angular/core';
import { Columns, Img, PdfMakeWrapper, Table } from 'pdfmake-wrapper';

@Injectable({
    providedIn: 'root'
  })

export class UsersReport {

    users: any = [];

    constructor() {}

    async usersDocument( users: any ) {
       
        this.users = users;

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
                    text: 'Cantidad de usuarios: ' + this.users.length,
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
                    text:  'Lista de usuarios del sistema',
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
    
        var usersHeader = [
            { text: 'Id', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Nombre', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'DPI', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Dirección', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Email', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Telefono', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' },
            { text: 'Rol', style: 'tableSubHeader', fillColor: '#CCCCCC', alignment: 'left' }

        ];
    
        body.push( usersHeader );
          
            for(var i = 0; i < this.users.length; i++ ) {
                let user = this.users[i];
    
                let item = [
                  { text: user.user_id, style: 'detalle', alignment: 'left' },
                    { text: user.first_name + user.second_name, style: 'detalle', alignment: 'left' },
                    { text: user.dpi, style: 'detalle', alignment: 'left' },
                    { text: user.address, style: 'detalle', alignment: 'left' },  
                    { text: user.email, style: 'detalle', alignment: 'left' },  
                    { text: user.telephone, style: 'detalle', alignment: 'left' },
                    { text: user.rol, style: 'detalle', alignment: 'left' }
                ];
    
                body.push( item );
            }
    
            let empty = [
              {},{},{},{},{},{},{}
          ];
    
          body.push( empty );
    
     
    
          pdf.add(
            new Table( body )
            .style('estiloTabla')
            .color('#444')
            .widths( [ 10, 90, 80, 90, 60, 40, 60 ] )
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
        pdf.create().download('Lista_Usuarios.pdf');
    }
}