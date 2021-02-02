import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CardType } from 'src/app/models/card-type';
import Swal from 'sweetalert2';
import { CardTypeService } from 'src/app/services/card-type.service';

@Component({
  selector: 'app-card-type-edit',
  templateUrl: './card-type-edit.component.html',
  styleUrls: ['./card-type-edit.component.css']
})
export class CardTypeEditComponent implements OnInit {

  formCardType: FormGroup;
  cardTypeId: number;
  titleEdit: string;

  constructor(
    private cardTypeService: CardTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {

    this.activatedRoute.params.subscribe( params => {
      this.cardTypeId = params.cardTypeId;
      params.cardTypeId == 0 ? this.titleEdit = 'Agregar tipo de tarjeta' : this.titleEdit = 'Editar tipo de tarjeta';
      this.formCardType = new FormGroup ({
        'card_type_id': new FormControl({value: 0, disabled: true }, Validators.required),
        'name': new FormControl('',  [Validators.required, Validators.minLength(3)]),
        'description': new FormControl('', Validators.required),
        'status': new FormControl(1, Validators.required)
      });

      if ( this.cardTypeId > 0 ) {
        this.getCardType( this.cardTypeId );
      }

    });
   }

  ngOnInit(): void {}


  save() {
    if ( this.formCardType.valid ) {
      const cardType: CardType = this.formCardType.value;
      if ( this.cardTypeId > 0 ) {
        this.update( this.cardTypeId, cardType );
      } else {
        this.add( cardType );
      }
    }
  }

  add( cardType: CardType ) {
    this.cardTypeService.setCardType( cardType ).subscribe(
      data => {
        if ( data.status === 'OK') {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['payment/card-types']);
        } else {
          Swal.fire({ icon: 'error',
          title: data.status,
          text: data.message});
        }
      }
    );
  }

  getCardType( cardTypeId: number ) {
    this.cardTypeService.getCardType( cardTypeId ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.formCardType.patchValue( data.data );
        }
      }
    );
  }

  update( cardTypeId: number, cardType: CardType ) {
    this.cardTypeService.putCardType( cardTypeId, cardType ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['payment/card-types']);
        } else {
          Swal.fire( 'Error!', data.message, 'warning');
        }
      });
  }

  return() {
    this.location.back();
  }

}
