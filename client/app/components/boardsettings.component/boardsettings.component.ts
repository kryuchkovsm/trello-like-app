import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserSearchService }    from '../../services/usersearch.service';
import { User }                 from '../../classes/user';
import { DataService }          from '../../services/data.service';
import { Observable }           from 'rxjs/Observable';
import { Subject }              from 'rxjs/Subject';


// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import search = require("core-js/fn/symbol/search");

@Component({
    moduleId: module.id,
    selector: 'boardsettings-component',
    templateUrl: './boardsettings.component.html',
    styleUrls: ['./boardsettings.component.css'],
    providers: [UserSearchService],
})

export class BoardSettingsComponent implements OnInit {
    @Input() boardId;
    @Output() closeBoardSettings$: EventEmitter<boolean> = new EventEmitter<boolean>();
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    visible: boolean = false;
    confirmingDel: boolean = false;
    users: User[];
    // users: Array<string>;
    usersempty: boolean;

    searchString: string;
    searchBoxVisible: boolean = false;
    searchResult: Observable<string[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private userSearchService:  UserSearchService,
        private dataService:        DataService,
        private router:             Router) {};

    search(term: string): void {
        this.searchTerms.next(term);
        this.searchBoxVisible = true;
    }

    ngOnInit(): void {
        this.dataService.getAassignedUses(this.boardId)
            .subscribe(guests => {
                this.users = guests
                this.usersempty = !(this.users.length > 0)
                
            });
        
        // searchbox dropdown on search
        this.searchResult = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term =>
                term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.userSearchService.search(term)
                // or the observable of empty searchResult if there was no search term
                : Observable.of<any[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<any[]>([]);
            });
    }

    cancelSearch() {
        this.searchString = '';
        this.searchBoxVisible = false;
    }

    addUser(selectedUser) {
         this.users = this.users || [];
        // TODO not like this decision to check current users list to exclude dublicates
        if (this.users.filter(user => user.email === selectedUser.email).length === 0) {
            this.dataService.assignUser(this.boardId, selectedUser)
                .subscribe(user => {
                    this.users.push(user);
                    this.usersempty = false;
                });
        }
    }

    removeUser(userId) {
        this.dataService.removeAssignedUser(this.boardId, userId)
            .subscribe( result =>
            {
                if(result.ok === 1) {
                    this.users = this.users.filter(h => h._id !== userId);
                    this.usersempty = !(this.users.length > 0);
                }
                else 
                    console.log('error with removing assigned user')                 
            });
    }

    confirmDel(condition) {
        this.confirmingDel = condition;
    }

    deleteBoard() {
        this.dataService.deleteBoard(this.boardId)
            .subscribe(result => {
                if (result[this.boardId] === "ok") {
                    this.router.navigate(['/dashboard']);
                }
            })
    }
    
    closeBoardSettings() {
        this.closeBoardSettings$.emit(true);
    }
}
