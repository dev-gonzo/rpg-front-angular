import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '@layouts/footer/footer.component';

@Component({
  selector: 'app-layout-blank',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSidenavModule, FooterComponent],
  templateUrl: './layout-blank.component.html',
})
export class LayoutBlankComponent {}
