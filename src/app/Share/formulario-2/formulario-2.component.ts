import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserService } from '../../service/user.service';
import { Usuario } from '../../Models/usuario.model';

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
    'Moda y Belleza',
    'Ropa y accesorios',
    'Maquillaje y cuidado de la piel',
    'Tendencias de moda',
    'Estilo personal',
    'Fitness y Bienestar',
    'Entrenamientos y rutinas de ejercicio',
    'Nutrición y dietas',
    'Meditación y mindfulness',
    'Estilo de vida saludable',
    'Viajes',
    'Destinos turísticos',
    'Consejos de viaje',
    'Gastronomía',
    'Recetas y cocina',
    'Restaurantes y reseñas culinarias',
    'Comida saludable',
    'Fotografía de alimentos',
    'Gaming',
    'Reseñas de videojuegos',
    'Transmisiones en vivo (streaming)',
    'Consejos y trucos de juegos',
    'E-sports y competiciones',
    'Entretenimiento',
    'Reseñas de películas y series',
    'Música y conciertos',
    'Diseño de interiores',
    'Proyectos de bricolaje',
    'Consejos de organización y limpieza',
    'Educación y Desarrollo Personal',
    'Consejos de estudio y productividad',
    'Habilidades y desarrollo profesional',
    'Idiomas y aprendizaje',
    'Familia y Crianza',
    'Consejos para padres',
    'Actividades familiares',
    'Educación infantil',
    'Arte y Creatividad',
    'Fotografía y videografía',
    'Pintura y dibujo',
    'Manualidades y artesanías',
    'Sostenibilidad y Medio Ambiente',
    'Vida sostenible',
    'Conservación y ecología',
    'Productos ecológicos'
  ];
  
  smallCards: SmallCard[] = [];
  private nextId = 0;

  form: FormGroup;
  
  listaInteres:string[]=[];

  constructor(private fb: FormBuilder, private apiService: ApiService,private router: Router,private userService:UserService) {
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

  onSubmit() {
    const idusu = 3;
    const formData = this.form.value;
    const lista=this.listaInteres.join(", ");
    const descripcion ={ 
      Descripcion:formData.Descripcion
    };
    const nombrePerfil ={
      Nombre_perfil:formData.Nombre_perfil
    };

    const intereces={
      IdUsu: idusu,
      Intereses_Usuario:lista
    }

    console.log("Estos son los datos registrados", formData);
    console.log("Estos son los datos registrados", lista);

    const descripcionRequest = this.apiService.actuDescripcionGenerador(descripcion, idusu);
    const nombrePerfilRequest = this.apiService.actuNombrePerfil(nombrePerfil, idusu);
    const interesesRequest = this.apiService.registrarInteres(intereces);

    forkJoin([descripcionRequest, nombrePerfilRequest, interesesRequest]).subscribe(
      response => {
        console.log('Todas las solicitudes fueron exitosas:', response);

        this.router.navigate(['/profile']);
      },
      error => {
        console.error('Error en alguna de las solicitudes:', error);
      }
    );
    

  }
}
