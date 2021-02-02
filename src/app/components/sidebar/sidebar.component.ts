import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfigService } from 'src/app/app-config.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/register', title: 'Registro',  icon: 'ni-archive-2 text-pink', class: '' },
    { path: '/user-profile', title: 'Home',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/local', title: 'Locales',  icon: 'ni-basket text-green', class: '' },
    { path: '/communication', title: 'Comunicación',  icon: 'ni-chat-round text-blue', class: '' },
    { path: '/payment', title: 'Pagos',  icon: 'ni-money-coins text-yellow', class: '' },
    { path: '/localitation', title: 'Localización',  icon: 'ni-pin-3 text-orange', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  rol_id = this.appConfigService.getCurrentSession().rol_id;

  constructor(
    private router: Router,
    private appConfigService: AppConfigService ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
