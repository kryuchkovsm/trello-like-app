import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
// import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'


@Injectable()
export class TestService {
  // constructor(private http:Http) {
  //   console.log('TreeNode service initialized...');
  // }
  //
  //   getNodes() {
  //       return this.http.get('http://localhost:3000/api/nodes')
  //           .map(res => res.json());
  //   }
  //
  //   addRoot(nodeName) {
  //       let headers = new Headers({ 'Content-Type': 'application/json' });
  //       let options = new RequestOptions({ headers: headers });
  //       return this.http
  //           .post('http://localhost:3000/api/addroot', JSON.stringify( { nodeName } ), options)
  //           .map(res => res.json());
  //   }
  //
  //   addNode(parentId) {
  //       let headers = new Headers({ 'Content-Type': 'application/json' });
  //       let options = new RequestOptions({ headers: headers });
  //       return this.http
  //           .post('http://localhost:3000/api/addnode', JSON.stringify({parentId}), options)
  //           .map(res => res.json());
  //   }
  //  
  //   clearTree() {
  //       return this.http
  //           .delete('http://localhost:3000/api/node');
  //   }
    
}
