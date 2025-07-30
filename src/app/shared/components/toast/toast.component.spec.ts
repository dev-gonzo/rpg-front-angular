import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { By } from '@angular/platform-browser';

describe('ToastComponent', () => {
  let fixture: ComponentFixture<ToastComponent>;
  let service: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent], // standalone
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    service = TestBed.inject(ToastService);
  });

  function triggerToast(message: string, type: 'success' | 'error' | 'info') {
    service.show(message, type);
    fixture.detectChanges();
  }

  it('deve mostrar o toast com a mensagem', () => {
    triggerToast('Mensagem de sucesso', 'success');

    const toastEl = fixture.debugElement.query(By.css('.text-white'));
    expect(toastEl.nativeElement.textContent).toContain('Mensagem de sucesso');
  });

  it('deve aplicar a classe correta para tipo "success"', () => {
    triggerToast('Sucesso!', 'success');

    const toastEl = fixture.debugElement.query(By.css('.text-white'));
    expect(toastEl.nativeElement.className).toContain('bg-green-900');
  });

  it('deve aplicar a classe correta para tipo "error"', () => {
    triggerToast('Erro!', 'error');

    const toastEl = fixture.debugElement.query(By.css('.text-white'));
    expect(toastEl.nativeElement.className).toContain('bg-red-900');
  });

  it('deve aplicar a classe correta para tipo "info"', () => {
    triggerToast('Info!', 'info');

    const toastEl = fixture.debugElement.query(By.css('.text-white'));
    expect(toastEl.nativeElement.className).toContain('bg-blue-600');
  });

  it('deve desaparecer automaticamente após 4 segundos', fakeAsync(() => {
    triggerToast('Desaparece', 'info');

    let wrapper = fixture.debugElement.query(By.css('.fixed'));
    expect(wrapper).toBeTruthy();

    tick(4000);
    fixture.detectChanges();

    wrapper = fixture.debugElement.query(By.css('.fixed'));
    expect(wrapper).toBeNull();
  }));
});
