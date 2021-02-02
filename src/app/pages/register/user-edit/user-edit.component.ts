import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Users } from 'src/app/models/users';
import { RolService } from 'src/app/services/rol.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  formUser: FormGroup;
  roles: Array<Rol>;
  userId: number;
  titleEdit: string;
  regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;

  constructor(
    private rolService: RolService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {

    this.activatedRoute.params.subscribe( params => {
      this.userId = params.userId;
      params.userId == 0 ? this.titleEdit = 'Agregar Usuario' : this.titleEdit = 'Editar Usuario';
      this.formUser = new FormGroup ({
        'user_id': new FormControl({value: 0, disabled: true }, Validators.required),
        'first_name': new FormControl('',  [Validators.required, Validators.minLength(3)]),
        'second_name': new FormControl('',  [Validators.required, Validators.minLength(3)]),
        'dpi': new FormControl('',  [Validators.required, Validators.minLength(10)]),
        'address': new FormControl('',  [Validators.required, Validators.minLength(10)]),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'birth_date': new FormControl(''),
        'telephone': new FormControl('', Validators.required),
        'password': new FormControl(''),
        'rol_id': new FormControl(0, Validators.required),
        'status': new FormControl(1, Validators.required)
      });
      if ( this.userId > 0 ) {
        this.getUser( this.userId );
      }
    });
   }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.rolService.getRoles().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.roles = data.data;
        }
      }
    );
  }

  save() {
    if ( this.formUser.valid ) {
      const user: Users = this.formUser.value;
      if ( this.userId > 0 ) {
        delete user['password'];
        this.update( this.userId, user );
      } else {
        this.add( user );
      }
    }
  }

  add( user: Users ) {
    this.userService.setUser( user ).subscribe(
      data => {
        if ( data.status === 'OK') {
          Swal.fire( 'Exitoso!', data.massage, 'success');
          this.router.navigate(['register']);
        } else {
          Swal.fire({ icon: 'error',
          title: data.status,
          text: data.message});
        }
      }
    );
  }

  getUser( userId: number ) {
    this.userService.getUser( userId ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.formUser.patchValue( data.data );
        }
      }
    );
  }

  update( userId: number, user: Users ) {
    this.userService.putUser( userId, user ).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          Swal.fire( 'Exitoso!', data.message, 'success');
          this.router.navigate(['register']);
        } else {
          Swal.fire( 'Error!', data.message, 'warning');
        }
      });
  }

  return() {
    this.location.back();
  }


}
