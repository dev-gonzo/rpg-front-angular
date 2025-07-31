import { InputViewComponent } from "@/shared/components/input-view/input-view.component";
import { Component } from '@angular/core';
import { ContainerComponent } from "@/shared/components/container/containter.component";

@Component({
  selector: 'app-info-view',
  imports: [ContainerComponent, InputViewComponent],
  templateUrl: './info-view.component.html',
})
export class InfoViewComponent {}
