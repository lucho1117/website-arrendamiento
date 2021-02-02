import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/app-config.service';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseService } from 'src/app/services/response.service';
import { Response } from 'src/app/models/response';
import { CommonService } from 'src/app/common/common.service';
import { QuestionReport } from 'src/app/reports/questionReport';


@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {

  questions: Array<Question>;
  user: any;
  flagInquilino = false;
  flagAdmin = false;
  status = [{ status_id: 0, name: 'Inactivo' }, { status_id: 1, name: 'Activo' }, { status_id: 2, name: 'Pendientes'}, { status_id: 3, name: 'Cerradas'}, { status_id: 4, name: 'Todos'}];
  roles = [{rol_id: 0, name: 'Todos'}, {rol_id: 3, name: 'Propietario'}, {rol_id: 4, name: 'Inquilino'}];
  status_id = 4;
  rol_id = 0;
  flagQuestions: boolean;

  constructor(
    private questionService: QuestionService,
    private appConfigService: AppConfigService,
    public dialog: MatDialog,
    private commonService: CommonService,
    private questionReport: QuestionReport
  ) {
    this.user = this.appConfigService.getCurrentSession();

  }

  ngOnInit(): void {
    if ( this.user.rol_id <= 2 ) {
      this.getQuestions( this.status_id, this.rol_id );
      this.flagAdmin = true;
    } else {
      this.getQuestionsByUser( this.user.user_id );
      this.flagInquilino = true;
    }
  }

  getQuestions( status_id: number, rol_id: number ) {
    this.questionService.getQuestionsFilter( status_id, rol_id ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          data.data = this.commonService.customSortByNumber( data.data, 'question_id' );
          this.questions = data.data;
          this.flagQuestions = this.questions.length > 0 ? true : false;
        }
      }
    );
  }

  getQuestionsByUser( userId: number ) {
    this.questionService.getQuestionsByUser( userId ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          data.data = this.commonService.customSortByNumber( data.data, 'question_id' );
          this.questions = data.data;
          this.flagQuestions = this.questions.length > 0 ? true : false;
        }
      }
    );
  }

  openDialog( questionId: number ) {
    // tslint:disable-next-line: no-use-before-declare
    this.dialog.open( ResponsesQuestion, {
      width: '5',
      data : {
        question_id: questionId,
        rol_id: this.user.rol_id
      }
    });
  }

  printQuestions() {
    this.questionReport.questionDocument( this.questions );
  }

  getStatus( status ) {
    if ( status === 1 ) {
      return 'Activo';
    } else if ( status === 2) {
      return 'Pendiente';
    } else if ( status === 3) {
      return 'Cerrada';
    } else if ( status === 0) {
      return 'Inactivo';
    }
  }

  setColor( id: number ) {
    if ( id === 1 ) {
      return 'blue';
    } else if ( id === 2) {
      return 'green';
    } else if ( id === 3 || id === 0 ) {
      return 'red';
    }
  }


}




@Component({
  selector: 'app-communication',
  templateUrl: './responses.dialog.html',
  })
  // tslint:disable-next-line: component-class-suffix
  export class ResponsesQuestion {

    responses: Array<Response>;

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private responseService: ResponseService
    ) {
      this.getResponses();
    }

    getResponses() {
      this.responseService.getResponsesByQuestion( this.data.question_id ).subscribe(
        data => {
          if ( data.status === 'OK') {
            data.data.reverse();
            this.responses = data.data;
          }
        }
      );
    }

    getStatus( status ) {
      if ( status === 1 ) {
        return 'Activo';
      } else if ( status === 0) {
        return 'Inactivo';
      }
    }

    setColor( id: number ) {
      if ( id === 1 || id === 2 ) {
        return 'green';
      } else if ( id === 3 || id === 0 ) {
        return 'red';
      }
    }

   }
