import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { Routes, RouterModule }     from '@angular/router';
import { DndModule }                from 'ng2-dnd';

import { DataService }              from './services/data.service';
import { AuthService }              from './services/auth.service';
import { routing }                  from './routes/app.routes';

import { AppComponent }             from './components/app.component/app.component';
import { DashboardComponent }       from './components/dashboard.component/dashboard.component';
import { BoardComponent }           from './components/board.component/board.component';
import { ListComponent }            from './components/list.component/list.component';
import { TicketComponent }          from './components/ticket.component/ticket.component';
import { WelcomePageComponent }     from './components/welcomepage.component/welcomepage.component';
import { SimpleDndComponent }       from './components/simple-dnd.component/simple-dnd.component';
import { LoginComponent }           from './components/login.component/login.component';
import { HomeComponent }            from './components/home.component/home.component';

// const appRoutes: Routes = [
//     { path: '', component: BoardComponent },
//     { path: 'login', component: LoginComponent },
//     { path: '**', redirectTo: '' }
// ];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DndModule.forRoot(),
        routing
        // RouterModule.forRoot(appRoutes) //, { useHash: true }
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        BoardComponent,
        ListComponent,
        TicketComponent,
        SimpleDndComponent,
        HomeComponent,
        LoginComponent,
        WelcomePageComponent
    ],
    providers: [ AuthService, DataService  ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }


