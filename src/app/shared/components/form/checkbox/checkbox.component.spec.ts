import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.label = 'Aceito os termos';
    component.control = new FormControl(false);
    fixture.detectChanges();
  });

  it('deve renderizar o label corretamente', () => {
    const label = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(label.textContent).toContain('Aceito os termos');
  });

  it('deve associar o "for" do label ao input via id', () => {
    const label = fixture.debugElement.query(By.css('label')).nativeElement;
    const checkbox = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(label.getAttribute('for')).toBe(checkbox.getAttribute('id'));
  });

  it('deve exibir mensagem de erro se o campo estiver inválido e tocado', () => {
    const control = new FormControl(false, [Validators.requiredTrue]);

    // Setar o componente antes de detectar mudanças
    component.control = control;
    component.label = 'Termos';

    fixture.detectChanges(); // primeiro render

    control.setErrors({ schema: 'Obrigatório aceitar os termos' });
    control.markAsTouched();

    fixture.detectChanges(); // refletir mudanças

    const errorEl = fixture.debugElement.query(By.css('p'));
    expect(errorEl).toBeTruthy();
    expect(errorEl.nativeElement.textContent).toContain(
      'Obrigatório aceitar os termos',
    );
  });

  it('não deve exibir erro se o campo não foi tocado', () => {
    const control = new FormControl(false, [Validators.requiredTrue]);
    control.setErrors({ schema: 'Erro' });

    component.control = control;
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('p'));
    expect(error).toBeNull();
  });

  it('deve alterar o valor do FormControl ao clicar', () => {
    const checkbox = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(component.control.value).toBeFalse();

    checkbox.click();
    fixture.detectChanges();

    expect(component.control.value).toBeTrue();
  });
});
