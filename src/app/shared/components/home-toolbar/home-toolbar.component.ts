import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconPlayComponent } from "../icons/play-icon.component";
import { IconGridComponent } from "../icons/grid-icon.component";

@Component({
  selector: 'app-home-toolbar',
  standalone: true,
  imports: [CommonModule, IconPlayComponent, IconGridComponent],
  templateUrl: './home-toolbar.component.html',
})
export class HomeToolbarComponent {
  @Input() activeColumns = 3;
  @Output() columnsChange = new EventEmitter<number>();

  @Input() filter: 'players' | 'npcs' | null = null;
  @Output() filterChange = new EventEmitter<'players' | 'npcs' | null>();

  @Output() reload = new EventEmitter<void>();

  setColumns(cols: number) {
    this.activeColumns = cols;
    this.columnsChange.emit(cols);
  }

  setFilter(type: 'players' | 'npcs') {
    this.filter = this.filter === type ? null : type;
    this.filterChange.emit(this.filter);
  }
}
