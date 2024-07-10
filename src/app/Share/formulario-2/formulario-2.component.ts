import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

interface SmallCard {
  id: number;
  content: string;
}

@Component({
  selector: 'app-formulario-2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-2.component.html',
  styleUrls: ['./formulario-2.component.css']
})
export class Formulario2Component {
  options = [
    'Familia', 'Deportes', 'Comida', 'Turismo', 'Baile', 'Fitness'
  ];
  
  smallCards: SmallCard[] = [];
  private nextId = 0;

  form: FormGroup;
  
  listaInteres:string[]=[];

  constructor(private fb: FormBuilder, private apiService: ApiService,private router: Router) {
    this.form = this.fb.group({
      Nombre_perfil: [''],
      Descripcion: [''],
      selectedOption: [null] // Add this control to handle the select input
    });
  }

  addCard() {
    const selectedOption = this.form.get('selectedOption')?.value;
    if (selectedOption) {
      const newCard: SmallCard = {
        id: this.nextId++,
        content: selectedOption
      };
      this.listaInteres.push(selectedOption);
      this.smallCards.push(newCard);
      this.form.get('selectedOption')?.reset();
      console.log(this.listaInteres);
    }
  }

  removeCard(id: number) {
    const removerCard = this.smallCards.find(card => card.id === id);
    if (removerCard) {
      this.listaInteres = this.listaInteres.filter(item => item !== removerCard.content);
      this.smallCards = this.smallCards.filter(card => card.id !== id);
      console.log(this.listaInteres);
    }
  }

  checarInterest(interest: string): boolean {
    return this.listaInteres.includes(interest);
  }

  onSubmit() {
    const idusu = 6;
    const formData = this.form.value;
    const descripcion ={ 
      Descripcion:formData.Descripcion
    };
    const nombrePerfil ={
      Nombre_perfil:formData.Nombre_perfil
    };

    const intereces={
      IdUsu: idusu,
      Familia: this.checarInterest('Familia'),
      Deportes: this.checarInterest('Deportes'),
      Comida: this.checarInterest('Comida'),
      Turismo: this.checarInterest('Turismo'),
      Baile: this.checarInterest('Baile'),
      Fitness: this.checarInterest('Fitness')
    }

    console.log("Estos son los datos registrados", formData);
/*
    const descripcionRequest = this.apiService.actuDescripcionGenerador(descripcion, idusu);
    const nombrePerfilRequest = this.apiService.actuNombrePerfil(nombrePerfil, idusu);
    const interesesRequest = this.apiService.registrarInteres(intereces);

    forkJoin([descripcionRequest, nombrePerfilRequest, interesesRequest]).subscribe(
      response => {
        console.log('Todas las solicitudes fueron exitosas:', response);
      },
      error => {
        console.error('Error en alguna de las solicitudes:', error);
      }
    );
*/
    this.router.navigate(['/profile']);

  }
}
