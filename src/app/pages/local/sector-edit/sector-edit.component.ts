import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sector } from 'src/app/models/sector';
import { SectorService } from 'src/app/services/sector.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sector-edit',
  templateUrl: './sector-edit.component.html',
  styleUrls: ['./sector-edit.component.css']
})
export class SectorEditComponent implements OnInit {

  formSector: FormGroup;
  sectorId: number;
  titleEdit: string;

  constructor(
    private sectorService: SectorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {

    this.activatedRoute.params.subscribe( params => {
      this.sectorId = params.sectorId;
      params.sectorId == 0 ? this.titleEdit = 'Agregar Sector' : this.titleEdit = 'Editar Sector';
      this.formSector = new FormGroup ({
        'sector_id': new FormControl({value: 0, disabled: true }, Validators.required),
        'name': new FormControl('',  [Validators.required, Validators.minLength(3)]),
        'description': new FormControl('', Validators.required),
        'status': new FormControl(1, Validators.required)
      });

      if ( this.sectorId > 0 ) {
        this.getSector( this.sectorId );
      }

    });
   }

  ngOnInit(): void {}


  save() {
    if ( this.formSector.valid ) {
      const sector: Sector = this.formSector.value;
      if ( this.sectorId > 0 ) {
        this.update( this.sectorId, sector );
      } else {
        this.add( sector );
      }
    }
  }

  add( sector: Sector ) {
    this.sectorService.setSector( sector ).subscribe(
      data => {
        if ( data.status === 'OK') {
          Swal.fire( 'Exitoso!', data.massage, 'success');
          this.router.navigate(['local']);
        } else {
          Swal.fire({ icon: 'error',
          title: data.status,
          text: data.message});
        }
      }
    );
  }

  getSector( sectorId: number ) {
    this.sectorService.getSector( sectorId ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.formSector.patchValue( data.data );
        }
      }
    );
  }

  update( sectorId: number, sector: Sector ) {
    this.sectorService.putSector( sectorId, sector ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['local']);
        } else {
          Swal.fire( 'Error!', data.message, 'warning');
        }
      });
  }

  return() {
    this.location.back();
  }

}
