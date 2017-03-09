import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { DragulaModule }            from 'ng2-dragula';

import { AuthGuard }                from './guards/index';
import { routing }                  from './routes/app.routes';

import { 
        DataService,
        AuthService
    } from './services/index';

import {
        AppComponent,
        NavBarComponent,
        BoardComponent,
        BoardListComponent,
        DashBoardComponent,
        ListComponent,
        TicketComponent,
        WelcomePageComponent,
        LoginComponent,
        SignUpComponent,
        HomeComponent
    } from './components/index';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DragulaModule,
        routing
    ],
    declarations: [
        AppComponent,
        NavBarComponent,
        BoardListComponent,
        DashBoardComponent,
        BoardComponent,
        ListComponent,
        TicketComponent,
        HomeComponent,
        LoginComponent,
        SignUpComponent,
        WelcomePageComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        DataService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }


