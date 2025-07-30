import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AutocompleteComponent, AutocompleteOption } from './autocomplete.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  const mockOptions: AutocompleteOption[] = [
    { label: 'Brasil', value: 'BR' },
    { label: 'Argentina', value: 'AR' },
    { label: 'Bolívia', value: 'BO' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    component.label = 'País';
    component.options = mockOptions;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('deve renderizar o label', () => {
    const label = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(label.textContent).toContain('País');
  });

  it('deve mostrar as opções filtradas ao digitar', fakeAsync(() => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'bra';
    inputEl.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('ul li'));
    expect(options.length).toBe(1);
    expect(options[0].nativeElement.textContent).toContain('Brasil');
  }));

  it('deve selecionar uma opção e preencher o input', fakeAsync(() => {
    component.showDropdown = true;
    component.filteredOptions = mockOptions;
    fixture.detectChanges();

    const optionEls = fixture.debugElement.queryAll(By.css('ul li'));
    optionEls[0].nativeElement.click();
    tick();
    fixture.detectChanges();

    expect(component.control.value).toBe('BR');
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.value).toBe('Brasil');
  }));

  it('deve ocultar o dropdown ao perder o foco', fakeAsync(() => {
    component.showDropdown = true;
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.dispatchEvent(new Event('blur'));
    tick(200);
    fixture.detectChanges();

    expect(component.showDropdown).toBeFalse();
    const dropdown = fixture.debugElement.query(By.css('ul'));
    expect(dropdown).toBeNull();
  }));

  it('deve exibir mensagem de erro se houver erro de validação', fakeAsync(() => {
    const control = new FormControl(null);
    control.setErrors({ schema: 'Campo obrigatório' });
    control.markAsTouched();
    component.control = control;
    fixture.detectChanges();
    tick();

    const errorEl = fixture.debugElement.query(By.css('p'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent).toContain('Campo obrigatório');
  }));

  it('não deve exibir erro se o campo não foi tocado', () => {
    const control = new FormControl(null);
    control.setErrors({ schema: 'Campo obrigatório' });
    component.control = control;
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('p'));
    expect(errorEl).toBeNull();
  });
});
