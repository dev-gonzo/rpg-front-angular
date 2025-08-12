import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { BaseTranslateComponent } from '@/core/base/base-translate.component';

// Icon components
import { IconPersonComponent } from '../../../../shared/components/icons/person-icon.component';
import { IconGameComponent } from '../../../../shared/components/icons/game-icon.component';
import { IconPlayComponent } from '../../../../shared/components/icons/play-icon.component';
import { IconAttributesComponent } from '../../../../shared/components/icons/attributes-icon.component';
import { IconSkillComponent } from '../../../../shared/components/icons/skill-icon.component';
import { IconWeaponComponent } from '../../../../shared/components/icons/weapon-icon.component';

@Component({
  selector: 'app-home-public',
  standalone: true,
  imports: [
    CommonModule, 
    TranslateModule,
    IconPersonComponent,
    IconGameComponent,
    IconSkillComponent,
    IconAttributesComponent,
    IconPlayComponent,
    IconWeaponComponent
  ],
  templateUrl: './home-public.page.html',
  styleUrl: './home-public.page.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(200, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),

  ]
})
export class HomePublicPageComponent extends BaseTranslateComponent {
  // Loading state
  isLoading = signal(false);

  private router = inject(Router);

  constructor() {
    super(inject(TranslateService), inject(ActivatedRoute));
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
