import { Component } from '@angular/core';
import { BtLoginComponent } from '../../../Share/bt-login/bt-login.component';
import { BtLogoutComponent } from '../../../Share/bt-logout/bt-logout.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BtLoginComponent, BtLogoutComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
