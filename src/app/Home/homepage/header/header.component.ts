import { Component } from '@angular/core';
import { BtLoginComponent } from '../../../Share/bt-login/bt-login.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BtLoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
