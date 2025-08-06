import { Component, inject } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faGavel,
  faGem,
  faShieldHalved,
  faSkull,
  faHatWizard,
} from '@fortawesome/free-solid-svg-icons';
import { IconGameComponent } from '@/shared/components/icons/game-icon.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface NotFoundMessage {
  TITLE: string;
  DESCRIPTION: string;
  ICON_NUMBER: number;
}
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [FontAwesomeModule, IconGameComponent, TranslateModule],
  templateUrl: './not-found.page.html',
})
export class NotFoundPage {
  private translate = inject(TranslateService);
  private library = inject(FaIconLibrary);

  public selectedMessage!: {
    TITLE: string;
    DESCRIPTION: string;
    ICON_NUMBER: number;
  };

  constructor() {
    this.translate.get('MSG.HTTP.NOT_FOUND').subscribe((messages: any[]) => {
      this.selectedMessage = messages[20]; // ← testando uma específica
    });
  }

  // constructor() {
  //   this.library.addIcons(faGem, faShieldHalved, faSkull, faGavel, faHatWizard);

  //   // Carrega e escolhe uma das mensagens do arquivo de tradução
  //   this.translate.get('MSG.HTTP.NOT_FOUND').subscribe((messages: any[]) => {
  //     const index = Math.floor(Math.random() * messages.length);
  //     this.selectedMessage = messages[index];
  //   });
  // }
}
