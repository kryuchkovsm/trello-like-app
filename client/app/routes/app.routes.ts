import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';


import { WelcomePageComponent}         from '../components/welcomepage.component/welcomepage.component';
import { BoardComponent }              from '../components/board.component';
import { LoginComponent }              from '../components/login.component';


const appRoutes: Routes = [
    { path: '', component: WelcomePageComponent },
    // { path: 'board', component: BoardComponent },
    { path: 'login', component: LoginComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);