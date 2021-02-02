import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/app-config.service';
import { CommonService } from 'src/app/common/common.service';
import { Local } from 'src/app/models/local';
import { Sector } from 'src/app/models/sector';
import { LocalesReport } from 'src/app/reports/locales-reports';
import { SectorReport } from 'src/app/reports/sector-reports';
import { LocalService } from 'src/app/services/local.service';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {


  locales: Array<Local>;
  sectores: any = [];
  rol_id = this.appConfigService.getCurrentSession().rol_id;
  user_id = this.appConfigService.getCurrentSession().user_id;
  sector_id = 0;
  flagLocal: boolean;

  constructor(
    private localService: LocalService,
    private sectorService: SectorService,
    private router: Router,
    private appConfigService: AppConfigService,
    private commonService: CommonService,
    private localReport: LocalesReport,
    private sectorReport: SectorReport
  ) {  }

  ngOnInit() {
    if ( this.rol_id <= 2 ) {
      this.getLocales();
      this.getSectores();
    } else if ( this.rol_id === 3) {
      this.getLocalesByPropietario( this.user_id );
    } else if ( this.rol_id === 4) {
      this.getLocalesByInquilino( this.user_id );
    }
  }

  getSectores(): void {
    this.sectorService.getSectores().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          data.data = this.commonService.customSortByNumber( data.data, 'sector_id' );
          this.sectores = data.data;
          this.sectores.unshift( {sector_id: 0, name: 'Todos'} );
        }
      });
   }

  getLocales() {
    this.localService.getLocalesBySector( this.sector_id ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          data.data = this.commonService.customSortByNumber( data.data, 'local_id' );
          this.locales = data.data;
          this.flagLocal = this.locales.length > 0 ? true : false;
        }
      });
   }

   getLocalesByInquilino( inquilinoId: number ) {
     this.localService.getLocalByInquilino( inquilinoId ).subscribe(
       data => {
         if (data.status === 'OK' ) {
           data.data.reverse();
           this.locales = data.data;
         }
       }
     );
   }

   getLocalesByPropietario( propietarioId: number ) {
    this.localService.getLocalByPropietario( propietarioId ).subscribe(
      data => {
        if (data.status === 'OK' ) {
          data.data.reverse();
          this.locales = data.data;
        }
      }
    );
  }

   goLocalEdit( localId: number ) {
    this.router.navigate(['local/local-edit/' + localId ]);
   }

   goSectorEdit( sectorId: number ) {
    this.router.navigate(['local/sector-edit/' + sectorId ]);
   }

   printLocales() {
     this.localReport.localDocument( this.locales );
   }

   printSectores() {
     this.sectorReport.sectorDocument( this.sectores );
   }

  getStatus( status ) {
    if ( status === 1 ) {
      return 'Activo';
    } else {
      return 'Inactivo';
    }
  }

  setColor( id: number ) {
    if ( id === 1 ) {
      return 'green';
    } else {
      return 'red';
    }
  }

}
