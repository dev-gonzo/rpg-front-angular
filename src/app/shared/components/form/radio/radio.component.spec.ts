import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RadioComponent, RadioOption } from './radio.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;

  const mockOptions: RadioOption[] = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
    { label: 'Outro', value: 'O' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    component.label = 'Gênero';
    component.name = 'genero';
    component.options = mockOptions;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('deve renderizar o legend corretamente', () => {
    const legend = fixture.debugElement.query(By.css('legend')).nativeElement;
    expect(legend.textContent).toContain('Gênero');
  });

  it('deve renderizar todas as opções', () => {
    const options = fixture.debugElement.queryAll(
      By.css('input[type="radio"]'),
    );
    expect(options.length).toBe(3);
  });

  it('deve associar os valores corretamente ao clicar', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input[type="radio"]'));

    // Clica no segundo (Feminino)
    inputs[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.control.value).toBe('F');
  });

  it('deve exibir mensagem de erro se o campo for inválido e tocado', fakeAsync(() => {
    const control = new FormControl(null);
    component.label = 'Gênero';
    component.control = control;

    fixture.detectChanges(); // primeira renderização

    control.setErrors({ schema: 'Seleção obrigatória' });
    control.markAsTouched();

    tick(); // simula tempo de propagação do Angular
    fixture.detectChanges(); // nova verificação após mudanças

    const errorEl = fixture.debugElement.query(By.css('p'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent).toContain('Seleção obrigatória');
  }));

  it('não deve exibir erro se o campo não foi tocado', () => {
    const control = new FormControl(null, [Validators.required]);
    control.setErrors({ schema: 'Seleção obrigatória' });

    component.control = control;
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('p'));
    expect(errorEl).toBeNull();
  });
});
