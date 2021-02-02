import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/common/common.service';
import { ServiceReport } from 'src/app/reports/services-reports';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services: Array<Service>;

  constructor(
    private serviceService: ServiceService,
    private location: Location,
    private commonService: CommonService,
    private serviceReport: ServiceReport
  ) {}

  ngOnInit(): void {
     this.getServices();
  }

  getServices() {
    this.serviceService.getServices().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          data.data = this.commonService.customSortByNumber( data.data, 'service_id' );
          this.services = data.data;
        }
      }
    );
  }

  printServices() {
    this.serviceReport.serviceDocument( this.services );
  }

  getStatus( status ) {
    if ( status === 1 ) {
      return 'Activo';
    } else if ( status === 0) {
      return 'Inactivo';
    }
  }

  setColor( id: number ) {
    if ( id === 1 ) {
      return 'green';
    } else if ( id === 0 ) {
      return 'red';
    }
  }

  return() {
    this.location.back();
  }


}
