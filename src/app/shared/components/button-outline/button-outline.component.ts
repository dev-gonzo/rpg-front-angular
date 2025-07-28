import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-outline',
  templateUrl: './button-outline.component.html',
})
export class ButtonOutlineComponent {
  @Output() handleClick = new EventEmitter<void>();
}
