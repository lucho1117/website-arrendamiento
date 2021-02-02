import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }


  public getQuestions() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'question') .pipe(
      catchError(this.handleError.handleError<any>(`getQuestions`))
    );
  }

  public getQuestionsFilter( status: number, rol_id: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'question/status/' + status + '/rol/' + rol_id) .pipe(
      catchError(this.handleError.handleError<any>(`getQuestionsFilter`))
    );
  }

  public getQuestionsByUser( userId: number ) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'question/user/' + userId ) .pipe(
      catchError(this.handleError.handleError<any>(`getQuestionsByUser`))
    );
  }

  public getQuestion(questionId: number) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'question/' + questionId) .pipe(
      catchError(this.handleError.handleError<any>(`getQuestion`))
    );
  }

  public setQuestion(question: Question) {
    return this.http.post<any>( this.appConfig.getUrlBase() + 'question', question) .pipe(
      catchError(this.handleError.handleError<any>(`setQuestion`))
    );
  }

  public putQuestion(questionId: number, question: any) {
    return this.http.put<any>( this.appConfig.getUrlBase() + 'question/' + questionId, question) .pipe(
      catchError(this.handleError.handleError<any>(`putQuestion`))
    );
  }
}
