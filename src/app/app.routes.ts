import { Routes } from '@angular/router';
import { HomepageComponent } from './Home/homepage/homepage.component';
import { ProfileGeneradorComponent } from './Profile/profile-generador/profile-generador.component';


export const routes: Routes = [
    {path: 'home', component: HomepageComponent},
    {path: 'profile', component:  ProfileGeneradorComponent}
    // {path: 'registro', component: },
    
];
