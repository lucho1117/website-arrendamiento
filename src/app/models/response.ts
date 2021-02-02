export class Response {

    response_id: number;
    subject: string;
    message: string;
    file: string;
    question_id: number;
    status: number;
    created_at: Date;
    updated_at: Date;
    statusQuestion: any;

    constructor( question ?: any ) {
        this.subject = question.subject;
        this.message = question.message;
        this.file = question.file;
        this.question_id = question.question_id;
        this.status = question.status;
        this.created_at = question.created_at;
        this.updated_at = question.updated_at;
    }
}
