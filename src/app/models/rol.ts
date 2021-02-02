export class Rol {

    rol_id: number;
    name: string;
    description: string;
    status: number;
    created_at: Date;
    updated_at: Date;

    constructor( rol ?: any ) {
        this.name = rol.name;
        this.description = rol.description;
        this.status = rol.status;
        this.created_at = rol.created_at;
        this.updated_at = rol.updated_at;
    }
}
