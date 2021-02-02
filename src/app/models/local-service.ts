export class LocalServiceService {

    local_service_id: number;
    payment: number;
    file: string;
    month: string;
    local_id: number;
    local: string;
    service_id: number;
    service: string;
    status: number;
    year: string;
    created_at: Date;
    updated_at: Date;

    constructor( local_service ?: any ) {
        this.payment = local_service.payment;
        this.file = local_service.file;
        this.status = local_service.status;
        this.month = local_service.month;
        this.local_id = local_service.local_id;
        this.year = local_service.year;
        this.service_id = local_service.service_id;
        this.created_at = local_service.created_at;
        this.updated_at = local_service.updated_at;
    }
}
