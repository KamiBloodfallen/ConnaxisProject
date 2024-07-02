import { Routes } from '@angular/router';
import { HomepageComponent } from './Home/homepage/homepage.component';
import { ProfileGeneradorComponent } from './Profile/profile-generador/profile-generador.component';
import { RegisterComponent } from './register/register.component';
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    {path: 'home', component: HomepageComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component:  ProfileGeneradorComponent},
    {path: 'login', component: LoginComponent},
   
    
];
