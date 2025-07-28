// not-found.component.ts
import { Component, inject } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGavel, faGem, faShieldHalved, faSkull, faHatWizard } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './not-found.page.html',
})
export class NotFoundPage {
  private library = inject(FaIconLibrary);

  constructor() {
    this.library.addIcons(faGem , faShieldHalved,faSkull,faGavel, faHatWizard);
  }
}
