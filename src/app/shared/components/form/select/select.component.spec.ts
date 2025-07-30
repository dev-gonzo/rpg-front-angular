import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SelectComponent, SelectOption } from './select.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  const mockOptions: SelectOption[] = [
    { label: 'Brasil', value: 'BR' },
    { label: 'Argentina', value: 'AR' },
    { label: 'Chile', value: 'CL' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.label = 'País';
    component.options = mockOptions;
    component.placeholder = 'Selecione um país';
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('deve renderizar o label corretamente', () => {
    const label = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(label.textContent).toContain('País');
  });

  it('deve renderizar o placeholder corretamente', () => {
    const placeholderOption = fixture.debugElement.query(
      By.css('select option'),
    ).nativeElement;
    expect(placeholderOption.textContent).toBe('Selecione um país');
    expect(placeholderOption.disabled).toBeTrue();
    expect(placeholderOption.hidden).toBeTrue();
  });

  it('deve renderizar todas as opções corretamente', () => {
    const options = fixture.debugElement.queryAll(By.css('select option'));
    // +1 por causa do placeholder
    expect(options.length).toBe(mockOptions.length + 1);
  });

  it('deve atualizar o valor do FormControl ao selecionar', () => {
    const selectEl: HTMLSelectElement = fixture.debugElement.query(
      By.css('select'),
    ).nativeElement;
    selectEl.value = selectEl.options[2].value; // 'AR'
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.control.value).toBe('AR');
  });

  it('deve marcar o campo como tocado ao sair do foco', () => {
    const selectEl: HTMLSelectElement = fixture.debugElement.query(
      By.css('select'),
    ).nativeElement;
    expect(component.control.touched).toBeFalse();

    selectEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.control.touched).toBeTrue();
  });

  it('deve exibir mensagem de erro se o campo for inválido e tocado', fakeAsync(() => {
    const control = new FormControl(null);
    component.control = control;
    component.label = 'Gênero';
    fixture.detectChanges();

    control.setErrors({ schema: 'Seleção obrigatória' });
    control.markAsTouched();

    tick();
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('p'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent).toContain('Seleção obrigatória');
  }));

  it('não deve exibir erro se o campo não foi tocado', () => {
    const control = new FormControl(null, Validators.required);
    control.setErrors({ schema: 'Campo obrigatório' });
    component.control = control;
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('p'));
    expect(errorEl).toBeNull();
  });
});
