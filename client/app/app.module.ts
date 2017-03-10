// Core
import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';

// Libraries
import { DragulaModule }            from 'ng2-dragula';

// Guards
import { AuthGuard }                from './guards/index';

// Routes
import { routing }                  from './routes/app.routes';

// Services
import { 
        DataService,
        AuthService
    } from './services/index';


// Components
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

// Pipes
import { OrderBy } from './pipes/orderby.pipe';
import { Where } from './pipes/where.pipe';


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
        WelcomePageComponent,
        OrderBy,
        Where
    ],
    providers: [
        AuthService,
        AuthGuard,
        DataService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }


