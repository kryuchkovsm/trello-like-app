import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { AuthGuard }                   from '../guards/auth.guard'
import { WelcomePageComponent}         from '../components/welcomepage.component/welcomepage.component';
import { BoardComponent }              from '../components/board.component/board.component';
import { LoginComponent }              from '../components/login.component/login.component';
import { HomeComponent }               from '../components/home.component/home.component';
import { DashBoardComponent}           from '../components/dashboard.component/dashboard.component';

const appRoutes: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forbidden', component: LoginComponent},
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashBoardComponent, canActivate: [AuthGuard] }
    
    // { path: 'signup', component: HomeComponent },
    // { path: 'failure', component: HomeComponent },
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);