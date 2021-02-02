export class SendingPasswords {

    old_password: any;
    new_password: any;
    repit_password: any;

    constructor( sendingPasswords ?: any ) {
        this.old_password = sendingPasswords.old_password;
        this.new_password = sendingPasswords.new_password;
        this.repit_password = sendingPasswords.repit_password;
    }
}
