import { Component, Input } from '@angular/core';
import { DataService } from '../services/data.service'
import { List } from './classes/list'

@Component({
    selector: 'list-component',
    templateUrl: './app/components/html/list.component.html',
    styleUrls: ['./app/components/css/list.component.css'],
})

export class ListComponent {
    @Input() inputList;

    // constructor (private dataService: DataService) {
    constructor () {
        console.log('list123');
        console.log(this.inputList);
    }



}
