import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';


import { HomeComponent }               from '../components/home.component';
import { BoardComponent }              from '../components/board.component';
import { LoginComponent }              from '../components/login.component';


const appRoutes: Routes = [
    { path: '', component: BoardComponent },
    { path: 'login', component: LoginComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);