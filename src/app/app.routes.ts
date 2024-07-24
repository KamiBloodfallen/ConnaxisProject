import { Routes } from '@angular/router';
import { HomepageComponent } from './Home/homepage/homepage.component';
import { ProfileGeneradorComponent } from './Profile/profile-generador/profile-generador.component';
import { RegisterComponent } from './register/register.component';
import { Register2Component } from './register/register-2/register-2.component';
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { VerificacionComponent } from './register/verificacion/verificacion.component';
import { CardRedesSocialesComponent } from './Profile/profile-generador/card-redes-sociales/card-redes-sociales.component';

export const routes: Routes = [
    {path: '', component: HomepageComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'completeRegistration', component: Register2Component},
    {path: 'profile', component:  ProfileGeneradorComponent},
    {path: 'login', component: LoginComponent},
    {path: 'verificacion', component:  VerificacionComponent},
    {path: 'MediaSocialRegister', component:  CardRedesSocialesComponent}
    
];
