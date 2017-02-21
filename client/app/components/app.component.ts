'use strict'

import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app/components/html/app.component.html',
    styleUrls: ['./app/components/css/app.component.css'],
    // providers: [TreeNodeService]
})

export class AppComponent {
    // rootNodes: Array<TreeNode>;
    testValue1: string;

    testFunc(value) {
        console.log(value);
    }
    // constructor(private nodeService:TreeNodeService) {
    //     this.nodeService.getNodes()
    //         .subscribe(nodes => {
    //             // вот ну совсем не правильно, скорее всего
    //             this.rootNodes = nodes;
    //         })
    // };
    //
    //
    // addRoot (nodeName: string) {
    //     nodeName = nodeName.trim();
    //     if (!nodeName) { return; }
    //
    //     this.nodeService.addRoot(nodeName)
    //         // в node есть id узла
    //         .subscribe( node => this.rootNodes.push(new TreeNode(node._id, node.name, [])));
    // };
    //
    
}