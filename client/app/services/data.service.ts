import { List } from '../components/classes/list'
import { LISTS } from '../mocks/lists-mock';

import { Injectable }      from '@angular/core';
import { Router }          from '@angular/router';

@Injectable()
export class DataService {

    constructor(private router: Router) {
    }

    public getLists():List[]{
        return LISTS;
    }

}