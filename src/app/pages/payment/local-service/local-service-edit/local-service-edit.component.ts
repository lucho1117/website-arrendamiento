import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ServiceService } from 'src/app/services/service.service';
import { Local } from 'src/app/models/local';
import { Service } from 'src/app/models/service';
import { ServiceLocalService } from 'src/app/services/service-local.service';
import { LocalService } from 'src/app/services/local.service';
import { LocalServiceService } from 'src/app/models/local-service';

@Component({
  selector: 'app-local-service-edit',
  templateUrl: './local-service-edit.component.html',
  styleUrls: ['./local-service-edit.component.css']
})
export class LocalServiceEditComponent implements OnInit {

  formServiceLocal: FormGroup;
  localServiceId: number;
  titleEdit: string;
  locals: Array<Local>;
  services: Array<Service>;
  // tslint:disable-next-line: max-line-length
  months = [{name: 'Enero'},  {name: 'Febrero'}, {name: 'Marzo'},  {name: 'Abril'}, {name: 'Mayo'},  {name: 'Junio'}, {name: 'Julio'},  {name: 'Agosto'}, {name: 'Septiembre'},  {name: 'Octubre'}, {name: 'Noviembre'},  {name: 'Diciembre'} ];
  numericRegex = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

  constructor(
    private serviceLocalService: ServiceLocalService,
    private localService: LocalService ,
    private serviceService: ServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {

    this.activatedRoute.params.subscribe( params => {
      this.localServiceId = params.localServiceId;
      params.localServiceId == 0 ? this.titleEdit = 'Agregar servicio por local' : this.titleEdit = 'Editar servicio por local';
      this.formServiceLocal = new FormGroup ({
        'local_service_id': new FormControl({value: 0, disabled: true }, Validators.required),
        'payment' : new FormControl(0, [Validators.required, Validators.min(1), Validators.pattern(this.numericRegex)]),
        'month': new FormControl('', Validators.required),
        'local_id': new FormControl('', Validators.required ),
        'service_id': new FormControl('', Validators.required ),
        'year': new FormControl('', Validators.required),
        'file': new FormControl(''),
        'status': new FormControl(1, Validators.required)
      });

      if ( this.localServiceId > 0 ) {
        this.getLocalService( this.localServiceId );
      }

    });
   }

  ngOnInit(): void {
    this.getLocals();
    this.getServices();
  }


  save() {
    if ( this.formServiceLocal.valid ) {
      const local_service: LocalServiceService = this.formServiceLocal.value;
      if ( this.localServiceId > 0 ) {
        this.update( this.localServiceId, local_service );
      } else {
        this.add( local_service );
      }
    }
  }

  add( local_service: LocalServiceService ) {
    this.serviceLocalService.setLocalService( local_service ).subscribe(
      data => {
        if ( data.status === 'OK') {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['payment/local-services']);
        } else {
          Swal.fire({ icon: 'error',
          title: data.status,
          text: data.message});
        }
      }
    );
  }

  getLocalService( localServiceId: number ) {
    this.serviceLocalService.getLocalService( localServiceId ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.formServiceLocal.patchValue( data.data );
        }
      }
    );
  }

  update( localServiceId: number, local_service: LocalServiceService ) {
    this.serviceLocalService.putLocalService( localServiceId, local_service ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['payment/local-services']);
        } else {
          Swal.fire( 'Error!', data.message, 'warning');
        }
      });
  }

  getLocals() {
    this.localService.getLocales().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.locals = data.data;
        }
      }
    );
  }

  getServices() {
    this.serviceService.getServices().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.services = data.data;
        }
      }
    );
  }

  return() {
    this.location.back();
  }

}
