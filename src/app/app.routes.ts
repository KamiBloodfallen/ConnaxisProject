import { Routes } from '@angular/router';
import { HomepageComponent } from './Home/homepage/homepage.component';
import { ProfileGeneradorComponent } from './Profile/profile-generador/profile-generador.component';
import { RegisterComponent } from './register/register.component';
import { VerificacionComponent } from './register/verificacion/verificacion.component';


export const routes: Routes = [
    {path: 'home', component: HomepageComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component:  ProfileGeneradorComponent},
    {path: 'verificacion', component:  VerificacionComponent}
    
    
];
