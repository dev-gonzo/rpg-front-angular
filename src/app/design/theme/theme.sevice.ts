import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FontSize, ThemeMode } from './theme.types';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'user-theme';
  private readonly FONT_KEY = 'user-font';
  private readonly LANG_KEY = 'user-lang';

  private readonly _theme = signal<ThemeMode>(this.loadTheme());
  private readonly _fontSize = signal<FontSize>(this.loadFontSize());
  private readonly _language = signal<string>(this.loadLanguage());

  readonly theme = this._theme.asReadonly();
  readonly fontSize = this._fontSize.asReadonly();
  readonly language = this._language.asReadonly();

  constructor(private _translate: TranslateService) {
    this.applyToDOM();
    this._translate.setDefaultLang('pt');
    this._translate.use(this._language());
  }

  private loadTheme(): ThemeMode {
    const stored = localStorage.getItem(this.THEME_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  }

  private loadFontSize(): FontSize {
    const stored = localStorage.getItem(this.FONT_KEY);
    return ['sm', 'md', 'lg', 'xl'].includes(stored as FontSize)
      ? (stored as FontSize)
      : 'md';
  }

  private loadLanguage(): string {
    const stored = localStorage.getItem(this.LANG_KEY);
    const lang = stored === 'pt' || stored === 'en' ? stored : 'pt';

    document.documentElement.setAttribute(
      'lang',
      lang === 'pt' ? 'pt-BR' : 'en',
    );

    return lang;
  }

  private applyToDOM(): void {
    document.documentElement.setAttribute('data-theme', this._theme());
    document.documentElement.setAttribute('data-font', this._fontSize());
  }

  setTheme(value: ThemeMode): void {
    this._theme.set(value);
    localStorage.setItem(this.THEME_KEY, value);
    this.applyToDOM();
  }

  toggleTheme(): void {
    const next = this._theme() === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  setLanguage(lang: string): void {
    if (lang !== 'pt' && lang !== 'en') return;

    this._language.set(lang);
    localStorage.setItem(this.LANG_KEY, lang);

    this._translate.use(lang);
    const html = document.documentElement;
    html.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
  }

  toggleLanguage(): void {
    const next = this._language() === 'pt' ? 'en' : 'pt';
    this.setLanguage(next);
  }

  setFontSize(size: FontSize): void {
    this._fontSize.set(size);
    localStorage.setItem(this.FONT_KEY, size);
    this.applyToDOM();
  }

  resetFontSize(): void {
    this.setFontSize('md');
  }

  adjustFontSize(direction: 'increase' | 'decrease'): void {
    const allSizes: FontSize[] = ['sm', 'md', 'lg', 'xl'];
    const index = allSizes.indexOf(this._fontSize());
    const nextIndex =
      direction === 'increase'
        ? Math.min(index + 1, allSizes.length - 1)
        : Math.max(index - 1, 0);
    this.setFontSize(allSizes[nextIndex]);
  }
}
