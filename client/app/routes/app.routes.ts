import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { AuthGuard }                   from '../guards/auth.guard'
import { WelcomePageComponent}         from '../components/welcomepage.component/welcomepage.component';
import { BoardComponent }              from '../components/board.component/board.component';
import { LoginComponent }              from '../components/login.component/login.component';
import { SignUpComponent }             from '../components/signup.component/index';
import { DashBoardComponent}           from '../components/dashboard.component/dashboard.component';
import { UserProfileComponent }        from '../components/userprofile.component/userprofile.component';

const appRoutes: Routes = [
    { path: '',             component: DashBoardComponent, canActivate: [AuthGuard] },
    { path: 'b/:id',        component: BoardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard',    component: DashBoardComponent, canActivate: [AuthGuard] },
    { path: 'login',        component: LoginComponent },
    { path: 'signup',       component: SignUpComponent },
    { path: 'forbidden',    component: LoginComponent},
    { path: 'welcome',      component: WelcomePageComponent },
    { path: 'profile',      component: UserProfileComponent}];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);