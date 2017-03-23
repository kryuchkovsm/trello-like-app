// Core
import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';

// Extrenal Libraries
import { DragulaModule, DragulaService }    from 'ng2-dragula';
import { DndModule }                        from 'ng2-dnd';
import { AuthModule }                       from './modules/auth.module'

// Directives
import { AutosizeDirecitve,
         AutofocusDirective }       from './directives/index';

// Guards
import { AuthGuard }                        from './guards/index';

// Routes
import { routing }                          from './routes/app.routes';

// Services
import { 
        DataService,
        AuthService,
        SharedService,

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
        TicketDetailsComponent,
        WelcomePageComponent,
        LoginComponent,
        SignUpComponent,
        UserProfileComponent,
        UserSettingsDropdownComponent
    } from './components/index';

// Pipes
import { OrderBy,
         Where } from './pipes/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AuthModule,
        DragulaModule,
        DndModule.forRoot(),
        routing
    ],
    declarations: [
        AutosizeDirecitve,
        AutofocusDirective,
        AppComponent,
        NavBarComponent,
        BoardListComponent,
        BoardSettingsComponent,
        DashBoardComponent,
        BoardComponent,
        ListComponent,
        TicketComponent,
        TicketDetailsComponent,
        LoginComponent,
        SignUpComponent,
        WelcomePageComponent,
        UserProfileComponent,
        UserSettingsDropdownComponent,
        OrderBy,
        Where
    ],
    providers: [
        AuthService,
        AuthGuard,
        DataService,
        SharedService,
        DragulaService
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }


