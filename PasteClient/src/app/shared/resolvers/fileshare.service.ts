import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs/internal/Observable';
import { tap, take } from 'rxjs/operators';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareModel } from '../share-model.model';

@Injectable({
    providedIn: 'root'
})
export class FileShareResolver implements Resolve<any> {
    readonly BaseURL = 'http://localhost:53357/api';

    local = 'http://localhost:4200/';
    sharedFormData: ShareModel;

    Auth: string;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,

    ) {}
    resolve(route: ActivatedRouteSnapshot) {
        console.log('Logging collected route parameter', route.params['file']);
        this.http.get(this.BaseURL + '/Share/' + route.params['file']);

        return this.http.get(this.BaseURL + '/Share/' + route.params['file'])
            .pipe(tap(res => {
                this.sharedFormData = res as ShareModel;
                console.log('Response from HTTP request: ', res)
            }
            ));
    }
}