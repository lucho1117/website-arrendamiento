import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {

  formService: FormGroup;
  serviceId: number;
  titleEdit: string;

  constructor(
    private serviceService: ServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {

    this.activatedRoute.params.subscribe( params => {
      this.serviceId = params.serviceId;
      params.serviceId == 0 ? this.titleEdit = 'Agregar Sevicio' : this.titleEdit = 'Editar Sevicio';
      this.formService = new FormGroup ({
        'service_id': new FormControl({value: 0, disabled: true }, Validators.required),
        'name': new FormControl('',  [Validators.required, Validators.minLength(3)]),
        'description': new FormControl('', Validators.required),
        'status': new FormControl(1, Validators.required)
      });

      if ( this.serviceId > 0 ) {
        this.getService( this.serviceId );
      }

    });
   }

  ngOnInit(): void {}


  save() {
    if ( this.formService.valid ) {
      const service: Service = this.formService.value;
      if ( this.serviceId > 0 ) {
        this.update( this.serviceId, service );
      } else {
        this.add( service );
      }
    }
  }

  add( service: Service ) {
    this.serviceService.setService( service ).subscribe(
      data => {
        if ( data.status === 'OK') {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['payment/services']);
        } else {
          Swal.fire({ icon: 'error',
          title: data.status,
          text: data.message});
        }
      }
    );
  }

  getService( serviceId: number ) {
    this.serviceService.getService( serviceId ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.formService.patchValue( data.data );
        }
      }
    );
  }

  update( serviceId: number, service: Service ) {
    this.serviceService.putService( serviceId, service ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['payment/services']);
        } else {
          Swal.fire( 'Error!', data.message, 'warning');
        }
      });
  }

  return() {
    this.location.back();
  }
}
