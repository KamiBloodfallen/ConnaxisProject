import { Component } from '@angular/core';
import { AuthService } from '../../Services/AuthService/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bt-logout',
  standalone: true,
  imports: [],
  templateUrl: './bt-logout.component.html',
  styleUrl: './bt-logout.component.css'
})
export class BtLogoutComponent {

   constructor(private authService: AuthService, private router: Router) { }

    onClick() {
      this.authService.logout();
      this.router.navigate(['/login']); 
    }
  

  
}
