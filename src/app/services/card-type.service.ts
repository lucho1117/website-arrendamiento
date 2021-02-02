import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { CardType } from '../models/card-type';

@Injectable({
  providedIn: 'root'
})
export class CardTypeService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getCardTypes() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'card_type') .pipe(
      catchError(this.handleError.handleError<any>(`getCardTypes`))
    );
  }

  public getCardType( cardTypeId: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'card_type/' + cardTypeId) .pipe(
      catchError(this.handleError.handleError<any>(`getCardType`))
    );
  }

  public setCardType( card_type: CardType ) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'card_type', card_type) .pipe(
      catchError(this.handleError.handleError<any>(`setCardType`))
    );
  }

  public putCardType( cardTypeId: number, card_type: CardType ) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'card_type/' + cardTypeId, card_type) .pipe(
      catchError(this.handleError.handleError<any>(`putCardType`))
    );
  }

}
