import { Injectable }      from '@angular/core';
import { Http, Headers }   from '@angular/http';
import { Observable }      from 'rxjs/Observable';
import { AuthHttp }                      from 'angular2-jwt';

// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class UserSearchService {

    constructor(private authHttp: AuthHttp) { }

    search(term: string): Observable<string[]> {
        return this.authHttp
            .get(`api/usersearch?email=${term}`)
            .map(response => response.json() as any[]);
    }

}
