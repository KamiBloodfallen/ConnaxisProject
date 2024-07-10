import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-formulario-1',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-1.component.html',
  styleUrls: ['./formulario-1.component.css']
})
export class Formulario1Component implements OnInit {
  myForm: FormGroup;
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  years: number[] = this.generateYears(new Date().getFullYear(), 1950); // Genera años desde el año actual hasta 1950

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {

    this.myForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contras: ['', [Validators.required, Validators.minLength(3)]],
      celular: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: this.fb.group({
        dia: ['', Validators.required],
        mes: ['', Validators.required],
        año: ['', Validators.required] // Asegúrate de que el control sea 'año'
      }),
      departamento: ['', Validators.required],
      aceptarTerminos: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;

      // Formatear los datos

      
      const formatData = {
        Nombre: formData.nombre,
        Apellido: formData.apellidos,
        Celular: formData.celular,
        CorreoElectronico: formData.correo,
        FechaNacimiento: `${formData.fechaNacimiento.año}-${formData.fechaNacimiento.mes}-${formData.fechaNacimiento.dia}`,
        Sexo: formData.genero,
        Contraseña: formData.contras,
        ResidenciaDepartamento: formData.departamento,
      };

      console.log('Formatted form data:', formatData);

      this.apiService.registrar(formatData).subscribe(
        response => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/verificacion']);
        },
        error => {
          console.error('Error al registrar:', error);
        }
      );

    
   
    //this.apiService.registro2(datos);
    } else {
      console.log('Form is invalid');
      console.log(this.myForm.controls);
    }
  }

  generateYears(startYear: number, endYear: number): number[] {
    const years = [];
    for (let i = startYear; i >= endYear; i--) {
      years.push(i);
    }
    return years;
  }
}
