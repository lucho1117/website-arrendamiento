export class Users {

    user_id: number;
    first_name: string;
    second_name: string;
    dpi: number;
    address: string;
    email: string;
    birth_date: Date;
    telephone: string;
    password: string;
    rol_id: number;
    status: number;
    created_at: Date;
    updated_at: Date;
    remember_token: string;
    rol: string;

    constructor( user ?: any ) {
        this.first_name = user.first_name;
        this.second_name = user.second_name;
        this.dpi = user.dpi;
        this.address = user.address;
        this.email = user.email;
        this.birth_date = user.birth_date;
        this.telephone = user.telephone;
        this.password = user.password;
        this.rol_id = user.rol_id;
        this.status = user.status;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
    }

}
