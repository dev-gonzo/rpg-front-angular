import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '../component/footer/footer.component';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { SidebarComponent } from '../component/sidebar/sidebar.component';
import { IconCloseComponent } from '@/shared/components/icons/close-icon.component';

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    IconCloseComponent,
  ],
  templateUrl: './layout-main.component.html',
})
export class LayoutMainComponent {
  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggleBodyScroll(this.isSidebarOpen);
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
    this.toggleBodyScroll(false);
  }

  private toggleBodyScroll(disableScroll: boolean): void {
    if (disableScroll) {
      document.body.classList.add('offcanvas-open');
    } else {
      document.body.classList.remove('offcanvas-open');
    }
  }
}
