import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-1',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './formulario-1.component.html',
  styleUrl: './formulario-1.component.css'
})
export class Formulario1Component {
  selectedDay: number | null = null; // Inicializa selectedDay
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  selectedYear: number | null = null; // Inicializa selectedYear
  years: number[] = this.generateYears(new Date().getFullYear(), 1950); // Genera años desde el año actual hasta 1950


  generateYears(startYear: number, endYear: number): number[] {
    const years = [];
    for (let i = startYear; i >= endYear; i--) {
      years.push(i);
    }
    return years;
  }
}
