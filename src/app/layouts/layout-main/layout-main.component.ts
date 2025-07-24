import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SidebarComponent } from '@layouts/sidebar/sidebar.component';
import { NavbarComponent } from '@layouts/navbar/navbar.component';
import { FooterComponent } from '@layouts/footer/footer.component';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './layout-main.component.html',
})
export class LayoutMainComponent {
  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
