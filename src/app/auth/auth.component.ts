import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isAuthenticated = false;
  username = '';
  errorMessage = '';

  login(username:string, password:string) {
    if( username === 'admin' && password === 'admin' ) {
      this.isAuthenticated = true;
      this.username = username;
      this.errorMessage = '';
    }else{
      this.errorMessage = 'Credenciales incorrectas';
    }
  }

  logout() {
    return true;
  }
}
