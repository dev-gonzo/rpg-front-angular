import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { IconGridComponent } from '../icons/grid-icon.component';
import { IconMenuComponent } from '../icons/menu-icon.component';
import { IconPlayComponent } from '../icons/play-icon.component';

@Component({
  selector: 'app-home-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    IconPlayComponent,
    IconGridComponent,
    IconMenuComponent,
    ButtonIconComponent,
  ],
  templateUrl: './home-toolbar.component.html',
})
export class HomeToolbarComponent implements AfterViewInit {
  @Input() activeColumns = 3;
  @Output() columnsChange = new EventEmitter<number>();

  @Input() filter: 'players' | 'npcs' | null = null;
  @Output() filterChange = new EventEmitter<'players' | 'npcs' | null>();

  @Output() reload = new EventEmitter<void>();

  showMenu = false;
  atTop = true;

  setColumns(cols: number) {
    this.activeColumns = cols;
    this.columnsChange.emit(cols);
  }

  setFilter(type: 'players' | 'npcs') {
    this.filter = this.filter === type ? null : type;
    this.filterChange.emit(this.filter);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  ngAfterViewInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    this.atTop = window.scrollY === 0;
  }
}
