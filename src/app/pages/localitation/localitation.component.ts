import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/common/common.service';
import { Local } from 'src/app/models/local';
import { LocalService } from 'src/app/services/local.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-localitation',
  templateUrl: './localitation.component.html',
  styleUrls: ['./localitation.component.css']
})
export class LocalitationComponent implements OnInit {

  locales: Local;

  constructor(
    private localService: LocalService,
    public dialog: MatDialog,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getLocals();
  }

  getLocals() {
    this.localService.getLocales().subscribe(
      data => {
        if ( data.status ) {
          this.commonService.customSortByNumber( data.data, 'sector_id');
          this.locales = data.data;
        }
      }
    );
  }

  openDialog( local: Local ) {
    this.dialog.open( InfoLocal, {
      width: '5',
      data : {
        local
      }
    });
  }

}



@Component({
  selector: 'app-localitation',
  templateUrl: './info-local.dialog.html',
  })
  export class InfoLocal {

    local: Local;

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }


   }
