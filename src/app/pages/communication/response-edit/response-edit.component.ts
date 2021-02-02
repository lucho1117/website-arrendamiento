import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseService } from 'src/app/services/response.service';
import { Location } from '@angular/common';
import { Response } from 'src/app/models/response';
import Swal from 'sweetalert2';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-response-edit',
  templateUrl: './response-edit.component.html',
  styleUrls: ['./response-edit.component.css']
})
export class ResponseEditComponent implements OnInit {

  formResponse: FormGroup;
  responseId: number;
  questionId: number;
  titleEdit: string;
  question: Question;


  constructor(
    private responseService: ResponseService,
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {

    this.activatedRoute.params.subscribe( params => {

      this.responseId = params.responseId;
      this.questionId = params.questionId;

      params.responseId == 0 ? this.titleEdit = 'Agregar Respuesta' : this.titleEdit = 'Editar Respuesta';
      this.formResponse = new FormGroup ({
        'response_id': new FormControl({value: 0, disabled: true }, Validators.required),
        'subject': new FormControl('',  [Validators.required, Validators.minLength(3)]),
        'message': new FormControl('', Validators.required),
        'file': new FormControl(''),
        'question_id': new FormControl( this.questionId ),
        'status': new FormControl(params.status, Validators.required),
        'statusQuestion': new FormControl(1)
      });

      if ( this.responseId > 0 ) {
        this.getResponse( this.responseId );
      }

    });
   }

  ngOnInit(): void {
    this.getQuestion();
  }


  save() {
    if ( this.formResponse.valid ) {
      this.question.status = this.formResponse.get('statusQuestion').value;
      const response: Response = this.formResponse.value;
      delete response.statusQuestion;
      if ( this.responseId > 0 ) {
        this.update( this.responseId, response );
      } else {
        this.add( response );
      }
    }
  }

  add( response: Response ) {
    this.responseService.setResponse( response ).subscribe(
      data => {
        if ( data.status === 'OK') {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.updateQuestion();
        } else {
          Swal.fire({ icon: 'error',
          title: data.status,
          text: data.message});
        }
      }
    );
  }

  getResponse( responseId: number ) {
    this.responseService.getResponse( responseId ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.formResponse.patchValue( data.data );
        }
      }
    );
  }

  update( responseId: number, response: Response ) {
    this.responseService.putResponse( responseId, response ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.updateQuestion();
        } else {
          Swal.fire( 'Error!', data.message, 'warning');
        }
      });
  }

  getQuestion() {
    this.questionService.getQuestion( this.questionId ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.question = data.data;
        }
      }
    );
  }

  updateQuestion () {
    delete this.question.created_at;
    delete this.question.question_id;
    delete this.question.updated_at;

    this.questionService.putQuestion( this.questionId, this.question ).subscribe(
      data => {
        if (data.status === 'OK') {
          this.router.navigate(['communication']);
        }
      }
    );
  }

  return() {
    this.location.back();
  }


}
