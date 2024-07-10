import { Component, signal, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { AuthService } from '../Services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

   form = signal<FormGroup>(
    new FormGroup({
      correo: new FormControl('', [Validators.required]),
      contraseña: new FormControl('',[Validators.required]),
    })
  );
  errorMessage: string | null = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/profile']); 
    }
  }

  onSubmit() {
    if (this.form().value.valid) {
      const { correo, contraseña } = this.form().value;

      this.authService.login(correo, contraseña)
        .subscribe({
          next: (response) => {
            if (response.token) {
              this.authService.setToken(response.token);
              this.router.navigate(['/profile']); 
              this.errorMessage = null;
            } else {
              this.errorMessage = 'Credenciales invalidas';
            }
          },
          error: (err) => {
            console.error('Login error:', err);
            this.errorMessage = 'Un error ha ocurrido, intenta de nuevo.';
          }
        });
    }
  }
}
  

