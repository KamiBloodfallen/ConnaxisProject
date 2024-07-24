import { Component } from '@angular/core';
import { StepperComponent } from '../../Share/stepper/stepper.component';
import { Formulario1Component } from '../../Share/formulario-1/formulario-1.component';
import { Formulario2Component } from '../../Share/formulario-2/formulario-2.component';

@Component({
  selector: 'app-register-2',
  standalone: true,
  imports: [StepperComponent, Formulario1Component,Formulario2Component],
  templateUrl: './register-2.component.html',
  styleUrl: './register-2.component.css'
})
export class Register2Component {

}
