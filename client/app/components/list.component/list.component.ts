import { Component, Input, OnInit } from '@angular/core';
import { DataService }              from '../../services/data.service'
import { DragulaService }           from 'ng2-dragula'
import { Ticket }                   from '../../classes/ticket'
import { List }                     from '../../classes/list'

@Component({
    moduleId: module.id,
    selector: 'list-component',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit{
    @Input() inputList: List;


    // dragula debug message
    message : string;

    // UI transform from span to input
    addingTicket: boolean;

    addingTicketText: string;
    tickets: Ticket[];



    constructor (
        private dataService: DataService,
        private dragulaService: DragulaService) {

      
            
        dragulaService.dropModel.subscribe((value) => {
            console.log('dragulasevice dropmodel');
            this.onDrop(value.slice(1));
        });
        dragulaService.drop.subscribe((value) => {
            console.log('dragulasevice drop');
            console.log(value);
            this.onDrop(value.slice(1));
        });
    }

    private onDrop( args ): void {
        console.log('onDrop');
        console.log(args);

        let [e, eModel, target, source] = args;
        let found = false;
        for( let i in this.tickets ){
            if( this.tickets[i].order == eModel.id ){
                found = true;
                break;
            }
        }

        this.message = "Item '" + eModel.text + "' was ";

        if( found ){
            this.message += 'added.';
        }
        else{
            this.message += 'removed.';
        }

        console.log(this.message);
    }


    ngOnInit(): void {
        this.dataService.getTickets(+this.inputList._id)
            .subscribe(tickets => {
                this.tickets = tickets;
            })
    }
    
    public enableAddTicket(){
        this.addingTicket = true;
    }

    addTicket() {
        this.tickets = this.tickets || [];
        let newTicket = <Ticket>{
            _id: +new Date(),
            listId: this.inputList._id,
            boardId: this.inputList.boardId,
            text: this.addingTicketText,
            order: (this.tickets.length + 1),
        };
        this.dataService.addTicket(newTicket)
            .subscribe(ticket => {
                this.tickets.push(ticket);
            });
    }

    addTicketOnEnter(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            if (this.addingTicketText && this.addingTicketText.trim() !== '') {
                this.addTicket();
                this.addingTicketText = '';
            } else {
                this.cancelAddTicket();
            }
        } else if (event.keyCode === 27) {
            this.cancelAddTicket();
        }
    }

    cancelAddTicket() {
        console.log('cancel addticket');
        this.addingTicket = false;
        this.addingTicketText = '';
    }

}
