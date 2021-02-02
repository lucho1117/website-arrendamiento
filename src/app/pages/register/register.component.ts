import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { CommonService } from 'src/app/common/common.service';
import { Rol } from 'src/app/models/rol';
import { Users } from 'src/app/models/users';
import { UsersReport } from 'src/app/reports/users-report';
import { RolService } from 'src/app/services/rol.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  users: Array<Users>;
  roles: any = [];
  rol_id = 0;
  flagUsers: boolean;

  constructor(
    private rolService: RolService,
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    private usersReport: UsersReport
  ) {  }

  ngOnInit() {
    this.getRoles();
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUserByRole( this.rol_id).subscribe(
      data => {
        if ( data.status === 'OK' ) {
          data.data = this.commonService.customSortByNumber( data.data, 'user_id' );
          this.users = data.data;
          this.flagUsers = this.users.length > 0 ? true : false;
        }
      });
   }

  getRoles() {
    this.rolService.getRoles().subscribe(
      data => {
        if ( data.status === 'OK' ) {
          this.roles = data.data;
          this.roles.unshift( {rol_id: 0, name: 'Todos'} );
        }
      });
   }

   goUserEdit( userId: number ) {
    this.router.navigate(['register/user-edit/' + userId ]);
   }

   goRolEdit( rolId: number ) {
    this.router.navigate(['register/rol-edit/' + rolId ]);
   }

  getStatus( status ) {
    if ( status === 1 ) {
      return 'Activo';
    } else {
      return 'Inactivo';
    }
  }

  setColor( id: number ) {
    if ( id === 1 ) {
      return 'green';
    } else {
      return 'red';
    }
  }

  printUsers() {
    this.usersReport.usersDocument( this.users );
  }

  }
