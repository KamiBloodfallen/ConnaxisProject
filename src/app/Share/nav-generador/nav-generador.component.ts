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
  const correspondingUrl = this.getCorrespondingUrl(option); // Call a function to map options to URLs
  if (correspondingUrl) {
    this.router.navigate([correspondingUrl]); // Navigate to the URL using Router
  } else {
    console.error(`No URL mapping found for "${option}"`); // Handle invalid options
  }
}

getCorrespondingUrl(option: string): string | undefined {
  // Define your logic to map options to URLs (replace with your actual logic)
  const urlMap: { [key: string]: string } = { // Explicitly define type as string-keyed object
    'Mi perfil': '/home',
    'Sobre nosotros': '/about',
    
  };
  return urlMap[option];
}
}
