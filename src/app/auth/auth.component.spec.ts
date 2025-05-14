import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 1: Login exitoso con credenciales correctas
  it('debería autenticar al usuario si las credenciales son "admin/admin"', () => {
    component.login('admin', 'admin');
    fixture.detectChanges();

    expect(component.isAuthenticated).toBe(true);
    expect(component.username).toBe('admin');
    expect(component.errorMessage).toBe('');

    // Verificar que se muestre el mensaje de bienvenida en el DOM
    const welcomeMessage = fixture.debugElement.query(By.css('p'));
    expect(welcomeMessage.nativeElement.textContent).toContain('¡Bienvenido, admin!');
  });

  // Prueba 2: Login fallido con credenciales incorrectas
  it('debería mostrar error si las credenciales son incorrectas', () => {
    component.login('user', '123');
    fixture.detectChanges();

    expect(component.isAuthenticated).toBe(false);
    expect(component.errorMessage).toBe('Credenciales incorrectas');

    // Verificar que se muestre el mensaje de error en el DOM
    const errorMessage = fixture.debugElement.query(By.css('.error'));
    expect(errorMessage.nativeElement.textContent).toContain('Credenciales incorrectas');
  });

  // Prueba 3: Campos vacíos no deben autenticar
  it('debería rechazar credenciales vacías', () => {
    component.login('', '');
    fixture.detectChanges();

    expect(component.isAuthenticated).toBe(false);
    expect(component.errorMessage).toBe('Credenciales incorrectas');
  });
});
