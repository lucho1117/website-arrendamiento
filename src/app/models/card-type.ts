export class CardType {

    card_type_id: number;
    name: string;
    description: string;
    status: number;
    created_at: Date;
    updated_at: Date;

    constructor( card_type ?: any ) {
        this.name = card_type.name;
        this.description = card_type.description;
        this.status = card_type.status;
        this.created_at = card_type.created_at;
        this.updated_at = card_type.updated_at;
    }
}
