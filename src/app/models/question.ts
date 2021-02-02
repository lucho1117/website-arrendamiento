export class Question {

    question_id: number;
    subject: string;
    message: string;
    email: string;
    telephone: number;
    user_id: any;
    rol: string;
    status: number;
    created_at: Date;
    updated_at: Date;
    user: string;

    constructor( question ?: any ) {
        this.subject = question.subject;
        this.message = question.message;
        this.rol = question.rol;
        this.email = question.email;
        this.telephone = question.telephone;
        this.user_id = question.user_id;
        this.status = question.status;
        this.created_at = question.created_at;
        this.updated_at = question.updated_at;
    }
}
