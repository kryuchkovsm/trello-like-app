import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';

import { DataService }              from './services/data.service';
import { AuthService }              from './services/auth.service';
import { AuthGuard }                from './guards/index';
import { routing }                  from './routes/app.routes';

import { AppComponent }             from './components/app.component/index';
import { NavBarComponent}           from './components/navbar.component/index'
import { BoardListComponent }       from './components/boardlist.component/index';
import { BoardComponent }           from './components/board.component/index';
import { DashBoardComponent}        from './components/dashboard.component/index';
import { ListComponent }            from './components/list.component/index';
import { TicketComponent }          from './components/ticket.component/index';
import { WelcomePageComponent }     from './components/welcomepage.component/index';
import { LoginComponent }           from './components/login.component/index';
import { SignUpComponent }           from './components/signup.component/index';
import { HomeComponent }            from './components/home.component/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
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
        DataService  ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }


