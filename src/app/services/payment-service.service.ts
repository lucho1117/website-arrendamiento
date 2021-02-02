import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { PaymentService } from '../models/payment-service';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getPaymentServices() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'payment_service') .pipe(
      catchError(this.handleError.handleError<any>(`getPaymentServices`))
    );
  }

  public getPaymentService( payment_service_id: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'payment_service/' + payment_service_id) .pipe(
      catchError(this.handleError.handleError<any>(`getPaymentService`))
    );
  }

  public setPaymentService( payment_service: PaymentService ) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'payment_service', payment_service) .pipe(
      catchError(this.handleError.handleError<any>(`setPaymentService`))
    );
  }

  public putPaymentService( payment_service_id: number, payment_service: PaymentService ) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'payment_service/' + payment_service_id, payment_service) .pipe(
      catchError(this.handleError.handleError<any>(`putPaymentService`))
    );
  }

}
