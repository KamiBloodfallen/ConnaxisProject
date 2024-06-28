import { Component } from '@angular/core';
import { StepperComponent } from '../Share/stepper/stepper.component';
import { Formulario1Component } from '../Share/formulario-1/formulario-1.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [StepperComponent, Formulario1Component],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
