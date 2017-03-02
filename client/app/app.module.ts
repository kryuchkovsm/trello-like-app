import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { Routes, RouterModule }        from '@angular/router';

import { DndModule } from 'ng2-dnd';
import { AppComponent }   from './components/app.component';
import { DashboardComponent } from './components/dashboard.component';
import { DataService } from './services/data.service';
import { BoardComponent } from './components/board.component';
import { ListComponent } from './components/list.component';
import { TicketComponent } from './components/ticket.component';
import { SimpleDndComponent } from './components/simple-dnd.component';
import { LoginComponent }    from './components/login.component';
import { HomeComponent }       from './components/home.component';

const appRoutes: Routes = [
    { path: '', component: BoardComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DndModule.forRoot(),
        RouterModule.forRoot(appRoutes) //, { useHash: true }
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
    providers: [ DataService  ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }


