import { Component } from '@angular/core';
import { BtLoginComponent } from '../Share/bt-login/bt-login.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BtLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
