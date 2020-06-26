import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap, take } from 'rxjs/operators';
import { FileModel } from '../file-model.model';

@Injectable({
    providedIn: 'root'
})
export class RawResolver implements Resolve<any> {
    readonly BaseURL = 'http://localhost:53357/api';

    formData: FileModel;
    content: string;
    Auth: string;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,

    ) {}
    resolve(route: ActivatedRouteSnapshot) {
        console.log('Logging collected route parameter', route.params['file']);
        this.http.get(this.BaseURL + '/File/' + route.params['file']);

        return this.http.get(this.BaseURL + '/File/' + route.params['file'])
            .pipe(tap(res => {
                this.formData = res as FileModel;
                this.content = this.formData.Content;
                console.log('Response from HTTP request: ', res)
            }
        ));
    }
}