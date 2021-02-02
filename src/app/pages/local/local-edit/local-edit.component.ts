import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sector } from 'src/app/models/sector';
import { Users } from 'src/app/models/users';
import { LocalService } from 'src/app/services/local.service';
import { SectorService } from 'src/app/services/sector.service';
import { Location } from '@angular/common';
import { AppConfigService } from 'src/app/app-config.service';
import { Local } from 'src/app/models/local';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-local-edit',
  templateUrl: './local-edit.component.html',
  styleUrls: ['./local-edit.component.css']
})
export class LocalEditComponent implements OnInit {

  formLocal: FormGroup;
  sectores: Array<Sector>;
  propietarios: Array<Users>;
  inquilinos: Array<Users>;
  localId: number;
  titleEdit: string;

  constructor(
    private sectorService: SectorService,
    private localService: LocalService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private appConfigService: AppConfigService
  ) {

    this.activatedRoute.params.subscribe( params => {
      this.localId = params.localId;
      params.localId == 0 ? this.titleEdit = 'Agregar Local' : this.titleEdit = 'Editar Local';
      this.formLocal = new FormGroup ({
        'local_id': new FormControl({value: 0, disabled: true }, Validators.required),
        'name': new FormControl('',  [Validators.required, Validators.minLength(3)]),
        'description': new FormControl('',  [Validators.required, Validators.minLength(10)]),
        'sector_id': new FormControl('',  Validators.required),
        'inquilino_id': new FormControl('',  Validators.required),
        'propietario_id': new FormControl('',  Validators.required),
        'status': new FormControl(1, Validators.required)
      });
      if ( this.localId > 0 ) {
        this.getLocal( this.localId );
      }
    });
   }

  ngOnInit(): void {
    this.getSectores();
    this.getInquilinos();
    this.getPropietarios();
  }

  getSectores() {
    this.sectorService.getSectores().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.sectores = data.data;
        }
      }
    );
  }

  getInquilinos() {
    this.userService.getUserByRole( this.appConfigService.inquilinoId ).subscribe(
      data => {
        if (data.status === 'OK' ) {
          this.inquilinos = data.data;
        }
      }
    );
  }

  getPropietarios() {
    this.userService.getUserByRole( this.appConfigService.propietarioId ).subscribe(
      data => {
        if (data.status === 'OK' ) {
          this.propietarios = data.data;
        }
      }
    );
  }

  save() {
    if ( this.formLocal.valid ) {
      const local: Local = this.formLocal.value;
      if ( this.localId > 0 ) {
        this.update( this.localId, local );
      } else {
        this.add( local );
      }
    }
  }

  add( local: Local ) {
    this.localService.setLocal( local ).subscribe(
      data => {
        if ( data.status === 'OK') {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['local']);
        } else {
          Swal.fire({ icon: 'error',
          title: data.status,
          text: data.message});
        }
      }
    );
  }

  getLocal( localId: number ) {
    this.localService.getLocal( localId ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.formLocal.patchValue( data.data );
        }
      }
    );
  }

  update( localId: number, local: Local ) {
    this.localService.putLocal( localId, local ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.return();
        } else {
          Swal.fire( 'Error!', data.message, 'warning');
        }
      });
  }

  return() {
    this.location.back();
  }


}
