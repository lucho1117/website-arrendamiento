import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  
  public getResponses() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'response') .pipe(
      catchError(this.handleError.handleError<any>(`getResponses`))
    );
  }

  public getResponse(responseId: number) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'response/' + responseId) .pipe(
      catchError(this.handleError.handleError<any>(`getResponse`))
    );
  }

  public getResponsesByQuestion( questionId: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'response/question/' + questionId ).pipe(
      catchError(this.handleError.handleError<any>(`getResponseByQuestion`))
    );
  }

  public setResponse(response: Response) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'response', response) .pipe(
      catchError(this.handleError.handleError<any>(`setResponse`))
    );
  }

  public putResponse(responseId: number, response: Response) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'response/' + responseId, response) .pipe(
      catchError(this.handleError.handleError<any>(`putResponse`))
    );
  }
}
