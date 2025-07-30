import { ThemeService } from "./theme.sevice";


describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    service = new ThemeService();
  });

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-font');
  });

  it('deve inicializar com tema "dark" se não houver valor salvo', () => {
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('deve carregar tema salvo do localStorage', () => {
    localStorage.setItem('user-theme', 'light');
    const s = new ThemeService();
    expect(s.theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('deve carregar fontSize salvo do localStorage', () => {
    localStorage.setItem('user-font', 'lg');
    const s = new ThemeService();
    expect(s.fontSize()).toBe('lg');
    expect(document.documentElement.getAttribute('data-font')).toBe('lg');
  });

  it('deve alterar o tema com setTheme()', () => {
    service.setTheme('light');
    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('user-theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('deve alternar entre "light" e "dark" com toggleTheme()', () => {
    const initial = service.theme();
    service.toggleTheme();
    expect(service.theme()).not.toBe(initial);
  });

  it('deve alterar tamanho da fonte com setFontSize()', () => {
    service.setFontSize('xl');
    expect(service.fontSize()).toBe('xl');
    expect(localStorage.getItem('user-font')).toBe('xl');
    expect(document.documentElement.getAttribute('data-font')).toBe('xl');
  });

  it('deve resetar o tamanho da fonte para "md"', () => {
    service.setFontSize('xl');
    service.resetFontSize();
    expect(service.fontSize()).toBe('md');
  });

  it('deve aumentar o tamanho da fonte com adjustFontSize("increase")', () => {
    service.setFontSize('md');
    service.adjustFontSize('increase');
    expect(service.fontSize()).toBe('lg');
  });

  it('deve diminuir o tamanho da fonte com adjustFontSize("decrease")', () => {
    service.setFontSize('lg');
    service.adjustFontSize('decrease');
    expect(service.fontSize()).toBe('md');
  });

  it('não deve ultrapassar "xl" ao aumentar o tamanho da fonte', () => {
    service.setFontSize('xl');
    service.adjustFontSize('increase');
    expect(service.fontSize()).toBe('xl');
  });

  it('não deve ultrapassar "sm" ao diminuir o tamanho da fonte', () => {
    service.setFontSize('sm');
    service.adjustFontSize('decrease');
    expect(service.fontSize()).toBe('sm');
  });
});
