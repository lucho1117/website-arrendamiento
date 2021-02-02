import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolService } from 'src/app/services/rol.service';
import { Location } from '@angular/common';
import { Rol } from 'src/app/models/rol';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol-edit',
  templateUrl: './rol-edit.component.html',
  styleUrls: ['./rol-edit.component.css']
})
export class RolEditComponent implements OnInit {

  formRol: FormGroup;
  rolId: number;
  titleEdit: string;

  constructor(
    private rolService: RolService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {

    this.activatedRoute.params.subscribe( params => {
      this.rolId = params.rolId;
      params.rolId == 0 ? this.titleEdit = 'Agregar Rol' : this.titleEdit = 'Editar Rol';
      this.formRol = new FormGroup ({
        'rol_id': new FormControl({value: 0, disabled: true }, Validators.required),
        'name': new FormControl('',  [Validators.required, Validators.minLength(3)]),
        'description': new FormControl('', Validators.required),
        'status': new FormControl(1, Validators.required)
      });

      if ( this.rolId > 0 ) {
        this.getRol( this.rolId );
      }

    });
   }

  ngOnInit(): void {}


  save() {
    if ( this.formRol.valid ) {
      const rol: Rol = this.formRol.value;
      if ( this.rolId > 0 ) {
        this.update( this.rolId, rol );
      } else {
        this.add( rol );
      }
    }
  }

  add( rol: Rol ) {
    this.rolService.setRol( rol ).subscribe(
      data => {
        if ( data.status === 'OK') {
          Swal.fire( 'Exitoso!', data.massage, 'success');
          this.router.navigate(['register']);
        } else {
          Swal.fire({ icon: 'error',
          title: data.status,
          text: data.message});
        }
      }
    );
  }

  getRol( rolId: number ) {
    this.rolService.getRol( rolId ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.formRol.patchValue( data.data );
        }
      }
    );
  }

  update( rolId: number, rol: Rol ) {
    this.rolService.putRol( rolId, rol ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['register']);
        } else {
          Swal.fire( 'Error!', data.message, 'warning');
        }
      });
  }

  return() {
    this.location.back();
  }


}
