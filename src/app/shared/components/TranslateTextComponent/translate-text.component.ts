import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'translate-text',
  standalone: true,
  template: `
    <span style="color: red">[{{ key }}]</span>
    <span style="color: green">{{ translated }}</span>
  `,
})
export class TranslateTextComponent implements OnInit, OnDestroy {
  @Input({ required: true }) key!: string;

  translated = '';
  private sub?: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    console.log('[TranslateText] ngOnInit, key =', this.key);

    this.translateKey();

    this.sub = this.translate.onLangChange.subscribe((e) => {
      console.log('[TranslateText] language changed, updating key =', this.key);
      this.translateKey();
    });
  }

  private translateKey() {
    if (!this.key) {
      console.warn('[TranslateText] key is empty');
      return;
    }

    this.translate.get(this.key).subscribe({
      next: (res) => {
        console.log('[TranslateText] translated =', res);
        this.translated = res;
      },
      error: (err) => {
        console.error('[TranslateText] translation error:', err);
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
