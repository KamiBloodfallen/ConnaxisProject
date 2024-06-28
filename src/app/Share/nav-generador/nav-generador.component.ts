import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-generador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-generador.component.html',
  styleUrl: './nav-generador.component.css'
})
export class NavGeneradorComponent {
@Input() options: string[] = []; 
}
