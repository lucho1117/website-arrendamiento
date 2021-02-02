import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/app-config.service';
import { QuestionService } from 'src/app/services/question.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {

  formQuestion: FormGroup;
  questionId: number;
  user_id =  this.appConfigServer.getCurrentSession().user_id;

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private appConfigServer: AppConfigService
  ) {

    this.activatedRoute.params.subscribe( params => {
      this.questionId = params.questionId;
      this.formQuestion = new FormGroup ({
        'question_id': new FormControl({value: 0, disabled: true }, Validators.required),
        'subject': new FormControl({value: '', disabled: true }, Validators.required),
        'message': new FormControl({value: '', disabled: true },  [Validators.required, Validators.minLength(3)]),
        'email' : new FormControl({value: '', disabled: true }, [Validators.required, Validators.email]),
        'telephone': new FormControl({value: '', disabled: true }),
        'user_id': new FormControl( {value: this.user_id, disabled: true } ),
        'status': new FormControl( {value: '', disabled: true }, Validators.required)
      });
    });
   }

  ngOnInit(): void {
    this.getQuestion( this.questionId );
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

  return() {
    this.location.back();
  }
}
