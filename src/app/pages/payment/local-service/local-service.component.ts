import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceLocalService } from 'src/app/services/service-local.service';
import { LocalServiceService } from 'src/app/models/local-service';
import { CommonService } from 'src/app/common/common.service';
import { LocalServiceReport } from 'src/app/reports/local-service-reports';
import { LocalService } from 'src/app/services/local.service';
import { ServiceService } from 'src/app/services/service.service';
import { Local } from 'src/app/models/local';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-local-service',
  templateUrl: './local-service.component.html',
  styleUrls: ['./local-service.component.css']
})
export class LocalServiceComponent implements OnInit {


  localServices: Array<LocalServiceService>;
  locales: any = [];
  services: any = [];

  local_id = 0;
  service_id = 0;
  year = 0;
  month = 'Todos';
  status_id = 2;
  status = [ { status_id: 2, name: 'Todos'}, { status_id: 0, name: 'Cancelados'}, { status_id: 1, name: 'Pendientes'}];
  flagLocalServices: boolean;

  constructor(
    private serviceLocalService: ServiceLocalService,
    private location: Location,
    private commonService: CommonService,
    private localServiceReport: LocalServiceReport,
    private localService: LocalService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
     this.getServices();
     this.getLocales();
     this.getLocalServices( this.local_id, this.service_id, this.year, this.status_id, this.month );
  }

  getLocalServices( local_id: number, service_id: number, year: any, status: any, month: any ) {
    this.serviceLocalService.getLocalServicesFilter( local_id, service_id, year, status, month ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          data.data = this.commonService.customSortByNumber( data.data, 'local_service_id' );
          this.localServices = data.data;
          this.flagLocalServices = this.localServices.length > 0 ? true : false;
        }
      }
    );
  }

  getLocales() {
    this.localService.getLocales().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.locales = data.data;
          this.locales.unshift( {local_id: 0, name: 'Todos'} );
        }
      }
    );
  }

  getServices() {
    this.serviceService.getServices().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.services = data.data;
          this.services.unshift( {service_id: 0, name: 'Todos'} );
        }
      }
    );
  }

  printLocalService() {
    this.localServiceReport.localServiceDocument( this.localServices );
  }

  return() {
    this.location.back();
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



}
