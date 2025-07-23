import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'user-theme';
  private readonly FONT_KEY = 'user-font';

  setTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  getSavedTheme(): 'light' | 'dark' {
    return (localStorage.getItem(this.THEME_KEY) as 'light' | 'dark') || 'light';
  }

  setFontSize(size: 'sm' | 'md' | 'lg' | 'xl') {
    document.documentElement.setAttribute('data-font', size);
    localStorage.setItem(this.FONT_KEY, size);
  }

  getSavedFontSize(): 'sm' | 'md' | 'lg' | 'xl' {
    return (localStorage.getItem(this.FONT_KEY) as any) || 'md';
  }
}
