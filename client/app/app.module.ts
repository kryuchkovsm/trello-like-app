import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AUTH_PROVIDERS }      from 'angular2-jwt';


import { DndModule } from 'ng2-dnd';
import { AppComponent }   from './components/app.component';
import { DashboardComponent } from './components/dashboard.component';
import { BoardComponent } from './components/board.component';
import { ListComponent } from './components/list.component';
import { TicketComponent } from './components/ticket.component';
import { SimpleDndComponent } from './components/simple-dnd.component';
import { LoginComponent }    from './components/login.component';
import { HomeComponent }       from './components/home.component';

import { routing,
    appRoutingProviders } from './routes/app.routes';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DndModule.forRoot(),
        routing,
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        BoardComponent,
        ListComponent,
        TicketComponent,
        SimpleDndComponent,
        HomeComponent,
        LoginComponent
    ],
    providers:    [
        appRoutingProviders,
        AUTH_PROVIDERS
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }


