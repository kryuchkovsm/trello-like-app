import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';


import { WelcomePageComponent}         from '../components/welcomepage.component/welcomepage.component';
import { BoardComponent }              from '../components/board.component/board.component';
import { LoginComponent }              from '../components/login.component/login.component';
import { HomeComponent }              from '../components/home.component/home.component';
import { DashBoardComponent}            from '../components/dashboard.component/dashboard.component';

const appRoutes: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'board', component: BoardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: HomeComponent },
    { path: 'failure', component: HomeComponent },
    { path: 'dashboard', component: DashBoardComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);