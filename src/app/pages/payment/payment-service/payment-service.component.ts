import { Component, Inject, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/app-config.service';
import { LocalServiceService } from 'src/app/models/local-service';
import { ServiceLocalService } from 'src/app/services/service-local.service';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/common/common.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardTypeService } from 'src/app/services/card-type.service';
import { CardType } from 'src/app/models/card-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-service',
  templateUrl: './payment-service.component.html',
  styleUrls: ['./payment-service.component.css']
})
export class PaymentServiceComponent implements OnInit {


  localServices: Array<LocalServiceService>;
  user_id =  this.appConfigServer.getCurrentSession().user_id;
  rol_id = this.appConfigServer.getCurrentSession().rol_id;

  constructor(
    private serviceLocalService: ServiceLocalService,
    private location: Location,
    private appConfigServer: AppConfigService,
    private commonService: CommonService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if ( this.rol_id === 4) {
      this.getLocalServicesByInquilino( this.user_id );
    } else if ( this.rol_id === 3 ) {
      this.getLocalServicesByPropietario( this.user_id );
    }
  }

  getLocalServicesByInquilino( user_id: number ) {
    this.serviceLocalService.getLocalServiceByInquilino( user_id ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          data.data = this.commonService.customSortByNumber( data.data, 'local_service_id' );
          this.localServices = data.data;
        }
      }
    );
  }

  getLocalServicesByPropietario( user_id: number ) {
    this.serviceLocalService.getLocalServiceByPropietario( user_id ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          data.data = this.commonService.customSortByNumber( data.data, 'local_service_id' );
          this.localServices = data.data;
        }
      }
    );
  }

  openDialog( localService ) {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open( PaymentServiceLocal, {
      width: '70',
      data : {
       localService
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLocalServicesByInquilino( this.user_id );
    });
  }


  getStatus( status ) {
    if ( status === 1 ) {
      return 'Pendiente';
    } else if ( status === 0) {
      return 'Cancelado';
    }
  }

  setColor( id: number ) {
    if ( id === 1 ) {
      return 'red';
    } else if ( id === 0 ) {
      return 'green';
    }
  }

  return() {
    this.location.back();
  }

}


@Component({
  selector: 'app-payment-service',
  templateUrl: './payment-service.dialog.html',
  })
  // tslint:disable-next-line: component-class-suffix
  export class PaymentServiceLocal {

    formPaymentService: FormGroup;
    cardTypes: Array<CardType>;
    localService = {status: 0};
    local_service_id = this.data.localService.local_service_id;

    constructor(
      public dialogRef: MatDialogRef<PaymentServiceLocal>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private cardTypeService: CardTypeService,
      private serviceLocalService: ServiceLocalService
    ) {
      this.getCardTypes();

      this.formPaymentService = new FormGroup ({
        'payment_service_id': new FormControl({value: 0, disabled: true }, Validators.required),
        'card_number': new FormControl('',  [Validators.required, Validators.minLength(3)]),
        'expiration_month': new FormControl('', Validators.required),
        'expiration_year': new FormControl('', Validators.required),
        'postal_code': new FormControl('', Validators.required),
        'local_service_id': new FormControl( this.data.localService.local_service_id ),
        'card_type_id': new FormControl('', Validators.required),
        'status': new FormControl(1, Validators.required)
      });
    }

    getCardTypes() {
      this.cardTypeService.getCardTypes().subscribe(
        data => {
          if ( data.status === 'OK' ) {
            this.cardTypes = data.data;
          }
        }
      );
    }

    payService() {
      if ( this.formPaymentService.valid ) {
        this.serviceLocalService.putLocalServiceStatus( this.local_service_id, this.localService).subscribe(
          data => {
            if ( data.status === 'OK') {
              Swal.fire( 'Exitoso!', /*data.massage*/ 'Transacción exitosa', 'success');
              this.dialogRef.close();
            } else {
              Swal.fire({ icon: 'error',
              title: data.status,
              text: data.message});
            }
          }
        );

      }

    }
   }
