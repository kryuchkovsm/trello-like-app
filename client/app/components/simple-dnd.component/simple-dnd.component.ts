import {Component} from '@angular/core';

@Component({
    selector: 'simple-dnd',
    templateUrl: './app/components/simple-dnd.component/simple-dnd.component.html',
    styleUrls: ['./app/components/simple-dnd.component/simple-dnd.component.css']
})


export class SimpleDndComponent {
    // listBoxers:Array<string> = ['Sugar Ray Robinson','Muhammad Ali','George Foreman','Joe Frazier','Jake LaMotta','Joe Louis','Jack Dempsey','Rocky Marciano','Mike Tyson','Oscar De La Hoya'];
    // listTeamOne:Array<string> = [];
    // listTeamTwo:Array<string> = [];
    lists:Array<string> = ['list1', 'list2', 'list3'];
    
    tasks:Array<string> = ['task1', 'task2', 'task3'];
}