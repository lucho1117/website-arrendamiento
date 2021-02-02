import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/app-config.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ValidadoresService } from 'src/app/services/validadores.service';
import { SendingPasswords } from 'src/app/models/sendingPasswords';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;

  constructor(
    private appConfigService: AppConfigService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUser();
  }


  getUser() {
    this.user = this.appConfigService.getCurrentSession();
  }

  openDialog() {
    // tslint:disable-next-line: no-use-before-declare
    this.dialog.open( NewPassword, {
      width: '70',
      data : {
        user_id: this.user.user_id
      }
    });
  }

  goUserEdit() {
    this.router.navigate(['register/user-edit/' + this.user.user_id ]);
   }


}


@Component({
  selector: 'app-user-profile',
  templateUrl: './new-password.dialog.html',
  })
  // tslint:disable-next-line: component-class-suffix
  export class NewPassword {

    formUserPassword: FormGroup;
    regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;
    user_id = this.data.user_id;

    constructor(
      public dialogRef: MatDialogRef<NewPassword>,
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private userService: UserService,
      private validatorService: ValidadoresService
    ) {
      this.formUserPassword = this.fb.group ({
        'old_password': new FormControl('', Validators.required ),
        'new_password': new FormControl('',  [Validators.required, Validators.pattern(this.regexPassword)]),
        'repit_password': new FormControl('',  [Validators.required, Validators.pattern(this.regexPassword)]),
      }, {
        validators: this.validatorService.passwordsIguales('new_password', 'repit_password')
      });
    }

    save() {
     if ( this.formUserPassword.valid ) {
       const sendingPassword: SendingPasswords = this.formUserPassword.value;
      this.updatePassword( sendingPassword );
     }
    }

    updatePassword ( sendingPassword: SendingPasswords ) {
     this.userService.putPassword( this.user_id, sendingPassword).subscribe(
       data => {
        if ( data.status === 'OK') {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.dialogRef.close();
        } else {
          Swal.fire({ icon: 'error',
              title: data.status,
              text: data.message});
        }
      });
    }

    getOldPasswordValid() {
      return this.formUserPassword.get('old_password').invalid && this.formUserPassword.get('old_password').touched;
    }

    getNewPasswordValid() {
      return this.formUserPassword.get('new_password').invalid && this.formUserPassword.get('new_password').touched;
    }

    getRepitPasswordNoValid() {
      const newPass = this.formUserPassword.get('new_password').value;
      const repitPass = this.formUserPassword.get('repit_password').value;
      return ( newPass === repitPass ? false : true );
    }

   }
