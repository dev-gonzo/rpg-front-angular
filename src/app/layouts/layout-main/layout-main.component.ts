import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '../component/footer/footer.component';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { SidebarComponent } from '../component/sidebar/sidebar.component';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
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
