# **Eliel Tarazona - Hadik Chavez**
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
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
};
```

4. Crear setup-jest.ts
```
import 'jest-preset-angular/setup-jest';
```

5. Modificar angular.json
```
"test": {
  "builder": "@angular-builders/jest:run",
  "options": {
    "configPath": "./jest.config.js"
  }
}
```

6. Actualizar tsconfig.spec.json
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
