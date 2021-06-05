import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppConfigService } from 'src/app/app-config.service';
import { Users } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin: FormGroup;
  user: Users;
  constructor(
    public appConfigService: AppConfigService,
    private userService: UserService,
    private tostr: ToastrService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      'email': new FormControl(''),
      'password': new FormControl('')
    });
  }

  ngOnInit() {
  }

  login() {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();

    this.user = this.formLogin.value;
    this.userService.postLogin( this.user ).subscribe(
      data => {
        if ( data.status === 'OK') {
          this.tostr.success(data.message);
          this.appConfigService.setCurrentSession(data.data);
          this.router.navigate(['user-profile']);
          Swal.close();
        } else {
          Swal.fire({ icon: 'error',
          title: data.status,
          text: data.message});
        }
      }
    );
  }

  ngOnDestroy() { }

}
