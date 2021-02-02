export class Sector {

    sector_id: number;
    name: string;
    description: string;
    status: number;
    created_at: Date;
    updated_at: Date;

    constructor( sector ?: any ) {
        this.name = sector.name;
        this.description = sector.description;
        this.status = sector.status;
        this.created_at = sector.created_at;
        this.updated_at = sector.updated_at;
    }
}
