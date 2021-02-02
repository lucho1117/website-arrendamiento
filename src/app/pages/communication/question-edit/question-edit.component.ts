import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { Location } from '@angular/common';
import { AppConfigService } from 'src/app/app-config.service';
import { Question } from 'src/app/models/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {

  formQuestion: FormGroup;
  questionId: number;
  titleEdit: string;
  user_id =  this.appConfigServer.getCurrentSession().user_id;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private appConfigServer: AppConfigService
  ) {

    this.activatedRoute.params.subscribe( params => {
      this.questionId = params.questionId;
      params.questionId == 0 ? this.titleEdit = 'Agregar Pregunta' : this.titleEdit = 'Editar Pregunta';
      this.formQuestion = new FormGroup ({
        'question_id': new FormControl({value: 0, disabled: true }, Validators.required),
        'subject': new FormControl('', Validators.required),
        'message': new FormControl('',  [Validators.required, Validators.minLength(10)]),
        'email' : new FormControl('', [Validators.required, Validators.email]),
        'telephone': new FormControl(''),
        'user_id': new FormControl( this.user_id ),
        'status': new FormControl(1, Validators.required)
      });

      if ( this.questionId > 0 ) {
        this.getQuestion( this.questionId );
      }

    });
   }

  ngOnInit(): void {}


  save() {
    if ( this.formQuestion.valid ) {
      const question: Question = this.formQuestion.value;
      if ( this.questionId > 0 ) {
        this.update( this.questionId, question );
      } else {
        this.add( question );
      }
    }
  }

  add( question: Question ) {
    this.questionService.setQuestion( question ).subscribe(
      data => {
        if ( data.status === 'OK') {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['communication']);
        } else {
          Swal.fire({ icon: 'error',
          title: data.status,
          text: data.message});
        }
      }
    );
  }

  getQuestion( questionId: number ) {
    this.questionService.getQuestion( questionId ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.formQuestion.patchValue( data.data );
        }
      }
    );
  }

  update( questionId: number, question: Question ) {
    this.questionService.putQuestion( questionId, question ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['communication']);
        } else {
          Swal.fire( 'Error!', data.message, 'warning');
        }
      });
  }

  return() {
    this.location.back();
  }
}
