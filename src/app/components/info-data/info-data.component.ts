import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-data',
  templateUrl: './info-data.component.html',
  styleUrls: ['./info-data.component.css']
})
export class InfoDataComponent implements OnInit {

  @Input() flagData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
