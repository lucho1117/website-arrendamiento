export class PaymentService {

    payment_service_id: number;
    card_number: number;
    expiration: string;
    postal_code: string;
    local_service_id: number;
    card_type_id: number;
    created_at: Date;
    updated_at: Date;

    constructor( payment_service ?: any ) {
        this.card_number = payment_service.card_number;
        this.expiration = payment_service.expiration;
        this.postal_code = payment_service.postal_code;
        this.local_service_id = payment_service.local_service_id;
        this.card_type_id = payment_service.card_type_id;
        this.created_at = payment_service.created_at;
        this.updated_at = payment_service.updated_at;
    }
}
