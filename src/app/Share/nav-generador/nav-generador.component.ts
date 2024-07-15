import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-generador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-generador.component.html',
  styleUrl: './nav-generador.component.css'
})
export class NavGeneradorComponent {

@Input() options: string[] = []; 

constructor(private router: Router) {}

handleClick(option: string) {
  const correspondingUrl = this.getCorrespondingUrl(option); 
  if (correspondingUrl) {
    this.router.navigate([correspondingUrl]); 
  } else {
    console.error(`No URL mapping found for "${option}"`);
  }
}

getCorrespondingUrl(option: string): string | undefined {
  
  const urlMap: { [key: string]: string } = { 
    'Mi perfil': '/home',
    'Sobre nosotros': '/about',
    
  };
  return urlMap[option];
}
}
