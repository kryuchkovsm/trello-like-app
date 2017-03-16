// Core
import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';

// Libraries
import { DragulaModule, DragulaService } from 'ng2-dragula';

import { DndModule }                from 'ng2-dnd';

// Guards
import { AuthGuard }                from './guards/index';

// Routes
import { routing }                  from './routes/app.routes';

// Services
import { 
        DataService,
        AuthService,

    } from './services/index';


// Components
import {
        AppComponent,
        NavBarComponent,
        BoardComponent,
        BoardSettingsComponent,
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
        DndModule.forRoot(),
        routing
    ],
    declarations: [
        AppComponent,
        NavBarComponent,
        BoardListComponent,
        BoardSettingsComponent,
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
        // DragulaService
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }


