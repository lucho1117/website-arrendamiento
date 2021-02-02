export class UserModule {

    user_module_id: number;
    description: string;
    module_id: number;
    user_id: number;
    created_at: Date;
    updated_at: Date;

    constructor( user_module ?: any ) {

        this.description = user_module.description;
        this.user_id = user_module.user_id;
        this.module_id = user_module.module_id;
        this.created_at = user_module.created_at;
        this.updated_at = user_module.updated_at;
    }

}
