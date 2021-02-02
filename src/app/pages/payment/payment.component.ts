import { Component, OnInit } from '@angular/core';
import { AppConfigService } from 'src/app/app-config.service';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from '../../variables/charts';
import { ServiceLocalService } from 'src/app/services/service-local.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  rol_id: number;
  public servicesSoples;
  localesReports: any = [];
  servicesSlopes: any = [];
  namesLocales: any = [];
  servicesSlopesLocales: any = [];

  servicesArrendamiento: any = [];
  servicesSlopesArrendamiento: any = [];
  namesLocalesArrendamiento: any = [];

  constructor(
    private appConfigService: AppConfigService,
    private localServiceService: ServiceLocalService
  ) {
    this.rol_id = this.appConfigService.getCurrentSession().rol_id;
   }

  ngOnInit(): void {
   this.getServicesSlopesByLocal();
   this.getServicesSlopesByLocalArrendamiento();
  }

  getServicesSlopesByLocal() {
    this.localServiceService.getServicesSlopesByLocal().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.servicesSlopes = data.data;
          for ( let i = 0; i < this.servicesSlopes.length; i++) {
           this.namesLocales.push( this.servicesSlopes[i].local);
           this.servicesSlopesLocales.push( this.servicesSlopes[i].services );
          }
          this.printDiagramSlopes();
        }
      }
    );
  }

  getServicesSlopesByLocalArrendamiento() {
    this.localServiceService.getServicesSlopesByLocalArrendamiento().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.servicesArrendamiento = data.data;
          for ( let i = 0; i < this.servicesArrendamiento.length; i++) {
           this.namesLocalesArrendamiento.push( this.servicesArrendamiento[i].local);
           this.servicesSlopesArrendamiento.push( this.servicesArrendamiento[i].services );
          }
          this.printDiagramSlopes();
        }
      }
    );
  }

  printDiagramSlopes(): void {
    // Inicia la estructura de las graficas

    const chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    const ordersChart = new Chart(chartOrders, {
      type: 'doughnut',
      options: chartExample1.options,
      data: {
      labels: this.namesLocalesArrendamiento,
      datasets: [{
          label: 'Servicios pendientes: ',
          data: this.servicesSlopesArrendamiento,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
          ],
          borderWidth: 1
      }]
    }
    });

    const servicesSlopes = document.getElementById('services-slopes');

    this.servicesSoples = new Chart(servicesSlopes, {
      type: 'bar',
      options: chartExample2.options,
      data: {
      labels: this.namesLocales,
      datasets: [{
          label: 'Servicios pendientes: ',
          data: this.servicesSlopesLocales,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
      }]
    }
    });
  }


}
