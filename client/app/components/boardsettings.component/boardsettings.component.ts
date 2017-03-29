import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router }               from '@angular/router';
import { UserSearchService }    from '../../services/user-search.service';
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

    currentUserId = JSON.parse(localStorage.getItem('currentUser'))._id;
    
    // confirmation buttons for board deletion, if user is owner
    confirmingDel: boolean = false;

    // confirmation buttons for unsubscribe for gueststs
    confirmingUss: boolean = false;
    
    // current user is owner of this board
    hasRights: boolean;
    
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

 

    ngOnInit(): void {
        this.dataService.getAassignedUses(this.boardId)
            .subscribe(users => {
                this.users = users;
                this.usersempty = !(this.users.length > 0);
            });
        
        this.hasRights = this.dataService.getRights();
        
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


    addUser(selectedUser) {
        this.users = this.users || [];
        if (this.users.filter(user => user.email === selectedUser.email).length === 0) {
            this.dataService.assignUser({relation: {boardId: this.boardId, user: selectedUser, rights: ['Read']}})
                .subscribe(user => {
                    this.users.push(user);
                    this.usersempty = false;
                });
        }
    }
    

    canBeDeleted(user) {
        return (this.hasRights && !(this.currentUserId === user._id)) 
    }
    
    
    cancelSearch() {
        this.searchString = '';
        this.searchBoxVisible = false;
    }


    closeBoardSettings() {

        this.closeBoardSettings$.emit(true);
    }

    
    confirmDel(condition) {
        this.confirmingDel = condition;
    }
    
    
    confirmUss(condition) {
        this.confirmingUss = condition;
    }
    
    
    isOwner(user):boolean {
        return (user.rights.indexOf('Owner') !== -1)
    }

    
    deleteBoard() {
        this.dataService.deleteBoard({ boardId: this.boardId})
            .subscribe(result => {
                if (result[this.boardId] === "ok") {
                    this.router.navigate(['/dashboard']);
                }
            })
    }

    
    removeUser(userId) {
        this.dataService.removeAssignedUser({relation: { boardId: this.boardId, userId: userId }}) 
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

    
    search(term: string): void {
        this.searchTerms.next(term);
        this.searchBoxVisible = true;
    }
    
    
    unsubscribeBoard(userId) {
        this.removeUser(userId);
        this.router.navigate(['/dashboard']);
    }
}
