import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
import { DndModule }                from 'ng2-dnd';

import { DataService }              from './services/data.service';
import { AuthService }              from './services/auth.service';
import { AuthGuard }                from './guards/index';
import { routing }                  from './routes/app.routes';

import { AppComponent }             from './components/app.component/index';
import { NavBarComponent}           from './components/navbar.component/index'
import { BoardListComponent }       from './components/boardlist.component/boardlist.component';
import { BoardComponent }           from './components/board.component/board.component';
import { DashBoardComponent}        from './components/dashboard.component/dashboard.component';
import { ListComponent }            from './components/list.component/list.component';
import { TicketComponent }          from './components/ticket.component/ticket.component';
import { WelcomePageComponent }     from './components/welcomepage.component/welcomepage.component';
import { SimpleDndComponent }       from './components/simple-dnd.component/simple-dnd.component';
import { LoginComponent }           from './components/login.component/index';
import { SignUpComponent }           from './components/signup.component/index';

import { HomeComponent }            from './components/home.component/home.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DndModule.forRoot(),
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
        SimpleDndComponent,
        HomeComponent,
        LoginComponent,
        SignUpComponent,
        WelcomePageComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        DataService  ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }


