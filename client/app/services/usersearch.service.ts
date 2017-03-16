import { Injectable }      from '@angular/core';
import { Http, Headers }   from '@angular/http';
import { Observable }      from 'rxjs/Observable';
// import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

@Injectable()
export class UserSearchService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private apiUrl = 'http://localhost:3000/api/users';  // URL to web api

    users = ['JohnSmith@email.com',
        'FooBar@Baz.com'];

    constructor(private http:Http) { }

    search(term: string): Observable<string[]> {
        return this.http
            .get(`api/users?email=${term}`)
            .map(response => response.json() as any[]);
    }

    public getUsers() {
        return this.users;
        // const url = `${this.apiUrl}/user`
        // return this.http.get(url)
        //     .map(res => res.json());
    }
}
