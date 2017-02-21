'use strict'

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// import {Ng2UiAuthModule, CustomConfig} from 'ng2-ui-auth';
import { DndModule } from 'ng2-dnd';
import { AppComponent }   from './components/app.component';

import { DashboardComponent } from './components/dashboard.component';
import { BoardComponent } from './components/board.component';
import { ListComponent } from './components/list.component';
import { TicketComponent } from './components/ticket.component';
import { ToolbarComponent } from './components/toolbar.component';
import { SimpleDndComponent } from './components/simple-dnd.component';
import { UserListComponent } from './components/user-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DndModule.forRoot(),
        // Ng2UiAuthModule.forRoot(MyAuthConfig)
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        BoardComponent,
        ListComponent,
        TicketComponent,
        ToolbarComponent,
        SimpleDndComponent,
        UserListComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }




