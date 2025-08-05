import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '../component/footer/footer.component';
import { NavbarBlankComponent } from "../component/navbar-blank/navbar-blank.component";

@Component({
  selector: 'app-layout-blank',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    NavbarBlankComponent
],
  templateUrl: './layout-blank.component.html',
})
export class LayoutBlankComponent {

}
