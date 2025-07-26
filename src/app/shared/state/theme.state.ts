import { Injectable, signal } from '@angular/core';

import { FontSize, ThemeMode } from '../../design/theme/theme.types';

@Injectable({ providedIn: 'root' })
export class ThemeState {
  private readonly THEME_KEY = 'user-theme';
  private readonly FONT_KEY = 'user-font';

  private readonly _theme = signal<ThemeMode>(this.loadTheme());
  private readonly _fontSize = signal<FontSize>(this.loadFontSize());

  readonly theme = this._theme.asReadonly();
  readonly fontSize = this._fontSize.asReadonly();

  constructor() {
    this.applyToDOM();
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
