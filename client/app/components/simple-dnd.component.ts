import {Component} from '@angular/core';

@Component({
    selector: 'simple-dnd',
    templateUrl: './app/components/html/simple-dnd.component.html',
    styleUrls: ['./app/components/css/simple-dnd.component.css']
})


export class SimpleDndComponent {
    simpleDrop: any = null;

    listBoxers:Array<string> = ['Sugar Ray Robinson','Muhammad Ali','George Foreman','Joe Frazier','Jake LaMotta','Joe Louis','Jack Dempsey','Rocky Marciano','Mike Tyson','Oscar De La Hoya'];
    listTeamOne:Array<string> = [];
    listTeamTwo:Array<string> = [];

}