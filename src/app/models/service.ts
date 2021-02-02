export class Service {

    service_id: number;
    name: string;
    description: string;
    status: number;
    created_at: Date;
    updated_at: Date;

    constructor( service ?: any ) {
        this.name = service.name;
        this.description = service.description;
        this.status = service.status;
        this.created_at = service.created_at;
        this.updated_at = service.updated_at;
    }
}
