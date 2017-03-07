import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AlertService } from "../../services/alert.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: [ './signup.component.css']
})

export class SignUpComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    info: string = '';

    constructor(
        private authService:AuthService,
        private route: ActivatedRoute,
        private router: Router
        // private alertService: AlertService
    ) { }


    ngOnInit() {
        this.authService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }

    signup() {
        this.loading = true;
        this.authService.signup(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    // this.alertService.error(error);
                    this.loading = false;
                });
    }
};
