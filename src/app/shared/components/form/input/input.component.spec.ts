import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNgxMask } from 'ngx-mask';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
      providers: [provideNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  it('deve renderizar o label corretamente', () => {
    component.label = 'Nome';
    component.control = new FormControl('');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(label.textContent).toContain('Nome');
  });

  it('deve aplicar o placeholder no input', () => {
    component.label = 'Email';
    component.placeholder = 'Digite seu email';
    component.control = new FormControl('');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.placeholder).toBe('Digite seu email');
  });

  it('deve associar o label ao input via id', () => {
    component.label = 'Telefone';
    component.control = new FormControl('');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('label')).nativeElement;
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(label.getAttribute('for')).toBe(input.getAttribute('id'));
  });

  it('deve exibir mensagem de erro se o campo estiver inválido e tocado', () => {
    const control = new FormControl('', [Validators.required]);

    component.label = 'Senha';
    component.control = control;

    fixture.detectChanges(); // primeira renderização

    control.setErrors({ schema: 'Campo obrigatório' });
    control.markAsTouched(); // mudanças depois da renderização

    fixture.detectChanges(); // reflete as mudanças

    const errorEl = fixture.debugElement.query(By.css('p'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent).toContain('Campo obrigatório');

    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(inputEl.className).toContain('border-red-500');
  });

  it('não deve exibir erro se o campo estiver inválido mas não foi tocado', () => {
    const control = new FormControl('', [Validators.required]);
    control.setErrors({ schema: 'Campo obrigatório' });

    component.label = 'Senha';
    component.control = control;
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('p'));
    expect(errorEl).toBeNull();
  });

  it('deve atualizar valor do FormControl ao digitar', () => {
    const control = new FormControl('');
    component.label = 'Nome';
    component.control = control;
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'João';
    input.dispatchEvent(new Event('input'));

    expect(control.value).toBe('João');
  });
});
