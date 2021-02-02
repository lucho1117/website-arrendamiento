import { Component, OnInit } from '@angular/core';
import { CardType } from 'src/app/models/card-type';
import { CardTypeService } from 'src/app/services/card-type.service';
import { Location } from '@angular/common';
import { CommonService } from 'src/app/common/common.service';
import { CardTypesReport } from 'src/app/reports/card-types-reports';

@Component({
  selector: 'app-card-type',
  templateUrl: './card-type.component.html',
  styleUrls: ['./card-type.component.css']
})
export class CardTypeComponent implements OnInit {

  cardTypes: Array<CardType>;

  constructor(
    private cardTypeService: CardTypeService,
    private location: Location,
    private commonService: CommonService,
    private cardTypesReport: CardTypesReport
  ) {}

  ngOnInit(): void {
     this.getCardTypes();
  }

  getCardTypes() {
    this.cardTypeService.getCardTypes().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          data.data = this.commonService.customSortByNumber( data.data, 'card_type_id' );
          this.cardTypes = data.data;
        }
      }
    );
  }

  printCardTypes() {
    this.cardTypesReport.cardDocument( this.cardTypes );
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
