import { Component, signal, OnInit} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { AuthService } from '../Services/AuthService/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  
  eyeIcon: string = 'eye.ico';
  passwordFieldType: string = 'password';

   form = signal<FormGroup>(
    new FormGroup({
      CorreoElectronico: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
    })
  );
  
  
  errorMessage: string | null = null;
  errorCredential: boolean | null =false;
  constructor(private authService: AuthService, private router: Router) { }
 

  ngOnInit() {
    
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/profile']); 
    }
  }

  onSubmit() {
    if (this.form().valid) {
      const { CorreoElectronico, password } = this.form().value;
      const data = {
        CorreoElectronico: CorreoElectronico,
        password: password
        };
      console.log("enviando datos");
      console.log(CorreoElectronico,password);
      console.log(this.form().value);
      this.authService.login(data)
        .subscribe({
          next: (response) => {
            if (response.token) {
              this.authService.setToken(response.token);
              this.router.navigate(['/profile']); 
              this.errorMessage = null;
              this.errorCredential=false;
             
            } else {
              this.errorMessage = response.error;
            }
          },
          error: (err) => {
            if(err.status==401){
              console.log("esta entrando aca y ni te das cuenta");
              this.errorCredential=true;
            }
            //console.error('Login error:', err);
           
          }
        });
    }else{
      
  }
    console.log(this.errorMessage);
  }
  
 //Funcionalidad del icon. eye en el password
 
 togglePasswordVisibility(): void {
  if (this.passwordFieldType === 'password') {
    this.passwordFieldType = 'text';
    this.eyeIcon = 'eye-off.ico';
  } else {
    this.passwordFieldType = 'password';
    this.eyeIcon = 'eye.ico';
  }
}


}
  

