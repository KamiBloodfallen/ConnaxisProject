import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink,  } from '@angular/router';
/*
import { PruebaService } from '../../Services/Auth.service';
*/


@Component({
  selector: 'app-bt-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bt-login.component.html',
  styleUrl: './bt-login.component.css'
})
export class BtLoginComponent {
@Input() buttonText = ''; 
@Input() fontColor: string = '#000'; 
@Input() backgroundColor: string = '#fff';
@Input() link: string = '/';


}
