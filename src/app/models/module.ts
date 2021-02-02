export class Module {

    module_id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;

    constructor( module ?: any ) {
        this.name = module.name;
        this.description = module.description;
        this.created_at = module.created_at;
        this.updated_at = module.updated_at;
    }

}
