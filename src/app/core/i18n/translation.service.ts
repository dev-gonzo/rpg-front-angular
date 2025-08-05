import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly LANG_KEY = 'user-lang';
  private readonly _language = signal<'pt' | 'en'>('pt');
  readonly language = this._language.asReadonly();

  private readonly _ready = signal(false);
  readonly ready = this._ready.asReadonly();

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
  ) {
    const lang = this.getStoredLanguage();
    this.setLanguage(lang); // já chama loadTranslations internamente
  }

  private getStoredLanguage(): 'pt' | 'en' {
    const stored = localStorage.getItem(this.LANG_KEY);
    return stored === 'pt' || stored === 'en' ? stored : 'pt';
  }

  private applyLangToDOM(lang: 'pt' | 'en') {
    document.documentElement.setAttribute(
      'lang',
      lang === 'pt' ? 'pt-BR' : 'en',
    );
  }

  async loadTranslations(lang: 'pt' | 'en'): Promise<void> {
    const files = [
      `assets/i18n/${lang}/common.${lang}.json`,
      `assets/i18n/${lang}/validation.${lang}.json`,
      `assets/i18n/${lang}/placeholder.${lang}.json`,

      `assets/i18n/${lang}/feature/home.${lang}.json`,
      `assets/i18n/${lang}/feature/login.${lang}.json`,

      `assets/i18n/${lang}/shared/character/attributes.${lang}.json`,
    ];

    const translationData = await Promise.all(
      files.map((path) =>
        firstValueFrom(this.http.get<Record<string, any>>(path)),
      ),
    );

    translationData.forEach((data) => {
      this.translate.setTranslation(lang, data, true); // ✅ merge=true
    });

    this.translate.use(lang); // aplica idioma após merge
  }

  async setLanguage(lang: 'pt' | 'en'): Promise<void> {
    this._language.set(lang);
    localStorage.setItem(this.LANG_KEY, lang);
    this.applyLangToDOM(lang);

    await this.loadTranslations(lang);

    this._ready.set(true); // ✅ Marca como pronto
  }

  toggleLanguage(): void {
    const next = this._language() === 'pt' ? 'en' : 'pt';
    this.setLanguage(next);
  }
}
