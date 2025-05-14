# **Eliel Tarazona - Hadik Chavez - Maria Camila Rodriguez**
---
## UnitTestIsn
---

## Frameworks seleccionados
| Lenguaje  | Pruebas unitarias |
| ------------- |:-------------:|
| Angular      | Jtest     |

### **1. Caracteristicas y ventajas**

#### Jest

✅ Todo-en-uno:

> Jest incluye aserciones, mocks, cobertura de código y runner de pruebas sin dependencias externas.

✅ Rapidez:

> Ejecuta pruebas en paralelo en un entorno Node.js (sin navegador).

> Modo **watch** para re-ejecución automática al detectar cambios.

✅ Snapshot Testing:

> Permite capturar el estado de componentes y compararlo en futuras ejecuciones.

✅ Soporte para TypeScript:

> Integración nativa con Angular y TypeScript.

✅ Reportes claros:

> Mensajes de error legibles y opción para generar informes de cobertura (--coverage).

### **2. Instalación y configuración**

1. Instalación framework Angular
```
npm install -g @angular/cli
ng new app_name
```

2. Instalar dependencias
```
npm install --save-dev jest jest-preset-angular @types/jest @angular-builders/jest
```

3. Crear jest.config.js
```
module.exports = {
  preset: 'jest-preset-angular',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
};
```

4. Modificar angular.json
```
"test": {
  "builder": "@angular-builders/jest:run",
  "options": {
    "configPath": "./jest.config.js"
  }
}
```

5. Actualizar tsconfig.spec.json
```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "types": ["jest", "node"]
  }
}
```

### **3. Sintaxix básica**

Estructura del archivo
```
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiComponente } from './mi-componente.component';

describe('MiComponente', () => {
  let component: MiComponente;
  let fixture: ComponentFixture<MiComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(MiComponente);
    component = fixture.componentInstance;
  });

  // Caso de prueba 1: Creación del componente
  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  // Caso de prueba 2: Validar propiedad
  it('debería tener un título "Hola Mundo"', () => {
    expect(component.titulo).toBe('Hola Mundo');
  });

  // Caso de prueba 3: Snapshot del template
  it('debería coincidir con el snapshot', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
```

### **4. Ejecución de pruebas**

- Comando para ejecutar
```
npm test
```

- Comando para ejecutar pruebas en modo de escucha
```
npm test -- --watch
```

- Comando para generar covertura
```
npm test -- --coverage
```

### **5. Aserciones Comunes**

- Igualdad estricta:
```
expect(component.titulo).toBe('Hola Mundo');
```

- Validar objetos/arrays:
```
expect(component.lista).toEqual([1, 2, 3]);
```

- Excepciones:
```
expect(() => component.metodoRoto()).toThrowError('Error esperado');
```

### **6. Pruebas Autenticación**

- Creación de componente
```
ng g c Auth
```

- Contenido de la prueba, en auth.component.spec.ts
```
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
```
