export class Local {

    local_id: number;
    name: string;
    description: string;
    status: number;
    sector_id: number;
    sector: string;
    inquilino_id: number;
    inquilino: string;
    propietario_id: number;
    propietario: string;
    created_at: Date;
    updated_at: Date;

    constructor( local ?: any ) {
        this.name = local.name;
        this.description = local.description;
        this.status = local.status;
        this.sector_id = local.sector_id;
        this.inquilino_id = local.inquilino_id;
        this.propietario_id = local.propietario_id;
        this.created_at = local.created_at;
        this.updated_at = local.updated_at;
    }
}
